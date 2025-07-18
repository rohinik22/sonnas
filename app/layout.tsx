import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ciguatera from "@/lib/fonts/ciguatera"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sonna's - Authentic Italian Restaurant",
  description:
    "Experience authentic Italian cuisine with our handcrafted pizzas, fresh pasta, and traditional recipes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${ciguatera.variable}`}>{children}</body>
    </html>
  )
}
