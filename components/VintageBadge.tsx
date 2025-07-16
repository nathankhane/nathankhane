'use client'

import { motion } from 'framer-motion'
import { retroAnimations } from '@/lib/retro-animations'
import { cn } from '@/lib/utils'

interface VintageBadgeProps {
  children: React.ReactNode
  variant?: 'circular' | 'ribbon' | 'stamp' | 'seal'
  size?: 'sm' | 'md' | 'lg'
  color?: 'atlas-red' | 'rust-orange' | 'sage-green'
  className?: string
  animate?: boolean
}

export function VintageBadge({
  children,
  variant = 'circular',
  size = 'md',
  color = 'atlas-red',
  className,
  animate = true
}: VintageBadgeProps) {
  const baseClasses = "inline-flex items-center justify-center font-bold text-white"
  
  const variantClasses = {
    circular: "rounded-full border-2 border-white/20",
    ribbon: "relative overflow-hidden",
    stamp: "border-2 border-dashed border-white/40 rounded-lg",
    seal: "rounded-full border-4 border-white/30 shadow-lg"
  }
  
  const sizeClasses = {
    sm: "px-3 py-1 text-xs min-h-[2rem] min-w-[2rem]",
    md: "px-4 py-2 text-sm min-h-[3rem] min-w-[3rem]",
    lg: "px-6 py-3 text-base min-h-[4rem] min-w-[4rem]"
  }
  
  const colorClasses = {
    'atlas-red': "bg-gradient-to-br from-[#B73E2A] to-[#8B2E1F]",
    'rust-orange': "bg-gradient-to-br from-[#D4741A] to-[#B8611A]",
    'sage-green': "bg-gradient-to-br from-[#7A8B5C] to-[#6B7A50]"
  }
  
  const ribbonClasses = variant === 'ribbon' ? 
    "before:absolute before:left-0 before:top-0 before:w-0 before:h-0 before:border-l-[8px] before:border-r-[8px] before:border-b-[8px] before:border-l-transparent before:border-r-transparent before:border-b-black/20 after:absolute after:right-0 after:top-0 after:w-0 after:h-0 after:border-l-[8px] after:border-r-[8px] after:border-b-[8px] after:border-l-transparent after:border-r-transparent after:border-b-black/20" : ""
  
  const Component = animate ? motion.div : 'div'
  const animationProps = animate ? retroAnimations.vintageBadge : {}
  
  return (
    <Component
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        colorClasses[color],
        ribbonClasses,
        className
      )}
      {...animationProps}
    >
      {variant === 'ribbon' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
          <div className="relative z-10">{children}</div>
        </>
      )}
      {variant === 'stamp' && (
        <>
          <div className="absolute inset-1 border border-dashed border-white/20 rounded"></div>
          <div className="relative z-10">{children}</div>
        </>
      )}
      {variant === 'seal' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
          <div className="relative z-10">{children}</div>
        </>
      )}
      {(variant === 'circular') && children}
    </Component>
  )
}

// Preset vintage badges
export function EstablishedBadge({ year = '2020' }: { year?: string }) {
  return (
    <VintageBadge variant="circular" size="md" color="atlas-red">
      <div className="text-center">
        <div className="text-xs font-accent">EST.</div>
        <div className="text-lg font-hero leading-none">{year}</div>
      </div>
    </VintageBadge>
  )
}

export function QualityBadge() {
  return (
    <VintageBadge variant="seal" size="lg" color="sage-green">
      <div className="text-center">
        <div className="text-xs font-accent">QUALITY</div>
        <div className="text-sm font-hero">ASSURED</div>
      </div>
    </VintageBadge>
  )
}

export function TrustedBadge() {
  return (
    <VintageBadge variant="stamp" size="md" color="rust-orange">
      <div className="font-hero text-sm">TRUSTED</div>
    </VintageBadge>
  )
}

export function PremiumBadge() {
  return (
    <VintageBadge variant="ribbon" size="md" color="atlas-red">
      <div className="font-hero text-sm px-2">PREMIUM</div>
    </VintageBadge>
  )
}