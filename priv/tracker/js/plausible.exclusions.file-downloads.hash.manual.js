!function(){"use strict";var u=window.location,c=window.document,s=c.currentScript,d=s.getAttribute("data-api")||new URL(s.src).origin+"/api/event";function f(t){console.warn("Ignoring Event: "+t)}function t(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(u.hostname)||"file:"===u.protocol)return f("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(t){}var i=s&&s.getAttribute("data-include"),n=s&&s.getAttribute("data-exclude");if("pageview"===t){var r=!i||i&&i.split(",").some(p),a=n&&n.split(",").some(p);if(!r||a)return f("exclusion rule")}var o={};o.n=t,o.u=e&&e.u?e.u:u.href,o.d=s.getAttribute("data-domain"),o.r=c.referrer||null,o.w=window.innerWidth,e&&e.meta&&(o.m=JSON.stringify(e.meta)),e&&e.props&&(o.p=e.props),o.h=1;var l=new XMLHttpRequest;l.open("POST",d,!0),l.setRequestHeader("Content-Type","text/plain"),l.send(JSON.stringify(o)),l.onreadystatechange=function(){4===l.readyState&&e&&e.callback&&e.callback()}}function p(t){var e=u.pathname;return(e+=u.hash).match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var i=0;i<e.length;i++)t.apply(this,e[i]);function n(t){var e,i;"auxclick"===t.type&&2!==t.which||(i=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],"function"==typeof isOutboundLink&&isOutboundLink(e)?r(t,e,"Outbound Link: Click",{url:e.href}):w(i)&&r(t,e,"File Download",{url:i}))}function r(t,e,i,n){var r=!1;function a(){r||(r=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&n}}(t,e)?plausible(i,{props:n}):(plausible(i,{props:n,callback:a}),setTimeout(a,5e3),t.preventDefault())}c.addEventListener("click",n),c.addEventListener("auxclick",n);var a=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],o=s.getAttribute("file-types"),l=s.getAttribute("add-file-types"),p=o&&o.split(",")||l&&l.split(",").concat(a)||a;function w(t){if(!t)return!1;var e=t.split(".").pop();return p.some(function(t){return t===e})}}();