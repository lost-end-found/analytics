!function(){"use strict";var s=window.location,f=window.document,d=f.currentScript,g=d.getAttribute("data-api")||new URL(d.src).origin+"/api/event";function v(t){console.warn("Ignoring Event: "+t)}function t(t,e){try{if("true"===window.localStorage.plausible_ignore)return v("localStorage flag")}catch(t){}var r=d&&d.getAttribute("data-include"),n=d&&d.getAttribute("data-exclude");if("pageview"===t){var i=!r||r&&r.split(",").some(o),a=n&&n.split(",").some(o);if(!i||a)return v("exclusion rule")}function o(t){var e=s.pathname;return(e+=s.hash).match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var u={};u.n=t,u.u=e&&e.u?e.u:s.href,u.d=d.getAttribute("data-domain"),u.r=f.referrer||null,u.w=window.innerWidth,e&&e.meta&&(u.m=JSON.stringify(e.meta)),e&&e.props&&(u.p=e.props);var l=d.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),p=u.p||{};l.forEach(function(t){var e=t.replace("event-",""),r=d.getAttribute(t);p[e]=p[e]||r}),u.p=p,u.h=1;var c=new XMLHttpRequest;c.open("POST",g,!0),c.setRequestHeader("Content-Type","text/plain"),c.send(JSON.stringify(u)),c.onreadystatechange=function(){4===c.readyState&&e&&e.callback&&e.callback()}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var r=0;r<e.length;r++)t.apply(this,e[r]);function n(t){var e,r;"auxclick"===t.type&&2!==t.which||(r=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],"function"==typeof isOutboundLink&&isOutboundLink(e)?i(t,e,"Outbound Link: Click",{url:e.href}):p(r)&&i(t,e,"File Download",{url:r}))}function i(t,e,r,n){var i=!1;function a(){i||(i=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var r=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return r&&n}}(t,e)?plausible(r,{props:n}):(plausible(r,{props:n,callback:a}),setTimeout(a,5e3),t.preventDefault())}f.addEventListener("click",n),f.addEventListener("auxclick",n);var a=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],o=d.getAttribute("file-types"),u=d.getAttribute("add-file-types"),l=o&&o.split(",")||u&&u.split(",").concat(a)||a;function p(t){if(!t)return!1;var e=t.split(".").pop();return l.some(function(t){return t===e})}}();