!function(){"use strict";var o=window.location,l=window.document,c=l.currentScript,s=c.getAttribute("data-api")||new URL(c.src).origin+"/api/event";function u(t){console.warn("Ignoring Event: "+t)}function t(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname)||"file:"===o.protocol)return u("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return u("localStorage flag")}catch(t){}var n={};n.n=t,n.u=o.href,n.d=c.getAttribute("data-domain"),n.r=l.referrer||null,n.w=window.innerWidth,e&&e.meta&&(n.m=JSON.stringify(e.meta)),e&&e.props&&(n.p=e.props);var i=c.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),r=n.p||{};i.forEach(function(t){var e=t.replace("event-",""),n=c.getAttribute(t);r[e]=r[e]||n}),n.p=r,n.h=1;var a=new XMLHttpRequest;a.open("POST",s,!0),a.setRequestHeader("Content-Type","text/plain"),a.send(JSON.stringify(n)),a.onreadystatechange=function(){4===a.readyState&&e&&e.callback&&e.callback()}}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var n,i=0;i<e.length;i++)t.apply(this,e[i]);function r(){n=o.pathname,t("pageview")}function a(t){var e,n;"auxclick"===t.type&&2!==t.which||(n=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],p(e)?d(t,e,"Outbound Link: Click",{url:e.href}):"function"==typeof isDownloadToTrack&&isDownloadToTrack(n)&&d(t,e,"File Download",{url:n}))}function d(t,e,n,i){var r=!1;function a(){r||(r=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var n=!e.target||e.target.match(/^_(self|parent|top)$/i),i=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return n&&i}}(t,e)?plausible(n,{props:i}):(plausible(n,{props:i,callback:a}),setTimeout(a,5e3),t.preventDefault())}function p(t){return t&&t.href&&t.host&&t.host!==o.host}window.addEventListener("hashchange",r),"prerender"===l.visibilityState?l.addEventListener("visibilitychange",function(){n||"visible"!==l.visibilityState||r()}):r(),l.addEventListener("click",a),l.addEventListener("auxclick",a)}();