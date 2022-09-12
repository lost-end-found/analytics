!function(){"use strict";var t,e,i,c=window.location,d=window.document,w=d.getElementById("plausible"),g=w.getAttribute("data-api")||(t=w.src.split("/"),e=t[0],i=t[2],e+"//"+i+"/api/event");function f(t){console.warn("Ignoring Event: "+t)}function n(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(c.hostname)||"file:"===c.protocol)return f("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(t){}var i=w&&w.getAttribute("data-include"),n=w&&w.getAttribute("data-exclude");if("pageview"===t){var a=!i||i&&i.split(",").some(u),r=n&&n.split(",").some(u);if(!a||r)return f("exclusion rule")}var o={};o.n=t,o.u=c.href,o.d=w.getAttribute("data-domain"),o.r=d.referrer||null,o.w=window.innerWidth,e&&e.meta&&(o.m=JSON.stringify(e.meta)),e&&e.props&&(o.p=e.props);var l=w.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),s=o.p||{};l.forEach(function(t){var e=t.replace("event-",""),i=w.getAttribute(t);s[e]=s[e]||i}),o.p=s;var p=new XMLHttpRequest;p.open("POST",g,!0),p.setRequestHeader("Content-Type","text/plain"),p.send(JSON.stringify(o)),p.onreadystatechange=function(){4===p.readyState&&e&&e.callback&&e.callback()}}function u(t){return c.pathname.match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var a=window.plausible&&window.plausible.q||[];window.plausible=n;for(var r,o=0;o<a.length;o++)n.apply(this,a[o]);function l(){r!==c.pathname&&(r=c.pathname,n("pageview"))}var s,p=window.history;p.pushState&&(s=p.pushState,p.pushState=function(){s.apply(this,arguments),l()},window.addEventListener("popstate",l)),"prerender"===d.visibilityState?d.addEventListener("visibilitychange",function(){r||"visible"!==d.visibilityState||l()}):l()}();