var L=Object.defineProperty,O=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var C=(s,a,e)=>a in s?L(s,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[a]=e,$=(s,a)=>{for(var e in a||(a={}))v.call(a,e)&&C(s,e,a[e]);if(E)for(var e of E(a))I.call(a,e)&&C(s,e,a[e]);return s},j=(s,a)=>O(s,T(a));var h=(s,a,e)=>new Promise((t,n)=>{var m=c=>{try{b(e.next(c))}catch(o){n(o)}},k=c=>{try{b(e.throw(c))}catch(o){n(o)}},b=c=>c.done?t(c.value):Promise.resolve(c.value).then(m,k);b((e=e.apply(s,a)).next())});import{j as U,R as g,h as N,n as A,E as S,I as F,au as J}from"./vendor.665713fb.js";import{b as p}from"./index.esm.d07bb2cd.js";import"./index.b1322eb0.js";function _(s,a){const e=new Blob([JSON.stringify(a,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),n=document.createElement("a");n.href=t,n.download=s,n.click(),URL.revokeObjectURL(t)}const q=["version","password"],d={accounts:[],settings:[],metas:[]},D=()=>{const{t:s}=U(),[a,e]=g.useState(""),t=o=>{e(r=>`${r}
${o}`)},n=N(),m=o=>{n({title:s(o),status:"error",duration:3e3,isClosable:!0})},k=()=>h(void 0,null,function*(){var R;e("get settings...");const r=(yield p.get("settings")).data;if(r.code!==200){m(r.message);return}else t("get settings success"),d.settings=r.data,d.settings=d.settings.filter(f=>!q.includes(f.key));t("get accounts...");const i=(yield p.get("accounts")).data;if(i.code!==200){m(i.message);return}else t("get accounts success"),d.accounts=i.data;t("get metas...");const l=(yield p.get("metas")).data;if(l.code!==200){m(l.message);return}else t("get metas success"),d.metas=l.data;t("download backup file..."),_(`${((R=d.settings.find(f=>f.key==="title"))==null?void 0:R.value)||"alist"}.json`,d)}),b=()=>h(void 0,null,function*(){e("choose data file..."),document.querySelector("#restore-file").click()}),c=o=>{const r=o.target.files,y=r[0];if(!r||!y)return;const i=new FileReader;i.onload=x=>h(void 0,null,function*(){const l=JSON.parse(i.result);t("restore settings...");const f=(yield p.post("settings",l.settings)).data;if(f.code!==200){m(f.message);return}t("restore settings success"),t("restore accounts...");for(const u of l.accounts){const w=(yield p.post("account/create",j($({},u),{id:0}))).data;if(w.code!==200){t(`failed to restore account:[${u.name}],the reason is [${w.message}]`);continue}t(`restore account:[${u.name}] success`)}t("finish restore accounts"),t("restore metas...");for(const u of l.metas){const w=(yield p.post("meta/create",j($({},u),{id:0}))).data;if(w.code!==200){t(`failed to restore meta:[${u.path}],the reason is [${w.message}]`);continue}t(`restore meta:[${u.path}] success`)}t("finish restore metas"),n({title:s("restore success"),status:"success",duration:3e3,isClosable:!0})}),i.readAsText(y)};return g.createElement(A,null,g.createElement(S,{colorScheme:"green",onClick:k},s("Backup")),g.createElement(S,{ml:"2",onClick:b},s("Restore")),g.createElement(F,{display:"none",type:"file",id:"restore-file",onChange:c}),g.createElement(J,{readOnly:!0,rows:23,mt:"2",value:a}))};export{D as default};
