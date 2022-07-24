const we=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}};we();function v(){}function ke(t,e){for(const r in e)t[r]=e[r];return t}function ge(t){return t()}function oe(){return Object.create(null)}function j(t){t.forEach(ge)}function Ee(t){return typeof t=="function"}function D(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let I;function G(t,e){return I||(I=document.createElement("a")),I.href=e,t===I.href}function xe(t){return Object.keys(t).length===0}function ie(t,e,r,n){if(t){const o=he(t,e,r,n);return t[0](o)}}function he(t,e,r,n){return t[1]&&n?ke(r.ctx.slice(),t[1](n(e))):r.ctx}function ce(t,e,r,n){if(t[2]&&n){const o=t[2](n(r));if(e.dirty===void 0)return o;if(typeof o=="object"){const i=[],c=Math.max(e.dirty.length,o.length);for(let u=0;u<c;u+=1)i[u]=e.dirty[u]|o[u];return i}return e.dirty|o}return e.dirty}function le(t,e,r,n,o,i){if(o){const c=he(e,r,n,i);t.p(c,o)}}function se(t){if(t.ctx.length>32){const e=[],r=t.ctx.length/32;for(let n=0;n<r;n++)e[n]=-1;return e}return-1}function h(t,e){t.appendChild(e)}function E(t,e,r){t.insertBefore(e,r||null)}function k(t){t.parentNode.removeChild(t)}function y(t){return document.createElement(t)}function z(t){return document.createTextNode(t)}function L(){return z(" ")}function K(){return z("")}function J(t,e,r,n){return t.addEventListener(e,r,n),()=>t.removeEventListener(e,r,n)}function d(t,e,r){r==null?t.removeAttribute(e):t.getAttribute(e)!==r&&t.setAttribute(e,r)}function Le(t){return Array.from(t.childNodes)}function ve(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Pe(t,e,{bubbles:r=!1,cancelable:n=!1}={}){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,r,n,e),o}let T;function q(t){T=t}function Ce(){if(!T)throw new Error("Function called outside component initialization");return T}function $e(){const t=Ce();return(e,r,{cancelable:n=!1}={})=>{const o=t.$$.callbacks[e];if(o){const i=Pe(e,r,{cancelable:n});return o.slice().forEach(c=>{c.call(t,i)}),!i.defaultPrevented}return!0}}const M=[],Q=[],B=[],ae=[],Se=Promise.resolve();let V=!1;function Ae(){V||(V=!0,Se.then(be))}function Y(t){B.push(t)}const X=new Set;let H=0;function be(){const t=T;do{for(;H<M.length;){const e=M[H];H++,q(e),Ne(e.$$)}for(q(null),M.length=0,H=0;Q.length;)Q.pop()();for(let e=0;e<B.length;e+=1){const r=B[e];X.has(r)||(X.add(r),r())}B.length=0}while(M.length);for(;ae.length;)ae.pop()();V=!1,X.clear(),q(t)}function Ne(t){if(t.fragment!==null){t.update(),j(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Y)}}const R=new Set;let A;function ee(){A={r:0,c:[],p:A}}function te(){A.r||j(A.c),A=A.p}function p(t,e){t&&t.i&&(R.delete(t),t.i(e))}function $(t,e,r,n){if(t&&t.o){if(R.has(t))return;R.add(t),A.c.push(()=>{R.delete(t),n&&(r&&t.d(1),n())}),t.o(e)}else n&&n()}function N(t){t&&t.c()}function P(t,e,r,n){const{fragment:o,on_mount:i,on_destroy:c,after_update:u}=t.$$;o&&o.m(e,r),n||Y(()=>{const l=i.map(ge).filter(Ee);c?c.push(...l):j(l),t.$$.on_mount=[]}),u.forEach(Y)}function C(t,e){const r=t.$$;r.fragment!==null&&(j(r.on_destroy),r.fragment&&r.fragment.d(e),r.on_destroy=r.fragment=null,r.ctx=[])}function je(t,e){t.$$.dirty[0]===-1&&(M.push(t),Ae(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function F(t,e,r,n,o,i,c,u=[-1]){const l=T;q(t);const s=t.$$={fragment:null,ctx:null,props:i,update:v,not_equal:o,bound:oe(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:oe(),dirty:u,skip_bound:!1,root:e.target||l.$$.root};c&&c(s.root);let f=!1;if(s.ctx=r?r(t,e.props||{},(g,_,...b)=>{const m=b.length?b[0]:_;return s.ctx&&o(s.ctx[g],s.ctx[g]=m)&&(!s.skip_bound&&s.bound[g]&&s.bound[g](m),f&&je(t,g)),_}):[],s.update(),f=!0,j(s.before_update),s.fragment=n?n(s.ctx):!1,e.target){if(e.hydrate){const g=Le(e.target);s.fragment&&s.fragment.l(g),g.forEach(k)}else s.fragment&&s.fragment.c();e.intro&&p(t.$$.fragment),P(t,e.target,e.anchor,e.customElement),be()}q(l)}class O{$destroy(){C(this,1),this.$destroy=v}$on(e,r){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(r),()=>{const o=n.indexOf(r);o!==-1&&n.splice(o,1)}}$set(e){this.$$set&&!xe(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Me(t){let e,r,n,o;return{c(){e=y("button"),r=z(t[0]),d(e,"title",t[1]),d(e,"class","material-icons svelte-1i3k0cm")},m(i,c){E(i,e,c),h(e,r),n||(o=J(e,"click",t[3]),n=!0)},p(i,[c]){c&1&&ve(r,i[0]),c&2&&d(e,"title",i[1])},i:v,o:v,d(i){i&&k(e),n=!1,o()}}}function qe(t,e,r){let{icon:n}=e,{title:o}=e;const i=$e(),c=()=>i("click");return t.$$set=u=>{"icon"in u&&r(0,n=u.icon),"title"in u&&r(1,o=u.title)},[n,o,i,c]}class Z extends O{constructor(e){super(),F(this,e,qe,Me,D,{icon:0,title:1})}}function Te(t){let e;return{c(){e=y("header"),e.innerHTML=`<h1 class="svelte-lctqfv">Factorio Pixel Art Generator</h1> 
  <span class="version svelte-lctqfv">v1.0.0</span> 
  <a title="Changelog" class="material-icons svelte-lctqfv" href="https://github.com/NicoKandut/factorio-solar-art/blob/main/CHANGELOG.md" target="_newtab">feed</a> 
  <a title="Github Repository" class="material-icons svelte-lctqfv" href="https://github.com/NicoKandut/factorio-pixel-art-generator" target="_newtab"><svg height="16" aria-hidden="true" viewBox="0 0 16 16" width="16" data-view-component="true" style="fill: currentcolor; minWidth: 16px;"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></a> 
  <a title="Discord Server" class="material-icons svelte-lctqfv" href="https://discord.gg/jPf45KS54t" target="_newtab">discord</a> 
  <a title="Solar Art Generator" href="https://nicokandut.github.io/factorio-solar-art/" target="_newtab" class="svelte-lctqfv"><img src="/solar_panel.png" alt="Solar Art Generator" class="svelte-lctqfv"/></a>`,d(e,"class","svelte-lctqfv")},m(r,n){E(r,e,n)},p:v,i:v,o:v,d(r){r&&k(e)}}}class De extends O{constructor(e){super(),F(this,e,null,Te,D,{})}}const Fe=t=>({}),ue=t=>({}),Oe=t=>({}),fe=t=>({});function Ue(t){let e,r,n,o,i,c,u,l,s,f;const g=t[2].actions,_=ie(g,t,t[1],fe),b=t[2].content,m=ie(b,t,t[1],ue);return{c(){e=y("section"),r=y("div"),n=y("span"),o=z(t[0]),i=L(),c=y("div"),u=L(),_&&_.c(),l=L(),s=y("div"),m&&m.c(),d(c,"class","spacer svelte-1envtgn"),d(r,"class","title svelte-1envtgn"),d(s,"class","content svelte-1envtgn"),d(e,"class","svelte-1envtgn")},m(a,w){E(a,e,w),h(e,r),h(r,n),h(n,o),h(r,i),h(r,c),h(r,u),_&&_.m(r,null),h(e,l),h(e,s),m&&m.m(s,null),f=!0},p(a,[w]){(!f||w&1)&&ve(o,a[0]),_&&_.p&&(!f||w&2)&&le(_,g,a,a[1],f?ce(g,a[1],w,Oe):se(a[1]),fe),m&&m.p&&(!f||w&2)&&le(m,b,a,a[1],f?ce(b,a[1],w,Fe):se(a[1]),ue)},i(a){f||(p(_,a),p(m,a),f=!0)},o(a){$(_,a),$(m,a),f=!1},d(a){a&&k(e),_&&_.d(a),m&&m.d(a)}}}function Ie(t,e,r){let{$$slots:n={},$$scope:o}=e,{title:i}=e;return t.$$set=c=>{"title"in c&&r(0,i=c.title),"$$scope"in c&&r(1,o=c.$$scope)},[i,o,n]}class de extends O{constructor(e){super(),F(this,e,Ie,Ue,D,{title:0})}}function He(t){let e,r,n,o,i,c,u,l;return{c(){e=y("div"),r=y("span"),r.textContent="upload",n=L(),o=y("span"),o.textContent="Click here to upload a picture or drag and drop a picture here",i=L(),c=y("input"),d(r,"class","material-icons svelte-147nu1e"),d(o,"class","hint svelte-147nu1e"),d(c,"type","file"),d(c,"accept","image/*"),d(c,"class","svelte-147nu1e"),d(e,"class","svelte-147nu1e")},m(s,f){E(s,e,f),h(e,r),h(e,n),h(e,o),h(e,i),h(e,c),t[2](c),u||(l=[J(c,"change",t[3]),J(e,"click",t[4])],u=!0)},p:v,i:v,o:v,d(s){s&&k(e),t[2](null),u=!1,j(l)}}}function Be(t,e,r){const n=$e();let o;function i(l){Q[l?"unshift":"push"](()=>{o=l,r(0,o)})}return[o,n,i,l=>{var f;const s=(f=l.target.files)==null?void 0:f[0];n("upload",s)},()=>o==null?void 0:o.click()]}class Re extends O{constructor(e){super(),F(this,e,Be,He,D,{})}}function _e(t){let e,r;return e=new Z({props:{title:"Clear",icon:"clear"}}),e.$on("click",t[6]),{c(){N(e.$$.fragment)},m(n,o){P(e,n,o),r=!0},p:v,i(n){r||(p(e.$$.fragment,n),r=!0)},o(n){$(e.$$.fragment,n),r=!1},d(n){C(e,n)}}}function Ge(t){let e,r,n=t[0]!==void 0&&_e(t);return{c(){n&&n.c(),e=K()},m(o,i){n&&n.m(o,i),E(o,e,i),r=!0},p(o,i){o[0]!==void 0?n?(n.p(o,i),i&1&&p(n,1)):(n=_e(o),n.c(),p(n,1),n.m(e.parentNode,e)):n&&(ee(),$(n,1,1,()=>{n=null}),te())},i(o){r||(p(n),r=!0)},o(o){$(n),r=!1},d(o){n&&n.d(o),o&&k(e)}}}function ze(t){let e,r,n;return{c(){e=y("img"),G(e.src,r=URL.createObjectURL(t[0]))||d(e,"src",r),d(e,"alt",n=t[0].name),d(e,"class","svelte-uzukoj")},m(o,i){E(o,e,i)},p(o,i){i&1&&!G(e.src,r=URL.createObjectURL(o[0]))&&d(e,"src",r),i&1&&n!==(n=o[0].name)&&d(e,"alt",n)},i:v,o:v,d(o){o&&k(e)}}}function Ke(t){let e,r;return e=new Re({}),e.$on("upload",t[5]),{c(){N(e.$$.fragment)},m(n,o){P(e,n,o),r=!0},p:v,i(n){r||(p(e.$$.fragment,n),r=!0)},o(n){$(e.$$.fragment,n),r=!1},d(n){C(e,n)}}}function We(t){let e,r,n,o;const i=[Ke,ze],c=[];function u(l,s){return l[0]===void 0?0:1}return e=u(t),r=c[e]=i[e](t),{c(){r.c(),n=K()},m(l,s){c[e].m(l,s),E(l,n,s),o=!0},p(l,s){let f=e;e=u(l),e===f?c[e].p(l,s):(ee(),$(c[f],1,1,()=>{c[f]=null}),te(),r=c[e],r?r.p(l,s):(r=c[e]=i[e](l),r.c()),p(r,1),r.m(n.parentNode,n))},i(l){o||(p(r),o=!0)},o(l){$(r),o=!1},d(l){c[e].d(l),l&&k(n)}}}function me(t){let e,r,n,o;return e=new Z({props:{title:"Copy blueprint to clipboard",icon:"content_copy"}}),e.$on("click",t[3]),n=new Z({props:{title:"Download Blueprint",icon:"download"}}),n.$on("click",t[4]),{c(){N(e.$$.fragment),r=L(),N(n.$$.fragment)},m(i,c){P(e,i,c),E(i,r,c),P(n,i,c),o=!0},p:v,i(i){o||(p(e.$$.fragment,i),p(n.$$.fragment,i),o=!0)},o(i){$(e.$$.fragment,i),$(n.$$.fragment,i),o=!1},d(i){C(e,i),i&&k(r),C(n,i)}}}function Xe(t){let e,r,n=t[1]&&me(t);return{c(){n&&n.c(),e=K()},m(o,i){n&&n.m(o,i),E(o,e,i),r=!0},p(o,i){o[1]?n?(n.p(o,i),i&2&&p(n,1)):(n=me(o),n.c(),p(n,1),n.m(e.parentNode,e)):n&&(ee(),$(n,1,1,()=>{n=null}),te())},i(o){r||(p(n),r=!0)},o(o){$(n),r=!1},d(o){n&&n.d(o),o&&k(e)}}}function pe(t){let e,r;return{c(){e=y("img"),G(e.src,r=t[1])||d(e,"src",r),d(e,"alt","Preview"),d(e,"class","svelte-uzukoj")},m(n,o){E(n,e,o)},p(n,o){o&2&&!G(e.src,r=n[1])&&d(e,"src",r)},d(n){n&&k(e)}}}function Je(t){let e,r=t[1]&&pe(t);return{c(){r&&r.c(),e=K()},m(n,o){r&&r.m(n,o),E(n,e,o)},p(n,o){n[1]?r?r.p(n,o):(r=pe(n),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null)},d(n){r&&r.d(n),n&&k(e)}}}function Qe(t){let e,r,n,o,i,c,u;return r=new De({}),o=new de({props:{title:"Source",$$slots:{content:[We],actions:[Ge]},$$scope:{ctx:t}}}),c=new de({props:{title:"Preview",$$slots:{content:[Je],actions:[Xe]},$$scope:{ctx:t}}}),{c(){e=y("main"),N(r.$$.fragment),n=L(),N(o.$$.fragment),i=L(),N(c.$$.fragment),d(e,"class","svelte-uzukoj")},m(l,s){E(l,e,s),P(r,e,null),h(e,n),P(o,e,null),h(e,i),P(c,e,null),u=!0},p(l,[s]){const f={};s&515&&(f.$$scope={dirty:s,ctx:l}),o.$set(f);const g={};s&514&&(g.$$scope={dirty:s,ctx:l}),c.$set(g)},i(l){u||(p(r.$$.fragment,l),p(o.$$.fragment,l),p(c.$$.fragment,l),u=!0)},o(l){$(r.$$.fragment,l),$(o.$$.fragment,l),$(c.$$.fragment,l),u=!1},d(l){l&&k(e),C(r),C(o),C(c)}}}const S=1;function Ve(t,e,r){let n,o,i;const c=Module.cwrap("process","string",["number","number","number","number","number"]);async function u(_){performance.mark("start");let b,m;try{const a=await createImageBitmap(_),w=document.createElement("canvas");w.width=a.width,w.height=a.height;const U=w.getContext("2d");U.drawImage(a,0,0);const W=U.getImageData(0,0,a.width,a.height);b=Module._create_buffer(a.width,a.height),m=Module._create_buffer(a.width*S,a.height*S),Module.HEAP8.set(W.data,b),performance.mark("proc-start"),console.log("[js] Processing image..."),i=c(b,m,a.width,a.height,S),performance.mark("proc-end");const x=document.createElement("canvas"),ne=x.getContext("2d");x.width=a.width*S,x.height=a.height*S;const ye=Module.HEAPU8.subarray(m,m+x.width*x.height*4),re=ne.createImageData(a.width*S,a.height*S);re.data.set(ye),ne.putImageData(re,0,0),r(1,o=x.toDataURL("image/png"))}finally{Module._destroy_buffer(b),Module._destroy_buffer(m),performance.mark("end");const a=performance.measure("total time","start","end").duration.toFixed(0),w=performance.measure("preparation time","start","proc-start").duration.toFixed(0),U=performance.measure("processing time","proc-start","proc-end").duration.toFixed(0),W=performance.measure("processing time","proc-end","end").duration.toFixed(0),x=`[js] Done. Took ${a} ms total.`;console.group(x),console.info("Preparation",w,"ms"),console.info("Processing",U,"ms"),console.info("End",W,"ms"),console.groupEnd()}}async function l(){if(i!==void 0)try{await navigator.clipboard.writeText(i)}catch(_){console.error("Unexpected error while copying:",_)}}async function s(){if(i===void 0)return;const b=await(await window.showSaveFilePicker({types:[{description:"Text Files",accept:{"text/plain":[".txt"]}}],suggestedName:"generated blueprint"})).createWritable();await b.write(i),await b.close()}return[n,o,u,l,s,async _=>{r(0,n=_.detail),await u(n)},()=>{r(0,n=void 0),r(1,o=void 0)}]}class Ye extends O{constructor(e){super(),F(this,e,Ve,Qe,D,{})}}new Ye({target:document.getElementById("app")});
