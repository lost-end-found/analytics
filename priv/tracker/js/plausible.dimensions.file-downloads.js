!function(){"use strict";var o=window.location,p=window.document,l=p.currentScript,u=l.getAttribute("data-api")||new URL(l.src).origin+"/api/event";function s(t){console.warn("Ignoring Event: "+t)}function t(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname)||"file:"===o.protocol)return s("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return s("localStorage flag")}catch(t){}var i={};i.n=t,i.u=o.href,i.d=l.getAttribute("data-domain"),i.r=p.referrer||null,i.w=window.innerWidth,e&&e.meta&&(i.m=JSON.stringify(e.meta)),e&&e.props&&(i.p=e.props);var n=l.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),r=i.p||{};n.forEach(function(t){var e=t.replace("event-",""),i=l.getAttribute(t);r[e]=r[e]||i}),i.p=r;var a=new XMLHttpRequest;a.open("POST",u,!0),a.setRequestHeader("Content-Type","text/plain"),a.send(JSON.stringify(i)),a.onreadystatechange=function(){4===a.readyState&&e&&e.callback&&e.callback()}}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var i,n=0;n<e.length;n++)t.apply(this,e[n]);function r(){i!==o.pathname&&(i=o.pathname,t("pageview"))}var a,c=window.history;function d(t){var e,i;"auxclick"===t.type&&2!==t.which||(i=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],"function"==typeof isOutboundLink&&isOutboundLink(e)?f(t,e,"Outbound Link: Click",{url:e.href}):b(i)&&f(t,e,"File Download",{url:i}))}function f(t,e,i,n){var r=!1;function a(){r||(r=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&n}}(t,e)?plausible(i,{props:n}):(plausible(i,{props:n,callback:a}),setTimeout(a,5e3),t.preventDefault())}c.pushState&&(a=c.pushState,c.pushState=function(){a.apply(this,arguments),r()},window.addEventListener("popstate",r)),"prerender"===p.visibilityState?p.addEventListener("visibilitychange",function(){i||"visible"!==p.visibilityState||r()}):r(),p.addEventListener("click",d),p.addEventListener("auxclick",d);var w=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],v=l.getAttribute("file-types"),g=l.getAttribute("add-file-types"),h=v&&v.split(",")||g&&g.split(",").concat(w)||w;function b(t){if(!t)return!1;var e=t.split(".").pop();return h.some(function(t){return t===e})}}();