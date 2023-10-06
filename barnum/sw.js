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
    "revision": "dbf6c35716587c06d867ded4236e5c76"
  },
  {
    "url": "css/icon.png",
    "revision": "54515199ae2db047779015ec778c614c"
  },
  {
    "url": "css/logo.png",
    "revision": "0fcd978a9620456fcbf4a9aa7d69d514"
  },
  {
    "url": "css/smiley_0.png",
    "revision": "89a2338d58f4e1dd0f11ae8d0a1b4708"
  },
  {
    "url": "css/smiley_1.png",
    "revision": "1948353b0423f9d79f286e322a9fa62f"
  },
  {
    "url": "css/smiley_2.png",
    "revision": "ca6f3f9554c360cc58dfdd246e03e00c"
  },
  {
    "url": "css/smiley_3.png",
    "revision": "e6987d387bb46eae50b2a9d6a700403a"
  },
  {
    "url": "css/smiley_4.png",
    "revision": "b217716fcc62fd02a9738d71984ff729"
  },
  {
    "url": "css/style.css",
    "revision": "798ac0ce8e2a5935e71e9766246618f7"
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
    "revision": "99364062150660b13bba3cc8046bf6b2"
  },
  {
    "url": "js/bootstrap-datepicker.fr.min.js",
    "revision": "d69412ba9c9add964acbd11f0c7ab3d4"
  },
  {
    "url": "manifest.json",
    "revision": "8072625cb1f50c9c1868a2d32442f343"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^http:\/\/mmi-lyon.fr\/apps-hasard\/barnum\//, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute("/", workbox.strategies.cacheFirst(), 'GET');
