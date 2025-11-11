"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// -> Definimos o tipo de props usando o "ComponentProps" do React
//    Isto "extrai" o tipo de props diretamente do componente que importámos.
type NextThemesProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: NextThemesProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
