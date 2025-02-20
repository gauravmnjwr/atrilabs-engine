import { forwardRef } from "react";
import { Flex } from "./Flex";
import { gray500 } from "@atrilabs/design-system";

const DevFlex: typeof Flex = forwardRef((props, ref) => {
  const overrideStyleProps: React.CSSProperties =
    props.children.length === 0
      ? {
          // do not provide minHeight minWidth if user has provided height width
          minHeight: props.styles?.height ? "" : "100px",
          minWidth: props.styles?.width ? "" : "100px",
          borderWidth: `2px`,
          borderStyle: `dashed`,
          borderColor: `${gray500}`,
          boxSizing: "border-box",
          ...props.styles,
        }
      : { ...props.styles };
  return <Flex ref={ref} {...props} styles={overrideStyleProps} />;
});

export default DevFlex;
