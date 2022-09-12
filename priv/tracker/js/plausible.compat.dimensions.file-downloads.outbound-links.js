!function(){"use strict";var t,e,i,o=window.location,l=window.document,p=l.getElementById("plausible"),s=p.getAttribute("data-api")||(t=p.src.split("/"),e=t[0],i=t[2],e+"//"+i+"/api/event");function u(t){console.warn("Ignoring Event: "+t)}function n(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname)||"file:"===o.protocol)return u("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return u("localStorage flag")}catch(t){}var i={};i.n=t,i.u=o.href,i.d=p.getAttribute("data-domain"),i.r=l.referrer||null,i.w=window.innerWidth,e&&e.meta&&(i.m=JSON.stringify(e.meta)),e&&e.props&&(i.p=e.props);var n=p.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),a=i.p||{};n.forEach(function(t){var e=t.replace("event-",""),i=p.getAttribute(t);a[e]=a[e]||i}),i.p=a;var r=new XMLHttpRequest;r.open("POST",s,!0),r.setRequestHeader("Content-Type","text/plain"),r.send(JSON.stringify(i)),r.onreadystatechange=function(){4===r.readyState&&e&&e.callback&&e.callback()}}}var a=window.plausible&&window.plausible.q||[];window.plausible=n;for(var r,c=0;c<a.length;c++)n.apply(this,a[c]);function d(){r!==o.pathname&&(r=o.pathname,n("pageview"))}var f,w=window.history;function v(t){var e,i;"auxclick"===t.type&&2!==t.which||(i=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],g(e)?h(t,e,"Outbound Link: Click",{url:e.href}):S(i)&&h(t,e,"File Download",{url:i}))}function h(t,e,i,n){var a=!1;function r(){a||(a=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&n}}(t,e)?plausible(i,{props:n}):(plausible(i,{props:n,callback:r}),setTimeout(r,5e3),t.preventDefault())}function g(t){return t&&t.href&&t.host&&t.host!==o.host}w.pushState&&(f=w.pushState,w.pushState=function(){f.apply(this,arguments),d()},window.addEventListener("popstate",d)),"prerender"===l.visibilityState?l.addEventListener("visibilitychange",function(){r||"visible"!==l.visibilityState||d()}):d(),l.addEventListener("click",v),l.addEventListener("auxclick",v);var m=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],b=p.getAttribute("file-types"),y=p.getAttribute("add-file-types"),k=b&&b.split(",")||y&&y.split(",").concat(m)||m;function S(t){if(!t)return!1;var e=t.split(".").pop();return k.some(function(t){return t===e})}}();