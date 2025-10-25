type AvailabilityStatus = 'available' | 'partially_available' | 'busy';

interface SiteConfig {
    availability: AvailabilityStatus;
}

export const siteConfig: SiteConfig = {
    availability: 'partially_available',
};