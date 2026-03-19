export interface BusinessAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

/** Geo coordinates for LocalBusiness schema (Coquitlam, BC) */
export interface BusinessGeo {
  latitude: number;
  longitude: number;
}

export interface BusinessProfile {
  name: string;
  legalName: string;
  url: string;
  telephone: string;
  email: string;
  address: BusinessAddress;
  openingHours: string[];
  serviceArea: string;
  /** Social profile URLs for schema sameAs and Header/Footer links */
  sameAs?: string[];
  /** Google Business Profile URL - add when claimed to enable "View on Google" link in footer */
  googleBusinessProfileUrl?: string;
  /** Geo coordinates for schema.org LocalBusiness (Maps rich results) */
  geo?: BusinessGeo;
  /** Founding year/date for schema (e.g. "2008-01-01") */
  foundingDate?: string;
}

/**
 * Canonical business details used for SEO and contact information.
 */
export const businessProfile: BusinessProfile = {
  name: "Friendship Corner Daycare",
  legalName: "Friendship Corner Daycare (Montessori)",
  url: "https://www.friendshipdaycare.com",
  telephone: "604.945.8504",
  email: "friendship.care@live.ca",
  address: {
    streetAddress: "2950 Dewdney Trunk Road",
    addressLocality: "Coquitlam",
    addressRegion: "BC",
    postalCode: "V3C 2J4",
    addressCountry: "CA"
  },
  openingHours: ["Mo-Fr 07:00-18:00"],
  serviceArea: "Tri-Cities (Coquitlam, Port Coquitlam, Port Moody)",
  /** Verified social media URLs */
  sameAs: [
    "https://www.facebook.com/friendshipcornerdaycare",
    "https://www.instagram.com/friendshipcornerdaycare"
  ],
  /** Add when GBP is claimed, e.g. "https://g.page/friendship-corner-daycare" - enables footer link */
  // googleBusinessProfileUrl: "https://...",
  /** Geo for LocalBusiness schema - 2950 Dewdney Trunk Road, Coquitlam BC */
  geo: { latitude: 49.25, longitude: -122.79 },
  foundingDate: "2008-01-01",
};
