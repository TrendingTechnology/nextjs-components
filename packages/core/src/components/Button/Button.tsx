import React from "react";
import { forwardRef, useState, useRef, useContext } from "react";
import clsx from "clsx";
import { useHover } from "@react-aria/interactions";
import { useButton } from "@react-aria/button";

import { Spinner } from "../Spinner";
import { IconSizeContext } from "../../contexts/IconSizeContext";
import { DisabledContext } from "../../contexts/DisabledContext";

import reset from "../../styles/reset/reset.module.css";
import styles from "./button.module.css";

type IntrinsicProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export interface Props extends Omit<IntrinsicProps, "prefix" | "type"> {
  size?: "small" | "large";
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;
  align?: "start" | "grow";
  type?: "secondary" | "success" | "error" | "warning" | "alert" | "violet";
  shape?: "square" | "circle";
  variant?: "shadow" | "ghost";
  loading?: boolean;
}
const Button: React.ComponentType<Props> = forwardRef(
  (
    {
      // custom props
      size,
      prefix,
      suffix,
      align,
      type,
      shape,
      variant,
      // native props
      className,
      children,
      disabled,
      loading,
      ...props
    },
    externalRef
  ) => {
    const ctxDisabled = useContext(DisabledContext);
    const isDisabled = disabled ?? ctxDisabled;

    const [isFocused, setFocused] = useState(false);

    const ref = useRef<HTMLButtonElement>();
    const { buttonProps, isPressed } = useButton(
      {
        isDisabled: isDisabled || loading,
        onFocusChange: setFocused,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            setFocused(true);
          }
        },
        onPressStart: (e) => {
          if (e.pointerType === "mouse") {
            setFocused(false);
          }
        },
      },
      ref
    );

    const iconSizeContextValue = {
      size: size === "large" ? 24 : size === "small" ? 16 : 20,
    };

    const { hoverProps, isHovered } = useHover({
      isDisabled: isDisabled || loading,
    });

    return (
      <button
        {...hoverProps}
        {...buttonProps}
        data-focus={isFocused ? "" : null}
        data-active={isPressed ? "" : null}
        data-hover={isHovered ? "" : null}
        className={clsx([
          reset.reset,
          styles.base,
          styles.button,
          !variant && styles.invert,
          {
            [styles.ghost]: variant === "ghost",
            [styles.shadow]: variant === "shadow",
          },
          {
            [styles.shape]: !!shape,
            [styles.circle]: shape === "circle",
          },
          {
            [styles.secondary]: type === "secondary",
            [styles[size]]: !!size,
            [styles.disabled]: isDisabled,
          },
          type === "success" && [
            "geist-themed",
            "geist-success",
            "geist-success-fill",
          ],
          type === "error" && [
            "geist-themed",
            "geist-error",
            "geist-error-fill",
          ],
          type === "warning" && [
            "geist-themed",
            "geist-warning",
            "geist-warning-fill",
          ],
          type === "alert" && [
            "geist-themed",
            "geist-alert",
            "geist-alert-fill",
          ],
          type === "violet" && [
            "geist-themed",
            "geist-violet",
            "geist-violet-fill",
          ],
          className,
        ])}
        {...props}
        ref={ref}
      >
        <IconSizeContext.Provider value={iconSizeContextValue}>
          {prefix && (
            <span className={styles.prefix}>
              {loading ? (
                <Spinner size={16} color={"var(--accents-5)"} />
              ) : (
                prefix
              )}
            </span>
          )}
          <span
            className={clsx(styles.content, {
              [styles.grow]: align === "grow",
              [styles.start]: align === "start",
            })}
          >
            {children}
          </span>
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </IconSizeContext.Provider>
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
