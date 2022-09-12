!function(){"use strict";var e,t,n,a=window.location,r=window.document,o=r.getElementById("plausible"),l=o.getAttribute("data-api")||(e=o.src.split("/"),t=e[0],n=e[2],t+"//"+n+"/api/event");function c(e){console.warn("Ignoring Event: "+e)}function i(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname)||"file:"===a.protocol)return c("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return c("localStorage flag")}catch(e){}var n={};n.n=e,n.u=a.href,n.d=o.getAttribute("data-domain"),n.r=r.referrer||null,n.w=window.innerWidth,t&&t.meta&&(n.m=JSON.stringify(t.meta)),t&&t.props&&(n.p=t.props),n.h=1;var i=new XMLHttpRequest;i.open("POST",l,!0),i.setRequestHeader("Content-Type","text/plain"),i.send(JSON.stringify(n)),i.onreadystatechange=function(){4===i.readyState&&t&&t.callback&&t.callback()}}}var s=window.plausible&&window.plausible.q||[];window.plausible=i;for(var u,d=0;d<s.length;d++)i.apply(this,s[d]);function p(){u=a.pathname,i("pageview")}function f(e){var t,n;"auxclick"===e.type&&2!==e.which||(n=(t=function(e){for(;e&&(void 0===e.tagName||"a"!==e.tagName.toLowerCase()||!e.href);)e=e.parentNode;return e}(e.target))&&t.href&&t.href.split("?")[0],h(t)?w(e,t,"Outbound Link: Click",{url:t.href}):"function"==typeof isDownloadToTrack&&isDownloadToTrack(n)&&w(e,t,"File Download",{url:n}))}function w(e,t,n,i){var a=!1;function r(){a||(a=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented){var n=!t.target||t.target.match(/^_(self|parent|top)$/i),i=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type;return n&&i}}(e,t)?plausible(n,{props:i}):(plausible(n,{props:i,callback:r}),setTimeout(r,5e3),e.preventDefault())}function h(e){return e&&e.href&&e.host&&e.host!==a.host}window.addEventListener("hashchange",p),"prerender"===r.visibilityState?r.addEventListener("visibilitychange",function(){u||"visible"!==r.visibilityState||p()}):p(),r.addEventListener("click",f),r.addEventListener("auxclick",f)}();