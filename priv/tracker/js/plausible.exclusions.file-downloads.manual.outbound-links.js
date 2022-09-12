!function(){"use strict";var u=window.location,c=window.document,s=c.currentScript,d=s.getAttribute("data-api")||new URL(s.src).origin+"/api/event";function f(t){console.warn("Ignoring Event: "+t)}function t(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(u.hostname)||"file:"===u.protocol)return f("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(t){}var r=s&&s.getAttribute("data-include"),i=s&&s.getAttribute("data-exclude");if("pageview"===t){var n=!r||r&&r.split(",").some(p),a=i&&i.split(",").some(p);if(!n||a)return f("exclusion rule")}var o={};o.n=t,o.u=e&&e.u?e.u:u.href,o.d=s.getAttribute("data-domain"),o.r=c.referrer||null,o.w=window.innerWidth,e&&e.meta&&(o.m=JSON.stringify(e.meta)),e&&e.props&&(o.p=e.props);var l=new XMLHttpRequest;l.open("POST",d,!0),l.setRequestHeader("Content-Type","text/plain"),l.send(JSON.stringify(o)),l.onreadystatechange=function(){4===l.readyState&&e&&e.callback&&e.callback()}}function p(t){return u.pathname.match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var r=0;r<e.length;r++)t.apply(this,e[r]);function i(t){var e,r;"auxclick"===t.type&&2!==t.which||(r=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],a(e)?n(t,e,"Outbound Link: Click",{url:e.href}):g(r)&&n(t,e,"File Download",{url:r}))}function n(t,e,r,i){var n=!1;function a(){n||(n=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var r=!e.target||e.target.match(/^_(self|parent|top)$/i),i=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return r&&i}}(t,e)?plausible(r,{props:i}):(plausible(r,{props:i,callback:a}),setTimeout(a,5e3),t.preventDefault())}function a(t){return t&&t.href&&t.host&&t.host!==u.host}c.addEventListener("click",i),c.addEventListener("auxclick",i);var o=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],l=s.getAttribute("file-types"),p=s.getAttribute("add-file-types"),w=l&&l.split(",")||p&&p.split(",").concat(o)||o;function g(t){if(!t)return!1;var e=t.split(".").pop();return w.some(function(t){return t===e})}}();