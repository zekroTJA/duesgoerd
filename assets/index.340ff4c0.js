(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const M={};function Be(e){M.context=e}const Je=(e,t)=>e===t,Re=Symbol("solid-proxy"),qe=Symbol("solid-track"),W={equals:Je};let Me=Ce;const C=1,X=2,Te={owned:null,cleanups:null,context:null,owner:null};var m=null;let D=null,h=null,_=null,N=null,de=0;function Y(e,t){const n=h,r=m,s=e.length===0,i=s?Te:{owned:null,cleanups:null,context:null,owner:t||r},l=s?e:()=>e(()=>I(()=>he(i)));m=i,h=null;try{return J(l,!0)}finally{h=n,m=r}}function F(e,t){t=t?Object.assign({},W,t):W;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),Pe(n,s));return[ke.bind(n),r]}function $(e,t,n){const r=pe(e,t,!1,C);B(r)}function Ne(e,t,n){Me=Ge;const r=pe(e,t,!1,C);r.user=!0,N?N.push(r):B(r)}function j(e,t,n){n=n?Object.assign({},W,n):W;const r=pe(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,B(r),ke.bind(r)}function I(e){let t,n=h;return h=null,t=e(),h=n,t}function He(e){return m===null||(m.cleanups===null?m.cleanups=[e]:m.cleanups.push(e)),e}function Ve(e){const t=j(e),n=j(()=>oe(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}function ke(){const e=D;if(this.sources&&(this.state||e))if(this.state===C||e)B(this);else{const t=_;_=null,J(()=>Z(this),!1),_=t}if(h){const t=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(t)):(h.sources=[this],h.sourceSlots=[t]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function Pe(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&J(()=>{for(let s=0;s<e.observers.length;s+=1){const i=e.observers[s],l=D&&D.running;l&&D.disposed.has(i),(l&&!i.tState||!l&&!i.state)&&(i.pure?_.push(i):N.push(i),i.observers&&Oe(i)),l||(i.state=C)}if(_.length>1e6)throw _=[],new Error},!1)),t}function B(e){if(!e.fn)return;he(e);const t=m,n=h,r=de;h=m=e,Ke(e,e.value,r),h=n,m=t}function Ke(e,t,n){let r;try{r=e.fn(t)}catch(s){e.pure&&(e.state=C),De(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Pe(e,r):e.value=r,e.updatedAt=n)}function pe(e,t,n,r=C,s){const i={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:m,context:null,pure:n};return m===null||m!==Te&&(m.owned?m.owned.push(i):m.owned=[i]),i}function Q(e){const t=D;if(e.state===0||t)return;if(e.state===X||t)return Z(e);if(e.suspense&&I(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<de);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===C||t)B(e);else if(e.state===X||t){const s=_;_=null,J(()=>Z(e,n[0]),!1),_=s}}function J(e,t){if(_)return e();let n=!1;t||(_=[]),N?n=!0:N=[],de++;try{const r=e();return Ye(n),r}catch(r){_||(N=null),De(r)}}function Ye(e){if(_&&(Ce(_),_=null),e)return;const t=N;N=null,t.length&&J(()=>Me(t),!1)}function Ce(e){for(let t=0;t<e.length;t++)Q(e[t])}function Ge(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:Q(r)}for(M.context&&Be(),t=0;t<n;t++)Q(e[t])}function Z(e,t){const n=D;e.state=0;for(let r=0;r<e.sources.length;r+=1){const s=e.sources[r];s.sources&&(s.state===C||n?s!==t&&Q(s):(s.state===X||n)&&Z(s,t))}}function Oe(e){const t=D;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=X,r.pure?_.push(r):N.push(r),r.observers&&Oe(r))}}function he(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const i=s.pop(),l=n.observerSlots.pop();r<s.length&&(i.sourceSlots[l]=r,s[r]=i,n.observerSlots[r]=l)}}if(e.owned){for(t=0;t<e.owned.length;t++)he(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function We(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function De(e){throw e=We(e),e}function oe(e){if(typeof e=="function"&&!e.length)return oe(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=oe(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}const Xe=Symbol("fallback");function ve(e){for(let t=0;t<e.length;t++)e[t]()}function Qe(e,t,n={}){let r=[],s=[],i=[],l=0,o=t.length>1?[]:null;return He(()=>ve(i)),()=>{let c=e()||[],f,u;return c[qe],I(()=>{let p=c.length,y,d,a,E,x,b,g,S,v;if(p===0)l!==0&&(ve(i),i=[],r=[],s=[],l=0,o&&(o=[])),n.fallback&&(r=[Xe],s[0]=Y(R=>(i[0]=R,n.fallback())),l=1);else if(l===0){for(s=new Array(p),u=0;u<p;u++)r[u]=c[u],s[u]=Y(w);l=p}else{for(a=new Array(p),E=new Array(p),o&&(x=new Array(p)),b=0,g=Math.min(l,p);b<g&&r[b]===c[b];b++);for(g=l-1,S=p-1;g>=b&&S>=b&&r[g]===c[S];g--,S--)a[S]=s[g],E[S]=i[g],o&&(x[S]=o[g]);for(y=new Map,d=new Array(S+1),u=S;u>=b;u--)v=c[u],f=y.get(v),d[u]=f===void 0?-1:f,y.set(v,u);for(f=b;f<=g;f++)v=r[f],u=y.get(v),u!==void 0&&u!==-1?(a[u]=s[f],E[u]=i[f],o&&(x[u]=o[f]),u=d[u],y.set(v,u)):i[f]();for(u=b;u<p;u++)u in a?(s[u]=a[u],i[u]=E[u],o&&(o[u]=x[u],o[u](u))):s[u]=Y(w);s=s.slice(0,l=p),r=c.slice(0)}return s});function w(p){if(i[u]=p,o){const[y,d]=F(u);return o[u]=d,t(c[u],y)}return t(c[u])}}}function T(e,t){return I(()=>e(t||{}))}function q(){return!0}const Ze={get(e,t,n){return t===Re?n:e.get(t)},has(e,t){return e.has(t)},set:q,deleteProperty:q,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:q,deleteProperty:q}},ownKeys(e){return e.keys()}};function ne(e){return(e=typeof e=="function"?e():e)==null?{}:e}function ze(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=ne(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in ne(e[n]))return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(ne(e[n])));return[...new Set(t)]}},Ze)}function et(e){const t="fallback"in e&&{fallback:()=>e.fallback};return j(Qe(()=>e.each,e.children,t||void 0))}function re(e){let t=!1;const n=e.keyed,r=j(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return j(()=>{const s=r();if(s){const i=e.children,l=typeof i=="function"&&i.length>0;return t=n||l,l?I(()=>i(s)):i}return e.fallback})}function tt(e,t){return j(e,void 0,t?void 0:{equals:t})}function nt(e,t,n){let r=n.length,s=t.length,i=r,l=0,o=0,c=t[s-1].nextSibling,f=null;for(;l<s||o<i;){if(t[l]===n[o]){l++,o++;continue}for(;t[s-1]===n[i-1];)s--,i--;if(s===l){const u=i<r?o?n[o-1].nextSibling:n[i-o]:c;for(;o<i;)e.insertBefore(n[o++],u)}else if(i===o)for(;l<s;)(!f||!f.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[i-1]&&n[o]===t[s-1]){const u=t[--s].nextSibling;e.insertBefore(n[o++],t[l++].nextSibling),e.insertBefore(n[--i],u),t[s]=n[i]}else{if(!f){f=new Map;let w=o;for(;w<i;)f.set(n[w],w++)}const u=f.get(t[l]);if(u!=null)if(o<u&&u<i){let w=l,p=1,y;for(;++w<s&&w<i&&!((y=f.get(t[w]))==null||y!==u+p);)p++;if(p>u-o){const d=t[l];for(;o<u;)e.insertBefore(n[o++],d)}else e.replaceChild(n[o++],t[l++])}else l++;else t[l++].remove()}}}const be="_$DX_DELEGATE";function rt(e,t,n){let r;return Y(s=>{r=s,t===document?e():A(t,e(),t.firstChild?null:void 0,n)}),()=>{r(),t.textContent=""}}function O(e,t,n){const r=document.createElement("template");r.innerHTML=e;let s=r.content.firstChild;return n&&(s=s.firstChild),s}function Le(e,t=window.document){const n=t[be]||(t[be]=new Set);for(let r=0,s=e.length;r<s;r++){const i=e[r];n.has(i)||(n.add(i),t.addEventListener(i,it))}}function P(e,t){t==null?e.removeAttribute("class"):e.className=t}function st(e,t,n){return I(()=>e(t,n))}function A(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return z(e,t,r,n);$(s=>z(e,t(),s,n),r)}function it(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),M.registry&&!M.done&&(M.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>r.remove()));n!==null;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function z(e,t,n,r,s){for(M.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,l=r!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(M.context)return n;if(i==="number"&&(t=t.toString()),l){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=L(e,n,r,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean"){if(M.context)return n;n=L(e,n,r)}else{if(i==="function")return $(()=>{let o=t();for(;typeof o=="function";)o=o();n=z(e,o,n,r)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(le(o,t,n,s))return $(()=>n=z(e,o,n,r,!0)),()=>n;if(M.context){if(!o.length)return n;for(let f=0;f<o.length;f++)if(o[f].parentNode)return n=o}if(o.length===0){if(n=L(e,n,r),l)return n}else c?n.length===0?me(e,o,r):nt(e,n,o):(n&&L(e),me(e,o));n=o}else if(t instanceof Node){if(M.context&&t.parentNode)return n=l?[t]:t;if(Array.isArray(n)){if(l)return n=L(e,n,r,t);L(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function le(e,t,n,r){let s=!1;for(let i=0,l=t.length;i<l;i++){let o=t[i],c=n&&n[i];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))s=le(e,o,c)||s;else if(typeof o=="function")if(r){for(;typeof o=="function";)o=o();s=le(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||s}else e.push(o),s=!0;else{const f=String(o);c&&c.nodeType===3&&c.data===f?e.push(c):e.push(document.createTextNode(f))}}return s}function me(e,t,n){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function L(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let i=!1;for(let l=t.length-1;l>=0;l--){const o=t[l];if(s!==o){const c=o.parentNode===e;!i&&!l?c?e.replaceChild(s,o):e.insertBefore(s,n):c&&o.remove()}else i=!0}}else e.insertBefore(s,n);return[s]}const ot="_App_10b7v_1",lt="_DisplayNameModal_10b7v_8",ut="_ErrorModal_10b7v_20",H={App:ot,DisplayNameModal:lt,Error:"_Error_10b7v_13",ErrorModal:ut},ct="_Footer_559yd_1",at={Footer:ct},ft=O('<div><input><button><img src="src/assets/send.svg"></button></div>'),dt=e=>{const t=ze({onChange:()=>{},onSend:()=>{}},e),n=()=>{!t.value||t.onSend()};return(()=>{const r=ft.cloneNode(!0),s=r.firstChild,i=s.nextSibling;return s.addEventListener("keypress",l=>l.key=="Enter"&&n()),s.$$input=l=>t.onValueChange(l.currentTarget.value),i.$$click=()=>n(),$(l=>{const o=at.Footer,c=!t.value;return o!==l._v$&&P(r,l._v$=o),c!==l._v$2&&(i.disabled=l._v$2=c),l},{_v$:void 0,_v$2:void 0}),$(()=>s.value=t.value),r})()};Le(["input","click"]);var ue=(e=>(e.Join="Join",e.Leave="Leave",e.Message="Message",e))(ue||{}),U=(e=>(e.Error="Error",e.Joined="Joined",e.Left="Left",e.Message="Message",e))(U||{}),G=(e=>(e.InvalidOperation="InvalidOperation",e.DisplayNameTaken="DisplayNameTaken",e.DisplayNameAlreadySet="DisplayNameAlreadySet",e.RateLimitExceeded="RateLimitExceeded",e.NotJoined="NotJoined",e.EmptyMessage="EmptyMessage",e))(G||{});const pt="_Messages_1iav4_1",ht="_Message_1iav4_1",yt="_SelfMessage_1iav4_11",gt="_SystemMessage_1iav4_29",V={Messages:pt,Message:ht,SelfMessage:yt,SystemMessage:gt},vt=O("<div></div>"),bt=O("<div><span></span></div>"),mt=e=>{let t;return Ne(()=>{e.messages&&t&&t.scrollTo(0,t.scrollHeight)}),(()=>{const n=vt.cloneNode(!0),r=t;return typeof r=="function"?st(r,n):t=n,A(n,T(et,{get each(){return e.messages},children:s=>(()=>{const i=bt.cloneNode(!0),l=i.firstChild;return A(l,()=>s.display_name),A(i,()=>s.message,null),$(()=>P(i,s.is_system?V.SystemMessage:s.is_self?V.SelfMessage:V.Message)),i})()})),$(()=>P(n,V.Messages)),n})()};var ce=function(e,t){return ce=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(n[s]=r[s])},ce(e,t)};function Fe(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");ce(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function _e(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function ee(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var r=n.call(e),s,i=[],l;try{for(;(t===void 0||t-- >0)&&!(s=r.next()).done;)i.push(s.value)}catch(o){l={error:o}}finally{try{s&&!s.done&&(n=r.return)&&n.call(r)}finally{if(l)throw l.error}}return i}function te(e,t,n){if(n||arguments.length===2)for(var r=0,s=t.length,i;r<s;r++)(i||!(r in t))&&(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||Array.prototype.slice.call(t))}function k(e){return typeof e=="function"}function _t(e){var t=function(r){Error.call(r),r.stack=new Error().stack},n=e(t);return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var se=_t(function(e){return function(n){e(this),this.message=n?n.length+` errors occurred during unsubscription:
`+n.map(function(r,s){return s+1+") "+r.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=n}});function we(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var ye=function(){function e(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var t,n,r,s,i;if(!this.closed){this.closed=!0;var l=this._parentage;if(l)if(this._parentage=null,Array.isArray(l))try{for(var o=_e(l),c=o.next();!c.done;c=o.next()){var f=c.value;f.remove(this)}}catch(a){t={error:a}}finally{try{c&&!c.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}else l.remove(this);var u=this.initialTeardown;if(k(u))try{u()}catch(a){i=a instanceof se?a.errors:[a]}var w=this._finalizers;if(w){this._finalizers=null;try{for(var p=_e(w),y=p.next();!y.done;y=p.next()){var d=y.value;try{Se(d)}catch(a){i=i??[],a instanceof se?i=te(te([],ee(i)),ee(a.errors)):i.push(a)}}}catch(a){r={error:a}}finally{try{y&&!y.done&&(s=p.return)&&s.call(p)}finally{if(r)throw r.error}}}if(i)throw new se(i)}},e.prototype.add=function(t){var n;if(t&&t!==this)if(this.closed)Se(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}},e.prototype._hasParent=function(t){var n=this._parentage;return n===t||Array.isArray(n)&&n.includes(t)},e.prototype._addParent=function(t){var n=this._parentage;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t},e.prototype._removeParent=function(t){var n=this._parentage;n===t?this._parentage=null:Array.isArray(n)&&we(n,t)},e.prototype.remove=function(t){var n=this._finalizers;n&&we(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=function(){var t=new e;return t.closed=!0,t}(),e}();ye.EMPTY;function je(e){return e instanceof ye||e&&"closed"in e&&k(e.remove)&&k(e.add)&&k(e.unsubscribe)}function Se(e){k(e)?e():e.unsubscribe()}var Ie={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},ae={setTimeout:function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var s=ae.delegate;return s?.setTimeout?s.setTimeout.apply(s,te([e,t],ee(n))):setTimeout.apply(void 0,te([e,t],ee(n)))},clearTimeout:function(e){var t=ae.delegate;return(t?.clearTimeout||clearTimeout)(e)},delegate:void 0};function wt(e){ae.setTimeout(function(){throw e})}function $e(){}function St(e){e()}var Ue=function(e){Fe(t,e);function t(n){var r=e.call(this)||this;return r.isStopped=!1,n?(r.destination=n,je(n)&&n.add(r)):r.destination=xt,r}return t.create=function(n,r,s){return new fe(n,r,s)},t.prototype.next=function(n){this.isStopped||this._next(n)},t.prototype.error=function(n){this.isStopped||(this.isStopped=!0,this._error(n))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(n){this.destination.next(n)},t.prototype._error=function(n){try{this.destination.error(n)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(ye),$t=Function.prototype.bind;function ie(e,t){return $t.call(e,t)}var Et=function(){function e(t){this.partialObserver=t}return e.prototype.next=function(t){var n=this.partialObserver;if(n.next)try{n.next(t)}catch(r){K(r)}},e.prototype.error=function(t){var n=this.partialObserver;if(n.error)try{n.error(t)}catch(r){K(r)}else K(t)},e.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(n){K(n)}},e}(),fe=function(e){Fe(t,e);function t(n,r,s){var i=e.call(this)||this,l;if(k(n)||!n)l={next:n??void 0,error:r??void 0,complete:s??void 0};else{var o;i&&Ie.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=function(){return i.unsubscribe()},l={next:n.next&&ie(n.next,o),error:n.error&&ie(n.error,o),complete:n.complete&&ie(n.complete,o)}):l=n}return i.destination=new Et(l),i}return t}(Ue);function K(e){wt(e)}function At(e){throw e}var xt={closed:!0,next:$e,error:At,complete:$e},Mt=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function Tt(e){return e}function Nt(e){return e.length===0?Tt:e.length===1?e[0]:function(n){return e.reduce(function(r,s){return s(r)},n)}}var kt=function(){function e(t){t&&(this._subscribe=t)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(t,n,r){var s=this,i=Ct(t)?t:new fe(t,n,r);return St(function(){var l=s,o=l.operator,c=l.source;i.add(o?o.call(i,c):c?s._subscribe(i):s._trySubscribe(i))}),i},e.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(n){t.error(n)}},e.prototype.forEach=function(t,n){var r=this;return n=Ee(n),new n(function(s,i){var l=new fe({next:function(o){try{t(o)}catch(c){i(c),l.unsubscribe()}},error:i,complete:s});r.subscribe(l)})},e.prototype._subscribe=function(t){var n;return(n=this.source)===null||n===void 0?void 0:n.subscribe(t)},e.prototype[Mt]=function(){return this},e.prototype.pipe=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return Nt(t)(this)},e.prototype.toPromise=function(t){var n=this;return t=Ee(t),new t(function(r,s){var i;n.subscribe(function(l){return i=l},function(l){return s(l)},function(){return r(i)})})},e.create=function(t){return new e(t)},e}();function Ee(e){var t;return(t=e??Ie.Promise)!==null&&t!==void 0?t:Promise}function Pt(e){return e&&k(e.next)&&k(e.error)&&k(e.complete)}function Ct(e){return e&&e instanceof Ue||Pt(e)&&je(e)}const Ot=e=>{const t=new WebSocket(e),n=new kt(s=>{t.onmessage=i=>{const l=JSON.parse(i.data);!l.code||s.next(l)}});return{send:s=>{t.send(JSON.stringify(s))},observer:n}},Dt="_Modal_wsqva_1",Lt="_ErrorModal_wsqva_1",Ae={Modal:Dt,ErrorModal:Lt},Ft=O("<div><div></div></div>"),xe=e=>{const t=Ve(()=>e.children);return(()=>{const n=Ft.cloneNode(!0),r=n.firstChild;return A(r,t),$(()=>P(n,e.error?Ae.ErrorModal:Ae.Modal)),n})()},jt=O("<div><h1>Error</h1><span> (<!>)</span><button>Ok</button></div>"),It=O("<div>This user name is already taken.</div>"),Ut=O('<div><h1>Join Chat</h1><span>Please enter below how you want to be displayed in the chat.</span><div><input><button><img src="src/assets/arrow.svg"></button></div></div>'),Bt=O("<div></div>"),Jt=()=>{const[e,t]=F(""),[n,r]=F(),[s,i]=F(""),[l,o]=F([]),[c,f]=F(),{send:u,observer:w}=Ot("wss://duesgoerd.herokuapp.com"),p=()=>{const d=s();r(d),u({code:ue.Join,payload:{display_name:d}})},y=()=>{const d=e();u({code:ue.Message,payload:{message:d}}),t("")};return w.subscribe(d=>{if(!!d)switch(d.code){case U.Error:{const a=d;if(a.payload)switch(f(a.payload),console.error(d),a.payload.code){case G.DisplayNameTaken:r(void 0)}break}case U.Message:{const a=d.payload;a&&(a.display_name===n()&&(a.is_self=!0),o([...l(),a]));break}case U.Joined:{const a=d.payload;if(a){const E={message:`${a.display_name} joined the chat.`,is_system:!0};o([...l(),E])}break}case U.Left:{const a=d.payload;if(a){const E={message:`${a.display_name} left the chat.`,is_system:!0};o([...l(),E])}break}}}),Ne(()=>{}),(()=>{const d=Bt.cloneNode(!0);return A(d,T(re,{get when(){return tt(()=>!!c(),!0)()&&c()?.code!==G.DisplayNameTaken},get children(){return T(xe,{error:!0,get children(){const a=jt.cloneNode(!0),E=a.firstChild,x=E.nextSibling,b=x.firstChild,g=b.nextSibling;g.nextSibling;const S=x.nextSibling;return A(x,()=>c()?.message,b),A(x,()=>c()?.code,g),S.$$click=()=>f(void 0),$(()=>P(a,H.ErrorModal)),a}})}}),null),A(d,T(re,{get when(){return!n()},get children(){return T(xe,{get children(){const a=Ut.cloneNode(!0),E=a.firstChild,x=E.nextSibling,b=x.nextSibling,g=b.firstChild,S=g.nextSibling;return A(a,T(re,{get when(){return c()?.code===G.DisplayNameTaken},get children(){const v=It.cloneNode(!0);return $(()=>P(v,H.Error)),v}}),b),g.$$input=v=>i(v.currentTarget.value),S.$$click=()=>p(),$(v=>{const R=H.DisplayNameModal,ge=!s();return R!==v._v$&&P(a,v._v$=R),ge!==v._v$2&&(S.disabled=v._v$2=ge),v},{_v$:void 0,_v$2:void 0}),$(()=>g.value=s()),a}})}}),null),A(d,T(mt,{get messages(){return l()}}),null),A(d,T(dt,{get value(){return e()},onValueChange:t,onSend:y}),null),$(()=>P(d,H.App)),d})()};Le(["click","input"]);rt(()=>T(Jt,{}),document.getElementById("root"));
