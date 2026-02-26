var kt=Object.defineProperty;var Be=e=>{throw TypeError(e)};var jt=(e,t,s)=>t in e?kt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var p=(e,t,s)=>jt(e,typeof t!="symbol"?t+"":t,s),De=(e,t,s)=>t.has(e)||Be("Cannot "+s);var l=(e,t,s)=>(De(e,t,"read from private field"),s?s.call(e):t.get(e)),u=(e,t,s)=>t.has(e)?Be("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),f=(e,t,s,r)=>(De(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),b=(e,t,s)=>(De(e,t,"access private method"),s);var We=(e,t,s,r)=>({set _(a){f(e,t,a,s)},get _(){return l(e,t,r)}});var Ve=(e,t,s)=>(r,a)=>{let i=-1;return n(0);async function n(c){if(c<=i)throw new Error("next() called multiple times");i=c;let o,d=!1,x;if(e[c]?(x=e[c][0][0],r.req.routeIndex=c):x=c===e.length&&a||void 0,x)try{o=await x(r,()=>n(c+1))}catch(h){if(h instanceof Error&&t)r.error=h,o=await t(h,r),d=!0;else throw h}else r.finalized===!1&&s&&(o=await s(r));return o&&(r.finalized===!1||d)&&(r.res=o),r}},Et=Symbol(),Ct=async(e,t=Object.create(null))=>{const{all:s=!1,dot:r=!1}=t,i=(e instanceof ot?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?Rt(e,{all:s,dot:r}):{}};async function Rt(e,t){const s=await e.formData();return s?Ot(s,t):{}}function Ot(e,t){const s=Object.create(null);return e.forEach((r,a)=>{t.all||a.endsWith("[]")?At(s,a,r):s[a]=r}),t.dot&&Object.entries(s).forEach(([r,a])=>{r.includes(".")&&(St(s,r,a),delete s[r])}),s}var At=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},St=(e,t,s)=>{let r=e;const a=t.split(".");a.forEach((i,n)=>{n===a.length-1?r[i]=s:((!r[i]||typeof r[i]!="object"||Array.isArray(r[i])||r[i]instanceof File)&&(r[i]=Object.create(null)),r=r[i])})},rt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Pt=e=>{const{groups:t,path:s}=Tt(e),r=rt(s);return Nt(r,t)},Tt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{const a=`@${r}`;return t.push([a,s]),a}),{groups:t,path:e}},Nt=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[r]=t[s];for(let a=e.length-1;a>=0;a--)if(e[a].includes(r)){e[a]=e[a].replace(r,t[s][1]);break}}return e},Ae={},_t=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const r=`${e}#${t}`;return Ae[r]||(s[2]?Ae[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:Ae[r]=[e,s[1],!0]),Ae[r]}return null},ze=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},Ht=e=>ze(e,decodeURI),at=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let r=s;for(;r<t.length;r++){const a=t.charCodeAt(r);if(a===37){const i=t.indexOf("?",r),n=t.indexOf("#",r),c=i===-1?n===-1?void 0:n:n===-1?i:Math.min(i,n),o=t.slice(s,c);return Ht(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(a===63||a===35)break}return t.slice(s,r)},It=e=>{const t=at(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ae=(e,t,...s)=>(s.length&&(t=ae(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),it=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let r="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))r+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){s.length===0&&r===""?s.push("/"):s.push(r);const i=a.replace("?","");r+="/"+i,s.push(r)}else r+="/"+a}),s.filter((a,i,n)=>n.indexOf(a)===i)},$e=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?ze(e,nt):e):e,lt=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let n=e.indexOf("?",8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){const c=e.charCodeAt(n+t.length+1);if(c===61){const o=n+t.length+2,d=e.indexOf("&",o);return $e(e.slice(o,d===-1?void 0:d))}else if(c==38||isNaN(c))return"";n=e.indexOf(`&${t}`,n+1)}if(r=/[%+]/.test(e),!r)return}const a={};r??(r=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const n=e.indexOf("&",i+1);let c=e.indexOf("=",i);c>n&&n!==-1&&(c=-1);let o=e.slice(i+1,c===-1?n===-1?void 0:n:c);if(r&&(o=$e(o)),i=n,o==="")continue;let d;c===-1?d="":(d=e.slice(c+1,n===-1?void 0:n),r&&(d=$e(d))),s?(a[o]&&Array.isArray(a[o])||(a[o]=[]),a[o].push(d)):a[o]??(a[o]=d)}return t?a[t]:a},Mt=lt,Dt=(e,t)=>lt(e,t,!0),nt=decodeURIComponent,Ge=e=>ze(e,nt),ne,A,F,ct,dt,Le,z,Ye,ot=(Ye=class{constructor(e,t="/",s=[[]]){u(this,F);p(this,"raw");u(this,ne);u(this,A);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});u(this,z,e=>{const{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;const a=Object.keys(t)[0];return a?t[a].then(i=>(a==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,f(this,A,s),f(this,ne,{})}param(e){return e?b(this,F,ct).call(this,e):b(this,F,dt).call(this)}query(e){return Mt(this.url,e)}queries(e){return Dt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Ct(this,e))}json(){return l(this,z).call(this,"text").then(e=>JSON.parse(e))}text(){return l(this,z).call(this,"text")}arrayBuffer(){return l(this,z).call(this,"arrayBuffer")}blob(){return l(this,z).call(this,"blob")}formData(){return l(this,z).call(this,"formData")}addValidatedData(e,t){l(this,ne)[e]=t}valid(e){return l(this,ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Et](){return l(this,A)}get matchedRoutes(){return l(this,A)[0].map(([[,e]])=>e)}get routePath(){return l(this,A)[0].map(([[,e]])=>e)[this.routeIndex].path}},ne=new WeakMap,A=new WeakMap,F=new WeakSet,ct=function(e){const t=l(this,A)[0][this.routeIndex][1][e],s=b(this,F,Le).call(this,t);return s&&/\%/.test(s)?Ge(s):s},dt=function(){const e={},t=Object.keys(l(this,A)[0][this.routeIndex][1]);for(const s of t){const r=b(this,F,Le).call(this,l(this,A)[0][this.routeIndex][1][s]);r!==void 0&&(e[s]=/\%/.test(r)?Ge(r):r)}return e},Le=function(e){return l(this,A)[1]?l(this,A)[1][e]:e},z=new WeakMap,Ye),$t={Stringify:1},xt=async(e,t,s,r,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(a?a[0]+=e:a=[e],Promise.all(i.map(c=>c({phase:t,buffer:a,context:r}))).then(c=>Promise.all(c.filter(Boolean).map(o=>xt(o,t,!1,r,a))).then(()=>a[0]))):Promise.resolve(e)},Ft="text/plain; charset=UTF-8",Fe=(e,t)=>({"Content-Type":e,...t}),be=(e,t)=>new Response(e,t),we,ke,I,oe,M,R,je,ce,de,X,Ee,Ce,q,ie,Qe,Lt=(Qe=class{constructor(e,t){u(this,q);u(this,we);u(this,ke);p(this,"env",{});u(this,I);p(this,"finalized",!1);p(this,"error");u(this,oe);u(this,M);u(this,R);u(this,je);u(this,ce);u(this,de);u(this,X);u(this,Ee);u(this,Ce);p(this,"render",(...e)=>(l(this,ce)??f(this,ce,t=>this.html(t)),l(this,ce).call(this,...e)));p(this,"setLayout",e=>f(this,je,e));p(this,"getLayout",()=>l(this,je));p(this,"setRenderer",e=>{f(this,ce,e)});p(this,"header",(e,t,s)=>{this.finalized&&f(this,R,be(l(this,R).body,l(this,R)));const r=l(this,R)?l(this,R).headers:l(this,X)??f(this,X,new Headers);t===void 0?r.delete(e):s!=null&&s.append?r.append(e,t):r.set(e,t)});p(this,"status",e=>{f(this,oe,e)});p(this,"set",(e,t)=>{l(this,I)??f(this,I,new Map),l(this,I).set(e,t)});p(this,"get",e=>l(this,I)?l(this,I).get(e):void 0);p(this,"newResponse",(...e)=>b(this,q,ie).call(this,...e));p(this,"body",(e,t,s)=>b(this,q,ie).call(this,e,t,s));p(this,"text",(e,t,s)=>!l(this,X)&&!l(this,oe)&&!t&&!s&&!this.finalized?new Response(e):b(this,q,ie).call(this,e,t,Fe(Ft,s)));p(this,"json",(e,t,s)=>b(this,q,ie).call(this,JSON.stringify(e),t,Fe("application/json",s)));p(this,"html",(e,t,s)=>{const r=a=>b(this,q,ie).call(this,a,t,Fe("text/html; charset=UTF-8",s));return typeof e=="object"?xt(e,$t.Stringify,!1,{}).then(r):r(e)});p(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});p(this,"notFound",()=>(l(this,de)??f(this,de,()=>be()),l(this,de).call(this,this)));f(this,we,e),t&&(f(this,M,t.executionCtx),this.env=t.env,f(this,de,t.notFoundHandler),f(this,Ce,t.path),f(this,Ee,t.matchResult))}get req(){return l(this,ke)??f(this,ke,new ot(l(this,we),l(this,Ce),l(this,Ee))),l(this,ke)}get event(){if(l(this,M)&&"respondWith"in l(this,M))return l(this,M);throw Error("This context has no FetchEvent")}get executionCtx(){if(l(this,M))return l(this,M);throw Error("This context has no ExecutionContext")}get res(){return l(this,R)||f(this,R,be(null,{headers:l(this,X)??f(this,X,new Headers)}))}set res(e){if(l(this,R)&&e){e=be(e.body,e);for(const[t,s]of l(this,R).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=l(this,R).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of r)e.headers.append("set-cookie",a)}else e.headers.set(t,s)}f(this,R,e),this.finalized=!0}get var(){return l(this,I)?Object.fromEntries(l(this,I)):{}}},we=new WeakMap,ke=new WeakMap,I=new WeakMap,oe=new WeakMap,M=new WeakMap,R=new WeakMap,je=new WeakMap,ce=new WeakMap,de=new WeakMap,X=new WeakMap,Ee=new WeakMap,Ce=new WeakMap,q=new WeakSet,ie=function(e,t,s){const r=l(this,R)?new Headers(l(this,R).headers):l(this,X)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,c]of i)n.toLowerCase()==="set-cookie"?r.append(n,c):r.set(n,c)}if(s)for(const[i,n]of Object.entries(s))if(typeof n=="string")r.set(i,n);else{r.delete(i);for(const c of n)r.append(i,c)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??l(this,oe);return be(e,{status:a,headers:r})},Qe),w="ALL",zt="all",qt=["get","post","put","delete","options","patch"],ht="Can not add a route since the matcher is already built.",ft=class extends Error{},Ut="__COMPOSED_HANDLER",Bt=e=>e.text("404 Not Found",404),Ke=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},P,k,pt,T,G,Se,Pe,xe,Wt=(xe=class{constructor(t={}){u(this,k);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");u(this,P,"/");p(this,"routes",[]);u(this,T,Bt);p(this,"errorHandler",Ke);p(this,"onError",t=>(this.errorHandler=t,this));p(this,"notFound",t=>(f(this,T,t),this));p(this,"fetch",(t,...s)=>b(this,k,Pe).call(this,t,s[1],s[0],t.method));p(this,"request",(t,s,r,a)=>t instanceof Request?this.fetch(s?new Request(t,s):t,r,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ae("/",t)}`,s),r,a)));p(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(b(this,k,Pe).call(this,t.request,t,void 0,t.request.method))})});[...qt,zt].forEach(i=>{this[i]=(n,...c)=>(typeof n=="string"?f(this,P,n):b(this,k,G).call(this,i,l(this,P),n),c.forEach(o=>{b(this,k,G).call(this,i,l(this,P),o)}),this)}),this.on=(i,n,...c)=>{for(const o of[n].flat()){f(this,P,o);for(const d of[i].flat())c.map(x=>{b(this,k,G).call(this,d.toUpperCase(),l(this,P),x)})}return this},this.use=(i,...n)=>(typeof i=="string"?f(this,P,i):(f(this,P,"*"),n.unshift(i)),n.forEach(c=>{b(this,k,G).call(this,w,l(this,P),c)}),this);const{strict:r,...a}=t;Object.assign(this,a),this.getPath=r??!0?t.getPath??at:It}route(t,s){const r=this.basePath(t);return s.routes.map(a=>{var n;let i;s.errorHandler===Ke?i=a.handler:(i=async(c,o)=>(await Ve([],s.errorHandler)(c,()=>a.handler(c,o))).res,i[Ut]=a.handler),b(n=r,k,G).call(n,a.method,a.path,i)}),this}basePath(t){const s=b(this,k,pt).call(this);return s._basePath=ae(this._basePath,t),s}mount(t,s,r){let a,i;r&&(typeof r=="function"?i=r:(i=r.optionHandler,r.replaceRequest===!1?a=o=>o:a=r.replaceRequest));const n=i?o=>{const d=i(o);return Array.isArray(d)?d:[d]}:o=>{let d;try{d=o.executionCtx}catch{}return[o.env,d]};a||(a=(()=>{const o=ae(this._basePath,t),d=o==="/"?0:o.length;return x=>{const h=new URL(x.url);return h.pathname=h.pathname.slice(d)||"/",new Request(h,x)}})());const c=async(o,d)=>{const x=await s(a(o.req.raw),...n(o));if(x)return x;await d()};return b(this,k,G).call(this,w,ae(t,"*"),c),this}},P=new WeakMap,k=new WeakSet,pt=function(){const t=new xe({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,T,l(this,T)),t.routes=this.routes,t},T=new WeakMap,G=function(t,s,r){t=t.toUpperCase(),s=ae(this._basePath,s);const a={basePath:this._basePath,path:s,method:t,handler:r};this.router.add(t,s,[r,a]),this.routes.push(a)},Se=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},Pe=function(t,s,r,a){if(a==="HEAD")return(async()=>new Response(null,await b(this,k,Pe).call(this,t,s,r,"GET")))();const i=this.getPath(t,{env:r}),n=this.router.match(a,i),c=new Lt(t,{path:i,matchResult:n,env:r,executionCtx:s,notFoundHandler:l(this,T)});if(n[0].length===1){let d;try{d=n[0][0][0][0](c,async()=>{c.res=await l(this,T).call(this,c)})}catch(x){return b(this,k,Se).call(this,x,c)}return d instanceof Promise?d.then(x=>x||(c.finalized?c.res:l(this,T).call(this,c))).catch(x=>b(this,k,Se).call(this,x,c)):d??l(this,T).call(this,c)}const o=Ve(n[0],this.errorHandler,l(this,T));return(async()=>{try{const d=await o(c);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return b(this,k,Se).call(this,d,c)}})()},xe),gt=[];function Vt(e,t){const s=this.buildAllMatchers(),r=((a,i)=>{const n=s[a]||s[w],c=n[2][i];if(c)return c;const o=i.match(n[0]);if(!o)return[[],gt];const d=o.indexOf("",1);return[n[1][d],o]});return this.match=r,r(e,t)}var Ne="[^/]+",me=".*",ye="(?:|/.*)",le=Symbol(),Gt=new Set(".\\+*[^]$()");function Kt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===me||e===ye?1:t===me||t===ye?-1:e===Ne?1:t===Ne?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var J,Y,N,ee,Xt=(ee=class{constructor(){u(this,J);u(this,Y);u(this,N,Object.create(null))}insert(t,s,r,a,i){if(t.length===0){if(l(this,J)!==void 0)throw le;if(i)return;f(this,J,s);return}const[n,...c]=t,o=n==="*"?c.length===0?["","",me]:["","",Ne]:n==="/*"?["","",ye]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(o){const x=o[1];let h=o[2]||Ne;if(x&&o[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw le;if(d=l(this,N)[h],!d){if(Object.keys(l(this,N)).some(g=>g!==me&&g!==ye))throw le;if(i)return;d=l(this,N)[h]=new ee,x!==""&&f(d,Y,a.varIndex++)}!i&&x!==""&&r.push([x,l(d,Y)])}else if(d=l(this,N)[n],!d){if(Object.keys(l(this,N)).some(x=>x.length>1&&x!==me&&x!==ye))throw le;if(i)return;d=l(this,N)[n]=new ee}d.insert(c,s,r,a,i)}buildRegExpStr(){const s=Object.keys(l(this,N)).sort(Kt).map(r=>{const a=l(this,N)[r];return(typeof l(a,Y)=="number"?`(${r})@${l(a,Y)}`:Gt.has(r)?`\\${r}`:r)+a.buildRegExpStr()});return typeof l(this,J)=="number"&&s.unshift(`#${l(this,J)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},J=new WeakMap,Y=new WeakMap,N=new WeakMap,ee),_e,Re,Ze,Jt=(Ze=class{constructor(){u(this,_e,{varIndex:0});u(this,Re,new Xt)}insert(e,t,s){const r=[],a=[];for(let n=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,o=>{const d=`@\\${n}`;return a[n]=[d,o],n++,c=!0,d}),!c)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=a.length-1;n>=0;n--){const[c]=a[n];for(let o=i.length-1;o>=0;o--)if(i[o].indexOf(c)!==-1){i[o]=i[o].replace(c,a[n][1]);break}}return l(this,Re).insert(i,t,r,l(this,_e),s),r}buildRegExp(){let e=l(this,Re).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,i,n)=>i!==void 0?(s[++t]=Number(i),"$()"):(n!==void 0&&(r[Number(n)]=++t),"")),[new RegExp(`^${e}`),s,r]}},_e=new WeakMap,Re=new WeakMap,Ze),Yt=[/^$/,[],Object.create(null)],Te=Object.create(null);function ut(e){return Te[e]??(Te[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Qt(){Te=Object.create(null)}function Zt(e){var d;const t=new Jt,s=[];if(e.length===0)return Yt;const r=e.map(x=>[!/\*|\/:/.test(x[0]),...x]).sort(([x,h],[g,v])=>x?1:g?-1:h.length-v.length),a=Object.create(null);for(let x=0,h=-1,g=r.length;x<g;x++){const[v,m,S]=r[x];v?a[m]=[S.map(([O])=>[O,Object.create(null)]),gt]:h++;let j;try{j=t.insert(m,h,v)}catch(O){throw O===le?new ft(m):O}v||(s[h]=S.map(([O,y])=>{const _=Object.create(null);for(y-=1;y>=0;y--){const[pe,Ie]=j[y];_[pe]=Ie}return[O,_]}))}const[i,n,c]=t.buildRegExp();for(let x=0,h=s.length;x<h;x++)for(let g=0,v=s[x].length;g<v;g++){const m=(d=s[x][g])==null?void 0:d[1];if(!m)continue;const S=Object.keys(m);for(let j=0,O=S.length;j<O;j++)m[S[j]]=c[m[S[j]]]}const o=[];for(const x in n)o[x]=s[n[x]];return[i,o,a]}function re(e,t){if(e){for(const s of Object.keys(e).sort((r,a)=>a.length-r.length))if(ut(s).test(t))return[...e[s]]}}var U,B,He,bt,et,es=(et=class{constructor(){u(this,He);p(this,"name","RegExpRouter");u(this,U);u(this,B);p(this,"match",Vt);f(this,U,{[w]:Object.create(null)}),f(this,B,{[w]:Object.create(null)})}add(e,t,s){var c;const r=l(this,U),a=l(this,B);if(!r||!a)throw new Error(ht);r[e]||[r,a].forEach(o=>{o[e]=Object.create(null),Object.keys(o[w]).forEach(d=>{o[e][d]=[...o[w][d]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const o=ut(t);e===w?Object.keys(r).forEach(d=>{var x;(x=r[d])[t]||(x[t]=re(r[d],t)||re(r[w],t)||[])}):(c=r[e])[t]||(c[t]=re(r[e],t)||re(r[w],t)||[]),Object.keys(r).forEach(d=>{(e===w||e===d)&&Object.keys(r[d]).forEach(x=>{o.test(x)&&r[d][x].push([s,i])})}),Object.keys(a).forEach(d=>{(e===w||e===d)&&Object.keys(a[d]).forEach(x=>o.test(x)&&a[d][x].push([s,i]))});return}const n=it(t)||[t];for(let o=0,d=n.length;o<d;o++){const x=n[o];Object.keys(a).forEach(h=>{var g;(e===w||e===h)&&((g=a[h])[x]||(g[x]=[...re(r[h],x)||re(r[w],x)||[]]),a[h][x].push([s,i-d+o+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(l(this,B)).concat(Object.keys(l(this,U))).forEach(t=>{e[t]||(e[t]=b(this,He,bt).call(this,t))}),f(this,U,f(this,B,void 0)),Qt(),e}},U=new WeakMap,B=new WeakMap,He=new WeakSet,bt=function(e){const t=[];let s=e===w;return[l(this,U),l(this,B)].forEach(r=>{const a=r[e]?Object.keys(r[e]).map(i=>[i,r[e][i]]):[];a.length!==0?(s||(s=!0),t.push(...a)):e!==w&&t.push(...Object.keys(r[w]).map(i=>[i,r[w][i]]))}),s?Zt(t):null},et),W,D,tt,ts=(tt=class{constructor(e){p(this,"name","SmartRouter");u(this,W,[]);u(this,D,[]);f(this,W,e.routers)}add(e,t,s){if(!l(this,D))throw new Error(ht);l(this,D).push([e,t,s])}match(e,t){if(!l(this,D))throw new Error("Fatal error");const s=l(this,W),r=l(this,D),a=s.length;let i=0,n;for(;i<a;i++){const c=s[i];try{for(let o=0,d=r.length;o<d;o++)c.add(...r[o]);n=c.match(e,t)}catch(o){if(o instanceof ft)continue;throw o}this.match=c.match.bind(c),f(this,W,[c]),f(this,D,void 0);break}if(i===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(l(this,D)||l(this,W).length!==1)throw new Error("No active router has been determined yet.");return l(this,W)[0]}},W=new WeakMap,D=new WeakMap,tt),ve=Object.create(null),ss=e=>{for(const t in e)return!0;return!1},V,C,Q,he,E,$,K,fe,rs=(fe=class{constructor(t,s,r){u(this,$);u(this,V);u(this,C);u(this,Q);u(this,he,0);u(this,E,ve);if(f(this,C,r||Object.create(null)),f(this,V,[]),t&&s){const a=Object.create(null);a[t]={handler:s,possibleKeys:[],score:0},f(this,V,[a])}f(this,Q,[])}insert(t,s,r){f(this,he,++We(this,he)._);let a=this;const i=Pt(s),n=[];for(let c=0,o=i.length;c<o;c++){const d=i[c],x=i[c+1],h=_t(d,x),g=Array.isArray(h)?h[0]:d;if(g in l(a,C)){a=l(a,C)[g],h&&n.push(h[1]);continue}l(a,C)[g]=new fe,h&&(l(a,Q).push(h),n.push(h[1])),a=l(a,C)[g]}return l(a,V).push({[t]:{handler:r,possibleKeys:n.filter((c,o,d)=>d.indexOf(c)===o),score:l(this,he)}}),a}search(t,s){var x;const r=[];f(this,E,ve);let i=[this];const n=rt(s),c=[],o=n.length;let d=null;for(let h=0;h<o;h++){const g=n[h],v=h===o-1,m=[];for(let j=0,O=i.length;j<O;j++){const y=i[j],_=l(y,C)[g];_&&(f(_,E,l(y,E)),v?(l(_,C)["*"]&&b(this,$,K).call(this,r,l(_,C)["*"],t,l(y,E)),b(this,$,K).call(this,r,_,t,l(y,E))):m.push(_));for(let pe=0,Ie=l(y,Q).length;pe<Ie;pe++){const qe=l(y,Q)[pe],L=l(y,E)===ve?{}:{...l(y,E)};if(qe==="*"){const te=l(y,C)["*"];te&&(b(this,$,K).call(this,r,te,t,l(y,E)),f(te,E,L),m.push(te));continue}const[wt,Ue,ge]=qe;if(!g&&!(ge instanceof RegExp))continue;const H=l(y,C)[wt];if(ge instanceof RegExp){if(d===null){d=new Array(o);let se=s[0]==="/"?1:0;for(let ue=0;ue<o;ue++)d[ue]=se,se+=n[ue].length+1}const te=s.substring(d[h]),Me=ge.exec(te);if(Me){if(L[Ue]=Me[0],b(this,$,K).call(this,r,H,t,l(y,E),L),ss(l(H,C))){f(H,E,L);const se=((x=Me[0].match(/\//))==null?void 0:x.length)??0;(c[se]||(c[se]=[])).push(H)}continue}}(ge===!0||ge.test(g))&&(L[Ue]=g,v?(b(this,$,K).call(this,r,H,t,L,l(y,E)),l(H,C)["*"]&&b(this,$,K).call(this,r,l(H,C)["*"],t,L,l(y,E))):(f(H,E,L),m.push(H)))}}const S=c.shift();i=S?m.concat(S):m}return r.length>1&&r.sort((h,g)=>h.score-g.score),[r.map(({handler:h,params:g})=>[h,g])]}},V=new WeakMap,C=new WeakMap,Q=new WeakMap,he=new WeakMap,E=new WeakMap,$=new WeakSet,K=function(t,s,r,a,i){for(let n=0,c=l(s,V).length;n<c;n++){const o=l(s,V)[n],d=o[r]||o[w],x={};if(d!==void 0&&(d.params=Object.create(null),t.push(d),a!==ve||i&&i!==ve))for(let h=0,g=d.possibleKeys.length;h<g;h++){const v=d.possibleKeys[h],m=x[d.score];d.params[v]=i!=null&&i[v]&&!m?i[v]:a[v]??(i==null?void 0:i[v]),x[d.score]=!0}}},fe),Z,st,as=(st=class{constructor(){p(this,"name","TrieRouter");u(this,Z);f(this,Z,new rs)}add(e,t,s){const r=it(t);if(r){for(let a=0,i=r.length;a<i;a++)l(this,Z).insert(e,r[a],s);return}l(this,Z).insert(e,t,s)}match(e,t){return l(this,Z).search(e,t)}},Z=new WeakMap,st),vt=class extends Wt{constructor(e={}){super(e),this.router=e.router??new ts({routers:[new es,new as]})}},is=e=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(i=>typeof i=="string"?i==="*"?()=>i:n=>i===n?n:null:typeof i=="function"?i:n=>i.includes(n)?n:null)(s.origin),a=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(s.allowMethods);return async function(n,c){var x;function o(h,g){n.res.headers.set(h,g)}const d=await r(n.req.header("origin")||"",n);if(d&&o("Access-Control-Allow-Origin",d),s.credentials&&o("Access-Control-Allow-Credentials","true"),(x=s.exposeHeaders)!=null&&x.length&&o("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),n.req.method==="OPTIONS"){s.origin!=="*"&&o("Vary","Origin"),s.maxAge!=null&&o("Access-Control-Max-Age",s.maxAge.toString());const h=await a(n.req.header("origin")||"",n);h.length&&o("Access-Control-Allow-Methods",h.join(","));let g=s.allowHeaders;if(!(g!=null&&g.length)){const v=n.req.header("Access-Control-Request-Headers");v&&(g=v.split(/\s*,\s*/))}return g!=null&&g.length&&(o("Access-Control-Allow-Headers",g.join(",")),n.res.headers.append("Vary","Access-Control-Request-Headers")),n.res.headers.delete("Content-Length"),n.res.headers.delete("Content-Type"),new Response(null,{headers:n.res.headers,status:204,statusText:"No Content"})}await c(),s.origin!=="*"&&n.header("Vary","Origin",{append:!0})}},ls=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Xe=(e,t=os)=>{const s=/\.([a-zA-Z0-9]+?)$/,r=e.match(s);if(!r)return;let a=t[r[1]];return a&&a.startsWith("text")&&(a+="; charset=utf-8"),a},ns={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},os=ns,cs=(...e)=>{let t=e.filter(a=>a!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),r=[];for(const a of s)a===".."&&r.length>0&&r.at(-1)!==".."?r.pop():a!=="."&&r.push(a);return r.join("/")||"."},mt={br:".br",zstd:".zst",gzip:".gz"},ds=Object.keys(mt),xs="index.html",hs=e=>{const t=e.root??"./",s=e.path,r=e.join??cs;return async(a,i)=>{var x,h,g,v;if(a.finalized)return i();let n;if(e.path)n=e.path;else try{if(n=decodeURIComponent(a.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(n))throw new Error}catch{return await((x=e.onNotFound)==null?void 0:x.call(e,a.req.path,a)),i()}let c=r(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(n):n);e.isDir&&await e.isDir(c)&&(c=r(c,xs));const o=e.getContent;let d=await o(c,a);if(d instanceof Response)return a.newResponse(d.body,d);if(d){const m=e.mimes&&Xe(c,e.mimes)||Xe(c);if(a.header("Content-Type",m||"application/octet-stream"),e.precompressed&&(!m||ls.test(m))){const S=new Set((h=a.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(j=>j.trim()));for(const j of ds){if(!S.has(j))continue;const O=await o(c+mt[j],a);if(O){d=O,a.header("Content-Encoding",j),a.header("Vary","Accept-Encoding",{append:!0});break}}}return await((g=e.onFound)==null?void 0:g.call(e,c,a)),a.body(d)}await((v=e.onNotFound)==null?void 0:v.call(e,c,a)),await i()}},fs=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let r;t&&t.namespace?r=t.namespace:r=__STATIC_CONTENT;const a=s[e];if(!a)return null;const i=await r.get(a,{type:"stream"});return i||null},ps=e=>async function(s,r){return hs({...e,getContent:async i=>fs(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,r)},gs=e=>ps(e);const Oe=new vt;Oe.use("/api/*",is());Oe.use("/static/*",gs({root:"./public"}));Oe.post("/api/contact",async e=>{try{const{name:t,phone:s,wechat:r,hotelName:a,message:i}=await e.req.json();return console.log("新咨询:",{name:t,phone:s,wechat:r,hotelName:a,message:i}),e.json({success:!0,message:"感谢您的咨询，我们会尽快与您联系！"})}catch{return e.json({success:!1,message:"提交失败，请稍后再试"},500)}});Oe.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="MICROCONNECT - 专业酒店闲置房间电竞化改造服务，3-6个月回本，提升30%-80%营收，空置率下降40%">
        <meta name="keywords" content="酒店电竞房改造,电竞酒店,酒店营收提升,闲置房间改造,电竞房方案">
        <title>MICROCONNECT - 酒店闲置房间电竞化改造 | 3-6个月回本 提升营收30%-80%</title>
        
        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"><\/script>
        
        <!-- Font Awesome -->
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
        
        <!-- Custom Styles -->
        <link href="/static/styles.css" rel="stylesheet">
        
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'tech-blue': '#0A4D8C',
                  'tech-blue-light': '#1565C0',
                  'tech-blue-dark': '#003366',
                  'esports-red': '#E63946',
                  'esports-red-dark': '#C1121F',
                }
              }
            }
          }
        <\/script>
    </head>
    <body class="font-sans antialiased">
        <!-- Navigation -->
        <nav id="navbar" class="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="flex justify-between items-center h-16 lg:h-20">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <a href="#" class="flex items-center space-x-2">
                            <i class="fas fa-bolt text-esports-red text-2xl"></i>
                            <span class="text-xl lg:text-2xl font-black text-tech-blue tracking-wide">MICROCONNECT</span>
                        </a>
                    </div>
                    
                    <!-- Desktop Navigation -->
                    <div class="hidden lg:flex items-center space-x-8">
                        <a href="#solution" class="text-gray-700 hover:text-tech-blue transition font-medium">解决方案</a>
                        <a href="#plans" class="text-gray-700 hover:text-tech-blue transition font-medium">改造方案</a>
                        <a href="#cases" class="text-gray-700 hover:text-tech-blue transition font-medium">成功案例</a>
                        <a href="#process" class="text-gray-700 hover:text-tech-blue transition font-medium">合作流程</a>
                        <a href="#advantages" class="text-gray-700 hover:text-tech-blue transition font-medium">我们的优势</a>
                        <a href="#contact" class="bg-esports-red hover:bg-esports-red-dark text-white px-6 py-2.5 rounded-lg transition font-semibold shadow-lg">
                            <i class="fas fa-phone-alt mr-2"></i>立即咨询
                        </a>
                    </div>
                    
                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="lg:hidden text-gray-700 focus:outline-none">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
                
                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden lg:hidden pb-4">
                    <div class="flex flex-col space-y-3">
                        <a href="#solution" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">解决方案</a>
                        <a href="#plans" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">改造方案</a>
                        <a href="#cases" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">成功案例</a>
                        <a href="#process" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">合作流程</a>
                        <a href="#advantages" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">我们的优势</a>
                        <a href="#contact" class="bg-esports-red text-white px-6 py-3 rounded-lg transition font-semibold text-center">
                            <i class="fas fa-phone-alt mr-2"></i>立即咨询
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="hero" class="relative pt-20 lg:pt-24 bg-gradient-to-br from-tech-blue-dark via-tech-blue to-tech-blue-light text-white overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-20 left-10 w-64 h-64 bg-esports-red rounded-full filter blur-3xl"></div>
                <div class="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            </div>
            
            <div class="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <!-- 主标题 -->
                    <h1 class="text-3xl lg:text-5xl xl:text-6xl font-black leading-tight mb-6">
                        闲置客房变身<span class="text-esports-red">高收益电竞房</span><br class="hidden lg:block">
                        <span class="text-2xl lg:text-4xl xl:text-5xl">3-6个月回本，营收提升30%-80%</span>
                    </h1>
                    
                    <!-- 副标题 -->
                    <p class="text-lg lg:text-xl text-gray-200 mb-8 lg:mb-10 leading-relaxed">
                        专业一站式电竞房改造服务，无需酒店投入人力精力<br class="hidden lg:block">
                        从设备采购到装修设计，从客源引流到售后维护，全程托管<br class="hidden lg:block">
                        <span class="text-yellow-300 font-bold">让您的闲置房间成为持续盈利的黄金资产</span>
                    </p>
                    
                    <!-- 数据亮点 -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10 lg:mb-12">
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
                            <div class="text-3xl lg:text-4xl font-black text-yellow-300 mb-2">30%-80%</div>
                            <div class="text-sm lg:text-base text-gray-200">营收提升</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
                            <div class="text-3xl lg:text-4xl font-black text-yellow-300 mb-2">3-6月</div>
                            <div class="text-sm lg:text-base text-gray-200">回本周期</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
                            <div class="text-3xl lg:text-4xl font-black text-yellow-300 mb-2">40%↓</div>
                            <div class="text-sm lg:text-base text-gray-200">空置率下降</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
                            <div class="text-3xl lg:text-4xl font-black text-yellow-300 mb-2">85%+</div>
                            <div class="text-sm lg:text-base text-gray-200">客户复购率</div>
                        </div>
                    </div>
                    
                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#contact" class="w-full sm:w-auto bg-esports-red hover:bg-esports-red-dark text-white px-8 lg:px-10 py-4 lg:py-5 rounded-lg transition font-bold text-base lg:text-lg shadow-2xl transform hover:scale-105">
                            <i class="fas fa-gift mr-2"></i>免费获取改造方案
                        </a>
                        <a href="#cases" class="w-full sm:w-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white px-8 lg:px-10 py-4 lg:py-5 rounded-lg transition font-bold text-base lg:text-lg">
                            <i class="fas fa-chart-line mr-2"></i>查看成功案例
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Wave Bottom -->
            <div class="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
                    <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 21.3C1200 21 1320 27 1380 29.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white"/>
                </svg>
            </div>
        </section>

        <!-- Pain Points Section -->
        <section id="pain-points" class="py-16 lg:py-24 bg-gray-50">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        您的酒店是否面临这些困境？
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        传统酒店经营模式已经无法满足市场需求，转型迫在眉睫
                    </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Pain Point 1 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-bed text-2xl text-red-500 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">闲置房间多，利用率低</h3>
                        <p class="text-gray-600 leading-relaxed">
                            淡季空置率高达50%以上，房间空着就是亏钱，每天都在损失成本
                        </p>
                    </div>
                    
                    <!-- Pain Point 2 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-chart-line-down text-2xl text-orange-500 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">营收持续下滑</h3>
                        <p class="text-gray-600 leading-relaxed">
                            房价上不去，入住率下不来，年营收逐年下降，投资回报周期越来越长
                        </p>
                    </div>
                    
                    <!-- Pain Point 3 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-users text-2xl text-yellow-600 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">客群老化，年轻人不来</h3>
                        <p class="text-gray-600 leading-relaxed">
                            缺乏吸引年轻客群的特色项目，18-35岁高消费人群流失严重
                        </p>
                    </div>
                    
                    <!-- Pain Point 4 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-clone text-2xl text-green-600 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">同质化严重，缺乏竞争力</h3>
                        <p class="text-gray-600 leading-relaxed">
                            周边酒店价格战激烈，没有差异化卖点，只能靠降价吸引客户
                        </p>
                    </div>
                    
                    <!-- Pain Point 5 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-calendar-alt text-2xl text-blue-600 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">淡旺季明显，收益不稳</h3>
                        <p class="text-gray-600 leading-relaxed">
                            旺季赚钱淡季亏，全年收益波动大，现金流不稳定影响经营
                        </p>
                    </div>
                    
                    <!-- Pain Point 6 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-money-bill-wave text-2xl text-purple-600 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">改造成本高，不敢尝试</h3>
                        <p class="text-gray-600 leading-relaxed">
                            担心投入大量资金后效果不佳，不知道如何选择靠谱的改造方案
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Solution Section -->
        <section id="solution" class="py-16 lg:py-24 bg-white">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-lightbulb mr-2"></i>解决方案
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        电竞房改造：盘活闲置资产的<span class="text-esports-red">最佳方案</span>
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                        抓住千亿级电竞市场红利，将普通客房升级为高收益电竞房<br class="hidden lg:block">
                        让年轻人主动上门，让空置房间变成赚钱机器
                    </p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
                    <div>
                        <div class="space-y-6">
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-rocket text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">提升房价50%-100%</h3>
                                    <p class="text-gray-600">普通标间改造后房价可达300-600元/晚，高端电竞套房可达800-1500元/晚</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-users text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">吸引18-35岁高消费人群</h3>
                                    <p class="text-gray-600">电竞爱好者消费能力强，平均客单价高，复购率达85%以上</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-calendar-check text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">全年高入住率</h3>
                                    <p class="text-gray-600">电竞房不受淡旺季影响，工作日周末都爆满，年均入住率超75%</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-shield-alt text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">零风险一站式托管</h3>
                                    <p class="text-gray-600">从设计到运营全程托管，您只需提供场地，坐等收益</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-tech-blue to-tech-blue-light rounded-2xl p-8 lg:p-12 text-white">
                        <h3 class="text-2xl lg:text-3xl font-black mb-6">改造收益计算</h3>
                        <div class="space-y-6">
                            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-200">普通标间（改造前）</span>
                                    <span class="text-2xl font-bold">¥150/晚</span>
                                </div>
                                <div class="text-sm text-gray-300">月均入住率：40% | 月收入：¥1,800</div>
                            </div>
                            
                            <div class="text-center">
                                <i class="fas fa-arrow-down text-3xl text-yellow-300"></i>
                            </div>
                            
                            <div class="bg-esports-red/20 backdrop-blur-sm rounded-lg p-6 border-2 border-yellow-300">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-white font-semibold">电竞房（改造后）</span>
                                    <span class="text-3xl font-black text-yellow-300">¥400/晚</span>
                                </div>
                                <div class="text-sm text-yellow-100">月均入住率：75% | 月收入：¥9,000</div>
                            </div>
                            
                            <div class="bg-yellow-300 text-tech-blue-dark rounded-lg p-6 text-center">
                                <div class="text-sm font-semibold mb-2">单间月收益提升</div>
                                <div class="text-4xl font-black">¥7,200</div>
                                <div class="text-sm mt-2">年收益增加 ¥86,400</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Plans Section -->
        <section id="plans" class="py-16 lg:py-24 bg-gray-50">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-layer-group mr-2"></i>改造方案
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        三种方案，满足不同需求
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        根据您的预算和定位，灵活选择最适合的改造方案
                    </p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Plan 1: 经济型 -->
                    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
                        <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white text-center">
                            <h3 class="text-2xl font-black mb-2">经济型电竞房</h3>
                            <p class="text-green-100 text-sm">快速回本，适合大批量改造</p>
                            <div class="mt-6">
                                <div class="text-4xl font-black">¥2.5-3.5万</div>
                                <div class="text-green-100 text-sm mt-1">单间改造成本</div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8">
                            <div class="mb-6">
                                <div class="flex items-center justify-between text-sm mb-4">
                                    <span class="text-gray-600">投资回报</span>
                                    <span class="font-bold text-green-600">3-4个月回本</span>
                                </div>
                                <div class="flex items-center justify-between text-sm mb-4">
                                    <span class="text-gray-600">建议房价</span>
                                    <span class="font-bold text-tech-blue">¥280-380/晚</span>
                                </div>
                            </div>
                            
                            <ul class="space-y-3 mb-8">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                                    <span class="text-gray-700">中高端游戏主机（RTX 3060级）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                                    <span class="text-gray-700">27英寸电竞显示器（144Hz）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                                    <span class="text-gray-700">电竞外设（键鼠耳机）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                                    <span class="text-gray-700">简约电竞主题装修</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                                    <span class="text-gray-700">RGB氛围灯光</span>
                                </li>
                            </ul>
                            
                            <a href="#contact" class="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-bold transition">
                                获取详细方案
                            </a>
                        </div>
                    </div>
                    
                    <!-- Plan 2: 高端型 (推荐) -->
                    <div class="bg-white rounded-2xl overflow-hidden shadow-2xl relative transform scale-105">
                        <div class="absolute top-0 right-0 bg-esports-red text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                            最受欢迎
                        </div>
                        <div class="bg-gradient-to-br from-tech-blue to-tech-blue-light p-6 text-white text-center">
                            <h3 class="text-2xl font-black mb-2">高端电竞房</h3>
                            <p class="text-blue-100 text-sm">性价比最优，强烈推荐</p>
                            <div class="mt-6">
                                <div class="text-4xl font-black">¥4.5-6万</div>
                                <div class="text-blue-100 text-sm mt-1">单间改造成本</div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8">
                            <div class="mb-6">
                                <div class="flex items-center justify-between text-sm mb-4">
                                    <span class="text-gray-600">投资回报</span>
                                    <span class="font-bold text-esports-red">4-6个月回本</span>
                                </div>
                                <div class="flex items-center justify-between text-sm mb-4">
                                    <span class="text-gray-600">建议房价</span>
                                    <span class="font-bold text-tech-blue">¥450-650/晚</span>
                                </div>
                            </div>
                            
                            <ul class="space-y-3 mb-8">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-tech-blue mr-3 mt-1"></i>
                                    <span class="text-gray-700">旗舰级游戏主机（RTX 4070级）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-tech-blue mr-3 mt-1"></i>
                                    <span class="text-gray-700">32英寸曲面电竞屏（240Hz）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-tech-blue mr-3 mt-1"></i>
                                    <span class="text-gray-700">专业电竞座椅</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-tech-blue mr-3 mt-1"></i>
                                    <span class="text-gray-700">高端外设全套（机械键盘等）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-tech-blue mr-3 mt-1"></i>
                                    <span class="text-gray-700">精致电竞主题装修设计</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-tech-blue mr-3 mt-1"></i>
                                    <span class="text-gray-700">智能灯光音响系统</span>
                                </li>
                            </ul>
                            
                            <a href="#contact" class="block w-full bg-tech-blue hover:bg-tech-blue-dark text-white text-center py-3 rounded-lg font-bold transition">
                                获取详细方案
                            </a>
                        </div>
                    </div>
                    
                    <!-- Plan 3: 豪华套房 -->
                    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
                        <div class="bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white text-center">
                            <h3 class="text-2xl font-black mb-2">电竞主题套房</h3>
                            <p class="text-purple-100 text-sm">顶级配置，打造旗舰店</p>
                            <div class="mt-6">
                                <div class="text-4xl font-black">¥8-12万</div>
                                <div class="text-purple-100 text-sm mt-1">单间改造成本</div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8">
                            <div class="mb-6">
                                <div class="flex items-center justify-between text-sm mb-4">
                                    <span class="text-gray-600">投资回报</span>
                                    <span class="font-bold text-purple-600">5-8个月回本</span>
                                </div>
                                <div class="flex items-center justify-between text-sm mb-4">
                                    <span class="text-gray-600">建议房价</span>
                                    <span class="font-bold text-tech-blue">¥800-1500/晚</span>
                                </div>
                            </div>
                            
                            <ul class="space-y-3 mb-8">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                                    <span class="text-gray-700">发烧级主机（RTX 4080+）双机位</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                                    <span class="text-gray-700">多屏电竞显示器阵列</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                                    <span class="text-gray-700">顶级电竞外设套装</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                                    <span class="text-gray-700">沉浸式主题场景设计</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                                    <span class="text-gray-700">智能家居全套系统</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                                    <span class="text-gray-700">专业影音娱乐系统</span>
                                </li>
                            </ul>
                            
                            <a href="#contact" class="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-bold transition">
                                获取详细方案
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="mt-12 text-center">
                    <p class="text-gray-600 mb-4">不确定选择哪种方案？</p>
                    <a href="#contact" class="inline-block bg-esports-red hover:bg-esports-red-dark text-white px-8 py-3 rounded-lg font-bold transition">
                        <i class="fas fa-phone-alt mr-2"></i>联系我们免费上门勘察评估
                    </a>
                </div>
            </div>
        </section>

        <!-- Cases Section -->
        <section id="cases" class="py-16 lg:py-24 bg-white">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-trophy mr-2"></i>成功案例
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        真实数据，看得见的收益
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        已为超过200家酒店完成电竞化改造，平均营收提升65%
                    </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Case 1 -->
                    <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-tech-blue transition">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">杭州某商务酒店</h3>
                                <p class="text-sm text-gray-500">经济型方案 | 20间改造</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-hotel text-green-600 text-xl"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span class="text-gray-600">改造前月均营收</span>
                                <span class="font-bold text-gray-900">¥3.6万</span>
                            </div>
                            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span class="text-gray-600">改造后月均营收</span>
                                <span class="font-bold text-tech-blue">¥18万</span>
                            </div>
                            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span class="text-gray-600">空置率下降</span>
                                <span class="font-bold text-esports-red">45%↓</span>
                            </div>
                        </div>
                        
                        <div class="bg-green-50 rounded-lg p-4 text-center">
                            <div class="text-sm text-gray-600 mb-1">实际回本周期</div>
                            <div class="text-3xl font-black text-green-600">3.5个月</div>
                        </div>
                    </div>
                    
                    <!-- Case 2 -->
                    <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-tech-blue transition">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">成都某连锁酒店</h3>
                                <p class="text-sm text-gray-500">高端方案 | 15间改造</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-building text-blue-600 text-xl"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span class="text-gray-600">改造前月均营收</span>
                                <span class="font-bold text-gray-900">¥4.5万</span>
                            </div>
                            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span class="text-gray-600">改造后月均营收</span>
                                <span class="font-bold text-tech-blue">¥27万</span>
                            </div>
                            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span class="text-gray-600">营收提升</span>
                                <span class="font-bold text-esports-red">80%↑</span>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 rounded-lg p-4 text-center">
                            <div class="text-sm text-gray-600 mb-1">实际回本周期</div>
                            <div class="text-3xl font-black text-blue-600">4.8个月</div>
                        </div>
                    </div>
                    
                    <!-- Case 3 -->
                    <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-tech-blue transition">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">上海某精品酒店</h3>
                                <p class="text-sm text-gray-500">豪华方案 | 5间套房</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-star text-purple-600 text-xl"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span class="text-gray-600">改造前月均营收</span>
                                <span class="font-bold text-gray-900">¥2.4万</span>
                            </div>
                            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span class="text-gray-600">改造后月均营收</span>
                                <span class="font-bold text-tech-blue">¥18万</span>
                            </div>
                            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span class="text-gray-600">平均房价</span>
                                <span class="font-bold text-esports-red">¥1200/晚</span>
                            </div>
                        </div>
                        
                        <div class="bg-purple-50 rounded-lg p-4 text-center">
                            <div class="text-sm text-gray-600 mb-1">实际回本周期</div>
                            <div class="text-3xl font-black text-purple-600">6.5个月</div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-16 bg-gradient-to-br from-tech-blue to-tech-blue-light rounded-2xl p-8 lg:p-12 text-white">
                    <div class="grid md:grid-cols-4 gap-6 lg:gap-8 text-center">
                        <div>
                            <div class="text-4xl lg:text-5xl font-black mb-2">200+</div>
                            <div class="text-blue-100">合作酒店</div>
                        </div>
                        <div>
                            <div class="text-4xl lg:text-5xl font-black mb-2">3500+</div>
                            <div class="text-blue-100">改造房间</div>
                        </div>
                        <div>
                            <div class="text-4xl lg:text-5xl font-black mb-2">65%</div>
                            <div class="text-blue-100">平均营收提升</div>
                        </div>
                        <div>
                            <div class="text-4xl lg:text-5xl font-black mb-2">98%</div>
                            <div class="text-blue-100">客户满意度</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Process Section -->
        <section id="process" class="py-16 lg:py-24 bg-gray-50">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-tasks mr-2"></i>合作流程
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        简单4步，轻松开启盈利之路
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        全程专业团队跟进，零操心托管式服务
                    </p>
                </div>
                
                <div class="max-w-5xl mx-auto">
                    <div class="grid md:grid-cols-4 gap-6 lg:gap-8">
                        <!-- Step 1 -->
                        <div class="relative">
                            <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition">
                                <div class="w-16 h-16 bg-tech-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span class="text-3xl font-black text-white">1</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">联系咨询</h3>
                                <p class="text-gray-600 leading-relaxed">
                                    电话/微信联系<br>
                                    了解需求<br>
                                    初步评估
                                </p>
                            </div>
                            <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <i class="fas fa-arrow-right text-3xl text-gray-300"></i>
                            </div>
                        </div>
                        
                        <!-- Step 2 -->
                        <div class="relative">
                            <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition">
                                <div class="w-16 h-16 bg-tech-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span class="text-3xl font-black text-white">2</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">上门勘察</h3>
                                <p class="text-gray-600 leading-relaxed">
                                    专业团队上门<br>
                                    实地测量评估<br>
                                    定制方案报价
                                </p>
                            </div>
                            <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <i class="fas fa-arrow-right text-3xl text-gray-300"></i>
                            </div>
                        </div>
                        
                        <!-- Step 3 -->
                        <div class="relative">
                            <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition">
                                <div class="w-16 h-16 bg-tech-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span class="text-3xl font-black text-white">3</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">施工改造</h3>
                                <p class="text-gray-600 leading-relaxed">
                                    签约后快速进场<br>
                                    7-15天完工<br>
                                    验收交付
                                </p>
                            </div>
                            <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <i class="fas fa-arrow-right text-3xl text-gray-300"></i>
                            </div>
                        </div>
                        
                        <!-- Step 4 -->
                        <div>
                            <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition">
                                <div class="w-16 h-16 bg-esports-red rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span class="text-3xl font-black text-white">4</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">运营支持</h3>
                                <p class="text-gray-600 leading-relaxed">
                                    客源推广引流<br>
                                    售后维护保障<br>
                                    持续盈利
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-12 text-center">
                    <div class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 inline-block">
                        <p class="text-gray-900 font-semibold">
                            <i class="fas fa-clock text-yellow-600 mr-2"></i>
                            从签约到正式营业，最快<span class="text-esports-red text-xl font-black">10天</span>即可完成
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Advantages Section -->
        <section id="advantages" class="py-16 lg:py-24 bg-white">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-crown mr-2"></i>核心优势
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        为什么选择MICROCONNECT？
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        专业团队，成熟体系，让您的投资更安心
                    </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Advantage 1 -->
                    <div class="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 lg:p-8 border-2 border-blue-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-tech-blue rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-coins text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">低投入高回报</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            单间改造成本2.5万起，3-6个月即可回本，之后全是纯利润，年投资回报率超200%
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>无隐藏费用，报价透明</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 2 -->
                    <div class="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 lg:p-8 border-2 border-green-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-tools text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">一站式全包服务</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            从设计、采购、施工到运营推广，全流程托管，您只需提供场地，其他全部交给我们
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>专业团队，省心省力</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 3 -->
                    <div class="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 lg:p-8 border-2 border-purple-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-shield-alt text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">完善售后保障</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            设备质保2年，免费维修维护，24小时技术支持，设备损坏快速更换，零风险运营
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>长期保障，无后顾之忧</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 4 -->
                    <div class="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 lg:p-8 border-2 border-red-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-esports-red rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-users text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">客源引流支持</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            接入电竞平台，对接线上渠道，提供营销方案，帮您快速获取精准电竞客户流量
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>不愁客源，持续爆满</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 5 -->
                    <div class="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 lg:p-8 border-2 border-yellow-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-laptop text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">顶级设备配置</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            与一线品牌直接合作，采购成本低，品质有保障，所有设备均为电竞级专业配置
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>性能强劲，体验一流</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 6 -->
                    <div class="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 lg:p-8 border-2 border-indigo-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">数据化运营管理</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            提供智能管理系统，实时监控房间状态、营收数据、客户评价，经营情况一目了然
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>科学管理，精准决策</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-tech-blue-dark to-tech-blue text-white relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-10 right-10 w-96 h-96 bg-esports-red rounded-full filter blur-3xl"></div>
                <div class="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            </div>
            
            <div class="container mx-auto px-4 lg:px-8 relative z-10">
                <div class="text-center mb-12 lg:mb-16">
                    <h2 class="text-3xl lg:text-4xl font-black mb-4">
                        立即咨询，免费获取改造方案
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-300">
                        专业团队为您量身定制最优方案，24小时内响应
                    </p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    <!-- Contact Info -->
                    <div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/20">
                            <h3 class="text-2xl font-bold mb-8">联系方式</h3>
                            
                            <div class="space-y-6">
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-esports-red rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-phone-alt text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-300 mb-1">电话咨询</div>
                                        <div class="text-2xl font-bold">400-888-9999</div>
                                        <div class="text-sm text-gray-400 mt-1">工作日 9:00-18:00</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fab fa-weixin text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-300 mb-1">微信咨询</div>
                                        <div class="text-2xl font-bold">MICROCONNECT01</div>
                                        <div class="text-sm text-gray-400 mt-1">扫码添加，实时在线</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-envelope text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-300 mb-1">邮箱咨询</div>
                                        <div class="text-xl font-bold">contact@microconnect.com</div>
                                        <div class="text-sm text-gray-400 mt-1">24小时内必回</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-8 pt-8 border-t border-white/20">
                                <h4 class="font-bold mb-4">服务承诺</h4>
                                <ul class="space-y-3 text-gray-300">
                                    <li class="flex items-center">
                                        <i class="fas fa-check-circle text-green-400 mr-3"></i>
                                        <span>免费上门勘察评估</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fas fa-check-circle text-green-400 mr-3"></i>
                                        <span>定制化方案设计</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fas fa-check-circle text-green-400 mr-3"></i>
                                        <span>透明报价无隐藏费用</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fas fa-check-circle text-green-400 mr-3"></i>
                                        <span>2年质保终身维护</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contact Form -->
                    <div>
                        <div class="bg-white rounded-2xl p-8 lg:p-10 text-gray-900">
                            <h3 class="text-2xl font-bold mb-6 text-gray-900">在线留言</h3>
                            
                            <form id="contact-form" class="space-y-5">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        您的姓名 <span class="text-red-500">*</span>
                                    </label>
                                    <input type="text" name="name" required 
                                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition"
                                           placeholder="请输入您的姓名">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        联系电话 <span class="text-red-500">*</span>
                                    </label>
                                    <input type="tel" name="phone" required 
                                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition"
                                           placeholder="请输入您的手机号">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        微信号
                                    </label>
                                    <input type="text" name="wechat" 
                                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition"
                                           placeholder="方便我们添加您（选填）">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        酒店名称
                                    </label>
                                    <input type="text" name="hotelName" 
                                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition"
                                           placeholder="您的酒店名称（选填）">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        留言内容
                                    </label>
                                    <textarea name="message" rows="4" 
                                              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition resize-none"
                                              placeholder="请简单描述您的需求，如：改造房间数量、预算范围、期望回本周期等"></textarea>
                                </div>
                                
                                <button type="submit" 
                                        class="w-full bg-esports-red hover:bg-esports-red-dark text-white py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 shadow-lg">
                                    <i class="fas fa-paper-plane mr-2"></i>
                                    立即提交，获取方案
                                </button>
                                
                                <p class="text-sm text-gray-500 text-center">
                                    <i class="fas fa-lock mr-1"></i>
                                    您的信息我们将严格保密
                                </p>
                            </form>
                            
                            <div id="form-message" class="mt-4 hidden"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-gray-400 py-8 lg:py-12">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-bolt text-esports-red text-2xl"></i>
                        <span class="text-xl font-black text-white">MICROCONNECT</span>
                    </div>
                    
                    <div class="text-center md:text-left">
                        <p>&copy; 2024 MICROCONNECT. 版权所有</p>
                        <p class="text-sm mt-1">专业酒店电竞化改造服务商</p>
                    </div>
                    
                    <div class="flex space-x-4">
                        <a href="#" class="hover:text-white transition">
                            <i class="fab fa-weixin text-2xl"></i>
                        </a>
                        <a href="#" class="hover:text-white transition">
                            <i class="fab fa-weibo text-2xl"></i>
                        </a>
                        <a href="#" class="hover:text-white transition">
                            <i class="fas fa-phone text-2xl"></i>
                        </a>
                    </div>
                </div>
                
                <div class="mt-6 pt-6 border-t border-gray-800 text-center text-sm">
                    <p>服务热线：400-888-9999 | 微信：MICROCONNECT01 | 邮箱：contact@microconnect.com</p>
                </div>
            </div>
        </footer>

        <!-- Back to Top Button -->
        <button id="back-to-top" class="fixed bottom-8 right-8 bg-esports-red hover:bg-esports-red-dark text-white w-12 h-12 rounded-full shadow-lg hidden transition transform hover:scale-110 z-40">
            <i class="fas fa-arrow-up"></i>
        </button>

        <!-- JavaScript -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));const Je=new vt,us=Object.assign({"/src/index.tsx":Oe});let yt=!1;for(const[,e]of Object.entries(us))e&&(Je.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Je.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),yt=!0);if(!yt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Je as default};
