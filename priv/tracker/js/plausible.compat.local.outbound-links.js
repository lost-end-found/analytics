!function(){"use strict";var t,e,i,a=window.location,r=window.document,o=r.getElementById("plausible"),l=o.getAttribute("data-api")||(t=o.src.split("/"),e=t[0],i=t[2],e+"//"+i+"/api/event");function n(t,e){try{if("true"===window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(t){}var i={};i.n=t,i.u=a.href,i.d=o.getAttribute("data-domain"),i.r=r.referrer||null,i.w=window.innerWidth,e&&e.meta&&(i.m=JSON.stringify(e.meta)),e&&e.props&&(i.p=e.props);var n=new XMLHttpRequest;n.open("POST",l,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(i)),n.onreadystatechange=function(){4===n.readyState&&e&&e.callback&&e.callback()}}var s=window.plausible&&window.plausible.q||[];window.plausible=n;for(var c,u=0;u<s.length;u++)n.apply(this,s[u]);function p(){c!==a.pathname&&(c=a.pathname,n("pageview"))}var d,f=window.history;function w(t){var e,i;"auxclick"===t.type&&2!==t.which||(i=(e=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target))&&e.href&&e.href.split("?")[0],v(e)?h(t,e,"Outbound Link: Click",{url:e.href}):"function"==typeof isDownloadToTrack&&isDownloadToTrack(i)&&h(t,e,"File Download",{url:i}))}function h(t,e,i,n){var a=!1;function r(){a||(a=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&n}}(t,e)?plausible(i,{props:n}):(plausible(i,{props:n,callback:r}),setTimeout(r,5e3),t.preventDefault())}function v(t){return t&&t.href&&t.host&&t.host!==a.host}f.pushState&&(d=f.pushState,f.pushState=function(){d.apply(this,arguments),p()},window.addEventListener("popstate",p)),"prerender"===r.visibilityState?r.addEventListener("visibilitychange",function(){c||"visible"!==r.visibilityState||p()}):p(),r.addEventListener("click",w),r.addEventListener("auxclick",w)}();