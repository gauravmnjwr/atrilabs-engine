import React, { forwardRef, useCallback } from "react";
import { Alert as AntdAlert } from "antd";

const enum AlertType {
  SUCEESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

const Alert = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    attrs: {
      class: string;
    };
    custom: {
      alertType: AlertType;
      title: string;
      description?: string;
      icon?: string;
      isClosable: boolean;
      showIcon?: boolean;
      closeText?: string;
      closeIcon?: string;
      titleFontSize?: number;
      titleFontColor?: number;
    };
    onClick: (event: { pageX: number; pageY: number }) => void;
    id?: string;
    className?: string;
    showIcon?: boolean;
  }
>((props, ref) => {
  const { custom, ...restProps } = props;
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      props.onClick({ pageX: e.pageX, pageY: e.pageY });
    },
    [props]
  );
  // moved ref to div, as the Alert select doesnt provide ref for Alert
  return (
    <>
      <style>
        {`.ant-alert-message {
            font-size :${props.custom.titleFontSize}px !important;
            color:${props.custom.titleFontColor}!important;
          }
        `}
      </style>
      <div ref={ref} style={{ display: "inline-block" }} id={props.id}>
        <AntdAlert
          style={props.styles}
          {...restProps}
          className={`${props.className} ${props.attrs?.class}`}
          onClick={onClick}
          type={props.custom.alertType || AlertType.SUCEESS}
          icon={
            props.custom.icon && (
              <img src={props.custom.icon} alt={props.custom.icon} />
            )
          }
          showIcon={props.custom.showIcon} //it will show antd icon
          message={props.custom.title}
          description={props.custom.description}
          closable={props.custom?.isClosable}
          closeText={props.custom?.closeText}
          closeIcon={
            props.custom.closeIcon && (
              <img src={props.custom.closeIcon} alt={props.custom.closeIcon} />
            )
          }
        />
      </div>
    </>
  );
});

export default Alert;
