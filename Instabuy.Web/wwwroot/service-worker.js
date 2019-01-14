"use strict";var precacheConfig=[["/index.html","795f3a953377a2c7cd8f1aeb68f7f30e"],["/static/css/main.00a67688.css","8b19790f941797596e230dd0d7918f0d"],["/static/js/main.d56ddd9f.js","6b4da0375a1a986243a52a2c3d15d843"],["/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/static/media/ionicons.018a990d.svg","018a990d5e8dac3b4e4476a630f175c0"],["/static/media/ionicons.11edda22.eot","11edda220707231dd7e3019515aae368"],["/static/media/ionicons.3b738585.woff","3b738585d04ae4cb3acb06e839e764ac"],["/static/media/ionicons.ce3e1242.ttf","ce3e12427d7ecc161e30564f1a11964c"],["/static/media/materialdesignicons-webfont.3bd364e5.eot","3bd364e5b4f5c3e57a7376091996d4b4"],["/static/media/materialdesignicons-webfont.3ef6639a.ttf","3ef6639a4cce5b903e4031b1b0102675"],["/static/media/materialdesignicons-webfont.9b9f2c44.woff2","9b9f2c447d27a622fcb78f6b7f38a095"],["/static/media/materialdesignicons-webfont.eec7f0f7.woff","eec7f0f7c8944b878af8fb7fcc091ade"],["/static/media/themify.2c454669.eot","2c454669bdf3aebf32a1bd8ac1e0d2d6"],["/static/media/themify.9c8e96ec.svg","9c8e96ecc7fa01e6ebcd196495ed2db5"],["/static/media/themify.a1ecc3b8.woff","a1ecc3b826d01251edddf29c3e4e1e97"],["/static/media/themify.e23a7dca.ttf","e23a7dcaefbde4e74e263247aa42ecd7"],["/static/media/weathericons-regular-webfont.1cd48d78.woff2","1cd48d78f06d33973d9d761d426e69bf"],["/static/media/weathericons-regular-webfont.4618f0de.ttf","4618f0de2a818e7ad3fe880e0b74d04a"],["/static/media/weathericons-regular-webfont.4b658767.eot","4b658767da6bd92ce2addb3ce512784d"],["/static/media/weathericons-regular-webfont.8cac70eb.woff","8cac70ebda3f23ce472110d9f21e8593"],["/static/media/weathericons-regular-webfont.ecaf8b48.svg","ecaf8b481729b18f6a8494d9f691cdae"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});