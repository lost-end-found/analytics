!function(){"use strict";var p=window.location,u=window.document,c=u.currentScript,w=c.getAttribute("data-api")||new URL(c.src).origin+"/api/event";function d(t){console.warn("Ignoring Event: "+t)}function t(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(p.hostname)||"file:"===p.protocol)return d("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return d("localStorage flag")}catch(t){}var i=c&&c.getAttribute("data-include"),n=c&&c.getAttribute("data-exclude");if("pageview"===t){var a=!i||i&&i.split(",").some(s),r=n&&n.split(",").some(s);if(!a||r)return d("exclusion rule")}var o={};o.n=t,o.u=p.href,o.d=c.getAttribute("data-domain"),o.r=u.referrer||null,o.w=window.innerWidth,e&&e.meta&&(o.m=JSON.stringify(e.meta)),e&&e.props&&(o.p=e.props);var l=new XMLHttpRequest;l.open("POST",w,!0),l.setRequestHeader("Content-Type","text/plain"),l.send(JSON.stringify(o)),l.onreadystatechange=function(){4===l.readyState&&e&&e.callback&&e.callback()}}function s(t){return p.pathname.match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var i,n=0;n<e.length;n++)t.apply(this,e[n]);function a(){i!==p.pathname&&(i=p.pathname,t("pageview"))}var r,o=window.history;o.pushState&&(r=o.pushState,o.pushState=function(){r.apply(this,arguments),a()},window.addEventListener("popstate",a)),"prerender"===u.visibilityState?u.addEventListener("visibilitychange",function(){i||"visible"!==u.visibilityState||a()}):a()}();