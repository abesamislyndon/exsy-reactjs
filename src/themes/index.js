import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";

const theme = extendTheme(
  {
    colors: {
      brand: {
        500: "#f37712",
        600: "#f39c12",
      },
    },
    components: {
      Input: {
        variants: {
          filled: {
            field: {
              _focus: {
                borderColor: "brand.500",
              },
              borderColor: "#EDF2F6",
              background: "#fff",
            },
          },
          outline: {
            field: {
              _focus: {
                borderColor: "brand.500",
              },
              borderColor: "#EDF2F6",
            },
          },
        },
      },
      Textarea: {
        variants: {
          filled: {
            field: {
              _focus: {
                borderColor: "brand.500",
              },
              background: "#fff",
              borderColor: "#EDF2F6",
              
            },
            borderColor: "#dfe6e9",
            background: "#fff",
          },
        },
      },
      Select: {
        variants: {
          filled: {
            field: {
              _focus: {
                borderColor: "brand.500",
              },
              borderColor: "#EDF2F6",
              background: "#fff",
            },
          },
        },
      },
      Heading: {
        baseStyle: {
          fontWeight: "600",
        },
        sizes: {
          // default size is md
          xl: {
            fontSize: "60px",
          },
        },
      },
      FormLabel: {
        baseStyle: {
          fontWeight: "300",
          fontSize: "1rem"
        },
        sizes: {
          // default size is md
          xl: {
            fontSize: "50px",
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Button"],
  }),

  withDefaultVariant({
    variant: "outline",
    components: ["Input", "Select", "Textarea", "NumberInput"],
  })
);

export default theme;
