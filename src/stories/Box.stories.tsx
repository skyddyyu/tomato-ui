import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../components/Box";

const meta = {
  title: "Example/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    component: {
      control: "select",
      options: [
        "div",
        "section",
        "article",
        "main",
        "aside",
        "header",
        "footer",
        "nav",
      ],
      description: "指定渲染的HTML元素类型",
    },
    width: {
      control: "text",
      description: "宽度",
    },
    height: {
      control: "text",
      description: "高度",
    },
    sx: {
      control: "object",
      description: "sx样式对象",
    },
    children: {
      control: "text",
      description: "子元素内容",
    },
    backgroundColor: {
      control: "color",
      description: "背景颜色（直接CSS属性）",
    },
    color: {
      control: "color",
      description: "文字颜色（直接CSS属性）",
    },
    padding: {
      control: "text",
      description: "内边距（直接CSS属性）",
    },
    margin: {
      control: "text",
      description: "外边距（直接CSS属性）",
    },
    borderRadius: {
      control: "text",
      description: "圆角（直接CSS属性）",
    },
    border: {
      control: "text",
      description: "边框（直接CSS属性）",
    },
    fontSize: {
      control: "text",
      description: "字体大小（直接CSS属性）",
    },
    fontWeight: {
      control: "text",
      description: "字体粗细（直接CSS属性）",
    },
    textAlign: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "文本对齐（直接CSS属性）",
    },
    display: {
      control: "select",
      options: ["block", "inline", "inline-block", "flex", "grid", "none"],
      description: "显示类型（直接CSS属性）",
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础用法
export const Default: Story = {
  args: {
    children: "This is a default Box component.",
    sx: {
      p: 2,
      border: "1px solid #ccc",
    },
  },
};

// 使用section元素渲染
export const AsSection: Story = {
  args: {
    component: "section",
    children: "This Box renders as an HTML section element.",
    sx: {
      p: 2,
      border: "1px dashed grey",
    },
    width: 300,
  },
};

// 复杂样式示例
export const ComplexStyling: Story = {
  args: {
    children: "Box with complex styling",
    sx: {
      p: 3,
      m: 2,
      backgroundColor: "#f5f5f5",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    width: 250,
    height: 100,
  },
};

// Flex布局示例
export const FlexLayout: Story = {
  render: (args) => (
    <Box {...args}>
      {["Item 1", "Item 2", "Item 3"].map((item, index) => (
        <Box
          key={index}
          sx={{
            p: 1,
            backgroundColor: "#e3f2fd",
            border: "1px solid #2196f3",
            borderRadius: 4,
          }}
        >
          {item}
        </Box>
      ))}
    </Box>
  ),
  args: {
    sx: {
      display: "flex",
      gap: 2,
      p: 2,
      border: "2px solid #2196f3",
      borderRadius: 8,
    },
    width: 400,
  },
};

// 响应式间距示例
export const ResponsiveSpacing: Story = {
  args: {
    children: "Box with responsive spacing",
    sx: {
      px: 3, // padding-left and padding-right
      py: 2, // padding-top and padding-bottom
      mx: "auto", // margin-left and margin-right auto
      border: "1px solid #4caf50",
      borderRadius: 4,
      backgroundColor: "#e8f5e8",
      textAlign: "center",
    },
    width: 200,
  },
};

// 定位示例
export const Positioning: Story = {
  args: {
    children: "Positioned Box",
    sx: {
      position: "relative",
      p: 2,
      backgroundColor: "#fff3e0",
      border: "1px solid #ff9800",
      borderRadius: 4,
      top: 10,
      left: 20,
    },
    width: 150,
  },
};

// 直接CSS属性示例
export const DirectCSSProps: Story = {
  args: {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    padding: "16px",
    margin: "8px",
    borderRadius: "12px",
    border: "1px solid #1976d2",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
    children: "Box with direct CSS properties",
  },
};

// 混合样式方法示例
export const MixedStyling: Story = {
  args: {
    // 直接CSS属性
    backgroundColor: "#fff3e0",
    padding: "20px",
    borderRadius: "8px",
    // sx属性
    sx: {
      border: "2px dashed #ff9800",
      "&:hover": {
        backgroundColor: "#ffe0b2",
        transform: "scale(1.02)",
      },
    },
    // 内联样式
    style: {
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    children: "Box with mixed styling approaches",
  },
};

// 所有CSS属性示例
export const AllCSSProperties: Story = {
  args: {
    // 布局属性
    display: "block",
    width: "300px",
    height: "150px",
    position: "relative",

    // 间距属性
    padding: "20px",
    margin: "10px",

    // 背景和边框
    backgroundColor: "#e1f5fe",
    border: "2px solid #0288d1",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(2, 136, 209, 0.3)",

    // 文字样式
    color: "#01579b",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: "1.5",

    // 其他样式
    cursor: "pointer",
    transition: "all 0.3s ease",
    overflow: "hidden",

    children:
      "Box demonstrating various CSS properties passed directly as props",
  },
};

// Flex布局与直接CSS属性结合
export const FlexWithDirectProps: Story = {
  render: () => (
    <Box display="flex" gap="16px" padding="20px" backgroundColor="#f5f5f5">
      <Box
        backgroundColor="#ff5722"
        color="white"
        padding="12px"
        borderRadius="4px"
        flex="1"
        textAlign="center"
      >
        Flex Item 1
      </Box>
      <Box
        backgroundColor="#2196f3"
        color="white"
        padding="12px"
        borderRadius="4px"
        flex="1"
        textAlign="center"
      >
        Flex Item 2
      </Box>
      <Box
        backgroundColor="#4caf50"
        color="white"
        padding="12px"
        borderRadius="4px"
        flex="1"
        textAlign="center"
      >
        Flex Item 3
      </Box>
    </Box>
  ),
};

// 绝对定位示例
export const AbsolutePositioning: Story = {
  render: () => (
    <Box
      position="relative"
      width="300px"
      height="200px"
      backgroundColor="#f0f0f0"
      border="1px solid #ccc"
    >
      <Box
        position="absolute"
        top="10px"
        left="10px"
        backgroundColor="#ff9800"
        color="white"
        padding="8px"
        borderRadius="4px"
      >
        Top Left
      </Box>
      <Box
        position="absolute"
        top="10px"
        right="10px"
        backgroundColor="#9c27b0"
        color="white"
        padding="8px"
        borderRadius="4px"
      >
        Top Right
      </Box>
      <Box
        position="absolute"
        bottom="10px"
        left="50%"
        transform="translateX(-50%)"
        backgroundColor="#607d8b"
        color="white"
        padding="8px"
        borderRadius="4px"
      >
        Bottom Center
      </Box>
    </Box>
  ),
};

// 伪类选择器示例
export const PseudoClassSelectors: Story = {
  args: {
    children: "Hover me! (伪类选择器示例)",
    sx: {
      p: 3,
      backgroundColor: "#e3f2fd",
      border: "2px solid #2196f3",
      borderRadius: 8,
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "center",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "pink",
        color: "white",
        transform: "scale(1.05)",
        boxShadow: "0 4px 12px pink",
      },
      "&:active": {
        transform: "scale(0.98)",
      },
    },
    width: 250,
  },
};

// 复杂伪类选择器示例
export const ComplexPseudoSelectors: Story = {
  render: (args) => (
    <Box {...args}>
      {["First Item", "Second Item", "Third Item", "Fourth Item"].map(
        (item, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              m: 1,
              backgroundColor: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: 4,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:first-child": {
                backgroundColor: "#e8f5e8",
                borderColor: "#4caf50",
              },
              "&:last-child": {
                backgroundColor: "#fff3e0",
                borderColor: "#ff9800",
              },
              "&:nth-child(even)": {
                backgroundColor: "#f3e5f5",
                borderColor: "#9c27b0",
              },
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            {item}
          </Box>
        )
      )}
    </Box>
  ),
  args: {
    sx: {
      display: "flex",
      flexDirection: "column",
      gap: 0,
      p: 2,
      border: "2px solid #666",
      borderRadius: 8,
      backgroundColor: "#fafafa",
    },
    width: 300,
  },
};

// 嵌套伪类选择器示例
export const NestedPseudoSelectors: Story = {
  args: {
    children: "Focus me! (嵌套伪类示例)",
    component: "button",
    sx: {
      p: 3,
      backgroundColor: "#fff",
      border: "2px solid #007bff",
      borderRadius: 8,
      cursor: "pointer",
      fontSize: 16,
      fontWeight: "bold",
      color: "#007bff",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#007bff",
        color: "white",
        "&:focus": {
          outline: "none",
          boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.25)",
        },
      },
      "&:focus": {
        outline: "none",
        boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.25)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
      "&:disabled": {
        backgroundColor: "#f8f9fa",
        color: "#6c757d",
        borderColor: "#dee2e6",
        cursor: "not-allowed",
      },
    },
    width: 200,
  },
};

// HelloBox示例
export const HelloBox: Story = {
  render: () => (
    <Box
      width={100}
      height={100}
      backgroundColor="pink"
      color="white"
      display="flex"
      alignItems="center"
      sx={{ justifyContent: "center" }}
    >
      Hello Box
    </Box>
  ),
  args: {},
};
