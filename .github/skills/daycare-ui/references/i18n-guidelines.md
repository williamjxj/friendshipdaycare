# Internationalization (i18n) Guidelines

The website supports 5 languages using **next-intl**.

## Supported Languages

- **English** (en) - Default
- **Chinese/Simplified** (zh)
- **French** (fr)
- **Spanish** (es)
- **Korean** (ko)

## Setup

Language files are in `/src/messages/`:
- `en.json`
- `zh.json`
- `fr.json`
- `es.json`
- `ko.json`

## Using Translations

### In Client Components

```tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function MyComponent() {
  const { t, locale } = useLanguage();
  
  return (
    <div>
      <h1>{t('mySection.title')}</h1>
      <p>{t('mySection.description')}</p>
    </div>
  );
}
```

### With Rich Content

For text with HTML or formatting:

```tsx
// In JSON:
{
  "text": "Visit <strong>our daycare</strong> today!"
}

// In component:
<p dangerouslySetInnerHTML={{ __html: t('text') }} />
```

Or use RichText component if available.

### With Variables

```tsx
// In JSON:
{
  "greeting": "Hello, {name}!"
}

// In component:
t('greeting', { name: userName })
```

## Adding New Translations

**Step 1: Add to English (en.json)**

```json
{
  "myNewSection": {
    "title": "Section Title",
    "description": "Section description",
    "cta": "Call to Action"
  }
}
```

**Step 2: Add to Other Languages**

Copy the structure to `zh.json`, `fr.json`, `es.json`, `ko.json`:

```json
// zh.json (Chinese)
{
  "myNewSection": {
    "title": "章节标题",
    "description": "章节描述",
    "cta": "行动号召"
  }
}

// fr.json (French)
{
  "myNewSection": {
    "title": "Titre de la Section",
    "description": "Description de la section",
    "cta": "Appel à l'Action"
  }
}

// es.json (Spanish)
{
  "myNewSection": {
    "title": "Título de la Sección",
    "description": "Descripción de la sección",
    "cta": "Llamado a la Acción"
  }
}

// ko.json (Korean)
{
  "myNewSection": {
    "title": "섹션 제목",
    "description": "섹션 설명",
    "cta": "행동 촉구"
  }
}
```

**Step 3: Use AI for Translation**

If you don't speak the language:
1. Get English version correct first
2. Use AI to translate to other languages
3. Maintain the same JSON structure
4. Keep HTML tags/variables intact

## Translation Best Practices

### 1. Keep Keys Organized

Use hierarchical structure:

```json
{
  "homepage": {
    "hero": {
      "title": "...",
      "subtitle": "..."
    },
    "features": {
      "title": "...",
      "items": [...]
    }
  }
}
```

### 2. Don't Hardcode Text

```tsx
// Bad
<h1>Welcome to Friendship Corner</h1>

// Good
<h1>{t('homepage.hero.title')}</h1>
```

### 3. Handle Plurals

```json
{
  "items": {
    "one": "1 item",
    "other": "{count} items"
  }
}
```

```tsx
t('items', { count: itemCount })
```

### 4. Keep Context

Add descriptive keys:

```json
{
  "nav": {
    "homeLink": "Home",     // Navigation link
    "homeTitle": "Home"     // Page title
  }
}
```

### 5. Preserve Formatting

Keep HTML tags consistent across languages:

```json
// en.json
"rich": "Visit our <strong>daycare</strong> today!"

// fr.json
"rich": "Visitez notre <strong>garderie</strong> aujourd'hui!"
```

## Locale-Specific Content

### Images

```tsx
const { locale } = useLanguage();

const imageSrc = locale === 'zh' 
  ? '/images/chinese-version.jpg'
  : '/images/default.jpg';
```

### Dates/Times

Use Intl APIs:

```tsx
const date = new Date();
const formatted = new Intl.DateTimeFormat(locale).format(date);
```

### Numbers/Currency

```tsx
const formatted = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: 'CAD'
}).format(price);
```

## SEO & Metadata

Use `getLocalizedMetadata` for page metadata:

```tsx
import { getLocalizedMetadata } from '@/lib/use-localized-metadata';

export async function generateMetadata({ params }): Promise<Metadata> {
  return getLocalizedMetadata({
    title: 'Page Title',
    description: 'Page description',
    path: '/page-path',
  });
}
```

This automatically handles:
- Localized titles/descriptions
- Language alternates
- Open Graph tags
- Proper hreflang tags

## Testing

1. **Switch languages** - Use language switcher in UI
2. **Check all text** - Verify every string is translated (no English fallbacks)
3. **Verify layout** - Some languages (like Chinese) may wrap differently
4. **Test buttons** - Ensure CTA text fits in buttons

## Common Issues

**Translation not showing**
- Check the key exists in all 5 language files
- Verify you're using `{t('key')}` not hardcoded text
- Ensure `useLanguage()` is called in a client component

**Fallback to English**
- Key is missing in target language file
- Typo in the key name
- JSON syntax error (check for trailing commas)

**Layout breaks in another language**
- Text is much longer in target language
- Use responsive design (`text-sm md:text-base`)
- Allow text to wrap (`whitespace-normal`)

**Variables not working**
- Check syntax: `t('key', { variable: value })`
- Ensure variable name matches in JSON: `{variable}`
