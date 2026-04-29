# Design Brief: College Discovery Platform

## Tone & Direction
Editorial/data-driven education platform. Professional credibility with clean presentation. Trust-focused for high-stakes student decisions.

## Palette
| Token | Light | Dark | Usage |
|---|---|---|---|
| Primary | `0.55 0.24 264` (Indigo) | `0.75 0.27 264` | CTAs, headers, active states, highlights |
| Secondary | `0.65 0.19 270` (Blue) | `0.68 0.22 268` | Secondary actions, alternative emphasis |
| Accent | `0.75 0.27 264` (Bright Indigo) | `0.85 0.22 260` | Hover states, badges, focus rings |
| Muted | `0.93 0.02 280` | `0.25 0.04 270` | Subtle backgrounds, disabled states |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Remove save, delete actions |
| Chart colors | 5-color indigo/blue gradient | Adjusted for dark | Data visualization, comparison stats |

## Typography
| Type | Font | Usage |
|---|---|---|
| Display | General Sans (500/700) | Headers, page titles, card titles |
| Body | General Sans (400) | Body copy, labels, descriptions |
| Mono | Geist Mono (400) | Code, IDs, rating numbers |

## Structural Zones
| Zone | Surface | Border | Depth |
|---|---|---|---|
| Header/Nav | Primary (indigo bar) | Bottom border | Elevated, floating |
| Hero/Search | Background (white/dark) | None | Minimal |
| Card grids | Card with border | Border (`0.92 0.01 280`) | Shadow-md on hover |
| Comparison table | Card | Grid lines as border | Structured rows |
| Footer | Muted (subtle background) | Top border | Recessed |

## Elevation & Depth
- **Resting cards**: `shadow-sm` with `border border-border`
- **Hover cards**: `shadow-lg` with `border-primary/20`
- **Active selection**: `ring-2 ring-primary` with `shadow-md`
- **Floating panels** (compare, filter): `shadow-elevated` (custom 20px blur, indigo tint)

## Spacing & Rhythm
- Gap (grid): `gap-6` (24px)
- Card padding: `p-4` to `p-6` (density increases downward)
- Section margins: `mb-8` between major sections
- Compact list items: `py-2 px-3`

## Component Patterns
- **College card**: Border + shadow, image on top, title/location/rating/fees below, hover → lift + accent border
- **Search input**: Clean border, indigo focus ring, icon left
- **Filter pills**: Muted background, primary foreground, active state filled with primary
- **Comparison row**: Alternating row backgrounds (card / muted/5%), middle column bold
- **Badge/stat**: `badge-stat` utility (rounded pill, indigo background with low opacity)
- **Button tiers**: Primary (indigo fill), secondary (indigo outline), ghost (text only), destructive (red)

## Motion
- **Default transition**: `transition-smooth` (300ms cubic-bezier ease)
- **Card hover**: Scale 1.02 + shadow lift (100ms)
- **Popover enter**: Fade-in + slide-up (200ms)
- **Loading skeleton**: Pulse animation (1.5s cycle)

## Constraints
- No gradients except on chart colors (tinted indigo range)
- Max 2 primary colors (indigo + blue) + accent
- Typography: 2 families max (General Sans + Geist Mono)
- Borders: Subtle, low-contrast (not black on white)
- Shadows: Indigo-tinted (indigo has hue 264°, tint shadows accordingly)

## Signature Detail
**Stat badges** on college cards: Small pills with primary-tinted background (low opacity) and primary foreground. Show rating, placement %, fees tier. These add visual interest without chaos.

## Dark Mode Intent
Preserve indigo/blue hierarchy. Backgrounds lighter (0.15, 0.18, 0.22). Text lighter (0.96). Subtle shift in muted backgrounds — darker than light mode's muted but lighter than card background for hierarchy.

## Responsive
- Mobile-first: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Cards: 1 column mobile, 2 columns tablet, 3+ columns desktop
- Search bar: Full-width mobile, fixed width desktop
- Comparison table: Horizontal scroll mobile, grid desktop
