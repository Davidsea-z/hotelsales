var Ee=Object.defineProperty;var Ut=t=>{throw TypeError(t)};var Ce=(t,e,s)=>e in t?Ee(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var u=(t,e,s)=>Ce(t,typeof e!="symbol"?e+"":e,s),Ht=(t,e,s)=>e.has(t)||Ut("Cannot "+s);var n=(t,e,s)=>(Ht(t,e,"read from private field"),s?s.call(t):e.get(t)),g=(t,e,s)=>e.has(t)?Ut("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),f=(t,e,s,a)=>(Ht(t,e,"write to private field"),a?a.call(t,s):e.set(t,s),s),b=(t,e,s)=>(Ht(t,e,"access private method"),s);var Wt=(t,e,s,a)=>({set _(r){f(t,e,r,s)},get _(){return n(t,e,a)}});var Vt=(t,e,s)=>(a,r)=>{let i=-1;return l(0);async function l(c){if(c<=i)throw new Error("next() called multiple times");i=c;let o,d=!1,x;if(t[c]?(x=t[c][0][0],a.req.routeIndex=c):x=c===t.length&&r||void 0,x)try{o=await x(a,()=>l(c+1))}catch(h){if(h instanceof Error&&e)a.error=h,o=await e(h,a),d=!0;else throw h}else a.finalized===!1&&s&&(o=await s(a));return o&&(a.finalized===!1||d)&&(a.res=o),a}},ke=Symbol(),je=async(t,e=Object.create(null))=>{const{all:s=!1,dot:a=!1}=e,i=(t instanceof oe?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?Re(t,{all:s,dot:a}):{}};async function Re(t,e){const s=await t.formData();return s?Oe(s,e):{}}function Oe(t,e){const s=Object.create(null);return t.forEach((a,r)=>{e.all||r.endsWith("[]")?Te(s,r,a):s[r]=a}),e.dot&&Object.entries(s).forEach(([a,r])=>{a.includes(".")&&(Se(s,a,r),delete s[a])}),s}var Te=(t,e,s)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(s):t[e]=[t[e],s]:e.endsWith("[]")?t[e]=[s]:t[e]=s},Se=(t,e,s)=>{let a=t;const r=e.split(".");r.forEach((i,l)=>{l===r.length-1?a[i]=s:((!a[i]||typeof a[i]!="object"||Array.isArray(a[i])||a[i]instanceof File)&&(a[i]=Object.create(null)),a=a[i])})},ae=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},Ae=t=>{const{groups:e,path:s}=Pe(t),a=ae(s);return Ne(a,e)},Pe=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(s,a)=>{const r=`@${a}`;return e.push([r,s]),r}),{groups:e,path:t}},Ne=(t,e)=>{for(let s=e.length-1;s>=0;s--){const[a]=e[s];for(let r=t.length-1;r>=0;r--)if(t[r].includes(a)){t[r]=t[r].replace(a,e[s][1]);break}}return t},Tt={},Ie=(t,e)=>{if(t==="*")return"*";const s=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${t}#${e}`;return Tt[a]||(s[2]?Tt[a]=e&&e[0]!==":"&&e[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${e})`)]:[t,s[1],new RegExp(`^${s[2]}$`)]:Tt[a]=[t,s[1],!0]),Tt[a]}return null},Ft=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return e(s)}catch{return s}})}},_e=t=>Ft(t,decodeURI),re=t=>{const e=t.url,s=e.indexOf("/",e.indexOf(":")+4);let a=s;for(;a<e.length;a++){const r=e.charCodeAt(a);if(r===37){const i=e.indexOf("?",a),l=e.indexOf("#",a),c=i===-1?l===-1?void 0:l:l===-1?i:Math.min(i,l),o=e.slice(s,c);return _e(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(r===63||r===35)break}return e.slice(s,a)},De=t=>{const e=re(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},it=(t,e,...s)=>(s.length&&(e=it(e,...s)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),ie=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),s=[];let a="";return e.forEach(r=>{if(r!==""&&!/\:/.test(r))a+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){s.length===0&&a===""?s.push("/"):s.push(a);const i=r.replace("?","");a+="/"+i,s.push(a)}else a+="/"+r}),s.filter((r,i,l)=>l.indexOf(r)===i)},$t=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?Ft(t,ne):t):t,le=(t,e,s)=>{let a;if(!s&&e&&!/[%+]/.test(e)){let l=t.indexOf("?",8);if(l===-1)return;for(t.startsWith(e,l+1)||(l=t.indexOf(`&${e}`,l+1));l!==-1;){const c=t.charCodeAt(l+e.length+1);if(c===61){const o=l+e.length+2,d=t.indexOf("&",o);return $t(t.slice(o,d===-1?void 0:d))}else if(c==38||isNaN(c))return"";l=t.indexOf(`&${e}`,l+1)}if(a=/[%+]/.test(t),!a)return}const r={};a??(a=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const l=t.indexOf("&",i+1);let c=t.indexOf("=",i);c>l&&l!==-1&&(c=-1);let o=t.slice(i+1,c===-1?l===-1?void 0:l:c);if(a&&(o=$t(o)),i=l,o==="")continue;let d;c===-1?d="":(d=t.slice(c+1,l===-1?void 0:l),a&&(d=$t(d))),s?(r[o]&&Array.isArray(r[o])||(r[o]=[]),r[o].push(d)):r[o]??(r[o]=d)}return e?r[e]:r},Me=le,He=(t,e)=>le(t,e,!0),ne=decodeURIComponent,Gt=t=>Ft(t,ne),ot,T,B,ce,de,Bt,q,Jt,oe=(Jt=class{constructor(t,e="/",s=[[]]){g(this,B);u(this,"raw");g(this,ot);g(this,T);u(this,"routeIndex",0);u(this,"path");u(this,"bodyCache",{});g(this,q,t=>{const{bodyCache:e,raw:s}=this,a=e[t];if(a)return a;const r=Object.keys(e)[0];return r?e[r].then(i=>(r==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):e[t]=s[t]()});this.raw=t,this.path=e,f(this,T,s),f(this,ot,{})}param(t){return t?b(this,B,ce).call(this,t):b(this,B,de).call(this)}query(t){return Me(this.url,t)}queries(t){return He(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((s,a)=>{e[a]=s}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await je(this,t))}json(){return n(this,q).call(this,"text").then(t=>JSON.parse(t))}text(){return n(this,q).call(this,"text")}arrayBuffer(){return n(this,q).call(this,"arrayBuffer")}blob(){return n(this,q).call(this,"blob")}formData(){return n(this,q).call(this,"formData")}addValidatedData(t,e){n(this,ot)[t]=e}valid(t){return n(this,ot)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[ke](){return n(this,T)}get matchedRoutes(){return n(this,T)[0].map(([[,t]])=>t)}get routePath(){return n(this,T)[0].map(([[,t]])=>t)[this.routeIndex].path}},ot=new WeakMap,T=new WeakMap,B=new WeakSet,ce=function(t){const e=n(this,T)[0][this.routeIndex][1][t],s=b(this,B,Bt).call(this,e);return s&&/\%/.test(s)?Gt(s):s},de=function(){const t={},e=Object.keys(n(this,T)[0][this.routeIndex][1]);for(const s of e){const a=b(this,B,Bt).call(this,n(this,T)[0][this.routeIndex][1][s]);a!==void 0&&(t[s]=/\%/.test(a)?Gt(a):a)}return t},Bt=function(t){return n(this,T)[1]?n(this,T)[1][t]:t},q=new WeakMap,Jt),$e={Stringify:1},xe=async(t,e,s,a,r)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(r?r[0]+=t:r=[t],Promise.all(i.map(c=>c({phase:e,buffer:r,context:a}))).then(c=>Promise.all(c.filter(Boolean).map(o=>xe(o,e,!1,a,r))).then(()=>r[0]))):Promise.resolve(t)},Le="text/plain; charset=UTF-8",Lt=(t,e)=>({"Content-Type":t,...e}),vt=(t,e)=>new Response(t,e),Et,Ct,M,ct,H,R,kt,dt,xt,Y,jt,Rt,z,lt,Qt,Be=(Qt=class{constructor(t,e){g(this,z);g(this,Et);g(this,Ct);u(this,"env",{});g(this,M);u(this,"finalized",!1);u(this,"error");g(this,ct);g(this,H);g(this,R);g(this,kt);g(this,dt);g(this,xt);g(this,Y);g(this,jt);g(this,Rt);u(this,"render",(...t)=>(n(this,dt)??f(this,dt,e=>this.html(e)),n(this,dt).call(this,...t)));u(this,"setLayout",t=>f(this,kt,t));u(this,"getLayout",()=>n(this,kt));u(this,"setRenderer",t=>{f(this,dt,t)});u(this,"header",(t,e,s)=>{this.finalized&&f(this,R,vt(n(this,R).body,n(this,R)));const a=n(this,R)?n(this,R).headers:n(this,Y)??f(this,Y,new Headers);e===void 0?a.delete(t):s!=null&&s.append?a.append(t,e):a.set(t,e)});u(this,"status",t=>{f(this,ct,t)});u(this,"set",(t,e)=>{n(this,M)??f(this,M,new Map),n(this,M).set(t,e)});u(this,"get",t=>n(this,M)?n(this,M).get(t):void 0);u(this,"newResponse",(...t)=>b(this,z,lt).call(this,...t));u(this,"body",(t,e,s)=>b(this,z,lt).call(this,t,e,s));u(this,"text",(t,e,s)=>!n(this,Y)&&!n(this,ct)&&!e&&!s&&!this.finalized?new Response(t):b(this,z,lt).call(this,t,e,Lt(Le,s)));u(this,"json",(t,e,s)=>b(this,z,lt).call(this,JSON.stringify(t),e,Lt("application/json",s)));u(this,"html",(t,e,s)=>{const a=r=>b(this,z,lt).call(this,r,e,Lt("text/html; charset=UTF-8",s));return typeof t=="object"?xe(t,$e.Stringify,!1,{}).then(a):a(t)});u(this,"redirect",(t,e)=>{const s=String(t);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,e??302)});u(this,"notFound",()=>(n(this,xt)??f(this,xt,()=>vt()),n(this,xt).call(this,this)));f(this,Et,t),e&&(f(this,H,e.executionCtx),this.env=e.env,f(this,xt,e.notFoundHandler),f(this,Rt,e.path),f(this,jt,e.matchResult))}get req(){return n(this,Ct)??f(this,Ct,new oe(n(this,Et),n(this,Rt),n(this,jt))),n(this,Ct)}get event(){if(n(this,H)&&"respondWith"in n(this,H))return n(this,H);throw Error("This context has no FetchEvent")}get executionCtx(){if(n(this,H))return n(this,H);throw Error("This context has no ExecutionContext")}get res(){return n(this,R)||f(this,R,vt(null,{headers:n(this,Y)??f(this,Y,new Headers)}))}set res(t){if(n(this,R)&&t){t=vt(t.body,t);for(const[e,s]of n(this,R).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const a=n(this,R).headers.getSetCookie();t.headers.delete("set-cookie");for(const r of a)t.headers.append("set-cookie",r)}else t.headers.set(e,s)}f(this,R,t),this.finalized=!0}get var(){return n(this,M)?Object.fromEntries(n(this,M)):{}}},Et=new WeakMap,Ct=new WeakMap,M=new WeakMap,ct=new WeakMap,H=new WeakMap,R=new WeakMap,kt=new WeakMap,dt=new WeakMap,xt=new WeakMap,Y=new WeakMap,jt=new WeakMap,Rt=new WeakMap,z=new WeakSet,lt=function(t,e,s){const a=n(this,R)?new Headers(n(this,R).headers):n(this,Y)??new Headers;if(typeof e=="object"&&"headers"in e){const i=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[l,c]of i)l.toLowerCase()==="set-cookie"?a.append(l,c):a.set(l,c)}if(s)for(const[i,l]of Object.entries(s))if(typeof l=="string")a.set(i,l);else{a.delete(i);for(const c of l)a.append(i,c)}const r=typeof e=="number"?e:(e==null?void 0:e.status)??n(this,ct);return vt(t,{status:r,headers:a})},Qt),w="ALL",Fe="all",qe=["get","post","put","delete","options","patch"],he="Can not add a route since the matcher is already built.",fe=class extends Error{},ze="__COMPOSED_HANDLER",Ue=t=>t.text("404 Not Found",404),Kt=(t,e)=>{if("getResponse"in t){const s=t.getResponse();return e.newResponse(s.body,s)}return console.error(t),e.text("Internal Server Error",500)},A,E,ue,P,K,St,At,ht,We=(ht=class{constructor(e={}){g(this,E);u(this,"get");u(this,"post");u(this,"put");u(this,"delete");u(this,"options");u(this,"patch");u(this,"all");u(this,"on");u(this,"use");u(this,"router");u(this,"getPath");u(this,"_basePath","/");g(this,A,"/");u(this,"routes",[]);g(this,P,Ue);u(this,"errorHandler",Kt);u(this,"onError",e=>(this.errorHandler=e,this));u(this,"notFound",e=>(f(this,P,e),this));u(this,"fetch",(e,...s)=>b(this,E,At).call(this,e,s[1],s[0],e.method));u(this,"request",(e,s,a,r)=>e instanceof Request?this.fetch(s?new Request(e,s):e,a,r):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${it("/",e)}`,s),a,r)));u(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(b(this,E,At).call(this,e.request,e,void 0,e.request.method))})});[...qe,Fe].forEach(i=>{this[i]=(l,...c)=>(typeof l=="string"?f(this,A,l):b(this,E,K).call(this,i,n(this,A),l),c.forEach(o=>{b(this,E,K).call(this,i,n(this,A),o)}),this)}),this.on=(i,l,...c)=>{for(const o of[l].flat()){f(this,A,o);for(const d of[i].flat())c.map(x=>{b(this,E,K).call(this,d.toUpperCase(),n(this,A),x)})}return this},this.use=(i,...l)=>(typeof i=="string"?f(this,A,i):(f(this,A,"*"),l.unshift(i)),l.forEach(c=>{b(this,E,K).call(this,w,n(this,A),c)}),this);const{strict:a,...r}=e;Object.assign(this,r),this.getPath=a??!0?e.getPath??re:De}route(e,s){const a=this.basePath(e);return s.routes.map(r=>{var l;let i;s.errorHandler===Kt?i=r.handler:(i=async(c,o)=>(await Vt([],s.errorHandler)(c,()=>r.handler(c,o))).res,i[ze]=r.handler),b(l=a,E,K).call(l,r.method,r.path,i)}),this}basePath(e){const s=b(this,E,ue).call(this);return s._basePath=it(this._basePath,e),s}mount(e,s,a){let r,i;a&&(typeof a=="function"?i=a:(i=a.optionHandler,a.replaceRequest===!1?r=o=>o:r=a.replaceRequest));const l=i?o=>{const d=i(o);return Array.isArray(d)?d:[d]}:o=>{let d;try{d=o.executionCtx}catch{}return[o.env,d]};r||(r=(()=>{const o=it(this._basePath,e),d=o==="/"?0:o.length;return x=>{const h=new URL(x.url);return h.pathname=h.pathname.slice(d)||"/",new Request(h,x)}})());const c=async(o,d)=>{const x=await s(r(o.req.raw),...l(o));if(x)return x;await d()};return b(this,E,K).call(this,w,it(e,"*"),c),this}},A=new WeakMap,E=new WeakSet,ue=function(){const e=new ht({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,f(e,P,n(this,P)),e.routes=this.routes,e},P=new WeakMap,K=function(e,s,a){e=e.toUpperCase(),s=it(this._basePath,s);const r={basePath:this._basePath,path:s,method:e,handler:a};this.router.add(e,s,[a,r]),this.routes.push(r)},St=function(e,s){if(e instanceof Error)return this.errorHandler(e,s);throw e},At=function(e,s,a,r){if(r==="HEAD")return(async()=>new Response(null,await b(this,E,At).call(this,e,s,a,"GET")))();const i=this.getPath(e,{env:a}),l=this.router.match(r,i),c=new Be(e,{path:i,matchResult:l,env:a,executionCtx:s,notFoundHandler:n(this,P)});if(l[0].length===1){let d;try{d=l[0][0][0][0](c,async()=>{c.res=await n(this,P).call(this,c)})}catch(x){return b(this,E,St).call(this,x,c)}return d instanceof Promise?d.then(x=>x||(c.finalized?c.res:n(this,P).call(this,c))).catch(x=>b(this,E,St).call(this,x,c)):d??n(this,P).call(this,c)}const o=Vt(l[0],this.errorHandler,n(this,P));return(async()=>{try{const d=await o(c);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return b(this,E,St).call(this,d,c)}})()},ht),pe=[];function Ve(t,e){const s=this.buildAllMatchers(),a=((r,i)=>{const l=s[r]||s[w],c=l[2][i];if(c)return c;const o=i.match(l[0]);if(!o)return[[],pe];const d=o.indexOf("",1);return[l[1][d],o]});return this.match=a,a(t,e)}var Nt="[^/]+",yt=".*",wt="(?:|/.*)",nt=Symbol(),Ge=new Set(".\\+*[^]$()");function Ke(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===yt||t===wt?1:e===yt||e===wt?-1:t===Nt?1:e===Nt?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var J,Q,N,et,Xe=(et=class{constructor(){g(this,J);g(this,Q);g(this,N,Object.create(null))}insert(e,s,a,r,i){if(e.length===0){if(n(this,J)!==void 0)throw nt;if(i)return;f(this,J,s);return}const[l,...c]=e,o=l==="*"?c.length===0?["","",yt]:["","",Nt]:l==="/*"?["","",wt]:l.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(o){const x=o[1];let h=o[2]||Nt;if(x&&o[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw nt;if(d=n(this,N)[h],!d){if(Object.keys(n(this,N)).some(p=>p!==yt&&p!==wt))throw nt;if(i)return;d=n(this,N)[h]=new et,x!==""&&f(d,Q,r.varIndex++)}!i&&x!==""&&a.push([x,n(d,Q)])}else if(d=n(this,N)[l],!d){if(Object.keys(n(this,N)).some(x=>x.length>1&&x!==yt&&x!==wt))throw nt;if(i)return;d=n(this,N)[l]=new et}d.insert(c,s,a,r,i)}buildRegExpStr(){const s=Object.keys(n(this,N)).sort(Ke).map(a=>{const r=n(this,N)[a];return(typeof n(r,Q)=="number"?`(${a})@${n(r,Q)}`:Ge.has(a)?`\\${a}`:a)+r.buildRegExpStr()});return typeof n(this,J)=="number"&&s.unshift(`#${n(this,J)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},J=new WeakMap,Q=new WeakMap,N=new WeakMap,et),It,Ot,Zt,Ye=(Zt=class{constructor(){g(this,It,{varIndex:0});g(this,Ot,new Xe)}insert(t,e,s){const a=[],r=[];for(let l=0;;){let c=!1;if(t=t.replace(/\{[^}]+\}/g,o=>{const d=`@\\${l}`;return r[l]=[d,o],l++,c=!0,d}),!c)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let l=r.length-1;l>=0;l--){const[c]=r[l];for(let o=i.length-1;o>=0;o--)if(i[o].indexOf(c)!==-1){i[o]=i[o].replace(c,r[l][1]);break}}return n(this,Ot).insert(i,e,a,n(this,It),s),a}buildRegExp(){let t=n(this,Ot).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const s=[],a=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,i,l)=>i!==void 0?(s[++e]=Number(i),"$()"):(l!==void 0&&(a[Number(l)]=++e),"")),[new RegExp(`^${t}`),s,a]}},It=new WeakMap,Ot=new WeakMap,Zt),Je=[/^$/,[],Object.create(null)],Pt=Object.create(null);function ge(t){return Pt[t]??(Pt[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Qe(){Pt=Object.create(null)}function Ze(t){var d;const e=new Ye,s=[];if(t.length===0)return Je;const a=t.map(x=>[!/\*|\/:/.test(x[0]),...x]).sort(([x,h],[p,v])=>x?1:p?-1:h.length-v.length),r=Object.create(null);for(let x=0,h=-1,p=a.length;x<p;x++){const[v,m,S]=a[x];v?r[m]=[S.map(([O])=>[O,Object.create(null)]),pe]:h++;let C;try{C=e.insert(m,h,v)}catch(O){throw O===nt?new fe(m):O}v||(s[h]=S.map(([O,y])=>{const _=Object.create(null);for(y-=1;y>=0;y--){const[pt,Dt]=C[y];_[pt]=Dt}return[O,_]}))}const[i,l,c]=e.buildRegExp();for(let x=0,h=s.length;x<h;x++)for(let p=0,v=s[x].length;p<v;p++){const m=(d=s[x][p])==null?void 0:d[1];if(!m)continue;const S=Object.keys(m);for(let C=0,O=S.length;C<O;C++)m[S[C]]=c[m[S[C]]]}const o=[];for(const x in l)o[x]=s[l[x]];return[i,o,r]}function rt(t,e){if(t){for(const s of Object.keys(t).sort((a,r)=>r.length-a.length))if(ge(s).test(e))return[...t[s]]}}var U,W,_t,be,te,ts=(te=class{constructor(){g(this,_t);u(this,"name","RegExpRouter");g(this,U);g(this,W);u(this,"match",Ve);f(this,U,{[w]:Object.create(null)}),f(this,W,{[w]:Object.create(null)})}add(t,e,s){var c;const a=n(this,U),r=n(this,W);if(!a||!r)throw new Error(he);a[t]||[a,r].forEach(o=>{o[t]=Object.create(null),Object.keys(o[w]).forEach(d=>{o[t][d]=[...o[w][d]]})}),e==="/*"&&(e="*");const i=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const o=ge(e);t===w?Object.keys(a).forEach(d=>{var x;(x=a[d])[e]||(x[e]=rt(a[d],e)||rt(a[w],e)||[])}):(c=a[t])[e]||(c[e]=rt(a[t],e)||rt(a[w],e)||[]),Object.keys(a).forEach(d=>{(t===w||t===d)&&Object.keys(a[d]).forEach(x=>{o.test(x)&&a[d][x].push([s,i])})}),Object.keys(r).forEach(d=>{(t===w||t===d)&&Object.keys(r[d]).forEach(x=>o.test(x)&&r[d][x].push([s,i]))});return}const l=ie(e)||[e];for(let o=0,d=l.length;o<d;o++){const x=l[o];Object.keys(r).forEach(h=>{var p;(t===w||t===h)&&((p=r[h])[x]||(p[x]=[...rt(a[h],x)||rt(a[w],x)||[]]),r[h][x].push([s,i-d+o+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(n(this,W)).concat(Object.keys(n(this,U))).forEach(e=>{t[e]||(t[e]=b(this,_t,be).call(this,e))}),f(this,U,f(this,W,void 0)),Qe(),t}},U=new WeakMap,W=new WeakMap,_t=new WeakSet,be=function(t){const e=[];let s=t===w;return[n(this,U),n(this,W)].forEach(a=>{const r=a[t]?Object.keys(a[t]).map(i=>[i,a[t][i]]):[];r.length!==0?(s||(s=!0),e.push(...r)):t!==w&&e.push(...Object.keys(a[w]).map(i=>[i,a[w][i]]))}),s?Ze(e):null},te),V,$,ee,es=(ee=class{constructor(t){u(this,"name","SmartRouter");g(this,V,[]);g(this,$,[]);f(this,V,t.routers)}add(t,e,s){if(!n(this,$))throw new Error(he);n(this,$).push([t,e,s])}match(t,e){if(!n(this,$))throw new Error("Fatal error");const s=n(this,V),a=n(this,$),r=s.length;let i=0,l;for(;i<r;i++){const c=s[i];try{for(let o=0,d=a.length;o<d;o++)c.add(...a[o]);l=c.match(t,e)}catch(o){if(o instanceof fe)continue;throw o}this.match=c.match.bind(c),f(this,V,[c]),f(this,$,void 0);break}if(i===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,l}get activeRouter(){if(n(this,$)||n(this,V).length!==1)throw new Error("No active router has been determined yet.");return n(this,V)[0]}},V=new WeakMap,$=new WeakMap,ee),mt=Object.create(null),ss=t=>{for(const e in t)return!0;return!1},G,j,Z,ft,k,L,X,ut,as=(ut=class{constructor(e,s,a){g(this,L);g(this,G);g(this,j);g(this,Z);g(this,ft,0);g(this,k,mt);if(f(this,j,a||Object.create(null)),f(this,G,[]),e&&s){const r=Object.create(null);r[e]={handler:s,possibleKeys:[],score:0},f(this,G,[r])}f(this,Z,[])}insert(e,s,a){f(this,ft,++Wt(this,ft)._);let r=this;const i=Ae(s),l=[];for(let c=0,o=i.length;c<o;c++){const d=i[c],x=i[c+1],h=Ie(d,x),p=Array.isArray(h)?h[0]:d;if(p in n(r,j)){r=n(r,j)[p],h&&l.push(h[1]);continue}n(r,j)[p]=new ut,h&&(n(r,Z).push(h),l.push(h[1])),r=n(r,j)[p]}return n(r,G).push({[e]:{handler:a,possibleKeys:l.filter((c,o,d)=>d.indexOf(c)===o),score:n(this,ft)}}),r}search(e,s){var x;const a=[];f(this,k,mt);let i=[this];const l=ae(s),c=[],o=l.length;let d=null;for(let h=0;h<o;h++){const p=l[h],v=h===o-1,m=[];for(let C=0,O=i.length;C<O;C++){const y=i[C],_=n(y,j)[p];_&&(f(_,k,n(y,k)),v?(n(_,j)["*"]&&b(this,L,X).call(this,a,n(_,j)["*"],e,n(y,k)),b(this,L,X).call(this,a,_,e,n(y,k))):m.push(_));for(let pt=0,Dt=n(y,Z).length;pt<Dt;pt++){const qt=n(y,Z)[pt],F=n(y,k)===mt?{}:{...n(y,k)};if(qt==="*"){const st=n(y,j)["*"];st&&(b(this,L,X).call(this,a,st,e,n(y,k)),f(st,k,F),m.push(st));continue}const[we,zt,gt]=qt;if(!p&&!(gt instanceof RegExp))continue;const D=n(y,j)[we];if(gt instanceof RegExp){if(d===null){d=new Array(o);let at=s[0]==="/"?1:0;for(let bt=0;bt<o;bt++)d[bt]=at,at+=l[bt].length+1}const st=s.substring(d[h]),Mt=gt.exec(st);if(Mt){if(F[zt]=Mt[0],b(this,L,X).call(this,a,D,e,n(y,k),F),ss(n(D,j))){f(D,k,F);const at=((x=Mt[0].match(/\//))==null?void 0:x.length)??0;(c[at]||(c[at]=[])).push(D)}continue}}(gt===!0||gt.test(p))&&(F[zt]=p,v?(b(this,L,X).call(this,a,D,e,F,n(y,k)),n(D,j)["*"]&&b(this,L,X).call(this,a,n(D,j)["*"],e,F,n(y,k))):(f(D,k,F),m.push(D)))}}const S=c.shift();i=S?m.concat(S):m}return a.length>1&&a.sort((h,p)=>h.score-p.score),[a.map(({handler:h,params:p})=>[h,p])]}},G=new WeakMap,j=new WeakMap,Z=new WeakMap,ft=new WeakMap,k=new WeakMap,L=new WeakSet,X=function(e,s,a,r,i){for(let l=0,c=n(s,G).length;l<c;l++){const o=n(s,G)[l],d=o[a]||o[w],x={};if(d!==void 0&&(d.params=Object.create(null),e.push(d),r!==mt||i&&i!==mt))for(let h=0,p=d.possibleKeys.length;h<p;h++){const v=d.possibleKeys[h],m=x[d.score];d.params[v]=i!=null&&i[v]&&!m?i[v]:r[v]??(i==null?void 0:i[v]),x[d.score]=!0}}},ut),tt,se,rs=(se=class{constructor(){u(this,"name","TrieRouter");g(this,tt);f(this,tt,new as)}add(t,e,s){const a=ie(e);if(a){for(let r=0,i=a.length;r<i;r++)n(this,tt).insert(t,a[r],s);return}n(this,tt).insert(t,e,s)}match(t,e){return n(this,tt).search(t,e)}},tt=new WeakMap,se),ve=class extends We{constructor(t={}){super(t),this.router=t.router??new es({routers:[new ts,new rs]})}},is=t=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},a=(i=>typeof i=="string"?i==="*"?()=>i:l=>i===l?l:null:typeof i=="function"?i:l=>i.includes(l)?l:null)(s.origin),r=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(s.allowMethods);return async function(l,c){var x;function o(h,p){l.res.headers.set(h,p)}const d=await a(l.req.header("origin")||"",l);if(d&&o("Access-Control-Allow-Origin",d),s.credentials&&o("Access-Control-Allow-Credentials","true"),(x=s.exposeHeaders)!=null&&x.length&&o("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),l.req.method==="OPTIONS"){s.origin!=="*"&&o("Vary","Origin"),s.maxAge!=null&&o("Access-Control-Max-Age",s.maxAge.toString());const h=await r(l.req.header("origin")||"",l);h.length&&o("Access-Control-Allow-Methods",h.join(","));let p=s.allowHeaders;if(!(p!=null&&p.length)){const v=l.req.header("Access-Control-Request-Headers");v&&(p=v.split(/\s*,\s*/))}return p!=null&&p.length&&(o("Access-Control-Allow-Headers",p.join(",")),l.res.headers.append("Vary","Access-Control-Request-Headers")),l.res.headers.delete("Content-Length"),l.res.headers.delete("Content-Type"),new Response(null,{headers:l.res.headers,status:204,statusText:"No Content"})}await c(),s.origin!=="*"&&l.header("Vary","Origin",{append:!0})}},ls=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Xt=(t,e=os)=>{const s=/\.([a-zA-Z0-9]+?)$/,a=t.match(s);if(!a)return;let r=e[a[1]];return r&&r.startsWith("text")&&(r+="; charset=utf-8"),r},ns={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},os=ns,cs=(...t)=>{let e=t.filter(r=>r!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=e.split("/"),a=[];for(const r of s)r===".."&&a.length>0&&a.at(-1)!==".."?a.pop():r!=="."&&a.push(r);return a.join("/")||"."},me={br:".br",zstd:".zst",gzip:".gz"},ds=Object.keys(me),xs="index.html",hs=t=>{const e=t.root??"./",s=t.path,a=t.join??cs;return async(r,i)=>{var x,h,p,v;if(r.finalized)return i();let l;if(t.path)l=t.path;else try{if(l=decodeURIComponent(r.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(l))throw new Error}catch{return await((x=t.onNotFound)==null?void 0:x.call(t,r.req.path,r)),i()}let c=a(e,!s&&t.rewriteRequestPath?t.rewriteRequestPath(l):l);t.isDir&&await t.isDir(c)&&(c=a(c,xs));const o=t.getContent;let d=await o(c,r);if(d instanceof Response)return r.newResponse(d.body,d);if(d){const m=t.mimes&&Xt(c,t.mimes)||Xt(c);if(r.header("Content-Type",m||"application/octet-stream"),t.precompressed&&(!m||ls.test(m))){const S=new Set((h=r.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(C=>C.trim()));for(const C of ds){if(!S.has(C))continue;const O=await o(c+me[C],r);if(O){d=O,r.header("Content-Encoding",C),r.header("Vary","Accept-Encoding",{append:!0});break}}}return await((p=t.onFound)==null?void 0:p.call(t,c,r)),r.body(d)}await((v=t.onNotFound)==null?void 0:v.call(t,c,r)),await i()}},fs=async(t,e)=>{let s;e&&e.manifest?typeof e.manifest=="string"?s=JSON.parse(e.manifest):s=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let a;e&&e.namespace?a=e.namespace:a=__STATIC_CONTENT;const r=s[t];if(!r)return null;const i=await a.get(r,{type:"stream"});return i||null},us=t=>async function(s,a){return hs({...t,getContent:async i=>fs(i,{manifest:t.manifest,namespace:t.namespace?t.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,a)},ps=t=>us(t);const I=new ve;I.use("/api/*",is());I.use("/static/*",ps({root:"./public"}));I.post("/api/contact",async t=>{try{const{name:e,phone:s,wechat:a,hotelName:r,message:i}=await t.req.json(),{env:l}=t,c=t.req.header("cf-connecting-ip")||t.req.header("x-forwarded-for")||"unknown",o=t.req.header("user-agent")||"unknown",d=await l.DB.prepare(`
      INSERT INTO contacts (name, phone, wechat, hotel_name, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(e,s,a||null,r||null,i||null,c,o).run();return console.log("新咨询已保存到数据库:",{id:d.meta.last_row_id,name:e,phone:s,hotel_name:r}),t.json({success:!0,message:"感谢您的咨询，我们会尽快与您联系！",id:d.meta.last_row_id})}catch(e){return console.error("保存咨询失败:",e),t.json({success:!1,message:"提交失败，请稍后再试"},500)}});I.get("/api/contacts",async t=>{try{const{env:e}=t,{results:s}=await e.DB.prepare(`
      SELECT 
        id, name, phone, wechat, hotel_name, message, 
        status, created_at, notes
      FROM contacts 
      ORDER BY created_at DESC 
      LIMIT 100
    `).all();return t.json({success:!0,data:s,count:s.length})}catch(e){return console.error("查询失败:",e),t.json({success:!1,message:"查询失败"},500)}});I.put("/api/contacts/:id",async t=>{try{const{env:e}=t,s=t.req.param("id"),{status:a,notes:r}=await t.req.json();return await e.DB.prepare(`
      UPDATE contacts 
      SET status = ?, notes = ?
      WHERE id = ?
    `).bind(a,r||null,s).run(),t.json({success:!0,message:"更新成功"})}catch(e){return console.error("更新失败:",e),t.json({success:!1,message:"更新失败"},500)}});I.delete("/api/contacts/:id",async t=>{try{const{env:e}=t,s=t.req.param("id");return await e.DB.prepare(`
      DELETE FROM contacts WHERE id = ?
    `).bind(s).run(),t.json({success:!0,message:"删除成功"})}catch(e){return console.error("删除失败:",e),t.json({success:!1,message:"删除失败"},500)}});I.get("/api/stats",async t=>{var e,s,a;try{const{env:r}=t,{results:i}=await r.DB.prepare(`
      SELECT COUNT(*) as count FROM contacts
    `).all(),{results:l}=await r.DB.prepare(`
      SELECT status, COUNT(*) as count 
      FROM contacts 
      GROUP BY status
    `).all(),{results:c}=await r.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM contacts 
      WHERE DATE(created_at) = DATE('now')
    `).all(),{results:o}=await r.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM contacts 
      WHERE DATE(created_at) >= DATE('now', '-7 days')
    `).all();return t.json({success:!0,data:{total:((e=i[0])==null?void 0:e.count)||0,today:((s=c[0])==null?void 0:s.count)||0,week:((a=o[0])==null?void 0:a.count)||0,byStatus:l}})}catch(r){return console.error("统计失败:",r),t.json({success:!1,message:"统计失败"},500)}});I.get("/admin",t=>t.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MICROCONNECT - 咨询管理后台</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'tech-blue': '#0A4D8C',
                  'esports-red': '#E63946',
                }
              }
            }
          }
        <\/script>
    </head>
    <body class="bg-gray-100">
        <!-- Header -->
        <header class="bg-white shadow-md">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-bolt text-esports-red text-2xl"></i>
                    <span class="text-xl font-black text-tech-blue">MICROCONNECT</span>
                    <span class="text-sm text-gray-500 ml-4">咨询管理后台</span>
                </div>
                <a href="/" class="text-gray-600 hover:text-tech-blue transition">
                    <i class="fas fa-home mr-2"></i>返回首页
                </a>
            </div>
        </header>

        <!-- Main Content -->
        <div class="container mx-auto px-4 py-8">
            <!-- 统计卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">总咨询数</p>
                            <p id="stat-total" class="text-3xl font-bold text-tech-blue">0</p>
                        </div>
                        <i class="fas fa-inbox text-4xl text-tech-blue opacity-20"></i>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">今日咨询</p>
                            <p id="stat-today" class="text-3xl font-bold text-green-600">0</p>
                        </div>
                        <i class="fas fa-calendar-day text-4xl text-green-600 opacity-20"></i>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">本周咨询</p>
                            <p id="stat-week" class="text-3xl font-bold text-purple-600">0</p>
                        </div>
                        <i class="fas fa-calendar-week text-4xl text-purple-600 opacity-20"></i>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">待跟进</p>
                            <p id="stat-new" class="text-3xl font-bold text-esports-red">0</p>
                        </div>
                        <i class="fas fa-exclamation-circle text-4xl text-esports-red opacity-20"></i>
                    </div>
                </div>
            </div>

            <!-- 筛选和搜索 -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="search-input" placeholder="搜索姓名、电话、酒店名称..."
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent">
                    </div>
                    <select id="status-filter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tech-blue">
                        <option value="">所有状态</option>
                        <option value="new">待跟进</option>
                        <option value="contacted">已联系</option>
                        <option value="converted">已转化</option>
                        <option value="lost">已流失</option>
                    </select>
                    <button onclick="loadContacts()" class="px-6 py-2 bg-tech-blue text-white rounded-lg hover:bg-opacity-90 transition">
                        <i class="fas fa-search mr-2"></i>搜索
                    </button>
                    <button onclick="exportData()" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-opacity-90 transition">
                        <i class="fas fa-download mr-2"></i>导出
                    </button>
                </div>
            </div>

            <!-- 咨询列表 -->
            <div class="bg-white rounded-lg shadow">
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-xl font-bold text-gray-800">咨询记录</h2>
                </div>
                <div id="contacts-list" class="divide-y divide-gray-200">
                    <div class="p-8 text-center text-gray-500">
                        <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                        <p>加载中...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 编辑模态框 -->
        <div id="edit-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-bold">编辑咨询</h3>
                </div>
                <div class="p-6">
                    <input type="hidden" id="edit-id">
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">状态</label>
                        <select id="edit-status" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="new">待跟进</option>
                            <option value="contacted">已联系</option>
                            <option value="converted">已转化</option>
                            <option value="lost">已流失</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">备注</label>
                        <textarea id="edit-notes" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
                    </div>
                </div>
                <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
                    <button onclick="closeEditModal()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
                        取消
                    </button>
                    <button onclick="saveEdit()" class="px-4 py-2 bg-tech-blue text-white rounded-lg hover:bg-opacity-90 transition">
                        保存
                    </button>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script>
            let allContacts = [];

            // 加载统计数据
            async function loadStats() {
                try {
                    const res = await axios.get('/api/stats');
                    if (res.data.success) {
                        const stats = res.data.data;
                        document.getElementById('stat-total').textContent = stats.total;
                        document.getElementById('stat-today').textContent = stats.today;
                        document.getElementById('stat-week').textContent = stats.week;
                        
                        // 计算待跟进数量
                        const newCount = stats.byStatus.find(s => s.status === 'new')?.count || 0;
                        document.getElementById('stat-new').textContent = newCount;
                    }
                } catch (error) {
                    console.error('加载统计失败:', error);
                }
            }

            // 加载咨询列表
            async function loadContacts() {
                try {
                    const res = await axios.get('/api/contacts');
                    if (res.data.success) {
                        allContacts = res.data.data;
                        renderContacts(allContacts);
                    }
                } catch (error) {
                    console.error('加载失败:', error);
                    document.getElementById('contacts-list').innerHTML = \`
                        <div class="p-8 text-center text-red-500">
                            <i class="fas fa-exclamation-triangle text-3xl mb-4"></i>
                            <p>加载失败，请刷新重试</p>
                        </div>
                    \`;
                }
            }

            // 渲染咨询列表
            function renderContacts(contacts) {
                const searchTerm = document.getElementById('search-input').value.toLowerCase();
                const statusFilter = document.getElementById('status-filter').value;
                
                // 筛选
                let filtered = contacts.filter(c => {
                    const matchSearch = !searchTerm || 
                        c.name.toLowerCase().includes(searchTerm) ||
                        c.phone.includes(searchTerm) ||
                        (c.hotel_name && c.hotel_name.toLowerCase().includes(searchTerm));
                    const matchStatus = !statusFilter || c.status === statusFilter;
                    return matchSearch && matchStatus;
                });

                if (filtered.length === 0) {
                    document.getElementById('contacts-list').innerHTML = \`
                        <div class="p-8 text-center text-gray-500">
                            <i class="fas fa-inbox text-3xl mb-4"></i>
                            <p>暂无数据</p>
                        </div>
                    \`;
                    return;
                }

                const html = filtered.map(contact => {
                    const statusColors = {
                        'new': 'bg-blue-100 text-blue-800',
                        'contacted': 'bg-yellow-100 text-yellow-800',
                        'converted': 'bg-green-100 text-green-800',
                        'lost': 'bg-red-100 text-red-800'
                    };
                    const statusLabels = {
                        'new': '待跟进',
                        'contacted': '已联系',
                        'converted': '已转化',
                        'lost': '已流失'
                    };
                    
                    return \`
                        <div class="p-6 hover:bg-gray-50 transition">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-3 mb-2">
                                        <h3 class="text-lg font-bold text-gray-900">\${contact.name}</h3>
                                        <span class="px-3 py-1 rounded-full text-xs font-semibold \${statusColors[contact.status]}">
                                            \${statusLabels[contact.status]}
                                        </span>
                                    </div>
                                    <div class="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                        <p><i class="fas fa-phone text-tech-blue mr-2"></i><strong>电话:</strong> \${contact.phone}</p>
                                        <p><i class="fas fa-weixin text-green-600 mr-2"></i><strong>微信:</strong> \${contact.wechat || '未提供'}</p>
                                        <p><i class="fas fa-hotel text-purple-600 mr-2"></i><strong>酒店:</strong> \${contact.hotel_name || '未提供'}</p>
                                        <p><i class="fas fa-clock text-gray-500 mr-2"></i><strong>时间:</strong> \${new Date(contact.created_at).toLocaleString('zh-CN')}</p>
                                    </div>
                                    \${contact.message ? \`
                                        <div class="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-2">
                                            <strong>留言:</strong> \${contact.message}
                                        </div>
                                    \` : ''}
                                    \${contact.notes ? \`
                                        <div class="bg-yellow-50 rounded-lg p-3 text-sm text-gray-700">
                                            <strong>备注:</strong> \${contact.notes}
                                        </div>
                                    \` : ''}
                                </div>
                                <div class="flex flex-col space-y-2 ml-4">
                                    <button onclick="editContact(\${contact.id})" class="px-4 py-2 bg-tech-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition">
                                        <i class="fas fa-edit mr-1"></i>编辑
                                    </button>
                                    <button onclick="deleteContact(\${contact.id})" class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-opacity-90 transition">
                                        <i class="fas fa-trash mr-1"></i>删除
                                    </button>
                                    <a href="tel:\${contact.phone}" class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-opacity-90 transition text-center">
                                        <i class="fas fa-phone mr-1"></i>拨打
                                    </a>
                                </div>
                            </div>
                        </div>
                    \`;
                }).join('');

                document.getElementById('contacts-list').innerHTML = html;
            }

            // 编辑咨询
            function editContact(id) {
                const contact = allContacts.find(c => c.id === id);
                if (!contact) return;

                document.getElementById('edit-id').value = id;
                document.getElementById('edit-status').value = contact.status;
                document.getElementById('edit-notes').value = contact.notes || '';
                document.getElementById('edit-modal').classList.remove('hidden');
            }

            // 关闭编辑模态框
            function closeEditModal() {
                document.getElementById('edit-modal').classList.add('hidden');
            }

            // 保存编辑
            async function saveEdit() {
                const id = document.getElementById('edit-id').value;
                const status = document.getElementById('edit-status').value;
                const notes = document.getElementById('edit-notes').value;

                try {
                    const res = await axios.put(\`/api/contacts/\${id}\`, { status, notes });
                    if (res.data.success) {
                        closeEditModal();
                        await loadContacts();
                        await loadStats();
                        alert('更新成功！');
                    }
                } catch (error) {
                    console.error('保存失败:', error);
                    alert('保存失败，请重试');
                }
            }

            // 删除咨询
            async function deleteContact(id) {
                if (!confirm('确定要删除这条咨询记录吗？')) return;

                try {
                    const res = await axios.delete(\`/api/contacts/\${id}\`);
                    if (res.data.success) {
                        await loadContacts();
                        await loadStats();
                        alert('删除成功！');
                    }
                } catch (error) {
                    console.error('删除失败:', error);
                    alert('删除失败，请重试');
                }
            }

            // 导出数据
            function exportData() {
                const csv = [
                    ['ID', '姓名', '电话', '微信', '酒店名称', '留言', '状态', '创建时间', '备注'].join(','),
                    ...allContacts.map(c => [
                        c.id,
                        c.name,
                        c.phone,
                        c.wechat || '',
                        c.hotel_name || '',
                        (c.message || '').replace(/,/g, '，'),
                        c.status,
                        c.created_at,
                        (c.notes || '').replace(/,/g, '，')
                    ].join(','))
                ].join('\\n');

                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = \`咨询记录_\${new Date().toISOString().split('T')[0]}.csv\`;
                link.click();
            }

            // 搜索框实时搜索
            document.getElementById('search-input').addEventListener('input', () => {
                renderContacts(allContacts);
            });

            // 状态筛选
            document.getElementById('status-filter').addEventListener('change', () => {
                renderContacts(allContacts);
            });

            // 页面加载时初始化
            window.addEventListener('load', () => {
                loadStats();
                loadContacts();
                // 每30秒自动刷新
                setInterval(() => {
                    loadStats();
                    loadContacts();
                }, 30000);
            });
        <\/script>
    </body>
    </html>
  `));I.get("/",t=>t.html(`
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
  `));const Yt=new ve,gs=Object.assign({"/src/index.tsx":I});let ye=!1;for(const[,t]of Object.entries(gs))t&&(Yt.all("*",e=>{let s;try{s=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,s)}),Yt.notFound(e=>{let s;try{s=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,s)}),ye=!0);if(!ye)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Yt as default};
