!function(){"use strict";var o=window.location,l=window.document,c=l.currentScript,u=c.getAttribute("data-api")||new URL(c.src).origin+"/api/event";function t(t,e){try{if("true"===window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(t){}var n={};n.n=t,n.u=e&&e.u?e.u:o.href,n.d=c.getAttribute("data-domain"),n.r=l.referrer||null,n.w=window.innerWidth,e&&e.meta&&(n.m=JSON.stringify(e.meta)),e&&e.props&&(n.p=e.props);var r=c.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),a=n.p||{};r.forEach(function(t){var e=t.replace("event-",""),n=c.getAttribute(t);a[e]=a[e]||n}),n.p=a;var i=new XMLHttpRequest;i.open("POST",u,!0),i.setRequestHeader("Content-Type","text/plain"),i.send(JSON.stringify(n)),i.onreadystatechange=function(){4===i.readyState&&e&&e.callback&&e.callback()}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var n=0;n<e.length;n++)t.apply(this,e[n]);function r(t){var e,n;"auxclick"===t.type&&2!==t.which||(n=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],i(e)?a(t,e,"Outbound Link: Click",{url:e.href}):"function"==typeof isDownloadToTrack&&isDownloadToTrack(n)&&a(t,e,"File Download",{url:n}))}function a(t,e,n,r){var a=!1;function i(){a||(a=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var n=!e.target||e.target.match(/^_(self|parent|top)$/i),r=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return n&&r}}(t,e)?plausible(n,{props:r}):(plausible(n,{props:r,callback:i}),setTimeout(i,5e3),t.preventDefault())}function i(t){return t&&t.href&&t.host&&t.host!==o.host}l.addEventListener("click",r),l.addEventListener("auxclick",r)}();