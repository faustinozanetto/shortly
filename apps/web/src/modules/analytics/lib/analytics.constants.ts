export const TINYBIRD_BASE_URL = 'https://api.us-east.aws.tinybird.co/v0/';
export const URL_CLICK_EVENT = 'click_events';
export const DISABLE_LINK_TRACKING = process.env.NODE_ENV === 'development';
export const ANALYTICS_CATEGORIES = ['country', 'browser', 'os', 'device'] as const;
