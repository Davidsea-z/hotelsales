var Ee=Object.defineProperty;var zt=t=>{throw TypeError(t)};var Ce=(t,e,s)=>e in t?Ee(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var p=(t,e,s)=>Ce(t,typeof e!="symbol"?e+"":e,s),$t=(t,e,s)=>e.has(t)||zt("Cannot "+s);var n=(t,e,s)=>($t(t,e,"read from private field"),s?s.call(t):e.get(t)),g=(t,e,s)=>e.has(t)?zt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),h=(t,e,s,a)=>($t(t,e,"write to private field"),a?a.call(t,s):e.set(t,s),s),v=(t,e,s)=>($t(t,e,"access private method"),s);var Wt=(t,e,s,a)=>({set _(i){h(t,e,i,s)},get _(){return n(t,e,a)}});var Vt=(t,e,s)=>(a,i)=>{let r=-1;return l(0);async function l(c){if(c<=r)throw new Error("next() called multiple times");r=c;let o,d=!1,x;if(t[c]?(x=t[c][0][0],a.req.routeIndex=c):x=c===t.length&&i||void 0,x)try{o=await x(a,()=>l(c+1))}catch(f){if(f instanceof Error&&e)a.error=f,o=await e(f,a),d=!0;else throw f}else a.finalized===!1&&s&&(o=await s(a));return o&&(a.finalized===!1||d)&&(a.res=o),a}},ke=Symbol(),je=async(t,e=Object.create(null))=>{const{all:s=!1,dot:a=!1}=e,r=(t instanceof oe?t.raw.headers:t.headers).get("Content-Type");return r!=null&&r.startsWith("multipart/form-data")||r!=null&&r.startsWith("application/x-www-form-urlencoded")?Re(t,{all:s,dot:a}):{}};async function Re(t,e){const s=await t.formData();return s?Oe(s,e):{}}function Oe(t,e){const s=Object.create(null);return t.forEach((a,i)=>{e.all||i.endsWith("[]")?Te(s,i,a):s[i]=a}),e.dot&&Object.entries(s).forEach(([a,i])=>{a.includes(".")&&(Se(s,a,i),delete s[a])}),s}var Te=(t,e,s)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(s):t[e]=[t[e],s]:e.endsWith("[]")?t[e]=[s]:t[e]=s},Se=(t,e,s)=>{let a=t;const i=e.split(".");i.forEach((r,l)=>{l===i.length-1?a[r]=s:((!a[r]||typeof a[r]!="object"||Array.isArray(a[r])||a[r]instanceof File)&&(a[r]=Object.create(null)),a=a[r])})},ae=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},Ae=t=>{const{groups:e,path:s}=Pe(t),a=ae(s);return Ne(a,e)},Pe=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(s,a)=>{const i=`@${a}`;return e.push([i,s]),i}),{groups:e,path:t}},Ne=(t,e)=>{for(let s=e.length-1;s>=0;s--){const[a]=e[s];for(let i=t.length-1;i>=0;i--)if(t[i].includes(a)){t[i]=t[i].replace(a,e[s][1]);break}}return t},Tt={},Ie=(t,e)=>{if(t==="*")return"*";const s=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${t}#${e}`;return Tt[a]||(s[2]?Tt[a]=e&&e[0]!==":"&&e[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${e})`)]:[t,s[1],new RegExp(`^${s[2]}$`)]:Tt[a]=[t,s[1],!0]),Tt[a]}return null},Ft=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return e(s)}catch{return s}})}},_e=t=>Ft(t,decodeURI),ie=t=>{const e=t.url,s=e.indexOf("/",e.indexOf(":")+4);let a=s;for(;a<e.length;a++){const i=e.charCodeAt(a);if(i===37){const r=e.indexOf("?",a),l=e.indexOf("#",a),c=r===-1?l===-1?void 0:l:l===-1?r:Math.min(r,l),o=e.slice(s,c);return _e(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(i===63||i===35)break}return e.slice(s,a)},Me=t=>{const e=ie(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},rt=(t,e,...s)=>(s.length&&(e=rt(e,...s)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),re=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),s=[];let a="";return e.forEach(i=>{if(i!==""&&!/\:/.test(i))a+="/"+i;else if(/\:/.test(i))if(/\?/.test(i)){s.length===0&&a===""?s.push("/"):s.push(a);const r=i.replace("?","");a+="/"+r,s.push(a)}else a+="/"+i}),s.filter((i,r,l)=>l.indexOf(i)===r)},Ht=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?Ft(t,ne):t):t,le=(t,e,s)=>{let a;if(!s&&e&&!/[%+]/.test(e)){let l=t.indexOf("?",8);if(l===-1)return;for(t.startsWith(e,l+1)||(l=t.indexOf(`&${e}`,l+1));l!==-1;){const c=t.charCodeAt(l+e.length+1);if(c===61){const o=l+e.length+2,d=t.indexOf("&",o);return Ht(t.slice(o,d===-1?void 0:d))}else if(c==38||isNaN(c))return"";l=t.indexOf(`&${e}`,l+1)}if(a=/[%+]/.test(t),!a)return}const i={};a??(a=/[%+]/.test(t));let r=t.indexOf("?",8);for(;r!==-1;){const l=t.indexOf("&",r+1);let c=t.indexOf("=",r);c>l&&l!==-1&&(c=-1);let o=t.slice(r+1,c===-1?l===-1?void 0:l:c);if(a&&(o=Ht(o)),r=l,o==="")continue;let d;c===-1?d="":(d=t.slice(c+1,l===-1?void 0:l),a&&(d=Ht(d))),s?(i[o]&&Array.isArray(i[o])||(i[o]=[]),i[o].push(d)):i[o]??(i[o]=d)}return e?i[e]:i},De=le,$e=(t,e)=>le(t,e,!0),ne=decodeURIComponent,Kt=t=>Ft(t,ne),ot,T,B,ce,de,Bt,U,Jt,oe=(Jt=class{constructor(t,e="/",s=[[]]){g(this,B);p(this,"raw");g(this,ot);g(this,T);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});g(this,U,t=>{const{bodyCache:e,raw:s}=this,a=e[t];if(a)return a;const i=Object.keys(e)[0];return i?e[i].then(r=>(i==="json"&&(r=JSON.stringify(r)),new Response(r)[t]())):e[t]=s[t]()});this.raw=t,this.path=e,h(this,T,s),h(this,ot,{})}param(t){return t?v(this,B,ce).call(this,t):v(this,B,de).call(this)}query(t){return De(this.url,t)}queries(t){return $e(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((s,a)=>{e[a]=s}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await je(this,t))}json(){return n(this,U).call(this,"text").then(t=>JSON.parse(t))}text(){return n(this,U).call(this,"text")}arrayBuffer(){return n(this,U).call(this,"arrayBuffer")}blob(){return n(this,U).call(this,"blob")}formData(){return n(this,U).call(this,"formData")}addValidatedData(t,e){n(this,ot)[t]=e}valid(t){return n(this,ot)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[ke](){return n(this,T)}get matchedRoutes(){return n(this,T)[0].map(([[,t]])=>t)}get routePath(){return n(this,T)[0].map(([[,t]])=>t)[this.routeIndex].path}},ot=new WeakMap,T=new WeakMap,B=new WeakSet,ce=function(t){const e=n(this,T)[0][this.routeIndex][1][t],s=v(this,B,Bt).call(this,e);return s&&/\%/.test(s)?Kt(s):s},de=function(){const t={},e=Object.keys(n(this,T)[0][this.routeIndex][1]);for(const s of e){const a=v(this,B,Bt).call(this,n(this,T)[0][this.routeIndex][1][s]);a!==void 0&&(t[s]=/\%/.test(a)?Kt(a):a)}return t},Bt=function(t){return n(this,T)[1]?n(this,T)[1][t]:t},U=new WeakMap,Jt),He={Stringify:1},xe=async(t,e,s,a,i)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const r=t.callbacks;return r!=null&&r.length?(i?i[0]+=t:i=[t],Promise.all(r.map(c=>c({phase:e,buffer:i,context:a}))).then(c=>Promise.all(c.filter(Boolean).map(o=>xe(o,e,!1,a,i))).then(()=>i[0]))):Promise.resolve(t)},Le="text/plain; charset=UTF-8",Lt=(t,e)=>({"Content-Type":t,...e}),bt=(t,e)=>new Response(t,e),Et,Ct,D,ct,$,R,kt,dt,xt,Y,jt,Rt,q,lt,Qt,Be=(Qt=class{constructor(t,e){g(this,q);g(this,Et);g(this,Ct);p(this,"env",{});g(this,D);p(this,"finalized",!1);p(this,"error");g(this,ct);g(this,$);g(this,R);g(this,kt);g(this,dt);g(this,xt);g(this,Y);g(this,jt);g(this,Rt);p(this,"render",(...t)=>(n(this,dt)??h(this,dt,e=>this.html(e)),n(this,dt).call(this,...t)));p(this,"setLayout",t=>h(this,kt,t));p(this,"getLayout",()=>n(this,kt));p(this,"setRenderer",t=>{h(this,dt,t)});p(this,"header",(t,e,s)=>{this.finalized&&h(this,R,bt(n(this,R).body,n(this,R)));const a=n(this,R)?n(this,R).headers:n(this,Y)??h(this,Y,new Headers);e===void 0?a.delete(t):s!=null&&s.append?a.append(t,e):a.set(t,e)});p(this,"status",t=>{h(this,ct,t)});p(this,"set",(t,e)=>{n(this,D)??h(this,D,new Map),n(this,D).set(t,e)});p(this,"get",t=>n(this,D)?n(this,D).get(t):void 0);p(this,"newResponse",(...t)=>v(this,q,lt).call(this,...t));p(this,"body",(t,e,s)=>v(this,q,lt).call(this,t,e,s));p(this,"text",(t,e,s)=>!n(this,Y)&&!n(this,ct)&&!e&&!s&&!this.finalized?new Response(t):v(this,q,lt).call(this,t,e,Lt(Le,s)));p(this,"json",(t,e,s)=>v(this,q,lt).call(this,JSON.stringify(t),e,Lt("application/json",s)));p(this,"html",(t,e,s)=>{const a=i=>v(this,q,lt).call(this,i,e,Lt("text/html; charset=UTF-8",s));return typeof t=="object"?xe(t,He.Stringify,!1,{}).then(a):a(t)});p(this,"redirect",(t,e)=>{const s=String(t);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,e??302)});p(this,"notFound",()=>(n(this,xt)??h(this,xt,()=>bt()),n(this,xt).call(this,this)));h(this,Et,t),e&&(h(this,$,e.executionCtx),this.env=e.env,h(this,xt,e.notFoundHandler),h(this,Rt,e.path),h(this,jt,e.matchResult))}get req(){return n(this,Ct)??h(this,Ct,new oe(n(this,Et),n(this,Rt),n(this,jt))),n(this,Ct)}get event(){if(n(this,$)&&"respondWith"in n(this,$))return n(this,$);throw Error("This context has no FetchEvent")}get executionCtx(){if(n(this,$))return n(this,$);throw Error("This context has no ExecutionContext")}get res(){return n(this,R)||h(this,R,bt(null,{headers:n(this,Y)??h(this,Y,new Headers)}))}set res(t){if(n(this,R)&&t){t=bt(t.body,t);for(const[e,s]of n(this,R).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const a=n(this,R).headers.getSetCookie();t.headers.delete("set-cookie");for(const i of a)t.headers.append("set-cookie",i)}else t.headers.set(e,s)}h(this,R,t),this.finalized=!0}get var(){return n(this,D)?Object.fromEntries(n(this,D)):{}}},Et=new WeakMap,Ct=new WeakMap,D=new WeakMap,ct=new WeakMap,$=new WeakMap,R=new WeakMap,kt=new WeakMap,dt=new WeakMap,xt=new WeakMap,Y=new WeakMap,jt=new WeakMap,Rt=new WeakMap,q=new WeakSet,lt=function(t,e,s){const a=n(this,R)?new Headers(n(this,R).headers):n(this,Y)??new Headers;if(typeof e=="object"&&"headers"in e){const r=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[l,c]of r)l.toLowerCase()==="set-cookie"?a.append(l,c):a.set(l,c)}if(s)for(const[r,l]of Object.entries(s))if(typeof l=="string")a.set(r,l);else{a.delete(r);for(const c of l)a.append(r,c)}const i=typeof e=="number"?e:(e==null?void 0:e.status)??n(this,ct);return bt(t,{status:i,headers:a})},Qt),w="ALL",Fe="all",Ue=["get","post","put","delete","options","patch"],fe="Can not add a route since the matcher is already built.",he=class extends Error{},qe="__COMPOSED_HANDLER",ze=t=>t.text("404 Not Found",404),Gt=(t,e)=>{if("getResponse"in t){const s=t.getResponse();return e.newResponse(s.body,s)}return console.error(t),e.text("Internal Server Error",500)},A,E,pe,P,G,St,At,ft,We=(ft=class{constructor(e={}){g(this,E);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");g(this,A,"/");p(this,"routes",[]);g(this,P,ze);p(this,"errorHandler",Gt);p(this,"onError",e=>(this.errorHandler=e,this));p(this,"notFound",e=>(h(this,P,e),this));p(this,"fetch",(e,...s)=>v(this,E,At).call(this,e,s[1],s[0],e.method));p(this,"request",(e,s,a,i)=>e instanceof Request?this.fetch(s?new Request(e,s):e,a,i):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${rt("/",e)}`,s),a,i)));p(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(v(this,E,At).call(this,e.request,e,void 0,e.request.method))})});[...Ue,Fe].forEach(r=>{this[r]=(l,...c)=>(typeof l=="string"?h(this,A,l):v(this,E,G).call(this,r,n(this,A),l),c.forEach(o=>{v(this,E,G).call(this,r,n(this,A),o)}),this)}),this.on=(r,l,...c)=>{for(const o of[l].flat()){h(this,A,o);for(const d of[r].flat())c.map(x=>{v(this,E,G).call(this,d.toUpperCase(),n(this,A),x)})}return this},this.use=(r,...l)=>(typeof r=="string"?h(this,A,r):(h(this,A,"*"),l.unshift(r)),l.forEach(c=>{v(this,E,G).call(this,w,n(this,A),c)}),this);const{strict:a,...i}=e;Object.assign(this,i),this.getPath=a??!0?e.getPath??ie:Me}route(e,s){const a=this.basePath(e);return s.routes.map(i=>{var l;let r;s.errorHandler===Gt?r=i.handler:(r=async(c,o)=>(await Vt([],s.errorHandler)(c,()=>i.handler(c,o))).res,r[qe]=i.handler),v(l=a,E,G).call(l,i.method,i.path,r)}),this}basePath(e){const s=v(this,E,pe).call(this);return s._basePath=rt(this._basePath,e),s}mount(e,s,a){let i,r;a&&(typeof a=="function"?r=a:(r=a.optionHandler,a.replaceRequest===!1?i=o=>o:i=a.replaceRequest));const l=r?o=>{const d=r(o);return Array.isArray(d)?d:[d]}:o=>{let d;try{d=o.executionCtx}catch{}return[o.env,d]};i||(i=(()=>{const o=rt(this._basePath,e),d=o==="/"?0:o.length;return x=>{const f=new URL(x.url);return f.pathname=f.pathname.slice(d)||"/",new Request(f,x)}})());const c=async(o,d)=>{const x=await s(i(o.req.raw),...l(o));if(x)return x;await d()};return v(this,E,G).call(this,w,rt(e,"*"),c),this}},A=new WeakMap,E=new WeakSet,pe=function(){const e=new ft({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,h(e,P,n(this,P)),e.routes=this.routes,e},P=new WeakMap,G=function(e,s,a){e=e.toUpperCase(),s=rt(this._basePath,s);const i={basePath:this._basePath,path:s,method:e,handler:a};this.router.add(e,s,[a,i]),this.routes.push(i)},St=function(e,s){if(e instanceof Error)return this.errorHandler(e,s);throw e},At=function(e,s,a,i){if(i==="HEAD")return(async()=>new Response(null,await v(this,E,At).call(this,e,s,a,"GET")))();const r=this.getPath(e,{env:a}),l=this.router.match(i,r),c=new Be(e,{path:r,matchResult:l,env:a,executionCtx:s,notFoundHandler:n(this,P)});if(l[0].length===1){let d;try{d=l[0][0][0][0](c,async()=>{c.res=await n(this,P).call(this,c)})}catch(x){return v(this,E,St).call(this,x,c)}return d instanceof Promise?d.then(x=>x||(c.finalized?c.res:n(this,P).call(this,c))).catch(x=>v(this,E,St).call(this,x,c)):d??n(this,P).call(this,c)}const o=Vt(l[0],this.errorHandler,n(this,P));return(async()=>{try{const d=await o(c);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return v(this,E,St).call(this,d,c)}})()},ft),ue=[];function Ve(t,e){const s=this.buildAllMatchers(),a=((i,r)=>{const l=s[i]||s[w],c=l[2][r];if(c)return c;const o=r.match(l[0]);if(!o)return[[],ue];const d=o.indexOf("",1);return[l[1][d],o]});return this.match=a,a(t,e)}var Nt="[^/]+",yt=".*",wt="(?:|/.*)",nt=Symbol(),Ke=new Set(".\\+*[^]$()");function Ge(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===yt||t===wt?1:e===yt||e===wt?-1:t===Nt?1:e===Nt?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var J,Q,N,et,Xe=(et=class{constructor(){g(this,J);g(this,Q);g(this,N,Object.create(null))}insert(e,s,a,i,r){if(e.length===0){if(n(this,J)!==void 0)throw nt;if(r)return;h(this,J,s);return}const[l,...c]=e,o=l==="*"?c.length===0?["","",yt]:["","",Nt]:l==="/*"?["","",wt]:l.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(o){const x=o[1];let f=o[2]||Nt;if(x&&o[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw nt;if(d=n(this,N)[f],!d){if(Object.keys(n(this,N)).some(u=>u!==yt&&u!==wt))throw nt;if(r)return;d=n(this,N)[f]=new et,x!==""&&h(d,Q,i.varIndex++)}!r&&x!==""&&a.push([x,n(d,Q)])}else if(d=n(this,N)[l],!d){if(Object.keys(n(this,N)).some(x=>x.length>1&&x!==yt&&x!==wt))throw nt;if(r)return;d=n(this,N)[l]=new et}d.insert(c,s,a,i,r)}buildRegExpStr(){const s=Object.keys(n(this,N)).sort(Ge).map(a=>{const i=n(this,N)[a];return(typeof n(i,Q)=="number"?`(${a})@${n(i,Q)}`:Ke.has(a)?`\\${a}`:a)+i.buildRegExpStr()});return typeof n(this,J)=="number"&&s.unshift(`#${n(this,J)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},J=new WeakMap,Q=new WeakMap,N=new WeakMap,et),It,Ot,Zt,Ye=(Zt=class{constructor(){g(this,It,{varIndex:0});g(this,Ot,new Xe)}insert(t,e,s){const a=[],i=[];for(let l=0;;){let c=!1;if(t=t.replace(/\{[^}]+\}/g,o=>{const d=`@\\${l}`;return i[l]=[d,o],l++,c=!0,d}),!c)break}const r=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let l=i.length-1;l>=0;l--){const[c]=i[l];for(let o=r.length-1;o>=0;o--)if(r[o].indexOf(c)!==-1){r[o]=r[o].replace(c,i[l][1]);break}}return n(this,Ot).insert(r,e,a,n(this,It),s),a}buildRegExp(){let t=n(this,Ot).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const s=[],a=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(i,r,l)=>r!==void 0?(s[++e]=Number(r),"$()"):(l!==void 0&&(a[Number(l)]=++e),"")),[new RegExp(`^${t}`),s,a]}},It=new WeakMap,Ot=new WeakMap,Zt),Je=[/^$/,[],Object.create(null)],Pt=Object.create(null);function ge(t){return Pt[t]??(Pt[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Qe(){Pt=Object.create(null)}function Ze(t){var d;const e=new Ye,s=[];if(t.length===0)return Je;const a=t.map(x=>[!/\*|\/:/.test(x[0]),...x]).sort(([x,f],[u,b])=>x?1:u?-1:f.length-b.length),i=Object.create(null);for(let x=0,f=-1,u=a.length;x<u;x++){const[b,m,S]=a[x];b?i[m]=[S.map(([O])=>[O,Object.create(null)]),ue]:f++;let C;try{C=e.insert(m,f,b)}catch(O){throw O===nt?new he(m):O}b||(s[f]=S.map(([O,y])=>{const _=Object.create(null);for(y-=1;y>=0;y--){const[ut,Mt]=C[y];_[ut]=Mt}return[O,_]}))}const[r,l,c]=e.buildRegExp();for(let x=0,f=s.length;x<f;x++)for(let u=0,b=s[x].length;u<b;u++){const m=(d=s[x][u])==null?void 0:d[1];if(!m)continue;const S=Object.keys(m);for(let C=0,O=S.length;C<O;C++)m[S[C]]=c[m[S[C]]]}const o=[];for(const x in l)o[x]=s[l[x]];return[r,o,i]}function it(t,e){if(t){for(const s of Object.keys(t).sort((a,i)=>i.length-a.length))if(ge(s).test(e))return[...t[s]]}}var z,W,_t,ve,te,ts=(te=class{constructor(){g(this,_t);p(this,"name","RegExpRouter");g(this,z);g(this,W);p(this,"match",Ve);h(this,z,{[w]:Object.create(null)}),h(this,W,{[w]:Object.create(null)})}add(t,e,s){var c;const a=n(this,z),i=n(this,W);if(!a||!i)throw new Error(fe);a[t]||[a,i].forEach(o=>{o[t]=Object.create(null),Object.keys(o[w]).forEach(d=>{o[t][d]=[...o[w][d]]})}),e==="/*"&&(e="*");const r=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const o=ge(e);t===w?Object.keys(a).forEach(d=>{var x;(x=a[d])[e]||(x[e]=it(a[d],e)||it(a[w],e)||[])}):(c=a[t])[e]||(c[e]=it(a[t],e)||it(a[w],e)||[]),Object.keys(a).forEach(d=>{(t===w||t===d)&&Object.keys(a[d]).forEach(x=>{o.test(x)&&a[d][x].push([s,r])})}),Object.keys(i).forEach(d=>{(t===w||t===d)&&Object.keys(i[d]).forEach(x=>o.test(x)&&i[d][x].push([s,r]))});return}const l=re(e)||[e];for(let o=0,d=l.length;o<d;o++){const x=l[o];Object.keys(i).forEach(f=>{var u;(t===w||t===f)&&((u=i[f])[x]||(u[x]=[...it(a[f],x)||it(a[w],x)||[]]),i[f][x].push([s,r-d+o+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(n(this,W)).concat(Object.keys(n(this,z))).forEach(e=>{t[e]||(t[e]=v(this,_t,ve).call(this,e))}),h(this,z,h(this,W,void 0)),Qe(),t}},z=new WeakMap,W=new WeakMap,_t=new WeakSet,ve=function(t){const e=[];let s=t===w;return[n(this,z),n(this,W)].forEach(a=>{const i=a[t]?Object.keys(a[t]).map(r=>[r,a[t][r]]):[];i.length!==0?(s||(s=!0),e.push(...i)):t!==w&&e.push(...Object.keys(a[w]).map(r=>[r,a[w][r]]))}),s?Ze(e):null},te),V,H,ee,es=(ee=class{constructor(t){p(this,"name","SmartRouter");g(this,V,[]);g(this,H,[]);h(this,V,t.routers)}add(t,e,s){if(!n(this,H))throw new Error(fe);n(this,H).push([t,e,s])}match(t,e){if(!n(this,H))throw new Error("Fatal error");const s=n(this,V),a=n(this,H),i=s.length;let r=0,l;for(;r<i;r++){const c=s[r];try{for(let o=0,d=a.length;o<d;o++)c.add(...a[o]);l=c.match(t,e)}catch(o){if(o instanceof he)continue;throw o}this.match=c.match.bind(c),h(this,V,[c]),h(this,H,void 0);break}if(r===i)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,l}get activeRouter(){if(n(this,H)||n(this,V).length!==1)throw new Error("No active router has been determined yet.");return n(this,V)[0]}},V=new WeakMap,H=new WeakMap,ee),mt=Object.create(null),ss=t=>{for(const e in t)return!0;return!1},K,j,Z,ht,k,L,X,pt,as=(pt=class{constructor(e,s,a){g(this,L);g(this,K);g(this,j);g(this,Z);g(this,ht,0);g(this,k,mt);if(h(this,j,a||Object.create(null)),h(this,K,[]),e&&s){const i=Object.create(null);i[e]={handler:s,possibleKeys:[],score:0},h(this,K,[i])}h(this,Z,[])}insert(e,s,a){h(this,ht,++Wt(this,ht)._);let i=this;const r=Ae(s),l=[];for(let c=0,o=r.length;c<o;c++){const d=r[c],x=r[c+1],f=Ie(d,x),u=Array.isArray(f)?f[0]:d;if(u in n(i,j)){i=n(i,j)[u],f&&l.push(f[1]);continue}n(i,j)[u]=new pt,f&&(n(i,Z).push(f),l.push(f[1])),i=n(i,j)[u]}return n(i,K).push({[e]:{handler:a,possibleKeys:l.filter((c,o,d)=>d.indexOf(c)===o),score:n(this,ht)}}),i}search(e,s){var x;const a=[];h(this,k,mt);let r=[this];const l=ae(s),c=[],o=l.length;let d=null;for(let f=0;f<o;f++){const u=l[f],b=f===o-1,m=[];for(let C=0,O=r.length;C<O;C++){const y=r[C],_=n(y,j)[u];_&&(h(_,k,n(y,k)),b?(n(_,j)["*"]&&v(this,L,X).call(this,a,n(_,j)["*"],e,n(y,k)),v(this,L,X).call(this,a,_,e,n(y,k))):m.push(_));for(let ut=0,Mt=n(y,Z).length;ut<Mt;ut++){const Ut=n(y,Z)[ut],F=n(y,k)===mt?{}:{...n(y,k)};if(Ut==="*"){const st=n(y,j)["*"];st&&(v(this,L,X).call(this,a,st,e,n(y,k)),h(st,k,F),m.push(st));continue}const[we,qt,gt]=Ut;if(!u&&!(gt instanceof RegExp))continue;const M=n(y,j)[we];if(gt instanceof RegExp){if(d===null){d=new Array(o);let at=s[0]==="/"?1:0;for(let vt=0;vt<o;vt++)d[vt]=at,at+=l[vt].length+1}const st=s.substring(d[f]),Dt=gt.exec(st);if(Dt){if(F[qt]=Dt[0],v(this,L,X).call(this,a,M,e,n(y,k),F),ss(n(M,j))){h(M,k,F);const at=((x=Dt[0].match(/\//))==null?void 0:x.length)??0;(c[at]||(c[at]=[])).push(M)}continue}}(gt===!0||gt.test(u))&&(F[qt]=u,b?(v(this,L,X).call(this,a,M,e,F,n(y,k)),n(M,j)["*"]&&v(this,L,X).call(this,a,n(M,j)["*"],e,F,n(y,k))):(h(M,k,F),m.push(M)))}}const S=c.shift();r=S?m.concat(S):m}return a.length>1&&a.sort((f,u)=>f.score-u.score),[a.map(({handler:f,params:u})=>[f,u])]}},K=new WeakMap,j=new WeakMap,Z=new WeakMap,ht=new WeakMap,k=new WeakMap,L=new WeakSet,X=function(e,s,a,i,r){for(let l=0,c=n(s,K).length;l<c;l++){const o=n(s,K)[l],d=o[a]||o[w],x={};if(d!==void 0&&(d.params=Object.create(null),e.push(d),i!==mt||r&&r!==mt))for(let f=0,u=d.possibleKeys.length;f<u;f++){const b=d.possibleKeys[f],m=x[d.score];d.params[b]=r!=null&&r[b]&&!m?r[b]:i[b]??(r==null?void 0:r[b]),x[d.score]=!0}}},pt),tt,se,is=(se=class{constructor(){p(this,"name","TrieRouter");g(this,tt);h(this,tt,new as)}add(t,e,s){const a=re(e);if(a){for(let i=0,r=a.length;i<r;i++)n(this,tt).insert(t,a[i],s);return}n(this,tt).insert(t,e,s)}match(t,e){return n(this,tt).search(t,e)}},tt=new WeakMap,se),be=class extends We{constructor(t={}){super(t),this.router=t.router??new es({routers:[new ts,new is]})}},rs=t=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},a=(r=>typeof r=="string"?r==="*"?()=>r:l=>r===l?l:null:typeof r=="function"?r:l=>r.includes(l)?l:null)(s.origin),i=(r=>typeof r=="function"?r:Array.isArray(r)?()=>r:()=>[])(s.allowMethods);return async function(l,c){var x;function o(f,u){l.res.headers.set(f,u)}const d=await a(l.req.header("origin")||"",l);if(d&&o("Access-Control-Allow-Origin",d),s.credentials&&o("Access-Control-Allow-Credentials","true"),(x=s.exposeHeaders)!=null&&x.length&&o("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),l.req.method==="OPTIONS"){s.origin!=="*"&&o("Vary","Origin"),s.maxAge!=null&&o("Access-Control-Max-Age",s.maxAge.toString());const f=await i(l.req.header("origin")||"",l);f.length&&o("Access-Control-Allow-Methods",f.join(","));let u=s.allowHeaders;if(!(u!=null&&u.length)){const b=l.req.header("Access-Control-Request-Headers");b&&(u=b.split(/\s*,\s*/))}return u!=null&&u.length&&(o("Access-Control-Allow-Headers",u.join(",")),l.res.headers.append("Vary","Access-Control-Request-Headers")),l.res.headers.delete("Content-Length"),l.res.headers.delete("Content-Type"),new Response(null,{headers:l.res.headers,status:204,statusText:"No Content"})}await c(),s.origin!=="*"&&l.header("Vary","Origin",{append:!0})}},ls=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Xt=(t,e=os)=>{const s=/\.([a-zA-Z0-9]+?)$/,a=t.match(s);if(!a)return;let i=e[a[1]];return i&&i.startsWith("text")&&(i+="; charset=utf-8"),i},ns={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},os=ns,cs=(...t)=>{let e=t.filter(i=>i!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=e.split("/"),a=[];for(const i of s)i===".."&&a.length>0&&a.at(-1)!==".."?a.pop():i!=="."&&a.push(i);return a.join("/")||"."},me={br:".br",zstd:".zst",gzip:".gz"},ds=Object.keys(me),xs="index.html",fs=t=>{const e=t.root??"./",s=t.path,a=t.join??cs;return async(i,r)=>{var x,f,u,b;if(i.finalized)return r();let l;if(t.path)l=t.path;else try{if(l=decodeURIComponent(i.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(l))throw new Error}catch{return await((x=t.onNotFound)==null?void 0:x.call(t,i.req.path,i)),r()}let c=a(e,!s&&t.rewriteRequestPath?t.rewriteRequestPath(l):l);t.isDir&&await t.isDir(c)&&(c=a(c,xs));const o=t.getContent;let d=await o(c,i);if(d instanceof Response)return i.newResponse(d.body,d);if(d){const m=t.mimes&&Xt(c,t.mimes)||Xt(c);if(i.header("Content-Type",m||"application/octet-stream"),t.precompressed&&(!m||ls.test(m))){const S=new Set((f=i.req.header("Accept-Encoding"))==null?void 0:f.split(",").map(C=>C.trim()));for(const C of ds){if(!S.has(C))continue;const O=await o(c+me[C],i);if(O){d=O,i.header("Content-Encoding",C),i.header("Vary","Accept-Encoding",{append:!0});break}}}return await((u=t.onFound)==null?void 0:u.call(t,c,i)),i.body(d)}await((b=t.onNotFound)==null?void 0:b.call(t,c,i)),await r()}},hs=async(t,e)=>{let s;e&&e.manifest?typeof e.manifest=="string"?s=JSON.parse(e.manifest):s=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let a;e&&e.namespace?a=e.namespace:a=__STATIC_CONTENT;const i=s[t];if(!i)return null;const r=await a.get(i,{type:"stream"});return r||null},ps=t=>async function(s,a){return fs({...t,getContent:async r=>hs(r,{manifest:t.manifest,namespace:t.namespace?t.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,a)},us=t=>ps(t);const I=new be;I.use("/api/*",rs());I.use("/static/*",us({root:"./public"}));I.post("/api/contact",async t=>{try{const{name:e,phone:s,wechat:a,hotelName:i,message:r}=await t.req.json(),{env:l}=t,c=t.req.header("cf-connecting-ip")||t.req.header("x-forwarded-for")||"unknown",o=t.req.header("user-agent")||"unknown",d=await l.DB.prepare(`
      INSERT INTO contacts (name, phone, wechat, hotel_name, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(e,s,a||null,i||null,r||null,c,o).run();return console.log("新咨询已保存到数据库:",{id:d.meta.last_row_id,name:e,phone:s,hotel_name:i}),t.json({success:!0,message:"感谢您的咨询，我们会尽快与您联系！",id:d.meta.last_row_id})}catch(e){return console.error("保存咨询失败:",e),t.json({success:!1,message:"提交失败，请稍后再试"},500)}});I.get("/api/contacts",async t=>{try{const{env:e}=t,{results:s}=await e.DB.prepare(`
      SELECT 
        id, name, phone, wechat, hotel_name, message, 
        status, created_at, notes
      FROM contacts 
      ORDER BY created_at DESC 
      LIMIT 100
    `).all();return t.json({success:!0,data:s,count:s.length})}catch(e){return console.error("查询失败:",e),t.json({success:!1,message:"查询失败"},500)}});I.put("/api/contacts/:id",async t=>{try{const{env:e}=t,s=t.req.param("id"),{status:a,notes:i}=await t.req.json();return await e.DB.prepare(`
      UPDATE contacts 
      SET status = ?, notes = ?
      WHERE id = ?
    `).bind(a,i||null,s).run(),t.json({success:!0,message:"更新成功"})}catch(e){return console.error("更新失败:",e),t.json({success:!1,message:"更新失败"},500)}});I.delete("/api/contacts/:id",async t=>{try{const{env:e}=t,s=t.req.param("id");return await e.DB.prepare(`
      DELETE FROM contacts WHERE id = ?
    `).bind(s).run(),t.json({success:!0,message:"删除成功"})}catch(e){return console.error("删除失败:",e),t.json({success:!1,message:"删除失败"},500)}});I.get("/api/stats",async t=>{var e,s,a;try{const{env:i}=t,{results:r}=await i.DB.prepare(`
      SELECT COUNT(*) as count FROM contacts
    `).all(),{results:l}=await i.DB.prepare(`
      SELECT status, COUNT(*) as count 
      FROM contacts 
      GROUP BY status
    `).all(),{results:c}=await i.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM contacts 
      WHERE DATE(created_at) = DATE('now')
    `).all(),{results:o}=await i.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM contacts 
      WHERE DATE(created_at) >= DATE('now', '-7 days')
    `).all();return t.json({success:!0,data:{total:((e=r[0])==null?void 0:e.count)||0,today:((s=c[0])==null?void 0:s.count)||0,week:((a=o[0])==null?void 0:a.count)||0,byStatus:l}})}catch(i){return console.error("统计失败:",i),t.json({success:!1,message:"统计失败"},500)}});I.get("/admin",t=>t.html(`
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
                // 状态映射
                const statusMap = {
                    'new': '待跟进',
                    'contacted': '已联系',
                    'converted': '已转化',
                    'lost': '已流失'
                };
                
                // 构建CSV内容
                const csv = [
                    ['ID', '姓名', '电话', '微信', '酒店名称', '留言', '状态', '创建时间', '备注'].join(','),
                    ...allContacts.map(c => [
                        c.id,
                        \`"\${c.name}"\`,  // 用双引号包裹，避免逗号问题
                        c.phone,
                        \`"\${c.wechat || ''}"\`,
                        \`"\${c.hotel_name || ''}"\`,
                        \`"\${(c.message || '').replace(/"/g, '""')}"\`,  // 转义双引号
                        statusMap[c.status] || c.status,
                        c.created_at,
                        \`"\${(c.notes || '').replace(/"/g, '""')}"\`
                    ].join(','))
                ].join('\\r\\n');  // 使用Windows换行符

                // 添加UTF-8 BOM，让Excel正确识别编码
                const BOM = '\\uFEFF';
                const csvWithBOM = BOM + csv;
                
                // 创建Blob并下载
                const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = \`咨询记录_\${new Date().toISOString().split('T')[0]}.csv\`;
                link.click();
                
                // 清理URL对象
                setTimeout(() => URL.revokeObjectURL(link.href), 100);
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
                            <i class="fas fa-chart-line text-2xl text-orange-500 group-hover:text-white transition" style="transform: rotate(180deg);"></i>
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
                        电竞房改造：盘活闲置资产的<span class="text-esports-red">有效方案</span>
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                        抓住电竞市场机遇，将闲置客房升级为特色电竞房<br class="hidden lg:block">
                        吸引年轻消费群体，提升房间利用率和营收水平
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
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">合理提升房价</h3>
                                    <p class="text-gray-600">根据区域定位，电竞房定价在200-600元/晚，比普通客房有一定溢价空间</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-users text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">吸引18-35岁年轻客群</h3>
                                    <p class="text-gray-600">电竞爱好者对配置要求高，愿意为优质体验支付合理溢价，复购意愿较强</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-calendar-check text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">稳定提升入住率</h3>
                                    <p class="text-gray-600">电竞房受节假日和季节影响较小，有助于提高闲置房间的整体利用率</p>
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
                        <h3 class="text-2xl lg:text-3xl font-black mb-6">改造收益测算示例</h3>
                        <div class="space-y-6">
                            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-200">普通标间（改造前）</span>
                                    <span class="text-2xl font-bold">¥180/晚</span>
                                </div>
                                <div class="text-sm text-gray-300">月均入住率：50% | 月收入：¥2,700</div>
                            </div>
                            
                            <div class="text-center">
                                <i class="fas fa-arrow-down text-3xl text-yellow-300"></i>
                            </div>
                            
                            <div class="bg-esports-red/20 backdrop-blur-sm rounded-lg p-6 border-2 border-yellow-300">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-white font-semibold">电竞房（改造后）</span>
                                    <span class="text-3xl font-black text-yellow-300">¥280/晚</span>
                                </div>
                                <div class="text-sm text-yellow-100">月均入住率：70% | 月收入：¥5,880</div>
                            </div>
                            
                            <div class="bg-yellow-300 text-tech-blue-dark rounded-lg p-6 text-center">
                                <div class="text-sm font-semibold mb-2">单间月收益提升</div>
                                <div class="text-4xl font-black">¥3,180</div>
                                <div class="text-sm mt-2">年收益增加约 ¥38,000</div>
                            </div>
                            
                            <div class="text-xs text-blue-100 text-center mt-4">
                                *以上数据为测算示例，实际收益受区域、定位、运营等多因素影响
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
                        三款实战方案，适配不同区域
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        存量商旅酒店改造中高端电竞房，预期入住率85%，回本周期2.5-10年
                    </p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Plan 1: 核心商圈旗舰版 - 投资最高80万，回本最快4-5个月 -->
                    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 relative flex flex-col">
                        <div class="absolute top-4 right-4 bg-esports-red text-white px-3 py-1 text-xs font-bold rounded-full">
                            推荐
                        </div>
                        <div class="bg-gradient-to-br from-tech-blue to-tech-blue-light p-6 text-white text-center">
                            <h3 class="text-2xl font-black mb-2">核心商圈旗舰版</h3>
                            <p class="text-blue-100 text-sm">中高端定位，快速回本</p>
                            <div class="mt-6">
                                <div class="text-4xl font-black">¥80万</div>
                                <div class="text-blue-100 text-sm mt-1">总改造成本 | 30间房</div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8 flex-1 flex flex-col">
                            <div class="mb-6">
                                <div class="bg-blue-50 rounded-lg p-4 mb-4">
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">改造规模</span>
                                        <span class="font-bold text-tech-blue">1-2层，30间</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">均价定位</span>
                                        <span class="font-bold text-tech-blue">¥360/晚</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-700">投资回报</span>
                                        <span class="font-bold text-esports-red">4-5个月回本</span>
                                    </div>
                                </div>
                                
                                <div class="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                                    <div class="text-sm text-gray-700 mb-2"><strong>财务预期：</strong></div>
                                    <div class="text-sm text-gray-600 space-y-1">
                                        <div>• 年营业额：约300万</div>
                                        <div>• 年利润：约220万</div>
                                        <div>• 业主投入：80万</div>
                                        <div>• 入住率：85%</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-6">
                                <h4 class="font-bold text-gray-900 mb-3">房型配置：</h4>
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-tech-blue mr-2 mt-1"></i>
                                        <span class="text-gray-700">单人间 30%（RTX5060）</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-tech-blue mr-2 mt-1"></i>
                                        <span class="text-gray-700">大床房 50%（双RTX5060Ti/5070）核心</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-tech-blue mr-2 mt-1"></i>
                                        <span class="text-gray-700">双床房 20%（双RTX5070）溢价</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="mb-6 text-sm text-gray-600">
                                <div class="font-semibold mb-1">预算构成：</div>
                                <div>电竞设备60万（75%）+ 软装店招弱电千兆宽带等20万</div>
                            </div>
                            
                            <div class="mt-auto">
                                <a href="#contact" class="block w-full bg-tech-blue hover:bg-tech-blue-dark text-white text-center py-3 rounded-lg font-bold transition">
                                    获取详细方案
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Plan 2: 城市开发区版 - 投资中等60万，回本中等8个月 -->
                    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col">
                        <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white text-center">
                            <h3 class="text-2xl font-black mb-2">城市开发区版</h3>
                            <p class="text-green-100 text-sm">中等规模，稳健运营</p>
                            <div class="mt-6">
                                <div class="text-4xl font-black">¥60万</div>
                                <div class="text-green-100 text-sm mt-1">总改造成本 | 20间房</div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8 flex-1 flex flex-col">
                            <div class="mb-6">
                                <div class="bg-green-50 rounded-lg p-4 mb-4">
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">改造规模</span>
                                        <span class="font-bold text-green-600">1-2层，20间</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">均价定位</span>
                                        <span class="font-bold text-green-600">¥270/晚</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-700">投资回报</span>
                                        <span class="font-bold text-esports-red">8个月回本</span>
                                    </div>
                                </div>
                                
                                <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                                    <div class="text-sm text-gray-700 mb-2"><strong>财务预期：</strong></div>
                                    <div class="text-sm text-gray-600 space-y-1">
                                        <div>• 年营业额：约150万</div>
                                        <div>• 年利润：约90万</div>
                                        <div>• 总投入：60万</div>
                                        <div>• 入住率：85%</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-6">
                                <h4 class="font-bold text-gray-900 mb-3">配置亮点：</h4>
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span class="text-gray-700">RTX5060及以上显卡</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span class="text-gray-700">2K高刷显示器</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span class="text-gray-700">千兆宽带机房</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span class="text-gray-700">复用原运营团队</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="mb-6 text-sm text-gray-600">
                                <div class="font-semibold mb-1">预算构成：</div>
                                <div>电竞设备40万（67%）+ 软装店招机房弱电等20万</div>
                            </div>
                            
                            <div class="mt-auto">
                                <a href="#contact" class="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-bold transition">
                                    获取详细方案
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Plan 3: 产城融合区商圈版 - 投资最低50万，回本最慢11个月 -->
                    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col">
                        <div class="bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white text-center">
                            <h3 class="text-2xl font-black mb-2">产城融合区商圈版</h3>
                            <p class="text-purple-100 text-sm">高性价比，分期扩展</p>
                            <div class="mt-6">
                                <div class="text-4xl font-black">¥50万</div>
                                <div class="text-purple-100 text-sm mt-1">首期成本 | 20间（规划34间）</div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8 flex-1 flex flex-col">
                            <div class="mb-6">
                                <div class="bg-purple-50 rounded-lg p-4 mb-4">
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">改造规模</span>
                                        <span class="font-bold text-purple-600">首期20间</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">均价定位</span>
                                        <span class="font-bold text-purple-600">¥200/晚</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-700">投资回报</span>
                                        <span class="font-bold text-orange-600">11个月回本</span>
                                    </div>
                                </div>
                                
                                <div class="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
                                    <div class="text-sm text-gray-700 mb-2"><strong>财务预期：</strong></div>
                                    <div class="text-sm text-gray-600 space-y-1">
                                        <div>• 年营业额：约110万</div>
                                        <div>• 年利润：约60万</div>
                                        <div>• 总投入：50万</div>
                                        <div>• 入住率：85%</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-6">
                                <h4 class="font-bold text-gray-900 mb-3">房型配置：</h4>
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-purple-600 mr-2 mt-1"></i>
                                        <span class="text-gray-700">单电脑大床房 30%（RTX5060Ti）</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-purple-600 mr-2 mt-1"></i>
                                        <span class="text-gray-700">双电脑房 60%（双RTX5070）核心</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-purple-600 mr-2 mt-1"></i>
                                        <span class="text-gray-700">3-4人间 10%（多RTX5070）溢价</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="mb-6 text-sm text-gray-600">
                                <div class="font-semibold mb-1">预算构成：</div>
                                <div>电竞设备30万（60%）+ 软装店招机房弱电等20万</div>
                            </div>
                            
                            <div class="mt-auto">
                                <a href="#contact" class="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-bold transition">
                                    获取详细方案
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 通用改造核心提示 -->
                <div class="mt-12 bg-white rounded-xl p-6 lg:p-8 shadow-lg">
                    <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                        通用改造核心提示
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-bold text-tech-blue mb-3">选址与规模：</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <i class="fas fa-map-marker-alt text-esports-red mr-2 mt-1"></i>
                                    <span>电竞消费集中且中高端空白区域</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-building text-esports-red mr-2 mt-1"></i>
                                    <span>改造1-2独立楼层（20-30间）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-users text-esports-red mr-2 mt-1"></i>
                                    <span>复用原有运营团队</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-tech-blue mb-3">硬件与定价：</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <i class="fas fa-desktop text-esports-red mr-2 mt-1"></i>
                                    <span>RTX5060及以上显卡 + 2K高刷显示器</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-percentage text-esports-red mr-2 mt-1"></i>
                                    <span>电竞设备占总预算75%+</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-money-bill-wave text-esports-red mr-2 mt-1"></i>
                                    <span>按区域定价200-350元/晚</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-tech-blue mb-3">房型策略：</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <i class="fas fa-bed text-esports-red mr-2 mt-1"></i>
                                    <span>双人电竞房为核心（占比50%+）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-chart-pie text-esports-red mr-2 mt-1"></i>
                                    <span>搭配单人入门款和多人溢价款</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-star text-esports-red mr-2 mt-1"></i>
                                    <span>预期入住率85%</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-tech-blue mb-3">运营支持：</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <i class="fas fa-globe text-esports-red mr-2 mt-1"></i>
                                    <span>入驻主流OTA + 电竞垂直平台</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-handshake text-esports-red mr-2 mt-1"></i>
                                    <span>品牌运营赋能费按客房收入4.5%</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-tools text-esports-red mr-2 mt-1"></i>
                                    <span>全程托管式服务</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8 text-center">
                    <p class="text-gray-600 mb-4">想了解更详细的改造方案和投资分析？</p>
                    <a href="#contact" class="inline-block bg-esports-red hover:bg-esports-red-dark text-white px-8 py-3 rounded-lg font-bold transition">
                        <i class="fas fa-phone-alt mr-2"></i>免费上门勘察评估
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
                    <!-- Case 1: 华东某全新电竞酒店 -->
                    <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-tech-blue transition">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">华东某全新电竞酒店</h3>
                                <p class="text-sm text-gray-500">全新店整体打造 | 全量房间</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-star text-green-600 text-xl"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="bg-red-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造前：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="font-semibold">约60%</span></div>
                                    <div>• 月营收：<span class="font-semibold">约9.5万元</span></div>
                                    <div>• 空置率：<span class="font-semibold">约40%</span></div>
                                </div>
                            </div>
                            
                            <div class="bg-green-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造后：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="text-green-600 font-black text-base">90%+</span></div>
                                    <div>• 月营收：<span class="text-green-600 font-black text-base">14.6万→20万+</span></div>
                                    <div>• 空置率：<span class="text-green-600 font-black text-base">降至10%以下</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 rounded-lg p-4 text-center">
                            <div class="text-sm font-semibold text-gray-700 mb-1">总投入 <span class="font-bold">250万元</span></div>
                            <div class="text-3xl font-black text-tech-blue">3年回本</div>
                        </div>
                    </div>
                    
                    <!-- Case 2: 华东某商务酒店 -->
                    <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-tech-blue transition">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">华东某商务酒店</h3>
                                <p class="text-sm text-gray-500">轻量经济型 | 20间改造</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-building text-blue-600 text-xl"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="bg-red-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造前：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="font-semibold">约60%</span></div>
                                    <div>• 月营收：<span class="font-semibold">约13万元</span></div>
                                    <div>• 空置率：<span class="font-semibold">约40%</span></div>
                                </div>
                            </div>
                            
                            <div class="bg-green-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造后：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="text-green-600 font-black text-base">92%+（峰值96%+）</span></div>
                                    <div>• 月营收：<span class="text-green-600 font-black text-base">提升50%+</span></div>
                                    <div>• 空置率：<span class="text-green-600 font-black text-base">不足8%</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-green-50 rounded-lg p-4 text-center">
                            <div class="text-sm font-semibold text-gray-700 mb-1">总投入 <span class="font-bold">35万元</span></div>
                            <div class="text-3xl font-black text-green-600">6个月回本</div>
                        </div>
                    </div>
                    
                    <!-- Case 3: 华东某存量酒店 -->
                    <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-tech-blue transition">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">华东某存量酒店</h3>
                                <p class="text-sm text-gray-500">中度进阶方案 | 40间改造</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-hotel text-purple-600 text-xl"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="bg-red-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造前：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="font-semibold">约50%</span></div>
                                    <div>• 月营收：<span class="font-semibold">约11万元</span></div>
                                    <div>• 空置率：<span class="font-semibold">约50%</span></div>
                                </div>
                            </div>
                            
                            <div class="bg-green-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造后：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="text-green-600 font-black text-base">75%左右</span></div>
                                    <div>• 月营收：<span class="text-green-600 font-black text-base">提升40%+</span></div>
                                    <div>• 空置率：<span class="text-green-600 font-black text-base">降至25%左右</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-purple-50 rounded-lg p-4 text-center">
                            <div class="text-sm font-semibold text-gray-700 mb-1">总投入 <span class="font-bold">100万元</span></div>
                            <div class="text-3xl font-black text-purple-600">6个月回本</div>
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
  `));const Yt=new be,gs=Object.assign({"/src/index.tsx":I});let ye=!1;for(const[,t]of Object.entries(gs))t&&(Yt.all("*",e=>{let s;try{s=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,s)}),Yt.notFound(e=>{let s;try{s=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,s)}),ye=!0);if(!ye)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Yt as default};
