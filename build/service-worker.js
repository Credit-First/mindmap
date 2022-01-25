/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
<<<<<<< Updated upstream
  "/react-mindmap/precache-manifest.fc1eb76942c452bd98d7e74b6dbb82a9.js"
=======
  "/precache-manifest.ff87fa918be2626d70b4ea4bf32b7d7d.js"
>>>>>>> Stashed changes
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

<<<<<<< Updated upstream
workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/react-mindmap/index.html"), {
=======
workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
>>>>>>> Stashed changes
  
  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
});
