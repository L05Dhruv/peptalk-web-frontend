(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();var k=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function v(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var _={exports:{}};(function(s,n){(function(o,t){s.exports=t()})(k,function(){function o(t){var e=this._getSettings(t);if(this.notFoundHandler=e.page404,this.mode=!window.history||!window.history.pushState?"hash":e.mode,this.root=e.root==="/"?"/":"/"+this._trimSlashes(e.root)+"/",this.beforeHook=e.hooks.before,this.securityHook=e.hooks.secure,this.routes=[],e.routes&&e.routes.length>0){var r=this;e.routes.forEach(function(i){r.add(i.rule,i.handler,i.options)})}return this._pageState=null,this._currentPage=null,this._skipCheck=!1,this._action=null,this.mode==="hash"&&(this._historyStack=[],this._historyIdx=0,this._historyState="add"),this}return o.Page=function(t,e,r,i,u){this.uri=t||"",this.query=e||{},this.params=r||[],this.state=i||null,this.options=u||{}},o.prototype._getSettings=function(t){var e={},r={routes:[],mode:"history",root:"/",hooks:{before:function(){},secure:function(){return!0}},page404:function(i){console.error({page:i,message:"404. Page not found"})}};return t=t||{},["routes","mode","root","page404"].forEach(function(i){e[i]=t[i]||r[i]}),e.hooks=Object.assign({},r.hooks,t.hooks||{}),e},o.prototype._getHistoryFragment=function(){var t=decodeURI(window.location.pathname);return this.root!=="/"&&(t=t.replace(this.root,"")),this._trimSlashes(t)},o.prototype._getHashFragment=function(){var t=window.location.hash.substr(1).replace(/(\?.*)$/,"");return this._trimSlashes(t)},o.prototype._getFragment=function(){return this.mode==="history"?this._getHistoryFragment():this._getHashFragment()},o.prototype._trimSlashes=function(t){return typeof t!="string"?"":t.toString().replace(/\/$/,"").replace(/^\//,"")},o.prototype._page404=function(t){this._currentPage=new o.Page(t),this.notFoundHandler(t)},o.prototype._parseRouteRule=function(t){if(typeof t!="string")return t;var e=this._trimSlashes(t),r=e.replace(/([\\\/\-\_\.])/g,"\\$1").replace(/\{[a-zA-Z]+\}/g,"(:any)").replace(/\:any/g,"[\\w\\-\\_\\.]+").replace(/\:word/g,"[a-zA-Z]+").replace(/\:num/g,"\\d+");return new RegExp("^"+r+"$","i")},o.prototype._parseQuery=function(t){var e={};return typeof t!="string"||(t[0]==="?"&&(t=t.substr(1)),this._queryString=t,t.split("&").forEach(function(r){var i=r.split("=");i[0]!==""&&(i[1]===void 0&&(i[1]=!0),e[decodeURIComponent(i[0])]=i[1])})),e},o.prototype._getHistoryQuery=function(){return this._parseQuery(window.location.search)},o.prototype._getHashQuery=function(){var t=window.location.hash.indexOf("?"),e=t!==-1?window.location.hash.substr(t):"";return this._parseQuery(e)},o.prototype._getQuery=function(){return this.mode==="history"?this._getHistoryQuery():this._getHashQuery()},o.prototype.add=function(t,e,r){return this.routes.push({rule:this._parseRouteRule(t),handler:e,options:r}),this},o.prototype.remove=function(t){var e=this;return typeof t=="string"&&(t=this._parseRouteRule(t).toString()),this.routes.some(function(r,i){return r.handler===t||r.rule.toString()===t?(e.routes.splice(i,1),!0):!1}),this},o.prototype.reset=function(){return this.routes=[],this.mode=null,this.root="/",this._pageState={},this.removeUriListener(),this},o.prototype._pushHistory=function(){var t=this,e=this._getFragment();this.mode==="hash"&&(this._historyState==="add"&&(this._historyIdx!==this._historyStack.length-1&&this._historyStack.splice(this._historyIdx+1),this._historyStack.push({path:e,state:t._pageState}),this._historyIdx=this._historyStack.length-1),this._historyState="add")},o.prototype._unloadCallback=function(t){var e;return this._skipCheck?t?Promise.resolve(!0):!0:this._currentPage&&this._currentPage.options&&this._currentPage.options.unloadCb?(e=this._currentPage.options.unloadCb(this._currentPage,t),!t||e instanceof Promise?e:e?Promise.resolve(e):Promise.reject(e)):t?Promise.resolve(!0):!0},o.prototype._findRoute=function(){var t=this,e=this._getFragment();return this.routes.some(function(r){var i=e.match(r.rule);if(i){i.shift();var u=t._getQuery(),h=new o.Page(e,u,i,t._pageState,r.options);return t.securityHook(h)?(t._currentPage=h,t._skipCheck?(t._skipCheck=!1,!0):(t.beforeHook(h),r.handler.apply(h,i),t._pageState=null,window.onbeforeunload=function(l){if(!t._unloadCallback(!1))return l.returnValue=!0,!0},!0)):!1}return!1})},o.prototype._treatAsync=function(){var t;t=this._currentPage.options.unloadCb(this._currentPage,!0),t instanceof Promise||(t=t?Promise.resolve(t):Promise.reject(t)),t.then(this._processUri.bind(this)).catch(this._resetState.bind(this))},o.prototype._resetState=function(){this._skipCheck=!0,this.navigateTo(this._current,this._currentPage.state,!0)},o.prototype._processUri=function(){var t=this._getFragment(),e;this._current=t,this._pushHistory(),e=this._findRoute.call(this),e||this._page404(t)},o.prototype.check=function(){return this._skipCheck?this:(this._currentPage&&this._currentPage.options&&this._currentPage.options.unloadCb?this._treatAsync():this._processUri(),this)},o.prototype.addUriListener=function(){return this.mode==="history"?window.onpopstate=this.check.bind(this):window.onhashchange=this.check.bind(this),this},o.prototype.removeUriListener=function(){return window.onpopstate=null,window.onhashchange=null,this},o.prototype.redirectTo=function(t,e,r){return t=this._trimSlashes(t)||"",this._pageState=e||null,this._skipCheck=!!r,this.mode==="history"?(history.replaceState(e,null,this.root+this._trimSlashes(t)),this.check()):(this._historyIdx--,window.location.hash=t,this)},o.prototype.navigateTo=function(t,e,r){return t=this._trimSlashes(t)||"",this._pageState=e||null,this._skipCheck=!!r,this.mode==="history"?(history.pushState(e,null,this.root+this._trimSlashes(t)),this.check()):(window.location.hash=t,this)},o.prototype.refresh=function(){if(!this._currentPage)return this;var t=this._currentPage.uri+"?"+this._queryString;return this.navigateTo(t,this._currentPage.state)},o.prototype.back=function(){return this.mode==="history"?(window.history.back(),this):this.go(this._historyIdx-1)},o.prototype.forward=function(){return this.mode==="history"?(window.history.forward(),this):this.go(this._historyIdx+1)},o.prototype.go=function(t){if(this.mode==="history")return window.history.go(t),this;var e=this._historyStack[t];return e?(this._historyIdx=t,this._historyState="hold",this.navigateTo(e.path,e.state)):this},o})})(_);var S=_.exports;const b=v(S),a=new b({mode:"hash",root:"/peptalk-web-frontend/"});async function c(s){const n=document.getElementById("app");if(n)try{const o=await fetch(`/peptalk-web-frontend/pages/${s}.html`);if(o.ok){const t=await o.text();n.innerHTML=t}else n.innerHTML="<h1>404 - Page Not Found</h1>"}catch(o){console.error("Error loading page:",o),n.innerHTML="<h1>Error loading page. Please try again later.</h1>"}}a.add("/",()=>c("home"));a.add("/about",()=>c("about"));a.add("/contact",()=>c("contact"));a.add("/getstarted",()=>c("getstarted"));a.add("/terms-patients",()=>c("toc-patients"));a.add("/terms-providers",()=>c("toc-providers"));a.add("/privacy",()=>c("privacy-policy"));a.add("/info-release",()=>c("info-release"));a.add("/consumer-notice",()=>c("consumer-notice"));a.add("/delete-my-data",()=>c("delete-my-data"));a.addUriListener();a.check();document.addEventListener("DOMContentLoaded",()=>{console.log("DOMContentLoaded");const s=document.querySelector(".menu-button"),n=document.querySelector(".dropdown-menu");s==null||s.addEventListener("click",function(){n&&(n.style.display==="block"?n.style.display="none":n.style.display="block")}),n==null||n.addEventListener("click",function(){n&&(n.style.display="none")});const o=document.querySelector(".contact-button");o==null||o.addEventListener("click",function(){var f,y,g,m;if(!o)return;const i=document.querySelector(".contact-form");if(!i)return;const u=((f=i.querySelector('input[name="name"]'))==null?void 0:f.value)||"",h=((y=i.querySelector('input[name="email"]'))==null?void 0:y.value)||"",l=((g=i.querySelector('select[name="reason"]'))==null?void 0:g.value)||"",p=((m=i.querySelector('textarea[name="message"]'))==null?void 0:m.value)||"";console.log(u,h,l,p),i.style.display="block",i.scrollIntoView({behavior:"smooth"}),window.location.href="/contact",(async()=>{try{const d=await fetch("http://localhost:3000/email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:u,email:h,reason:l,message:p})});if(!d.ok)throw new Error("Failed to send email");const w=await d.json();console.log(w)}catch(d){console.error("Error sending email:",d)}})()});const t=document.querySelector(".cookie-consent");if(!t){console.error("Cookie consent element not found");return}const e=document.getElementById("accept-cookies");e==null||e.addEventListener("click",function(){if(!e){console.error("Accept button not found");return}localStorage.setItem("cookieConsent","accepted"),console.log("Cookies accepted"),t.style.display="none"});const r=document.getElementById("reject-cookies");r==null||r.addEventListener("click",function(){if(!r){console.error("Reject button not found");return}localStorage.setItem("cookieConsent","rejected"),console.log("Cookies rejected"),t.style.display="none"}),window.onload=function(){if(localStorage.getItem("cookieConsent")==="accepted"){const i=document.getElementById("cookie-consent");if(!i)return;i.style.display="none"}}});