!function(){"use strict";var e,t,n,o=window.location,l=window.document,u=l.getElementById("plausible"),c=u.getAttribute("data-api")||(e=u.src.split("/"),t=e[0],n=e[2],t+"//"+n+"/api/event");function a(e,t){try{if("true"===window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(e){}var n={};n.n=e,n.u=t&&t.u?t.u:o.href,n.d=u.getAttribute("data-domain"),n.r=l.referrer||null,n.w=window.innerWidth,t&&t.meta&&(n.m=JSON.stringify(t.meta)),t&&t.props&&(n.p=t.props);var a=u.getAttributeNames().filter(function(e){return"event-"===e.substring(0,6)}),r=n.p||{};a.forEach(function(e){var t=e.replace("event-",""),n=u.getAttribute(e);r[t]=r[t]||n}),n.p=r,n.h=1;var i=new XMLHttpRequest;i.open("POST",c,!0),i.setRequestHeader("Content-Type","text/plain"),i.send(JSON.stringify(n)),i.onreadystatechange=function(){4===i.readyState&&t&&t.callback&&t.callback()}}var r=window.plausible&&window.plausible.q||[];window.plausible=a;for(var i=0;i<r.length;i++)a.apply(this,r[i]);function s(e){var t,n;"auxclick"===e.type&&2!==e.which||(n=(t=function(e){for(;e&&(void 0===e.tagName||"a"!==e.tagName.toLowerCase()||!e.href);)e=e.parentNode;return e}(e.target))&&t.href&&t.href.split("?")[0],f(t)?p(e,t,"Outbound Link: Click",{url:t.href}):"function"==typeof isDownloadToTrack&&isDownloadToTrack(n)&&p(e,t,"File Download",{url:n}))}function p(e,t,n,a){var r=!1;function i(){r||(r=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented){var n=!t.target||t.target.match(/^_(self|parent|top)$/i),a=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type;return n&&a}}(e,t)?plausible(n,{props:a}):(plausible(n,{props:a,callback:i}),setTimeout(i,5e3),e.preventDefault())}function f(e){return e&&e.href&&e.host&&e.host!==o.host}l.addEventListener("click",s),l.addEventListener("auxclick",s)}();