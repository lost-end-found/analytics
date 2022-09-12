!function(){"use strict";var u=window.location,s=window.document,p=s.currentScript,d=p.getAttribute("data-api")||new URL(p.src).origin+"/api/event";function f(e){console.warn("Ignoring Event: "+e)}function e(e,t){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(e){}var n=p&&p.getAttribute("data-include"),a=p&&p.getAttribute("data-exclude");if("pageview"===e){var r=!n||n&&n.split(",").some(o),i=a&&a.split(",").some(o);if(!r||i)return f("exclusion rule")}function o(e){return u.pathname.match(new RegExp("^"+e.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var l={};l.n=e,l.u=t&&t.u?t.u:u.href,l.d=p.getAttribute("data-domain"),l.r=s.referrer||null,l.w=window.innerWidth,t&&t.meta&&(l.m=JSON.stringify(t.meta)),t&&t.props&&(l.p=t.props);var c=new XMLHttpRequest;c.open("POST",d,!0),c.setRequestHeader("Content-Type","text/plain"),c.send(JSON.stringify(l)),c.onreadystatechange=function(){4===c.readyState&&t&&t.callback&&t.callback()}}var t=window.plausible&&window.plausible.q||[];window.plausible=e;for(var n=0;n<t.length;n++)e.apply(this,t[n]);function a(e){var t,n;"auxclick"===e.type&&2!==e.which||(n=(t=function(e){for(;e&&(void 0===e.tagName||"a"!==e.tagName.toLowerCase()||!e.href);)e=e.parentNode;return e}(e.target))&&t.href&&t.href.split("?")[0],i(t)?r(e,t,"Outbound Link: Click",{url:t.href}):"function"==typeof isDownloadToTrack&&isDownloadToTrack(n)&&r(e,t,"File Download",{url:n}))}function r(e,t,n,a){var r=!1;function i(){r||(r=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented){var n=!t.target||t.target.match(/^_(self|parent|top)$/i),a=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type;return n&&a}}(e,t)?plausible(n,{props:a}):(plausible(n,{props:a,callback:i}),setTimeout(i,5e3),e.preventDefault())}function i(e){return e&&e.href&&e.host&&e.host!==u.host}s.addEventListener("click",a),s.addEventListener("auxclick",a)}();