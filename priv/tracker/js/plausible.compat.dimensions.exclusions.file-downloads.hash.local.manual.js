!function(){"use strict";var t,e,n,s=window.location,f=window.document,d=f.getElementById("plausible"),g=d.getAttribute("data-api")||(t=d.src.split("/"),e=t[0],n=t[2],e+"//"+n+"/api/event");function v(t){console.warn("Ignoring Event: "+t)}function r(t,e){try{if("true"===window.localStorage.plausible_ignore)return v("localStorage flag")}catch(t){}var n=d&&d.getAttribute("data-include"),r=d&&d.getAttribute("data-exclude");if("pageview"===t){var i=!n||n&&n.split(",").some(o),a=r&&r.split(",").some(o);if(!i||a)return v("exclusion rule")}function o(t){var e=s.pathname;return(e+=s.hash).match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var u={};u.n=t,u.u=e&&e.u?e.u:s.href,u.d=d.getAttribute("data-domain"),u.r=f.referrer||null,u.w=window.innerWidth,e&&e.meta&&(u.m=JSON.stringify(e.meta)),e&&e.props&&(u.p=e.props);var l=d.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),p=u.p||{};l.forEach(function(t){var e=t.replace("event-",""),n=d.getAttribute(t);p[e]=p[e]||n}),u.p=p,u.h=1;var c=new XMLHttpRequest;c.open("POST",g,!0),c.setRequestHeader("Content-Type","text/plain"),c.send(JSON.stringify(u)),c.onreadystatechange=function(){4===c.readyState&&e&&e.callback&&e.callback()}}var i=window.plausible&&window.plausible.q||[];window.plausible=r;for(var a=0;a<i.length;a++)r.apply(this,i[a]);function o(t){var e,n;"auxclick"===t.type&&2!==t.which||(n=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],"function"==typeof isOutboundLink&&isOutboundLink(e)?u(t,e,"Outbound Link: Click",{url:e.href}):m(n)&&u(t,e,"File Download",{url:n}))}function u(t,e,n,r){var i=!1;function a(){i||(i=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var n=!e.target||e.target.match(/^_(self|parent|top)$/i),r=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return n&&r}}(t,e)?plausible(n,{props:r}):(plausible(n,{props:r,callback:a}),setTimeout(a,5e3),t.preventDefault())}f.addEventListener("click",o),f.addEventListener("auxclick",o);var l=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],p=d.getAttribute("file-types"),c=d.getAttribute("add-file-types"),w=p&&p.split(",")||c&&c.split(",").concat(l)||l;function m(t){if(!t)return!1;var e=t.split(".").pop();return w.some(function(t){return t===e})}}();