!function(){"use strict";var t,e,i,c=window.location,u=window.document,p=u.getElementById("plausible"),d=p.getAttribute("data-api")||(t=p.src.split("/"),e=t[0],i=t[2],e+"//"+i+"/api/event");function f(t){console.warn("Ignoring Event: "+t)}function n(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(c.hostname)||"file:"===c.protocol)return f("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(t){}var i=p&&p.getAttribute("data-include"),n=p&&p.getAttribute("data-exclude");if("pageview"===t){var a=!i||i&&i.split(",").some(s),r=n&&n.split(",").some(s);if(!a||r)return f("exclusion rule")}var o={};o.n=t,o.u=c.href,o.d=p.getAttribute("data-domain"),o.r=u.referrer||null,o.w=window.innerWidth,e&&e.meta&&(o.m=JSON.stringify(e.meta)),e&&e.props&&(o.p=e.props);var l=new XMLHttpRequest;l.open("POST",d,!0),l.setRequestHeader("Content-Type","text/plain"),l.send(JSON.stringify(o)),l.onreadystatechange=function(){4===l.readyState&&e&&e.callback&&e.callback()}}function s(t){return c.pathname.match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var a=window.plausible&&window.plausible.q||[];window.plausible=n;for(var r,o=0;o<a.length;o++)n.apply(this,a[o]);function l(){r!==c.pathname&&(r=c.pathname,n("pageview"))}var s,w=window.history;function h(t){var e,i;"auxclick"===t.type&&2!==t.which||(i=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],v(e)?g(t,e,"Outbound Link: Click",{url:e.href}):"function"==typeof isDownloadToTrack&&isDownloadToTrack(i)&&g(t,e,"File Download",{url:i}))}function g(t,e,i,n){var a=!1;function r(){a||(a=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&n}}(t,e)?plausible(i,{props:n}):(plausible(i,{props:n,callback:r}),setTimeout(r,5e3),t.preventDefault())}function v(t){return t&&t.href&&t.host&&t.host!==c.host}w.pushState&&(s=w.pushState,w.pushState=function(){s.apply(this,arguments),l()},window.addEventListener("popstate",l)),"prerender"===u.visibilityState?u.addEventListener("visibilitychange",function(){r||"visible"!==u.visibilityState||l()}):l(),u.addEventListener("click",h),u.addEventListener("auxclick",h)}();