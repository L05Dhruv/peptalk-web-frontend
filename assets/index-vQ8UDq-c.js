(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();var f=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function p(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var l={exports:{}};(function(n,s){(function(o,t){n.exports=t()})(f,function(){function o(t){var e=this._getSettings(t);if(this.notFoundHandler=e.page404,this.mode=!window.history||!window.history.pushState?"hash":e.mode,this.root=e.root==="/"?"/":"/"+this._trimSlashes(e.root)+"/",this.beforeHook=e.hooks.before,this.securityHook=e.hooks.secure,this.routes=[],e.routes&&e.routes.length>0){var r=this;e.routes.forEach(function(i){r.add(i.rule,i.handler,i.options)})}return this._pageState=null,this._currentPage=null,this._skipCheck=!1,this._action=null,this.mode==="hash"&&(this._historyStack=[],this._historyIdx=0,this._historyState="add"),this}return o.Page=function(t,e,r,i,h){this.uri=t||"",this.query=e||{},this.params=r||[],this.state=i||null,this.options=h||{}},o.prototype._getSettings=function(t){var e={},r={routes:[],mode:"history",root:"/",hooks:{before:function(){},secure:function(){return!0}},page404:function(i){console.error({page:i,message:"404. Page not found"})}};return t=t||{},["routes","mode","root","page404"].forEach(function(i){e[i]=t[i]||r[i]}),e.hooks=Object.assign({},r.hooks,t.hooks||{}),e},o.prototype._getHistoryFragment=function(){var t=decodeURI(window.location.pathname);return this.root!=="/"&&(t=t.replace(this.root,"")),this._trimSlashes(t)},o.prototype._getHashFragment=function(){var t=window.location.hash.substr(1).replace(/(\?.*)$/,"");return this._trimSlashes(t)},o.prototype._getFragment=function(){return this.mode==="history"?this._getHistoryFragment():this._getHashFragment()},o.prototype._trimSlashes=function(t){return typeof t!="string"?"":t.toString().replace(/\/$/,"").replace(/^\//,"")},o.prototype._page404=function(t){this._currentPage=new o.Page(t),this.notFoundHandler(t)},o.prototype._parseRouteRule=function(t){if(typeof t!="string")return t;var e=this._trimSlashes(t),r=e.replace(/([\\\/\-\_\.])/g,"\\$1").replace(/\{[a-zA-Z]+\}/g,"(:any)").replace(/\:any/g,"[\\w\\-\\_\\.]+").replace(/\:word/g,"[a-zA-Z]+").replace(/\:num/g,"\\d+");return new RegExp("^"+r+"$","i")},o.prototype._parseQuery=function(t){var e={};return typeof t!="string"||(t[0]==="?"&&(t=t.substr(1)),this._queryString=t,t.split("&").forEach(function(r){var i=r.split("=");i[0]!==""&&(i[1]===void 0&&(i[1]=!0),e[decodeURIComponent(i[0])]=i[1])})),e},o.prototype._getHistoryQuery=function(){return this._parseQuery(window.location.search)},o.prototype._getHashQuery=function(){var t=window.location.hash.indexOf("?"),e=t!==-1?window.location.hash.substr(t):"";return this._parseQuery(e)},o.prototype._getQuery=function(){return this.mode==="history"?this._getHistoryQuery():this._getHashQuery()},o.prototype.add=function(t,e,r){return this.routes.push({rule:this._parseRouteRule(t),handler:e,options:r}),this},o.prototype.remove=function(t){var e=this;return typeof t=="string"&&(t=this._parseRouteRule(t).toString()),this.routes.some(function(r,i){return r.handler===t||r.rule.toString()===t?(e.routes.splice(i,1),!0):!1}),this},o.prototype.reset=function(){return this.routes=[],this.mode=null,this.root="/",this._pageState={},this.removeUriListener(),this},o.prototype._pushHistory=function(){var t=this,e=this._getFragment();this.mode==="hash"&&(this._historyState==="add"&&(this._historyIdx!==this._historyStack.length-1&&this._historyStack.splice(this._historyIdx+1),this._historyStack.push({path:e,state:t._pageState}),this._historyIdx=this._historyStack.length-1),this._historyState="add")},o.prototype._unloadCallback=function(t){var e;return this._skipCheck?t?Promise.resolve(!0):!0:this._currentPage&&this._currentPage.options&&this._currentPage.options.unloadCb?(e=this._currentPage.options.unloadCb(this._currentPage,t),!t||e instanceof Promise?e:e?Promise.resolve(e):Promise.reject(e)):t?Promise.resolve(!0):!0},o.prototype._findRoute=function(){var t=this,e=this._getFragment();return this.routes.some(function(r){var i=e.match(r.rule);if(i){i.shift();var h=t._getQuery(),u=new o.Page(e,h,i,t._pageState,r.options);return t.securityHook(u)?(t._currentPage=u,t._skipCheck?(t._skipCheck=!1,!0):(t.beforeHook(u),r.handler.apply(u,i),t._pageState=null,window.onbeforeunload=function(d){if(!t._unloadCallback(!1))return d.returnValue=!0,!0},!0)):!1}return!1})},o.prototype._treatAsync=function(){var t;t=this._currentPage.options.unloadCb(this._currentPage,!0),t instanceof Promise||(t=t?Promise.resolve(t):Promise.reject(t)),t.then(this._processUri.bind(this)).catch(this._resetState.bind(this))},o.prototype._resetState=function(){this._skipCheck=!0,this.navigateTo(this._current,this._currentPage.state,!0)},o.prototype._processUri=function(){var t=this._getFragment(),e;this._current=t,this._pushHistory(),e=this._findRoute.call(this),e||this._page404(t)},o.prototype.check=function(){return this._skipCheck?this:(this._currentPage&&this._currentPage.options&&this._currentPage.options.unloadCb?this._treatAsync():this._processUri(),this)},o.prototype.addUriListener=function(){return this.mode==="history"?window.onpopstate=this.check.bind(this):window.onhashchange=this.check.bind(this),this},o.prototype.removeUriListener=function(){return window.onpopstate=null,window.onhashchange=null,this},o.prototype.redirectTo=function(t,e,r){return t=this._trimSlashes(t)||"",this._pageState=e||null,this._skipCheck=!!r,this.mode==="history"?(history.replaceState(e,null,this.root+this._trimSlashes(t)),this.check()):(this._historyIdx--,window.location.hash=t,this)},o.prototype.navigateTo=function(t,e,r){return t=this._trimSlashes(t)||"",this._pageState=e||null,this._skipCheck=!!r,this.mode==="history"?(history.pushState(e,null,this.root+this._trimSlashes(t)),this.check()):(window.location.hash=t,this)},o.prototype.refresh=function(){if(!this._currentPage)return this;var t=this._currentPage.uri+"?"+this._queryString;return this.navigateTo(t,this._currentPage.state)},o.prototype.back=function(){return this.mode==="history"?(window.history.back(),this):this.go(this._historyIdx-1)},o.prototype.forward=function(){return this.mode==="history"?(window.history.forward(),this):this.go(this._historyIdx+1)},o.prototype.go=function(t){if(this.mode==="history")return window.history.go(t),this;var e=this._historyStack[t];return e?(this._historyIdx=t,this._historyState="hold",this.navigateTo(e.path,e.state)):this},o})})(l);var g=l.exports;const y=p(g),a=new y({mode:"hash",root:"/peptalk-web-frontend/"});async function c(n){const s=document.getElementById("app");if(s)try{const o=await fetch(`/peptalk-web-frontend/pages/${n}.html`);if(o.ok){const t=await o.text();s.innerHTML=t}else s.innerHTML="<h1>404 - Page Not Found</h1>"}catch(o){console.error("Error loading page:",o),s.innerHTML="<h1>Error loading page. Please try again later.</h1>"}}a.add("/",()=>c("home"));a.add("/about",()=>c("about"));a.add("/contact",()=>c("contact"));a.add("/getstarted",()=>c("getstarted"));a.add("/terms-patients",()=>c("toc-patients"));a.add("/terms-providers",()=>c("toc-providers"));a.add("/privacy",()=>c("privacy-policy"));a.add("/info-release",()=>c("info-release"));a.add("/consumer-notice",()=>c("consumer-notice"));a.add("/delete-my-data",()=>c("delete-my-data"));a.addUriListener();const _=()=>{const n=document.getElementById("cookie-consent");n||console.error("Cookie consent element not found"),window.onload=function(){if(localStorage.getItem("cookieConsent")==="accepted"){const t=document.getElementById("cookie-consent");if(!t)return;t.style.display="none"}};const s=document.getElementById("accept-cookies");s==null||s.addEventListener("click",function(){if(!s){console.error("Accept button not found");return}localStorage.setItem("cookieConsent","accepted"),console.log("Cookies accepted"),n.style.display="none"});const o=document.getElementById("reject-cookies");o==null||o.addEventListener("click",function(){if(!o){console.error("Reject button not found");return}localStorage.setItem("cookieConsent","rejected"),console.log("Cookies rejected"),n.style.display="none"})},m=()=>{const n=document.querySelector(".menu-button"),s=document.querySelector(".dropdown-menu");n==null||n.addEventListener("click",function(){s&&(s.style.display==="block"?s.style.display="none":s.style.display="block")}),s==null||s.addEventListener("click",function(){s&&(s.style.display="none")})},k=()=>{const n=document.querySelector(".send-button");n==null||n.addEventListener("click",function(){console.log("button clicked")})},w=()=>{const n=document.querySelector(".submit-button");n==null||n.addEventListener("click",function(){console.log("button clicked")})};a.check();document.addEventListener("DOMContentLoaded",()=>{console.log("DOMContentLoaded"),_(),m(),k(),w()});