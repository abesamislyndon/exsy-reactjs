import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { getColor } from "@chakra-ui/theme-tools";

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
              borderColor: "#EDF2F6",
            },
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
    variant: "filled",
    components: ["Input", "Select", "Textarea"],
  })
);

export default theme;
