'use client';

import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface GoogleMapProps {
  className?: string;
}

export function GoogleMap({ className = '' }: GoogleMapProps) {
  const address = "Friendship Corner Daycare, 2950 Dewdney Trunk Road, Coquitlam, BC V3C 2J4, Canada";
  const encodedAddress = encodeURIComponent(address);
  
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
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgAG3dP4&q=${encodedAddress}&zoom=15`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
          title="Friendship Corner Daycare Location"
        />
        
        {/* Fallback for when Google Maps API key is not available */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center opacity-0 hover:opacity-0 transition-opacity duration-300">
          <div className="text-center p-6 bg-white/90 rounded-lg shadow-lg max-w-xs">
            <MapPinIcon className="w-12 h-12 text-primary mx-auto mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Visit Us</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Friendship Corner Daycare<br />
              2950 Dewdney Trunk Road<br />
              Coquitlam, BC V3C 2J4<br />
              Canada
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
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
