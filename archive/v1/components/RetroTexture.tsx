'use client'

import { cn } from '@/lib/utils'

interface RetroTextureProps {
  variant?: 'paper' | 'halftone' | 'noise' | 'gradient'
  intensity?: 'light' | 'medium' | 'heavy'
  color?: 'atlas-red' | 'vintage-cream' | 'ink-black'
  className?: string
  children?: React.ReactNode
}

export function RetroTexture({
  variant = 'paper',
  intensity = 'light',
  color = 'vintage-cream',
  className,
  children
}: RetroTextureProps) {
  const baseClasses = "relative"
  
  const textureClasses = {
    paper: {
      light: "before:bg-gradient-to-br before:from-black/[0.02] before:via-transparent before:to-black/[0.02]",
      medium: "before:bg-gradient-to-br before:from-black/[0.04] before:via-transparent before:to-black/[0.04]",
      heavy: "before:bg-gradient-to-br before:from-black/[0.06] before:via-transparent before:to-black/[0.06]"
    },
    halftone: {
      light: "before:bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] before:bg-[length:12px_12px]",
      medium: "before:bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] before:bg-[length:8px_8px]",
      heavy: "before:bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] before:bg-[length:6px_6px]"
    },
    noise: {
      light: "before:bg-gradient-to-br before:from-black/[0.03] before:via-transparent before:to-black/[0.03]",
      medium: "before:bg-gradient-to-br before:from-black/[0.05] before:via-transparent before:to-black/[0.05]",
      heavy: "before:bg-gradient-to-br before:from-black/[0.08] before:via-transparent before:to-black/[0.08]"
    },
    gradient: {
      light: "before:bg-gradient-to-br before:from-black/5 before:via-transparent before:to-black/5",
      medium: "before:bg-gradient-to-br before:from-black/10 before:via-transparent before:to-black/10",
      heavy: "before:bg-gradient-to-br before:from-black/15 before:via-transparent before:to-black/15"
    }
  }
  
  const colorOverlays = {
    'atlas-red': "after:bg-[#B73E2A]/5",
    'vintage-cream': "after:bg-[#FDF6E3]/5",
    'ink-black': "after:bg-[#1A1A1A]/5"
  }
  
  return (
    <div className={cn(
      baseClasses,
      "before:absolute before:inset-0 before:pointer-events-none before:z-10",
      "after:absolute after:inset-0 after:pointer-events-none after:z-20",
      textureClasses[variant][intensity],
      colorOverlays[color],
      className
    )}>
      <div className="relative z-30">
        {children}
      </div>
    </div>
  )
}

// Preset texture components
export function VintageBackground({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <RetroTexture 
      variant="paper" 
      intensity="light" 
      color="vintage-cream"
      className={cn("min-h-screen bg-[#FDF6E3]", className)}
    >
      {children}
    </RetroTexture>
  )
}

export function RetroCard({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <RetroTexture 
      variant="paper" 
      intensity="medium" 
      color="atlas-red"
      className={cn(
        "bg-white rounded-lg shadow-lg border border-gray-200",
        "p-6",
        className
      )}
    >
      {children}
    </RetroTexture>
  )
}

export function HalftoneOverlay({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <RetroTexture 
      variant="halftone" 
      intensity="light" 
      color="atlas-red"
      className={className}
    >
      {children}
    </RetroTexture>
  )
}

export function NoiseOverlay({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <RetroTexture 
      variant="noise" 
      intensity="medium" 
      color="ink-black"
      className={className}
    >
      {children}
    </RetroTexture>
  )
}