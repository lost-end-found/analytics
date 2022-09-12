!function(){"use strict";var e,t,n,o=window.location,l=window.document,c=l.getElementById("plausible"),u=c.getAttribute("data-api")||(e=c.src.split("/"),t=e[0],n=e[2],t+"//"+n+"/api/event");function i(e,t){try{if("true"===window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(e){}var n={};n.n=e,n.u=o.href,n.d=c.getAttribute("data-domain"),n.r=l.referrer||null,n.w=window.innerWidth,t&&t.meta&&(n.m=JSON.stringify(t.meta)),t&&t.props&&(n.p=t.props);var i=c.getAttributeNames().filter(function(e){return"event-"===e.substring(0,6)}),a=n.p||{};i.forEach(function(e){var t=e.replace("event-",""),n=c.getAttribute(e);a[t]=a[t]||n}),n.p=a,n.h=1;var r=new XMLHttpRequest;r.open("POST",u,!0),r.setRequestHeader("Content-Type","text/plain"),r.send(JSON.stringify(n)),r.onreadystatechange=function(){4===r.readyState&&t&&t.callback&&t.callback()}}var a=window.plausible&&window.plausible.q||[];window.plausible=i;for(var r,s=0;s<a.length;s++)i.apply(this,a[s]);function p(){r=o.pathname,i("pageview")}function d(e){var t,n;"auxclick"===e.type&&2!==e.which||(n=(t=function(e){for(;e&&(void 0===e.tagName||"a"!==e.tagName.toLowerCase()||!e.href);)e=e.parentNode;return e}(e.target))&&t.href&&t.href.split("?")[0],v(t)?f(e,t,"Outbound Link: Click",{url:t.href}):"function"==typeof isDownloadToTrack&&isDownloadToTrack(n)&&f(e,t,"File Download",{url:n}))}function f(e,t,n,i){var a=!1;function r(){a||(a=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented){var n=!t.target||t.target.match(/^_(self|parent|top)$/i),i=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type;return n&&i}}(e,t)?plausible(n,{props:i}):(plausible(n,{props:i,callback:r}),setTimeout(r,5e3),e.preventDefault())}function v(e){return e&&e.href&&e.host&&e.host!==o.host}window.addEventListener("hashchange",p),"prerender"===l.visibilityState?l.addEventListener("visibilitychange",function(){r||"visible"!==l.visibilityState||p()}):p(),l.addEventListener("click",d),l.addEventListener("auxclick",d)}();