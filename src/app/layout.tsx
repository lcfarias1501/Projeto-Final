import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import '../styles/globals.css'
import NavBar from "@/components/NavBar/NavBar"
import { ThemeProvider } from "@/providers/theme-provider"
import Footer from "@/components/Footer/Footer"


const robotoSans = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sabor Local",
  description: "Ache seu restaurante preferido",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${robotoSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class" // Diz-lhe para usar a classe ".dark" no <html>
          defaultTheme="system" // Usa o tema do sistema como padrão
          enableSystem // Permite que ele detete o tema do sistema
          disableTransitionOnChange // Desativa transições de cor ao mudar de tema
        >
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
