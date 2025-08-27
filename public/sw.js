// Service Worker for caching static assets
const CACHE_NAME = 'petential-cache-v1'
const STATIC_CACHE = 'petential-static-v1'

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/blog',
  '/breeds',
  '/quiz'
]

// Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS)
    })
  )
  self.skipWaiting()
})

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Cache strategy: Cache first for static assets, Network first for dynamic content
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle images with cache-first strategy
  if (request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|webp|svg)$/)) {
    event.respondWith(cacheFirst(request))
  }
  // Handle API calls with network-first strategy
  else if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request))
  }
  // Handle static assets with cache-first strategy
  else if (request.destination === 'script' || request.destination === 'style' ||
           url.pathname.match(/\.(js|css)$/)) {
    event.respondWith(cacheFirst(request))
  }
  // Default network-first for everything else
  else {
    event.respondWith(networkFirst(request))
  }
})

async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // Fallback to network if cache fails
    return fetch(request)
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // Fallback to cache if network fails
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}
