!function(){"use strict";var o=window.location,l=window.document,c=l.currentScript,u=c.getAttribute("data-api")||new URL(c.src).origin+"/api/event";function t(t,e){try{if("true"===window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(t){}var n={};n.n=t,n.u=o.href,n.d=c.getAttribute("data-domain"),n.r=l.referrer||null,n.w=window.innerWidth,e&&e.meta&&(n.m=JSON.stringify(e.meta)),e&&e.props&&(n.p=e.props);var i=c.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),a=n.p||{};i.forEach(function(t){var e=t.replace("event-",""),n=c.getAttribute(t);a[e]=a[e]||n}),n.p=a;var r=new XMLHttpRequest;r.open("POST",u,!0),r.setRequestHeader("Content-Type","text/plain"),r.send(JSON.stringify(n)),r.onreadystatechange=function(){4===r.readyState&&e&&e.callback&&e.callback()}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var n,i=0;i<e.length;i++)t.apply(this,e[i]);function a(){n!==o.pathname&&(n=o.pathname,t("pageview"))}var r,s=window.history;function p(t){var e,n;"auxclick"===t.type&&2!==t.which||(n=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],f(e)?d(t,e,"Outbound Link: Click",{url:e.href}):"function"==typeof isDownloadToTrack&&isDownloadToTrack(n)&&d(t,e,"File Download",{url:n}))}function d(t,e,n,i){var a=!1;function r(){a||(a=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var n=!e.target||e.target.match(/^_(self|parent|top)$/i),i=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return n&&i}}(t,e)?plausible(n,{props:i}):(plausible(n,{props:i,callback:r}),setTimeout(r,5e3),t.preventDefault())}function f(t){return t&&t.href&&t.host&&t.host!==o.host}s.pushState&&(r=s.pushState,s.pushState=function(){r.apply(this,arguments),a()},window.addEventListener("popstate",a)),"prerender"===l.visibilityState?l.addEventListener("visibilitychange",function(){n||"visible"!==l.visibilityState||a()}):a(),l.addEventListener("click",p),l.addEventListener("auxclick",p)}();