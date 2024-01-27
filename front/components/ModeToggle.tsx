"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Effect to set mounted state
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Render nothing on the server
  if (!mounted) {
    return null
  }

  return (
    <>
      {theme === "light" ? (
        <MoonIcon
          className="cursor-pointer stroke-[1px] text-gray-800 dark:text-white"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <SunIcon
          className="cursor-pointer stroke-[1px] text-gray-800 dark:text-white"
          onClick={() => setTheme("light")}
        />
      )}
    </>
  )
}
