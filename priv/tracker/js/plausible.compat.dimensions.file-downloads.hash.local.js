!function(){"use strict";var t,e,i,o=window.location,l=window.document,p=l.getElementById("plausible"),u=p.getAttribute("data-api")||(t=p.src.split("/"),e=t[0],i=t[2],e+"//"+i+"/api/event");function n(t,e){try{if("true"===window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(t){}var i={};i.n=t,i.u=o.href,i.d=p.getAttribute("data-domain"),i.r=l.referrer||null,i.w=window.innerWidth,e&&e.meta&&(i.m=JSON.stringify(e.meta)),e&&e.props&&(i.p=e.props);var n=p.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),a=i.p||{};n.forEach(function(t){var e=t.replace("event-",""),i=p.getAttribute(t);a[e]=a[e]||i}),i.p=a,i.h=1;var r=new XMLHttpRequest;r.open("POST",u,!0),r.setRequestHeader("Content-Type","text/plain"),r.send(JSON.stringify(i)),r.onreadystatechange=function(){4===r.readyState&&e&&e.callback&&e.callback()}}var a=window.plausible&&window.plausible.q||[];window.plausible=n;for(var r,c=0;c<a.length;c++)n.apply(this,a[c]);function s(){r=o.pathname,n("pageview")}function d(t){var e,i;"auxclick"===t.type&&2!==t.which||(i=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],"function"==typeof isOutboundLink&&isOutboundLink(e)?f(t,e,"Outbound Link: Click",{url:e.href}):h(i)&&f(t,e,"File Download",{url:i}))}function f(t,e,i,n){var a=!1;function r(){a||(a=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&n}}(t,e)?plausible(i,{props:n}):(plausible(i,{props:n,callback:r}),setTimeout(r,5e3),t.preventDefault())}window.addEventListener("hashchange",s),"prerender"===l.visibilityState?l.addEventListener("visibilitychange",function(){r||"visible"!==l.visibilityState||s()}):s(),l.addEventListener("click",d),l.addEventListener("auxclick",d);var v=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],g=p.getAttribute("file-types"),w=p.getAttribute("add-file-types"),b=g&&g.split(",")||w&&w.split(",").concat(v)||v;function h(t){if(!t)return!1;var e=t.split(".").pop();return b.some(function(t){return t===e})}}();