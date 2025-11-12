"use client"

import { useState, useEffect, useRef, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, LogIn } from 'lucide-react'
import { cn } from "@/lib/utils"

interface DesktopNavigationComponentProps {
  menuItems: {
    href: string
    icon: React.ReactNode
    label: string
  }[]
}

function DesktopNavigationComponent({ menuItems }: DesktopNavigationComponentProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Update active item based on current path
  useEffect(() => {
    let index = menuItems.findIndex(item => item.href === pathname)
    
    // Handle nested routes
    if (index === -1) {
      if (pathname.startsWith("/articles")) {
        index = menuItems.findIndex(item => item.href === "/articles")
      } else if (pathname.startsWith("/gallery")) {
        index = menuItems.findIndex(item => item.href === "/gallery")
      }
    }
    
    setActiveIndex(index !== -1 ? index : null)
  }, [pathname, menuItems])

  // Update indicator position
  useEffect(() => {
    if (activeIndex === null || !navRef.current || !indicatorRef.current) return
    
    const navItem = navRef.current.children[activeIndex] as HTMLElement
    if (!navItem) return
    
    const { width, left } = navItem.getBoundingClientRect()
    const navLeft = navRef.current.getBoundingClientRect().left
    
    indicatorRef.current.style.width = `${width}px`
    indicatorRef.current.style.transform = `translateX(${left - navLeft}px)`
  }, [activeIndex])

  return (
    <div className="relative">
      <ul ref={navRef} className="flex items-center space-x-1">
        {menuItems.map((item, index) => (
          <li key={item.href}>
            <Link
              href={item.href}
              prefetch={false}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors",
                activeIndex === index 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      
      {activeIndex !== null && (
        <div 
          ref={indicatorRef}
          className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-out"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export const DesktopNavigation = memo(DesktopNavigationComponent)
