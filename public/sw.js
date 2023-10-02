/* No-op service worker for PWA
 * from https://developer.chrome.com/docs/workbox/remove-buggy-service-workers/#deploy-a-no-op-service-worker
 */
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

if (!isFirefox) {
  self.addEventListener('install', () => {
    // Skip over the "waiting" lifecycle state, to ensure that our
    // new service worker is activated immediately, even if there's
    // another tab open controlled by our older service worker code.
    self.skipWaiting();
  });

  // To be an installable PWA, we have to register a fetch event
  // handler here. It is just a pass-through handler though.
  self.addEventListener('fetch', (event) => {
    const { headers } = event.request;
    const isSSERequest = headers.get('Accept') === 'text/event-stream';
    if (isSSERequest) {
      event.respondWith(
        (async () => {
          try {
            return await fetch(event.request);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('error cought on SSE connection in service worker', error);
            throw error;
          }
        })()
      );
    } else {
      // don't treat regular request in a special way
      event.respondWith(fetch(event.request));
    }
  });
} else {
  // Do not install service worker on Firefox
}
