/** @jsxImportSource @emotion/react */
import React from "react";
import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import "./box.css";

// 定义 sx 属性的类型
interface SxProps {
  // 间距相关
  p?: string | number; // padding
  pt?: string | number; // padding-top
  pr?: string | number; // padding-right
  pb?: string | number; // padding-bottom
  pl?: string | number; // padding-left
  px?: string | number; // padding-left & padding-right
  py?: string | number; // padding-top & padding-bottom

  m?: string | number; // margin
  mt?: string | number; // margin-top
  mr?: string | number; // margin-right
  mb?: string | number; // margin-bottom
  ml?: string | number; // margin-left
  mx?: string | number; // margin-left & margin-right
  my?: string | number; // margin-top & margin-bottom

  // 尺寸相关
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;

  // 颜色相关
  color?: string;
  backgroundColor?: string;
  bgcolor?: string; // backgroundColor 的简写

  // 布局相关
  display?: string;
  position?: string;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: string | number;

  // Flexbox 相关
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  flexWrap?: string;
  flex?: string | number;
  flexGrow?: string | number;
  flexShrink?: string | number;
  flexBasis?: string | number;
  gap?: string | number;

  // 边框相关
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRadius?: string | number;
  borderColor?: string;
  borderWidth?: string | number;
  borderStyle?: string;

  // 其他常用属性
  boxShadow?: string;
  opacity?: string | number;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  textAlign?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  transform?: string;
  transition?: string;
  cursor?: string;

  // 伪类选择器支持
  "&:hover"?: SxProps;
  "&:focus"?: SxProps;
  "&:active"?: SxProps;
  "&:disabled"?: SxProps;
  "&:visited"?: SxProps;
  "&:first-child"?: SxProps;
  "&:last-child"?: SxProps;
  "&:nth-child(odd)"?: SxProps;
  "&:nth-child(even)"?: SxProps;

  // 允许任意 CSS 属性和选择器
  [key: string]: string | number | undefined | SxProps;
}

// Box 组件自有属性
interface BoxOwnProps {
  component?: keyof React.JSX.IntrinsicElements;
  sx?: SxProps;
  children?: React.ReactNode;
}

// Box 组件的完整属性类型
type BoxProps = BoxOwnProps & {
  [K in keyof React.CSSProperties]?: React.CSSProperties[K];
} & Omit<
    React.HTMLAttributes<HTMLElement>,
    keyof BoxOwnProps | keyof React.CSSProperties
  >;

// 将 sx 对象转换为 emotion CSS 样式
function sxToCSS(sx: SxProps): SerializedStyles {
  const styles: Record<string, string | number | SerializedStyles> = {};

  // 处理间距简写
  const spacingMap: Record<string, string> = {
    p: "padding",
    pt: "paddingTop",
    pr: "paddingRight",
    pb: "paddingBottom",
    pl: "paddingLeft",
    m: "margin",
    mt: "marginTop",
    mr: "marginRight",
    mb: "marginBottom",
    ml: "marginLeft",
  };

  // 处理 px, py, mx, my
  if (sx.px !== undefined) {
    styles.paddingLeft = sx.px;
    styles.paddingRight = sx.px;
  }
  if (sx.py !== undefined) {
    styles.paddingTop = sx.py;
    styles.paddingBottom = sx.py;
  }
  if (sx.mx !== undefined) {
    styles.marginLeft = sx.mx;
    styles.marginRight = sx.mx;
  }
  if (sx.my !== undefined) {
    styles.marginTop = sx.my;
    styles.marginBottom = sx.my;
  }

  // 处理 bgcolor 简写
  if (sx.bgcolor) {
    styles.backgroundColor = sx.bgcolor;
  }

  // 处理其他属性
  Object.entries(sx).forEach(([key, value]) => {
    if (value === undefined) return;

    // 跳过已处理的属性
    if (key === "bgcolor" || ["px", "py", "mx", "my"].includes(key)) {
      return;
    }

    // 处理伪类选择器
    if (key.startsWith("&") && typeof value === "object") {
      styles[key] = sxToCSS(value as SxProps);
      return;
    }

    // 处理间距映射
    if (key in spacingMap) {
      const cssProperty = spacingMap[key];
      styles[cssProperty] = value as string | number;
    } else if (typeof value !== "object") {
      // 直接映射其他属性
      styles[key] = value as string | number;
    }
  });

  return css(styles);
}

// 常用的 CSS 属性列表
const CSS_PROPERTIES = new Set([
  // 布局
  "display",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",

  // 间距
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",

  // 背景和边框
  "backgroundColor",
  "background",
  "border",
  "borderTop",
  "borderRight",
  "borderBottom",
  "borderLeft",
  "borderRadius",
  "borderColor",
  "borderWidth",
  "borderStyle",
  "boxShadow",

  // 文字
  "color",
  "fontSize",
  "fontWeight",
  "fontFamily",
  "lineHeight",
  "textAlign",
  "textDecoration",
  "textTransform",
  "letterSpacing",
  "wordSpacing",

  // Flexbox
  "flexDirection",
  "justifyContent",
  "alignItems",
  "alignContent",
  "flexWrap",
  "flex",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "gap",

  // Grid
  "gridTemplateColumns",
  "gridTemplateRows",
  "gridColumn",
  "gridRow",
  "gridArea",
  "gridGap",
  "gridColumnGap",
  "gridRowGap",

  // 其他
  "opacity",
  "overflow",
  "overflowX",
  "overflowY",
  "transform",
  "transition",
  "cursor",
  "pointerEvents",
  "userSelect",
  "visibility",
]);

// 创建基础的 styled 组件
interface StyledBoxProps {
  $cssProps: React.CSSProperties;
  $sxStyles?: SerializedStyles;
}

const StyledBox = styled.div<StyledBoxProps>`
  box-sizing: border-box;
  ${(props) => {
    const cssString = Object.entries(props.$cssProps)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        return `${cssKey}: ${value};`;
      })
      .join(" ");
    return cssString;
  }}
  ${(props) => props.$sxStyles || ""}
`;

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ component = "div", sx, children, style, ...restProps }, ref) => {
    // 分离 CSS 属性和其他 HTML 属性
    const cssProps: React.CSSProperties = {};
    const htmlProps: Record<string, unknown> = {};

    Object.entries(restProps).forEach(([key, value]) => {
      if (CSS_PROPERTIES.has(key) && value !== undefined) {
        (cssProps as Record<string, string | number>)[key] = value as
          | string
          | number;
      } else {
        htmlProps[key] = value;
      }
    });

    // 合并样式：直接 CSS 属性 + style 属性
    const combinedCSSProps: React.CSSProperties = {
      ...cssProps,
      ...style,
    };

    // 生成 sx 样式
    const sxStyles = sx ? sxToCSS(sx) : undefined;

    // 将ref添加到htmlProps中，让styled组件自动处理
    if (ref) {
      htmlProps.ref = ref;
    }

    return (
      <StyledBox
        as={component}
        className="tomato-box"
        $cssProps={combinedCSSProps}
        $sxStyles={sxStyles}
        {...htmlProps}
      >
        {children}
      </StyledBox>
    );
  }
);

Box.displayName = "Box";

export type { BoxProps, SxProps };
