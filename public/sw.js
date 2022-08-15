// ServiceWorker

// caches
const staticCacheName = 'site-static-v1'
const dynamicCacheName = 'site-dynamic-v2'

// assets
const assets = [
  './',
  './index.html',
  './about.html',
  './addblog.html',
  './contact.html',
  './fallback.html',
  './login.html',
  './signup.html',
  './css/index.css',
  './css/pages/about.css',
  './css/pages/addblog.css',
  './css/pages/contact.css',
  './css/pages/login.css',
  './css/pages/signup.css',
  './scripts/index.js',
  './scripts/addBlog.js',
  './scripts/blogData.js',
  './scripts/fetchData.js',
]

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) { cache.delete(keys[0]).then(limitCacheSize(name, size)) }
    })
  })
}

// install service worker
self.addEventListener('install', evt => {
  console.log('Serviceworker is installed !')
  evt.waitUntil(caches.open(staticCacheName).then(cache => {
    console.log('caching shell assets...')
    cache.addAll(assets)
  }))
})

// activate service worker
self.addEventListener('activate', evt => {
  console.log('Serviceworker is activated !')
  evt.waitUntil(caches.keys().then(keys => {
    console.log(keys)
    return Promise.all(keys
      .filter(key => key !== staticCacheName && key !== dynamicCacheName)
      .map(key => caches.delete(key))
    )
  }))
})

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone())
          // check cached items size
          limitCacheSize(dynamicCacheName, 100)
          return fetchRes
        })
      })
    }).catch(() => {
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('./fallback.html')
      }
    })
  )
})