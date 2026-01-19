export interface BusinessAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
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
}

/**
 * Canonical business details used for SEO and contact information.
 */
export const businessProfile: BusinessProfile = {
  name: "Friendship Corner Daycare",
  legalName: "Friendship Corner Daycare (Montessori)",
  url: "https://friendshipdaycare.com",
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
  serviceArea: "Tri-Cities (Coquitlam, Port Coquitlam, Port Moody)"
};
