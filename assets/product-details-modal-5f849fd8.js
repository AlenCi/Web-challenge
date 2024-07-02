import{a as W,g as E,J as _,s as b,n as v,_ as x,K as B,r as p,u as F,b as T,j as r,c as U,d as z,k as f,T as d}from"./index-385e61f5.js";import{D as G,a as K,b as L,G as u,c as A}from"./api-70519384.js";import{B as J}from"./Button-e7f99a03.js";function V(e){return W("MuiCircularProgress",e)}E("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const Z=["className","color","disableShrink","size","style","thickness","value","variant"];let y=e=>e,w,I,M,R;const c=44,q=_(w||(w=y`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),H=_(I||(I=y`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),O=e=>{const{classes:s,variant:t,color:l,disableShrink:o}=e,h={root:["root",t,`color${v(l)}`],svg:["svg"],circle:["circle",`circle${v(t)}`,o&&"circleDisableShrink"]};return z(h,V,s)},Q=b("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,s)=>{const{ownerState:t}=e;return[s.root,s[t.variant],s[`color${v(t.color)}`]]}})(({ownerState:e,theme:s})=>x({display:"inline-block"},e.variant==="determinate"&&{transition:s.transitions.create("transform")},e.color!=="inherit"&&{color:(s.vars||s).palette[e.color].main}),({ownerState:e})=>e.variant==="indeterminate"&&B(M||(M=y`
      animation: ${0} 1.4s linear infinite;
    `),q)),X=b("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,s)=>s.svg})({display:"block"}),Y=b("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,s)=>{const{ownerState:t}=e;return[s.circle,s[`circle${v(t.variant)}`],t.disableShrink&&s.circleDisableShrink]}})(({ownerState:e,theme:s})=>x({stroke:"currentColor"},e.variant==="determinate"&&{transition:s.transitions.create("stroke-dashoffset")},e.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink&&B(R||(R=y`
      animation: ${0} 1.4s ease-in-out infinite;
    `),H)),ee=p.forwardRef(function(s,t){const l=F({props:s,name:"MuiCircularProgress"}),{className:o,color:h="primary",disableShrink:n=!1,size:m=40,style:a,thickness:i=3.6,value:k=0,variant:P="indeterminate"}=l,N=T(l,Z),g=x({},l,{color:h,disableShrink:n,size:m,thickness:i,value:k,variant:P}),j=O(g),C={},S={},D={};if(P==="determinate"){const $=2*Math.PI*((c-i)/2);C.strokeDasharray=$.toFixed(3),D["aria-valuenow"]=Math.round(k),C.strokeDashoffset=`${((100-k)/100*$).toFixed(3)}px`,S.transform="rotate(-90deg)"}return r.jsx(Q,x({className:U(j.root,o),style:x({width:m,height:m},S,a),ownerState:g,ref:t,role:"progressbar"},D,N,{children:r.jsx(X,{className:j.svg,ownerState:g,viewBox:`${c/2} ${c/2} ${c} ${c}`,children:r.jsx(Y,{className:j.circle,style:C,ownerState:g,cx:c,cy:c,r:(c-i)/2,fill:"none",strokeWidth:i})})}))}),re=ee;function ie({product:e,open:s,onClose:t}){const[l,o]=p.useState(""),[h,n]=p.useState(!0);if(p.useEffect(()=>{if(e)if(n(!0),o(""),e.images.length>0){const a=new Image;a.onload=()=>{o(e.images[0]),n(!1)},a.onerror=()=>{o(""),n(!1)},a.src=e.images[0]}else n(!1)},[e]),!e)return null;const m=a=>{n(!0),o("");const i=new Image;i.onload=()=>{o(a),n(!1)},i.onerror=()=>{o(""),n(!1)},i.src=a};return r.jsxs(G,{open:s,onClose:t,maxWidth:"md",fullWidth:!0,children:[r.jsx(K,{children:e.title}),r.jsx(L,{children:r.jsxs(u,{container:!0,spacing:2,children:[r.jsx(u,{item:!0,xs:12,children:r.jsx(f,{sx:{height:300,width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:h?r.jsx(re,{}):r.jsx(f,{component:"img",sx:{height:"100%",width:"100%",objectFit:"contain"},alt:e.title,src:l})})}),r.jsx(u,{item:!0,xs:12,children:r.jsx(f,{sx:{display:"flex",flexWrap:"wrap",gap:2,justifyContent:"center"},children:e.images.map((a,i)=>r.jsx(f,{component:"img",sx:{height:80,width:80,objectFit:"cover",cursor:"pointer",border:l===a?"2px solid #1976d2":"2px solid transparent","&:hover":{opacity:.8}},alt:`${e.title} - ${i}`,src:a,onClick:()=>m(a)},i))})}),r.jsxs(u,{item:!0,xs:12,children:[r.jsxs(d,{variant:"body1",children:["Price: $",e.price]}),r.jsxs(d,{variant:"body2",children:["Brand: ",e.brand]}),r.jsxs(d,{variant:"body2",children:["Category: ",e.category]}),r.jsxs(d,{variant:"body2",children:["Rating: ",e.rating,"/5"]}),r.jsxs(d,{variant:"body2",children:["Stock: ",e.stock]}),r.jsx(d,{variant:"body1",mt:2,children:e.description})]})]})}),r.jsx(A,{children:r.jsx(J,{onClick:t,children:"Close"})})]})}export{re as C,ie as P};
