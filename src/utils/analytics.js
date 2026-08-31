export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined') {
    const payload = {
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
    };

    window.dispatchEvent(
      new CustomEvent('novastack_analytics_event', { detail: payload })
    );
  }
};
