import{n as b,m,r as w,s as q,o as x}from"./scheduler.zOPVm9UK.js";const a=[];function z(s,o){return{subscribe:A(s,o).subscribe}}function A(s,o=b){let t;const r=new Set;function u(n){if(q(s,n)&&(s=n,t)){const i=!a.length;for(const e of r)e[1](),a.push(e,s);if(i){for(let e=0;e<a.length;e+=2)a[e][0](a[e+1]);a.length=0}}}function f(n){u(n(s))}function l(n,i=b){const e=[n,i];return r.add(e),r.size===1&&(t=o(u,f)||b),n(s),()=>{r.delete(e),r.size===0&&t&&(t(),t=null)}}return{set:u,update:f,subscribe:l}}function E(s,o,t){const r=!Array.isArray(s),u=r?[s]:s;if(!u.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const f=o.length<2;return z(t,(l,n)=>{let i=!1;const e=[];let d=0,p=b;const y=()=>{if(d)return;p();const c=o(r?e[0]:e,l,n);f?l(c):p=x(c)?c:b},h=u.map((c,g)=>m(c,_=>{e[g]=_,d&=~(1<<g),i&&y()},()=>{d|=1<<g}));return i=!0,y(),function(){w(h),p(),i=!1}})}function S(s){return{subscribe:s.subscribe.bind(s)}}export{S as a,E as d,z as r,A as w};
