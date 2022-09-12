!function(){"use strict";var t,e,i,s=window.location,f=window.document,d=f.getElementById("plausible"),w=d.getAttribute("data-api")||(t=d.src.split("/"),e=t[0],i=t[2],e+"//"+i+"/api/event");function g(t){console.warn("Ignoring Event: "+t)}function n(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(s.hostname)||"file:"===s.protocol)return g("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return g("localStorage flag")}catch(t){}var i=d&&d.getAttribute("data-include"),n=d&&d.getAttribute("data-exclude");if("pageview"===t){var r=!i||i&&i.split(",").some(c),a=n&&n.split(",").some(c);if(!r||a)return g("exclusion rule")}var o={};o.n=t,o.u=e&&e.u?e.u:s.href,o.d=d.getAttribute("data-domain"),o.r=f.referrer||null,o.w=window.innerWidth,e&&e.meta&&(o.m=JSON.stringify(e.meta)),e&&e.props&&(o.p=e.props);var l=d.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),u=o.p||{};l.forEach(function(t){var e=t.replace("event-",""),i=d.getAttribute(t);u[e]=u[e]||i}),o.p=u,o.h=1;var p=new XMLHttpRequest;p.open("POST",w,!0),p.setRequestHeader("Content-Type","text/plain"),p.send(JSON.stringify(o)),p.onreadystatechange=function(){4===p.readyState&&e&&e.callback&&e.callback()}}function c(t){var e=s.pathname;return(e+=s.hash).match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var r=window.plausible&&window.plausible.q||[];window.plausible=n;for(var a=0;a<r.length;a++)n.apply(this,r[a]);function o(t){var e,i;"auxclick"===t.type&&2!==t.which||(i=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],"function"==typeof isOutboundLink&&isOutboundLink(e)?l(t,e,"Outbound Link: Click",{url:e.href}):m(i)&&l(t,e,"File Download",{url:i}))}function l(t,e,i,n){var r=!1;function a(){r||(r=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&n}}(t,e)?plausible(i,{props:n}):(plausible(i,{props:n,callback:a}),setTimeout(a,5e3),t.preventDefault())}f.addEventListener("click",o),f.addEventListener("auxclick",o);var u=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],p=d.getAttribute("file-types"),c=d.getAttribute("add-file-types"),v=p&&p.split(",")||c&&c.split(",").concat(u)||u;function m(t){if(!t)return!1;var e=t.split(".").pop();return v.some(function(t){return t===e})}}();