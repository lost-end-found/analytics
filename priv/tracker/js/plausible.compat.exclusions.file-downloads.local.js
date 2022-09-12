!function(){"use strict";var t,e,i,u=window.location,s=window.document,c=s.getElementById("plausible"),d=c.getAttribute("data-api")||(t=c.src.split("/"),e=t[0],i=t[2],e+"//"+i+"/api/event");function f(t){console.warn("Ignoring Event: "+t)}function n(t,e){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(t){}var i=c&&c.getAttribute("data-include"),n=c&&c.getAttribute("data-exclude");if("pageview"===t){var a=!i||i&&i.split(",").some(o),r=n&&n.split(",").some(o);if(!a||r)return f("exclusion rule")}function o(t){return u.pathname.match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var p={};p.n=t,p.u=u.href,p.d=c.getAttribute("data-domain"),p.r=s.referrer||null,p.w=window.innerWidth,e&&e.meta&&(p.m=JSON.stringify(e.meta)),e&&e.props&&(p.p=e.props);var l=new XMLHttpRequest;l.open("POST",d,!0),l.setRequestHeader("Content-Type","text/plain"),l.send(JSON.stringify(p)),l.onreadystatechange=function(){4===l.readyState&&e&&e.callback&&e.callback()}}var a=window.plausible&&window.plausible.q||[];window.plausible=n;for(var r,o=0;o<a.length;o++)n.apply(this,a[o]);function p(){r!==u.pathname&&(r=u.pathname,n("pageview"))}var l,v=window.history;function w(t){var e,i;"auxclick"===t.type&&2!==t.which||(i=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],"function"==typeof isOutboundLink&&isOutboundLink(e)?g(t,e,"Outbound Link: Click",{url:e.href}):k(i)&&g(t,e,"File Download",{url:i}))}function g(t,e,i,n){var a=!1;function r(){a||(a=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&n}}(t,e)?plausible(i,{props:n}):(plausible(i,{props:n,callback:r}),setTimeout(r,5e3),t.preventDefault())}v.pushState&&(l=v.pushState,v.pushState=function(){l.apply(this,arguments),p()},window.addEventListener("popstate",p)),"prerender"===s.visibilityState?s.addEventListener("visibilitychange",function(){r||"visible"!==s.visibilityState||p()}):p(),s.addEventListener("click",w),s.addEventListener("auxclick",w);var m=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],h=c.getAttribute("file-types"),b=c.getAttribute("add-file-types"),y=h&&h.split(",")||b&&b.split(",").concat(m)||m;function k(t){if(!t)return!1;var e=t.split(".").pop();return y.some(function(t){return t===e})}}();