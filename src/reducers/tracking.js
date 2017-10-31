
export function createTracking ({ IS_EVENT_TRACKING,
  IS_EXCEPTION_TRACKING,
  IS_PAGE_TRACKING,
  IS_PRODUCTION
}) {
  function trackEvent (category, action, label, value) {
    if (!IS_PRODUCTION) {
      console.info('DEV::trackEvent', category, action, label, value)
      return
    }
    if (window.navigator.doNotTrack) {
      return
    }
    if (IS_EVENT_TRACKING && window.ga) {
      window.ga('send', 'event', category, action, label, value)
    }
  }

  function trackPageView (config) {
    const pathname = window.location.pathname
    if (!IS_PRODUCTION) {
      console.info('DEV::trackPageView', pathname)
      return
    }
    if (window.navigator.doNotTrack) {
      return
    }
    // not available  on staging
    if (IS_PAGE_TRACKING && window.ga) {
      window.ga('set', 'page', pathname)
      window.ga('send', 'pageview')
    }
  }

  function trackException (e) {
    if (!IS_EXCEPTION_TRACKING || window.navigator.doNotTrack || !window.ga || !e) {
      return
    }
    window.ga('send', 'exception', {
      exDescription: 'JavaScript Error ' + e.message + ' ' + e.filename + ': ' + e.lineno
    })
  }

  const initialState = { trackEvent,
    trackException,
    trackPageView
  }

  return (state = initialState, action) => state
}
