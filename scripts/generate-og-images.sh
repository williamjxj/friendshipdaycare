#!/bin/zsh
set -euo pipefail

# Generates branded 1200x630 Open Graph images into public/og/.
# Requires ImageMagick (magick) and macOS system fonts (Arial).

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/og"
mkdir -p "$OUT"

FONT_BOLD="/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT="/System/Library/Fonts/Supplemental/Arial.ttf"
LOGO="$ROOT/public/daycare-logo.png"

render() {
  local key="$1"
  local title="$2"
  local subtitle="$3"

  magick -size 1200x630 gradient:'#EAF2FB'-'#FDF3E7' \
    \( -size 1200x630 xc:none -fill 'rgba(44,95,77,0.09)' -draw 'circle 1060,70 1060,270' \) -composite \
    \( -size 1200x630 xc:none -fill 'rgba(249,115,22,0.08)' -draw 'circle 80,580 80,360' \) -composite \
    \( "$LOGO" -resize 300x \) -gravity north -geometry +0+40 -composite \
    -font "$FONT" -pointsize 30 -fill '#2C5F4D' -gravity north -annotate +0+250 'FRIENDSHIP CORNER DAYCARE  •  COQUITLAM, BC' \
    -font "$FONT_BOLD" -pointsize 64 -fill '#123046' -gravity north -annotate +0+330 "$title" \
    -font "$FONT" -pointsize 34 -fill '#475569' -gravity north -annotate +0+430 "$subtitle" \
    -font "$FONT" -pointsize 28 -fill '#64748B' -gravity south -annotate +0+44 'friendshipdaycare.com  •  604.945.8504' \
    "$OUT/$key.png"

  echo "generated public/og/$key.png"
}

render home "Coquitlam Montessori Daycare" "Licensed since 2008 • Ages 2½ – 5"
render funding "Funding & Subsidies in BC" "Affordable Child Care Benefit • \$10/day program"
render our-team "Meet Our Educators" "ECE-certified Montessori team in Coquitlam"
render welcome "Schedule a Tour" "Visit Friendship Corner Daycare in person"
render resources "Parent Resources & Handbook" "Forms, guides, and checklists for families"
render journal "Friendship Corner Classroom Journal" "Monthly highlights from our Coquitlam classrooms"
render gallery "Inside Our Montessori Classrooms" "Prepared spaces, materials, and outdoor play"
render montessori "Montessori Education in Coquitlam" "Hands-on learning for ages 30 months to 5"
render ece "BC Early Learning (ECE)" "Certified early childhood educators since 2008"
render todays-story "Today's Story" "Weekly storytime with Friendship Corner Daycare"
render default "Friendship Corner Daycare" "Licensed Montessori daycare in Coquitlam, BC"

echo "Done — $(( $(ls "$OUT" | wc -l | tr -d ' ') )) images in public/og/"
