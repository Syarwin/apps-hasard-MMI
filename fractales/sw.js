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
    "url": "css/bootstrap.css",
    "revision": "5875a8967f631dc1b7fab46d80c88138"
  },
  {
    "url": "css/font-awesome.css",
    "revision": "b652e3b759188ceaf79182f2fe72ea64"
  },
  {
    "url": "css/fougere.png",
    "revision": "42658259c69737a4690362027ceeed8d"
  },
  {
    "url": "css/hint.min.css",
    "revision": "3c02a09482b70f114fbd1c9e19578d33"
  },
  {
    "url": "css/icon-192.png",
    "revision": "0662397c1c93c65397afa5ac7ef530e1"
  },
  {
    "url": "css/icon.png",
    "revision": "d60401ce6fcd5c92d97193bad228e62d"
  },
  {
    "url": "css/logo.png",
    "revision": "06a96e26e95334c74c8903d4ee1fd639"
  },
  {
    "url": "css/style.css",
    "revision": "2a2727c6cf1712d428110c1fbf882ddb"
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
    "revision": "cf9489cff1032fa7d0e74c43027204a6"
  },
  {
    "url": "js/d3-quadtree.min.js",
    "revision": "47157599c29194d6c6755a73b831f13b"
  },
  {
    "url": "js/lettres.json",
    "revision": "47832d123142eccfe5c365c7ae72b4e5"
  },
  {
    "url": "manifest.json",
    "revision": "244a4af4b3b497827adc6308e53a16fb"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^http:\/\/mmi-lyon.fr\/apps-hasard\/fractales\//, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute("/", workbox.strategies.cacheFirst(), 'GET');
