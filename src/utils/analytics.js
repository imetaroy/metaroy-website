/**
 * Safely push custom event to Google Tag Manager dataLayer
 * @param {string} eventName Name of GTM Custom Event Trigger
 * @param {Object} [params] Supporting event metadata parameters
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
      timestamp: new Date().toISOString()
    });
  }
};
