import React, { forwardRef, useMemo, useState } from "react";
import { Steps, Popover } from "antd";
import type { StepProps, StepsProps } from "antd";
import type { ProgressDotRender } from "rc-steps/lib/Steps";

const Step = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    custom: {
      items: StepProps[];
      current: number;
      size?: "default" | "small";
      direction?: "horizontal" | "vertical";
      progressDot?: ProgressDotRender | boolean;
      dotStyle?: "" | "dot" | "withHover";
      clickable?: boolean;
      type?: "default" | "navigation" | "inline";
      percent?: number;
      labelPlacement?: "horizontal" | "vertical";
    };
    onClick: (event: { pageX: number; pageY: number }) => void;
    className?: string;
  }
>((props, ref) => {
  const [currentStep, setCurrentStep] = useState(0);
  const onChange = (value: number) => {
    if (
      props.custom.clickable === false ||
      props.custom.clickable === undefined
    ) {
      return;
    } else {
      setCurrentStep(value);
    }
  };
  const customDot: StepsProps["progressDot"] = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );

  const stepItems = useMemo(() => {
    return props.custom.items.map((item) => {
      if (typeof item.icon === "string") {
        return {
          ...item,
          icon: (
            <div
              style={{
                width: "32px",
                height: "32px",
              }}
            >
              <img src={item.icon} width="100%" alt={item.icon}  />
            </div>
          ),
        };
      }
      return item;
    });
  }, [props.custom.items]);

  return (
    <>
      <div ref={ref}>
        <Steps
          style={props.styles}
          className={props.className}
          onChange={onChange}
          progressDot={
            props.custom.dotStyle === ""
              ? false
              : props.custom.dotStyle === "dot"
              ? true
              : props.custom.dotStyle !== undefined && customDot
          }
          {...props.custom}
          current={
            props.custom.clickable === true ? currentStep : props.custom.current
          }
          items={stepItems}
        />
      </div>
    </>
  );
});

export default Step;
