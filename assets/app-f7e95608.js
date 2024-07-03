import{g as _,a as E,s as G,_ as a,r as d,u as W,b as $,L as j,j as s,c as L,d as z,e as I,l as st,f as ot,h as at,i as T,B as nt,W as it,k as rt,T as D}from"./index-0cb61db3.js";import{C as ct}from"./Container-559170c4.js";import{i as lt,L as dt}from"./List-426ff619.js";import{L as g}from"./ListItemText-3945db66.js";import"./listItemTextClasses-6cb34f88.js";function pt(t){return E("MuiListItem",t)}const ut=_("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]),y=ut;function mt(t){return E("MuiListItemSecondaryAction",t)}_("MuiListItemSecondaryAction",["root","disableGutters"]);const gt=["className"],bt=t=>{const{disableGutters:e,classes:o}=t;return z({root:["root",e&&"disableGutters"]},mt,o)},yt=G("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.disableGutters&&e.disableGutters]}})(({ownerState:t})=>a({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},t.disableGutters&&{right:0})),H=d.forwardRef(function(e,o){const n=W({props:e,name:"MuiListItemSecondaryAction"}),{className:i}=n,r=$(n,gt),p=d.useContext(j),u=a({},n,{disableGutters:p.disableGutters}),f=bt(u);return s.jsx(yt,a({className:L(f.root,i),ownerState:u,ref:o},r))});H.muiName="ListItemSecondaryAction";const ft=H,xt=["className"],ht=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],vt=(t,e)=>{const{ownerState:o}=t;return[e.root,o.dense&&e.dense,o.alignItems==="flex-start"&&e.alignItemsFlexStart,o.divider&&e.divider,!o.disableGutters&&e.gutters,!o.disablePadding&&e.padding,o.button&&e.button,o.hasSecondaryAction&&e.secondaryAction]},Ct=t=>{const{alignItems:e,button:o,classes:n,dense:i,disabled:r,disableGutters:p,disablePadding:u,divider:f,hasSecondaryAction:x,selected:A}=t;return z({root:["root",i&&"dense",!p&&"gutters",!u&&"padding",f&&"divider",r&&"disabled",o&&"button",e==="flex-start"&&"alignItemsFlexStart",x&&"secondaryAction",A&&"selected"],container:["container"]},pt,n)},It=G("div",{name:"MuiListItem",slot:"Root",overridesResolver:vt})(({theme:t,ownerState:e})=>a({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!e.disablePadding&&a({paddingTop:8,paddingBottom:8},e.dense&&{paddingTop:4,paddingBottom:4},!e.disableGutters&&{paddingLeft:16,paddingRight:16},!!e.secondaryAction&&{paddingRight:48}),!!e.secondaryAction&&{[`& > .${st.root}`]:{paddingRight:48}},{[`&.${y.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${y.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:I(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${y.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:I(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${y.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity}},e.alignItems==="flex-start"&&{alignItems:"flex-start"},e.divider&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"},e.button&&{transition:t.transitions.create("background-color",{duration:t.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${y.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:I(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:I(t.palette.primary.main,t.palette.action.selectedOpacity)}}},e.hasSecondaryAction&&{paddingRight:48})),jt=G("li",{name:"MuiListItem",slot:"Container",overridesResolver:(t,e)=>e.container})({position:"relative"}),Lt=d.forwardRef(function(e,o){const n=W({props:e,name:"MuiListItem"}),{alignItems:i="center",autoFocus:r=!1,button:p=!1,children:u,className:f,component:x,components:A={},componentsProps:k={},ContainerComponent:N="li",ContainerProps:{className:Y}={},dense:O=!1,disabled:M=!1,disableGutters:P=!1,disablePadding:q=!1,divider:J=!1,focusVisibleClassName:K,secondaryAction:w,selected:Q=!1,slotProps:X={},slots:Z={}}=n,tt=$(n.ContainerProps,xt),et=$(n,ht),U=d.useContext(j),R=d.useMemo(()=>({dense:O||U.dense||!1,alignItems:i,disableGutters:P}),[i,U.dense,O,P]),S=d.useRef(null);ot(()=>{r&&S.current&&S.current.focus()},[r]);const m=d.Children.toArray(u),V=m.length&&lt(m[m.length-1],["ListItemSecondaryAction"]),v=a({},n,{alignItems:i,autoFocus:r,button:p,dense:R.dense,disabled:M,disableGutters:P,disablePadding:q,divider:J,hasSecondaryAction:V,selected:Q}),B=Ct(v),F=at(S,o),C=Z.root||A.Root||It,h=X.root||k.root||{},c=a({className:L(B.root,h.className,f),disabled:M},et);let l=x||"li";return p&&(c.component=x||"div",c.focusVisibleClassName=L(y.focusVisible,K),l=nt),V?(l=!c.component&&!x?"div":l,N==="li"&&(l==="li"?l="div":c.component==="li"&&(c.component="div")),s.jsx(j.Provider,{value:R,children:s.jsxs(jt,a({as:N,className:L(B.container,Y),ref:F,ownerState:v},tt,{children:[s.jsx(C,a({},h,!T(C)&&{as:l,ownerState:a({},v,h.ownerState)},c,{children:m})),m.pop()]}))})):s.jsx(j.Provider,{value:R,children:s.jsxs(C,a({},h,{as:l,ref:F},!T(C)&&{ownerState:a({},v,h.ownerState)},c,{children:[m,w&&s.jsx(ft,{children:w})]}))})}),b=Lt;function Gt(){return s.jsxs(s.Fragment,{children:[s.jsx(it,{children:s.jsx("title",{children:" Web Challenge "})}),s.jsx(ct,{maxWidth:"xl",children:s.jsxs(rt,{sx:{my:5},children:[s.jsx(D,{variant:"h2",sx:{mb:5},children:"Web Challenge"}),s.jsx(D,{variant:"h5",sx:{mb:3},children:"Implementation Details:"}),s.jsxs(dt,{children:[s.jsx(b,{children:s.jsx(g,{primary:"Technologies Used",secondary:"React, Material-UI template, Vite, React Router, Google OAuth"})}),s.jsx(b,{children:s.jsx(g,{primary:"User Page",secondary:"Displays user data in a table, with modal for detailed user information. Users can be clicked to display details in a modal, sorted by different categories, and searched for."})}),s.jsx(b,{children:s.jsx(g,{primary:"Charts Page",secondary:"Visualizes data using ApexCharts, showing product sales and cart size distribution. Also includes a pie chart for gender distribution, and you can click on the product chart to bring up the product detail modal. Products can be searched to show in how many carts they are."})}),s.jsx(b,{children:s.jsx(g,{primary:"Products Page",secondary:"Implements search functionality, category filters, highlights when low on stock, modal for details, and sorting by price."})}),s.jsx(b,{children:s.jsx(g,{primary:"Authentication",secondary:"Implemented Google Sign-In for user authentication and sign-out."})}),s.jsx(b,{children:s.jsx(g,{primary:"Deployment",secondary:"Dockerized the app and deployed to GitHub Pages."})})]})]})})]})}export{Gt as default};
