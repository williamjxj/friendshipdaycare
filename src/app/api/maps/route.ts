import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      );
    }

    // Friendship Corner Daycare location
    const address = "2950 Dewdney Trunk Road, Coquitlam, BC V3C 2J4, Canada";
    const lat = 49.2827; // Approximate coordinates for the address
    const lng = -122.7947;

    // Fetch place details using Google Places API
    const placesUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(address)}&inputtype=textquery&fields=place_id,name,formatted_address,geometry&key=${apiKey}`;
    
    const placesResponse = await fetch(placesUrl);
    const placesData = await placesResponse.json();

    if (placesData.status !== 'OK' || !placesData.candidates.length) {
      // Fallback with manual coordinates
      return NextResponse.json({
        success: true,
        location: {
          lat,
          lng,
          name: "Friendship Corner Daycare",
          address: "2950 Dewdney Trunk Road, Coquitlam, BC V3C 2J4, Canada",
          place_id: null
        },
        mapUrl: `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}&zoom=15`,
        staticMapUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x400&markers=color:red%7C${lat},${lng}&key=${apiKey}`
      });
    }

    const place = placesData.candidates[0];
    const location = {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      name: place.name || "Friendship Corner Daycare",
      address: place.formatted_address || address,
      place_id: place.place_id
    };

    // Generate different map URLs
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${place.place_id}&zoom=15`;
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=15&size=600x400&markers=color:red%7C${location.lat},${location.lng}&key=${apiKey}`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`;

    return NextResponse.json({
      success: true,
      location,
      mapUrl,
      staticMapUrl,
      directionsUrl
    });

  } catch (error) {
    console.error('Google Maps API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch map data' },
      { status: 500 }
    );
  }
}
