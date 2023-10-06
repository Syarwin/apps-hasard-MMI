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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "css/bootstrap-datepicker3.css",
    "revision": "be8fd7a445f9fbbf62f47f2c6e7d257a"
  },
  {
    "url": "css/bootstrap.css",
    "revision": "5875a8967f631dc1b7fab46d80c88138"
  },
  {
    "url": "css/font-awesome.css",
    "revision": "b652e3b759188ceaf79182f2fe72ea64"
  },
  {
    "url": "css/icon-192.png",
    "revision": "e25a705fbfe14b2d63992397a91a8e5f"
  },
  {
    "url": "css/icon.png",
    "revision": "c5e73f1056682f7e62b08b79b6af7f6c"
  },
  {
    "url": "css/logo.png",
    "revision": "7fb1d22f67d16ef587051f16ec9a6ecd"
  },
  {
    "url": "css/style.css",
    "revision": "b63ae5f62d484cf956b2f834326655bc"
  },
  {
    "url": "fonts/fontawesome-webfont.svg",
    "revision": "d7c639084f684d66a1bc66855d193ed8"
  },
  {
    "url": "fonts/glyphicons-halflings-regular.svg",
    "revision": "89889688147bd7575d6327160d64e760"
  },
  {
    "url": "index.html",
    "revision": "df530ecb82435010c2ed82557d81ea51"
  },
  {
    "url": "js/bootstrap-datepicker.fr.min.js",
    "revision": "d69412ba9c9add964acbd11f0c7ab3d4"
  },
  {
    "url": "js/moment-with-locales.min.js",
    "revision": "ecfccffc84ee088b10bf0e88768e70c9"
  },
  {
    "url": "js/moment.min.js",
    "revision": "de82f2f2bd52ead2e0dbe58983236395"
  },
  {
    "url": "manifest.json",
    "revision": "5827406a004dd9a93f768a7a933dd76e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^http:\/\/mmi-lyon.fr\/apps-hasard\/coincidences\//, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute("/", workbox.strategies.cacheFirst(), 'GET');
