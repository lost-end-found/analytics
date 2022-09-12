!function(){"use strict";var t,e,r,u=window.location,s=window.document,c=s.getElementById("plausible"),d=c.getAttribute("data-api")||(t=c.src.split("/"),e=t[0],r=t[2],e+"//"+r+"/api/event");function f(t){console.warn("Ignoring Event: "+t)}function a(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(u.hostname)||"file:"===u.protocol)return f("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(t){}var r=c&&c.getAttribute("data-include"),a=c&&c.getAttribute("data-exclude");if("pageview"===t){var i=!r||r&&r.split(",").some(p),n=a&&a.split(",").some(p);if(!i||n)return f("exclusion rule")}var o={};o.n=t,o.u=e&&e.u?e.u:u.href,o.d=c.getAttribute("data-domain"),o.r=s.referrer||null,o.w=window.innerWidth,e&&e.meta&&(o.m=JSON.stringify(e.meta)),e&&e.props&&(o.p=e.props),o.h=1;var l=new XMLHttpRequest;l.open("POST",d,!0),l.setRequestHeader("Content-Type","text/plain"),l.send(JSON.stringify(o)),l.onreadystatechange=function(){4===l.readyState&&e&&e.callback&&e.callback()}}function p(t){var e=u.pathname;return(e+=u.hash).match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var i=window.plausible&&window.plausible.q||[];window.plausible=a;for(var n=0;n<i.length;n++)a.apply(this,i[n]);function o(t){var e,r;"auxclick"===t.type&&2!==t.which||(r=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],p(e)?l(t,e,"Outbound Link: Click",{url:e.href}):m(r)&&l(t,e,"File Download",{url:r}))}function l(t,e,r,a){var i=!1;function n(){i||(i=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var r=!e.target||e.target.match(/^_(self|parent|top)$/i),a=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return r&&a}}(t,e)?plausible(r,{props:a}):(plausible(r,{props:a,callback:n}),setTimeout(n,5e3),t.preventDefault())}function p(t){return t&&t.href&&t.host&&t.host!==u.host}s.addEventListener("click",o),s.addEventListener("auxclick",o);var w=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],g=c.getAttribute("file-types"),h=c.getAttribute("add-file-types"),v=g&&g.split(",")||h&&h.split(",").concat(w)||w;function m(t){if(!t)return!1;var e=t.split(".").pop();return v.some(function(t){return t===e})}}();