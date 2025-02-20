import {
  extractParams,
  moduleFileExtensions,
} from "@atrilabs/commands-builder";
import webpack from "webpack";
import path from "path";
import { createServerEntry } from "./createServerEntry";
import { PageInfo } from "./types";
import { createCommonConfig } from "./createCommonConfig";
import { startNodeWebpackBuild } from "./utils";
import type { ComponentManifests } from "@atrilabs/atri-app-core/src/types";

export async function buildServerSide(
  params: ReturnType<typeof extractParams> & {
    pagesInfo: PageInfo[];
    componentManifests: ComponentManifests;
  }
) {
  const { appSrc, exclude, additionalInclude, allowlist, resolveAlias } =
    createCommonConfig({
      exclude: params.exclude,
      componentManifests: params.componentManifests,
    });
  const serverOutputDir = path.resolve(params.paths.outputDir, "server");
  params.paths = { ...params.paths, outputDir: serverOutputDir, appSrc };

  params.additionalInclude = [
    ...(params.additionalInclude || []),
    ...additionalInclude,
  ];

  allowlist.push(...(params.allowlist || []));

  return startNodeWebpackBuild({
    ...params,
    disableNodeExternals: true,
    exclude,
    outputFilename: "[name].js",
    moduleFileExtensions,
    entry: await createServerEntry({
      pageInfos: params.pagesInfo,
      componentManifests: params.componentManifests,
    }),
    prepareConfig: (config) => {
      config.resolve = config.resolve ?? {};
      config.resolve["alias"] = {
        ...(config.resolve["alias"] || {}),
        ...resolveAlias,
      };
      config.resolveLoader = {
        alias: {
          "atri-pages-server-loader": path.resolve(
            __dirname,
            "..",
            "src",
            "scripts",
            "build-atri-app",
            "loaders",
            "atri-pages-server-loader.js"
          ),
        },
      };
      config.cache = {
        type: "filesystem",
        cacheDirectory: path.resolve(
          "node_modules",
          ".cache-build-atri-app",
          "server"
        ),
      };
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.ProvidePlugin({
          React: "react",
        })
      );
    },
    allowlist,
  }).catch((err) => {
    throw err;
  });
}
