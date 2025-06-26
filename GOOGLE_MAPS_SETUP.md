# Google Maps Setup Instructions

To enable the Google Maps integration on the contact page, you'll need to:

## 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps Embed API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

## 2. Update the GoogleMap Component

Replace the placeholder API key in `/src/components/ui/GoogleMap.tsx`:

```tsx
// Current placeholder
src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgAG3dP4&q=${encodedAddress}&zoom=15`}

// Replace with your actual API key
src={`https://www.google.com/maps/embed/v1/place?key=YOUR_ACTUAL_API_KEY&q=${encodedAddress}&zoom=15`}
```

## 3. Environment Variables (Optional)

For better security, you can use environment variables:

1. Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

2. Update the component:
```tsx
src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}&zoom=15`}
```

## Current Address
The map is configured to show:
- **Friendship Corner Daycare**
- **2950 Dewdney Trunk Road**
- **Coquitlam, BC V3C 2J4, Canada**

## Fallback Behavior
The component includes a fallback link that opens Google Maps in a new tab, so the map will still be functional even without an API key.
