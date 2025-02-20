import React, { forwardRef, ReactNode } from "react";
import { Card as AntdCard, Avatar } from "antd";

const { Meta } = AntdCard;

export type type = "card" | "meta";

export type Size = "default" | "small";

const Card = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    attrs: {
      class: string;
    };
    custom: {
      type: type;
      title: string;
      tabBarExtraContent: ReactNode;
      bordered: boolean;
      cover: string;
      avatar: string;
      description: ReactNode;
      size?: Size;
      loading?: boolean;
      titleFontSize?: number;
      titleFontColor?: number;
    };
    id?: string;
    className?: string;
    onTabChange?: (key: string) => void;
  }
>((props, ref) => {
  return (
    <>
      <style>
        {`.ant-card-head-title , .ant-card-meta-title {
            font-size :${props.custom.titleFontSize}px !important;
            color:${props.custom.titleFontColor}!important;
          }
        `}
      </style>
      <AntdCard
        ref={ref}
        id={props.id}
        className={
          props.custom.type === "card"
            ? `${props.className} ${props.attrs?.class}`
            : undefined
        }
        style={props.styles}
        title={props.custom.type === "card" ? props.custom.title : undefined}
        bordered={props.custom.bordered}
        size={props.custom.size}
        cover={<img src={props.custom.cover} alt={props.custom.cover} />}
        onTabChange={props.onTabChange}
        loading={props.custom.loading}
      >
        {props.custom.type === "card" && <p> {props.custom.description}</p>}
        {props.custom.type === "meta" && (
          <Meta
            className={`${props.className} ${props.attrs?.class}`}
            style={props.styles}
            avatar={
              props.custom.avatar ? (
                <Avatar src={props.custom.avatar} alt={props.custom.avatar} />
              ) : undefined
            }
            title={props.custom.title}
            description={props.custom.description}
          />
        )}
      </AntdCard>
    </>
  );
});

export default Card;
