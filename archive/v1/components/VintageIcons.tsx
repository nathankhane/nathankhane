'use client'

import { cn } from '@/lib/utils'

interface VintageIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'atlas-red' | 'rust-orange' | 'sage-green' | 'ink-black' | 'vintage-cream'
  className?: string
}

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6", 
  lg: "w-8 h-8"
}

const iconColors = {
  'atlas-red': 'fill-[#B73E2A] stroke-[#B73E2A]',
  'rust-orange': 'fill-[#D4741A] stroke-[#D4741A]',
  'sage-green': 'fill-[#7A8B5C] stroke-[#7A8B5C]',
  'ink-black': 'fill-[#1A1A1A] stroke-[#1A1A1A]',
  'vintage-cream': 'fill-[#FDF6E3] stroke-[#FDF6E3]'
}

export function VintageGear({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L13.09 4.24L15.5 3.5L16.5 5.5L19 6.5L18.24 8.91L20.5 10.5L19 12L20.5 13.5L18.24 15.09L19 17.5L16.5 18.5L15.5 20.5L13.09 19.76L12 22L10.91 19.76L8.5 20.5L7.5 18.5L5 17.5L5.76 15.09L3.5 13.5L5 12L3.5 10.5L5.76 8.91L5 6.5L7.5 5.5L8.5 3.5L10.91 4.24L12 2Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

export function VintageLightbulb({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H15"/>
      <path d="M9 18H15"/>
      <path d="M12 3C8.68629 3 6 5.68629 6 9C6 10.8 7.2 12.4 8.7 13.5C9.4 14.1 10 14.8 10 15.5V16H14V15.5C14 14.8 14.6 14.1 15.3 13.5C16.8 12.4 18 10.8 18 9C18 5.68629 15.3137 3 12 3Z"/>
    </svg>
  )
}

export function VintageArrowRight({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12H19"/>
      <path d="M12 5L19 12L12 19"/>
    </svg>
  )
}

export function VintageStar({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  )
}

export function VintageRibbon({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 21L12 17L16 21"/>
      <path d="M12 17V3"/>
      <path d="M8 7L12 3L16 7"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

export function VintageShield({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L3 7V12.5C3 17.5 7.5 22 12 22C16.5 22 21 17.5 21 12.5V7L12 2Z"/>
      <path d="M9 12L11 14L16 9"/>
    </svg>
  )
}

export function VintageQuote({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="currentColor"
      stroke="none"
    >
      <path d="M3 21C3 17.5 4 9 12 9V7C4 7 1 14 1 21C1 22.1 1.9 23 3 23S5 22.1 5 21H3Z"/>
      <path d="M14 21C14 17.5 15 9 23 9V7C15 7 12 14 12 21C12 22.1 12.9 23 14 23S16 22.1 16 21H14Z"/>
    </svg>
  )
}

export function VintageHeart({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61C20.3 4.09 19.66 3.68 18.95 3.42C18.24 3.16 17.49 3.06 16.74 3.12C15.99 3.18 15.26 3.39 14.6 3.73C13.94 4.07 13.36 4.53 12.89 5.08L12 6L11.11 5.08C10.64 4.53 10.06 4.07 9.4 3.73C8.74 3.39 8.01 3.18 7.26 3.12C6.51 3.06 5.76 3.16 5.05 3.42C4.34 3.68 3.7 4.09 3.16 4.61C2.11 5.66 1.5 7.1 1.5 8.6C1.5 10.1 2.11 11.54 3.16 12.59L12 21.5L20.84 12.59C21.89 11.54 22.5 10.1 22.5 8.6C22.5 7.1 21.89 5.66 20.84 4.61Z"/>
    </svg>
  )
}

export function VintageAward({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22L12 19L7 22L8.523 12.89"/>
      <path d="M12 2V8"/>
      <path d="M8.5 5.5L12 8L15.5 5.5"/>
    </svg>
  )
}

export function VintageCheckmark({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17L4 12"/>
    </svg>
  )
}

export function VintageStamp({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 9v6"/>
      <path d="M15 9v6"/>
      <path d="M9 15h6"/>
    </svg>
  )
}

export function VintageKey({ size = 'md', color = 'atlas-red', className }: VintageIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(iconSizes[size], iconColors[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="7" r="3"/>
      <path d="M10 8L21 19"/>
      <path d="M16 14L18 16"/>
      <path d="M19 13L21 15"/>
    </svg>
  )
}