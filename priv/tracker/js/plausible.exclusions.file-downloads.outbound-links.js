!function(){"use strict";var s=window.location,u=window.document,c=u.currentScript,d=c.getAttribute("data-api")||new URL(c.src).origin+"/api/event";function f(t){console.warn("Ignoring Event: "+t)}function t(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(s.hostname)||"file:"===s.protocol)return f("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(t){}var i=c&&c.getAttribute("data-include"),n=c&&c.getAttribute("data-exclude");if("pageview"===t){var a=!i||i&&i.split(",").some(l),r=n&&n.split(",").some(l);if(!a||r)return f("exclusion rule")}var o={};o.n=t,o.u=s.href,o.d=c.getAttribute("data-domain"),o.r=u.referrer||null,o.w=window.innerWidth,e&&e.meta&&(o.m=JSON.stringify(e.meta)),e&&e.props&&(o.p=e.props);var p=new XMLHttpRequest;p.open("POST",d,!0),p.setRequestHeader("Content-Type","text/plain"),p.send(JSON.stringify(o)),p.onreadystatechange=function(){4===p.readyState&&e&&e.callback&&e.callback()}}function l(t){return s.pathname.match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var i,n=0;n<e.length;n++)t.apply(this,e[n]);function a(){i!==s.pathname&&(i=s.pathname,t("pageview"))}var r,o=window.history;function p(t){var e,i;"auxclick"===t.type&&2!==t.which||(i=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],w(e)?l(t,e,"Outbound Link: Click",{url:e.href}):b(i)&&l(t,e,"File Download",{url:i}))}function l(t,e,i,n){var a=!1;function r(){a||(a=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&n}}(t,e)?plausible(i,{props:n}):(plausible(i,{props:n,callback:r}),setTimeout(r,5e3),t.preventDefault())}function w(t){return t&&t.href&&t.host&&t.host!==s.host}o.pushState&&(r=o.pushState,o.pushState=function(){r.apply(this,arguments),a()},window.addEventListener("popstate",a)),"prerender"===u.visibilityState?u.addEventListener("visibilitychange",function(){i||"visible"!==u.visibilityState||a()}):a(),u.addEventListener("click",p),u.addEventListener("auxclick",p);var v=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],h=c.getAttribute("file-types"),g=c.getAttribute("add-file-types"),m=h&&h.split(",")||g&&g.split(",").concat(v)||v;function b(t){if(!t)return!1;var e=t.split(".").pop();return m.some(function(t){return t===e})}}();