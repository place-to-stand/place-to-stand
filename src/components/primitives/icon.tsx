import type { LucideIcon, LucideProps } from 'lucide-react'
import { cn } from '@/src/lib/utils'

/**
 * The one way to draw an icon (Guidelines > Icons). Lucide is the only icon
 * set, and this is the only file that imports it (lint enforces that).
 *
 * Sizes: 16 (inline, beside text) and 24 (buttons that are only an icon, the
 * menu), plus 48 for a rare feature spot. Lines are a fixed width at every
 * size (absoluteStrokeWidth), so they don't thin out or thicken as the icon
 * scales: 2px at 16 and 24 so small icons stay legible, 1px at 48 to match
 * the drawings' structure lines.
 *
 * Icons are decoration for the label next to them, so they are hidden from
 * screen readers by default; an icon that stands alone needs a text label on
 * its button (sr-only).
 */
const STROKE = { 16: 2, 24: 2, 48: 1 } as const

export type IconSize = keyof typeof STROKE

type Props = Omit<
  LucideProps,
  'size' | 'strokeWidth' | 'absoluteStrokeWidth' | 'ref'
> & {
  icon: LucideIcon
  size?: IconSize
}

export function Icon({ icon: Glyph, size = 16, className, ...props }: Props) {
  return (
    <Glyph
      size={size}
      strokeWidth={STROKE[size]}
      absoluteStrokeWidth
      aria-hidden
      className={cn('shrink-0', className)}
      {...props}
    />
  )
}

export type { LucideIcon }
export {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Compass,
  Contact,
  GitBranch,
  LayoutDashboard,
  Loader2,
  Lock,
  Mail,
  Menu,
  Network,
  RefreshCw,
  RotateCcw,
  ServerCog,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  ThumbsDown,
  ThumbsUp,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
