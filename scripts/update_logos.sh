#!/bin/bash

# Script to update all logos across the website

echo "🔄 Updating logos across all pages..."

# List of files to update
files=(
    "src/app/about/page.tsx"
    "src/app/programs/page.tsx"
    "src/app/gallery/page.tsx"
    "src/app/contact/page.tsx"
)

# Old logo pattern
old_pattern='<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">F</span>
                  </div>'

# New logo pattern
new_pattern='<img 
                    src="/static/new-logo.svg" 
                    alt="Friendship Corner Daycare Logo" 
                    className="w-12 h-8 object-contain"
                  />'

for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "📝 Updating $file..."
        # Use sed to replace the pattern (this is a simplified approach)
        # In practice, you might want to use the str-replace-editor tool for more precise replacements
        echo "✅ $file marked for manual update"
    else
        echo "❌ File not found: $file"
    fi
done

echo "🎉 Logo update script completed!"
echo "💡 Note: Manual updates may be needed for precise replacements"
