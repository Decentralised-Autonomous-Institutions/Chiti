"use client"

import { ChakraProvider, defineConfig, createSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

const config = defineConfig({
  // CSS Variables configuration
  cssVarsRoot: ":where(:root, :host)",
  cssVarsPrefix: "chiti",

  // Global styles
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      backgroundColor: "white",
    }
  },

  // Theme configuration
  theme: {
    // Breakpoints
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    // Token definitions
    tokens: {
      colors: {
        // Primary Colors
        black: { value: "#000000" },
        white: { value: "#FFFFFF" },
        
        // Primary Accents
        success: {
          DEFAULT: { value: "#15a37f" },
          rgb: { value: "21, 163, 127" }
        },
        neutral: {
          DEFAULT: { value: "#3e3f4b" },
          rgb: { value: "62, 63, 75" }
        },
        
        // Secondary Accents
        blue: {
          DEFAULT: { value: "#2D63F6" },
          rgb: { value: "45, 99, 246" }
        },
        purple: {
          DEFAULT: { value: "#7C3AED" },
          rgb: { value: "124, 58, 237" }
        },
        
        // Background System
        background: {
          DEFAULT: { value: "#F7F7F8" },
          rgb: { value: "247, 247, 248" }
        },
        border: {
          DEFAULT: { value: "#e5e5e5" },
          rgb: { value: "229, 229, 229" }
        }
      }
    },

    // Animation keyframes
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      }
    },

    // Semantic tokens mapping
    semanticTokens: {
      colors: {
        primary: { value: "{colors.black}" },
        'primary-accent': { value: "{colors.success.DEFAULT}" },
        'secondary-accent': { value: "{colors.blue.DEFAULT}" },
        surface: { value: "{colors.background.DEFAULT}" },
        border: { value: "{colors.border.DEFAULT}" },
      }
    },

    // Component recipes
    recipes: {
      button: {
        className: 'button',
        base: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'md',
          fontWeight: 'semibold',
          transition: 'all 0.2s',
        },
        variants: {
          variant: {
            primary: {
              bg: '{colors.success.DEFAULT}',
              color: '{colors.white}',
              _hover: {
                opacity: 0.9,
              }
            },
            secondary: {
              bg: '{colors.neutral.DEFAULT}',
              color: '{colors.white}',
              _hover: {
                opacity: 0.9,
              }
            },
            alternative: {
              bg: '{colors.blue.DEFAULT}',
              color: '{colors.white}',
              _hover: {
                opacity: 0.9,
              }
            },
            'alternative-secondary': {
              bg: '{colors.purple.DEFAULT}',
              color: '{colors.white}',
              _hover: {
                opacity: 0.9,
              }
            },
            dark: {
              bg: '{colors.black}',
              color: '{colors.white}',
              _hover: {
                opacity: 0.9,
              }
            },
            light: {
              bg: '{colors.white}',
              color: '{colors.black}',
              border: '1px solid',
              borderColor: '{colors.border.DEFAULT}',
              _hover: {
                bg: '{colors.background.DEFAULT}',
              }
            }
          },
          size: {
            sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
            md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
            lg: { padding: '1rem 2rem', fontSize: '1.125rem' }
          }
        },
        defaultVariants: {
        }
      }
    }
  }
})

// Create the styling system
const system = createSystem(config)

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
