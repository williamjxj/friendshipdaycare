'use client';

import React, { useState, useEffect } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface GoogleMapProps {
  className?: string;
}

interface MapData {
  success: boolean;
  location: {
    lat: number;
    lng: number;
    name: string;
    address: string;
    place_id: string | null;
  };
  mapUrl: string;
  staticMapUrl: string;
  directionsUrl: string;
}

export function GoogleMap({ className = '' }: GoogleMapProps) {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch('/api/maps');
        const data = await response.json();
        
        if (data.success) {
          setMapData(data);
        } else {
          setError(data.error || 'Failed to load map data');
        }
      } catch (err) {
        console.error('Error fetching map data:', err);
        setError('Failed to load map data');
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  const fallbackAddress = "2950 Dewdney Trunk Road, Coquitlam, BC V3C 2J4, Canada";
  const encodedAddress = encodeURIComponent(fallbackAddress);

  // Loading state
  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <MapPinIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Our Location</h3>
            <p className="text-muted-foreground text-sm">
              Loading map data...
            </p>
          </div>
        </div>
        
        <div className="relative rounded-xl overflow-hidden shadow-lg bg-muted/30 h-96 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading map...</div>
        </div>
      </div>
    );
  }

  // Error state or fallback
  if (error || !mapData) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Address Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <MapPinIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Our Location</h3>
            <p className="text-muted-foreground text-sm">
              Near Coquitlam Station for easy drop-off and pick-up
            </p>
          </div>
        </div>

        {/* Fallback Map Placeholder */}
        <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-primary/10 to-secondary/10 h-96 flex items-center justify-center">
          <div className="text-center p-6 bg-white/90 rounded-lg shadow-lg max-w-md">
            <MapPinIcon className="w-16 h-16 text-primary mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-foreground mb-2">Visit Our Location</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Friendship Corner Daycare<br />
              2950 Dewdney Trunk Road<br />
              Coquitlam, BC V3C 2J4<br />
              Canada
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Address</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Friendship Corner Daycare<br />
                2950 Dewdney Trunk Road<br />
                Coquitlam, BC V3C 2J4<br />
                Canada
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Transportation</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                • Near Coquitlam Station<br />
                • Easy access from Lougheed Highway<br />
                • Serving Tri-Cities area<br />
                • Convenient for commuters
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Success state - show map with server-side data
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Address Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
          <MapPinIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Our Location</h3>
          <p className="text-muted-foreground text-sm">
            Near Coquitlam Station for easy drop-off and pick-up
          </p>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={mapData.mapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
          title="Friendship Corner Daycare Location"
        />
      </div>

      {/* Enhanced Contact Information with dynamic data */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Address</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {mapData.location.name}<br />
              {mapData.location.address}
            </p>
            <div className="mt-3 space-y-2">
              <a
                href={mapData.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                <MapPinIcon className="w-4 h-4 mr-1" />
                Get Directions
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Transportation</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              • Near Coquitlam Station<br />
              • Easy access from Lougheed Highway<br />
              • Serving Tri-Cities area<br />
              • Convenient for commuters
            </p>
            <div className="mt-3">
              <p className="text-xs text-muted-foreground">
                Coordinates: {mapData.location.lat.toFixed(4)}, {mapData.location.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
