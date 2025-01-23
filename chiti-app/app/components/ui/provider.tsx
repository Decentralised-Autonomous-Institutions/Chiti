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
      bg: 'gray.50',
      color: 'gray.800',
    }
  },

  // Theme configuration
  theme: {
    tokens: {
      colors: {
        primary: {
          value: '#007FFF',
          description: 'Primary brand color'
        },
        background: {
          value: '#F7FAFC',
          description: 'Default background color'
        },
        border: {
          value: "#e5e5e5",
          DEFAULT: { value: "#e5e5e5" },
          rgb: { value: "229, 229, 229" }
        },

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
      },

      fonts: {
        body: {
          value: 'system-ui, sans-serif',
          description: 'Body text font family'
        },
        heading: {
          value: 'system-ui, sans-serif',
          description: 'Heading font family'
        }
      },

      fontSizes: {
        xs: { value: '0.75rem' },
        sm: { value: '0.875rem' },
        md: { value: '1rem' },
        lg: { value: '1.125rem' },
        xl: { value: '1.25rem' }
      },

      spacing: {
        1: { value: '0.25rem' },
        2: { value: '0.5rem' },
        3: { value: '0.75rem' },
        4: { value: '1rem' },
        5: { value: '1.25rem' },
        6: { value: '1.5rem' }
      },

      radii: {
        sm: { value: '0.125rem' },
        md: { value: '0.375rem' },
        lg: { value: '0.5rem' },
        full: { value: '9999px' }
      },

      shadows: {
        sm: {
          value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          description: 'Small shadow'
        },
        md: {
          value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          description: 'Medium shadow'
        }
      }
    },

    textStyles: {
      h1: {
        fontSize: ['2xl', '3xl'],
        fontWeight: 'bold',
        lineHeight: 'tall'
      },
      h2: {
        fontSize: ['xl', '2xl'],
        fontWeight: 'semibold',
        lineHeight: 'tall'
      }
    },

    layerStyles: {
      card: {
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'sm',
        p: '6'
      },
      selected: {
        bg: 'gray.50',
        borderWidth: '1px',
        borderColor: 'blue.500'
      }
    },

    animationStyles: {
      fadeIn: {
        animation: 'fadeIn 0.3s ease-in-out'
      },
      slideIn: {
        animation: 'slideIn 0.4s ease-out'
      }
    },


    // Animation keyframes
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      slideIn: {
        '0%': { transform: 'translateY(20px)', opacity: 0 },
        '100%': { transform: 'translateY(0)', opacity: 1 }
      }
    },

    // Semantic tokens mapping
    semanticTokens: {
      colors: {
        primary: { value: "{colors.black}" },
        text: {
          value: {
            base: '#1A202C',
            _dark: '#F7FAFC'
          },
        },
        'primary-accent': { value: "{colors.success.DEFAULT}" },
        'secondary-accent': { value: "{colors.blue.DEFAULT}" },
        surface: { value: "{colors.background}" },
        border: { value: "{colors.border}" },
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
          visual: {
            solid: {
              bg: 'primary',
              color: 'white'
            },
            outline: {
              borderWidth: '1px',
              borderColor: 'primary'
            },
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
              borderColor: '{colors.border}',
              _hover: {
                bg: '{colors.background}',
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
          colorPalette: 'bg',
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
