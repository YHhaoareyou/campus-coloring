(this["webpackJsonpcampus-coloring"]=this["webpackJsonpcampus-coloring"]||[]).push([[0],{1151:function(e,t){},1152:function(e,t){},1153:function(e,t){},1154:function(e,t){},1160:function(e,t,n){"use strict";n.r(t);var c,i,a,r,o,s,l,j=n(0),b=n.n(j),d=n(65),u=n.n(d),O=(n(531),n(239)),h=(n(536),n(537),n(538),n(12)),x=n(48),f=n(109),g=n(185),p=n(49),m={garden:{name:"Garden",description:"",range:{minLat:35,maxLat:36,minLong:139,maxLong:140}},51:{name:"51\u53f7\u9928",description:"",range:{minLat:35.7061,maxLat:35.7066,minLong:139.7065,maxLong:139.707}},55:{name:"55\u53f7\u9928\u5916",description:"\u4e00\u968e\u5eca\u4e0b\u8996\u70b9",range:{minLat:35.7056,maxLat:35.7062,minLong:139.7078,maxLong:139.7083}},"51_60_top":{name:"51\u300160\u53f7\u9928\u306e\u9593",description:"\u4e8c\u968e\u8996\u70b9",range:{minLat:35.7056,maxLat:35.706,minLong:139.7061,maxLong:139.7065}},"60_61":{name:"60\u300161\u53f7\u9928\u306e\u9593",description:"\u4e00\u968e\u8996\u70b9",range:{minLat:35.7056,maxLat:35.706,minLong:139.7057,maxLong:139.7061}}},v=n(2),w=p.a.div(c||(c=Object(x.a)(["\n  position: relative;\n  margin: 0px auto;\n  width: 400px;\n  height: 160px;\n  background-image: url('/img/map.jpeg');\n  background-size: contain;\n"]))),y=p.a.i(i||(i=Object(x.a)(["\n  position: absolute;\n  font-size: 24px;\n"]))),k=(Object(p.a)(y)(a||(a=Object(x.a)(["\ntop: 50px;\nleft: 250px;\n"]))),[{loc:"51",Pin:Object(p.a)(y)(r||(r=Object(x.a)(["\n  top: -10px;\n  left: 170px;\n"])))},{loc:"51_60_top",Pin:Object(p.a)(y)(o||(o=Object(x.a)(["\n  top: 70px;\n  left: 135px;\n"])))},{loc:"60_61",Pin:Object(p.a)(y)(s||(s=Object(x.a)(["\n  top: 70px;\n  left: 105px;\n"])))},{loc:"55",Pin:Object(p.a)(y)(l||(l=Object(x.a)(["\n  top: 50px;\n  left: 310px;\n"])))}]);var C=function(){var e=Object(j.useState)(null),t=Object(h.a)(e,2),n=t[0],c=t[1],i=Object(j.useState)(""),a=Object(h.a)(i,2),r=a[0],o=a[1],s=Object(j.useState)(!1),l=Object(h.a)(s,2),b=l[0],d=l[1],u=function(){navigator.geolocation.getCurrentPosition((function(e){c(e.coords),b&&d(!1)}),(function(e){d(!0)}))};Object(j.useEffect)((function(){u();var e=setInterval(u,5e3);return function(){return clearInterval(e)}}),[]);var x=function(e){return n&&e&&n.latitude>=e.minLat&&n.latitude<=e.maxLat&&n.longitude>=e.minLong&&n.longitude<=e.maxLong};return Object(v.jsxs)("div",{style:{paddingTop:"100px"},children:[Object(v.jsx)("h3",{children:"\u5834\u6240\u3092\u9078\u629e"}),!n&&Object(v.jsxs)("p",{children:[Object(v.jsx)("i",{className:"bi bi-arrow-clockwise"})," \u4f4d\u7f6e\u60c5\u5831\u53d6\u5f97\u4e2d..."]}),b&&Object(v.jsx)("p",{children:"\u4f4d\u7f6e\u60c5\u5831\u53d6\u5f97\u5931\u6557\u3002\u4f4d\u7f6e\u60c5\u5831\u306e\u53d6\u5f97\u3092\u8a31\u53ef\u3057\u3001\u906e\u853d\u7269\u306e\u306a\u3044\u7a7a\u9593\u306b\u79fb\u52d5\u3057\u3066\u6570\u79d2\u5f85\u3063\u3066\u304f\u3060\u3055\u3044\u3002"}),Object(v.jsx)(w,{children:k.map((function(e){var t=e.loc,n=e.Pin;return Object(v.jsx)(n,{onClick:function(){return o(t)},className:"bi bi-geo-alt-fill",style:{color:x(m[t].range)?"orange":"black"}},t)}))}),Object(v.jsxs)(g.a,{centered:!0,show:""!==r,onHide:function(){return o("")},children:[Object(v.jsx)(g.a.Header,{closeButton:!0,children:Object(v.jsx)(g.a.Title,{children:r&&m[r].name+"\uff08"+(m[r].description||"")+"\uff09"})}),Object(v.jsxs)(g.a.Body,{style:{textAlign:"center"},children:[Object(v.jsx)("img",{src:"/img/loc/".concat(r,".jpeg"),width:"100%",alt:"View of the location"}),r&&(x(m[r].range)||"garden"===r)?Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"\u2191\u306e\u666f\u8272\u306b\u5411\u3044\u3066\u304f\u3060\u3055\u3044"}),Object(v.jsx)(O.a,{to:"/"+r,children:Object(v.jsx)(f.a,{variant:"outline-primary",children:"\u7d75\u3092\u89b3\u308b"})})]}):Object(v.jsx)("p",{children:"\u3053\u306e\u5834\u6240\u306b\u79fb\u52d5\u3057\u3001\u6570\u79d2\u5f85\u3064\u3068\u7d75\u304c\u898b\u3048\u308b\u3088"})]})]})]})};var N,S,L,_=function(){return Object(v.jsx)("div",{children:Object(v.jsx)(C,{})})},I=n(4),T=n(6),P=p.a.div(N||(N=Object(x.a)(["\n  position: absolute;\n  top: 50vh;\n  left: 0;\n"]))),M=p.a.div(S||(S=Object(x.a)(["\n  position: absolute;\n  top: 50vh;\n  right: 0;\n"]))),E=Object(p.a)(f.a)(L||(L=Object(x.a)(["\n  background: rgba(255, 255, 255, 0.3);\n  color: rgba(200, 200, 200);\n  border: none;\n  font-size: 36px;\n  padding: 0px;\n"])));var A,B,R=function(e){var t=e.switchPrev,n=e.switchNext;return Object(v.jsxs)(b.a.Fragment,{children:[Object(v.jsx)(P,{children:Object(v.jsx)(E,{variant:"light",onClick:t,children:Object(v.jsx)("i",{className:"bi bi-chevron-compact-left"})})}),Object(v.jsx)(M,{children:Object(v.jsx)(E,{variant:"light",onClick:n,children:Object(v.jsx)("i",{className:"bi bi-chevron-compact-right"})})})]})},z=n(1167),U=n(1168),F=n(1169),D=n(1175),H=Object(p.a)(z.a)(A||(A=Object(x.a)(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(248, 249, 250, 0.5);\n  padding: 10px;\n  padding-right: 20px;\n"]))),W=Object(p.a)(f.a)(B||(B=Object(x.a)(["\n  background: rgba(255, 255, 255, 0.5);\n  border: none;\n  width: 100%;\n"])));var V,G,Q,J=function(e){var t=e.imgInfo,n=e.openCanvas,c=e.canvasVisibility,i=e.likeTrigger,a=Object(j.useState)(!1),r=Object(h.a)(a,2),o=r[0],s=r[1],l=Object(j.useState)(t.likes?Object.keys(t.likes).length:0),b=Object(h.a)(l,2),d=b[0],u=b[1],O=Object(j.useState)(t.likes&&Object.keys(t.likes).includes("26577319")),x=Object(h.a)(O,2),p=x[0],m=x[1];return!c&&Object(v.jsxs)(H,{children:[Object(v.jsxs)(U.a,{children:[Object(v.jsx)(F.a,{xs:8,children:Object(v.jsx)(D.a,{style:{height:"100px",overflowY:"scroll"},children:Object(v.jsxs)(D.a.Body,{style:{padding:"5px"},children:[Object(v.jsx)(D.a.Title,{as:"h6",style:{margin:"5px"},children:t.title}),Object(v.jsx)(D.a.Text,{style:{fontSize:"14px"},children:t.detail})]})})}),Object(v.jsxs)(F.a,{xs:4,children:[Object(v.jsxs)(U.a,{children:[Object(v.jsx)(F.a,{style:{padding:0},children:Object(v.jsxs)(W,{variant:"light",size:"sm",onClick:function(){window.location.href=window.location.origin+window.location.pathname+"?mode=user&uid="+t.creator_id},children:[Object(v.jsx)("i",{className:"bi bi-person"}),Object(v.jsx)("br",{}),"\u30e6\u30fc\u30b6"]})}),Object(v.jsx)(F.a,{style:{padding:0},children:Object(v.jsxs)(W,{variant:"light",size:"sm",onClick:function(){i(),u(p?d-1:d+1),m(!p)},children:[Object(v.jsx)("i",{className:"bi bi-heart",style:{color:p?"red":"black"}}),Object(v.jsx)("br",{}),d]})})]}),Object(v.jsxs)(U.a,{children:[Object(v.jsx)(F.a,{style:{padding:0},children:Object(v.jsxs)(W,{variant:"light",size:"sm",disabled:!t.prev_img_ids,onClick:function(){window.location.href=window.location.origin+window.location.pathname+"?mode=base&bid="+t.id},children:[Object(v.jsx)("i",{className:"bi bi-collection"}),Object(v.jsx)("br",{}),"\u524d\u4f5c\u3078"]})}),Object(v.jsx)(F.a,{style:{padding:0},children:Object(v.jsxs)(W,{variant:"light",size:"sm",onClick:function(){return s(!0)},children:[Object(v.jsx)("i",{className:"bi bi-pencil"}),Object(v.jsx)("br",{}),"\u63cf\u3053\u3046"]})})]})]})]}),Object(v.jsxs)(g.a,{centered:!0,show:o,onHide:function(){return s(!1)},children:[Object(v.jsx)(g.a.Header,{closeButton:!0,children:Object(v.jsx)(g.a.Title,{children:"\u3069\u3093\u306a\u7d75\u3092\u63cf\u304d\u305f\u3044\uff1f"})}),Object(v.jsxs)(g.a.Body,{style:{textAlign:"center"},children:[Object(v.jsx)(f.a,{variant:"outline-primary",onClick:function(){n({isNew:!0}),s(!1)},children:"\u65b0\u3057\u304f\u63cf\u3053\u3046"}),Object(v.jsx)("br",{}),Object(v.jsx)("br",{}),Object(v.jsx)(f.a,{variant:"outline-primary",onClick:function(){n({isNew:!1}),s(!1)},children:"\u3053\u308c\u3092\u30d9\u30fc\u30b9\u306b\u3057\u3066\u63cf\u3053\u3046"})]})]})]})},X=n(30),q=n(186),K=n(37),Y=Object(K.b)({key:"currentLocState",default:""}),Z=Object(K.b)({key:"currentImgIdState",default:""}),$=Object(K.b)({key:"currentImgSrcState",default:""}),ee=Object(K.b)({key:"currentImgAngleState",default:0}),te=Object(K.b)({key:"userState",default:null,dangerouslyAllowMutability:!0}),ne=n(525),ce=n(1170),ie=n(1173),ae=n(112),re=function(){var e=new ae.a,t=Object(ae.b)();return Object(ae.d)(t,e)},oe=function(){return Object(K.d)(te)},se=n(336),le=n(61),je=n(520),be=n.n(je),de=n(521),ue=Object(p.a)(z.a)(V||(V=Object(x.a)(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100vw;\n  height: 120px;\n  padding: 5px;\n  background-color: rgba(248, 249, 250, 0.5);\n"]))),Oe=Object(p.a)(f.a)(G||(G=Object(x.a)(["\n  margin: 0px;\n  margin-bottom: 2px;\n  padding: 0px;\n  width: 60px;\n  height: 35px;\n"]))),he=Object(p.a)(Oe)(Q||(Q=Object(x.a)(["\n  width: 50px;\n  height: 50px;\n"])));function xe(e,t){var n=window;return{width:n.innerWidth,height:n.innerHeight}}function fe(e,t){de.fabric.Image.fromURL(e,(function(e){e.scaleToWidth(xe().width),t.add(e.set({left:0,top:0}))}),{crossOrigin:"Anonymous"})}var ge=function(e){var t=e.closeCanvas,n=e.basePrevIds,c=e.isNew,i=oe(),a=Object(K.d)(Y),r=Object(K.d)(Z),o=Object(K.d)($),s=Object(j.useState)(xe()),l=Object(h.a)(s,2),b=l[0],d=l[1],u=Object(j.useRef)(null),O=Object(j.useState)("#000"),x=Object(h.a)(O,2),g=x[0],p=x[1],m=Object(j.useState)(5),w=Object(h.a)(m,2),y=w[0],k=w[1],C=Object(j.useState)("transparent"),N=Object(h.a)(C,2),S=N[0],L=N[1],_=Object(j.useState)(le.Tools.Pencil),P=Object(h.a)(_,2),M=P[0],E=P[1],A=Object(j.useState)(!1),B=Object(h.a)(A,2),R=B[0],z=B[1],D=Object(j.useState)(!1),H=Object(h.a)(D,2),W=H[0],V=H[1],G=Object(j.useState)(0),Q=Object(h.a)(G,2),J=Q[0],ee=Q[1];Object(j.useEffect)((function(){d(xe()),c||fe(o,u.current._fc)}),[c,o]),Object(j.useEffect)((function(){window.addEventListener("deviceorientation",(function(e){var t=e.beta;ee(Math.round(100*t)/100)}))}),[]);return Object(v.jsxs)("div",{style:{position:"absolute",zIndex:1e3,left:0,backgroundColor:"rgba(255, 255, 255, 0.5)",borderBottom:"5px solid #aaa"},children:[Object(v.jsx)(le.SketchField,{name:"sketch",className:"canvas-area",ref:u,lineColor:g,lineWidth:y,fillColor:S||"transparent",width:b.width,height:3*b.width/2,forceValue:!0,onChange:function(){var e,t=R,n=null===(e=u.current)||void 0===e?void 0:e.canUndo();t!==n&&z(n)},tool:M,imageFormat:"jpeg"}),Object(v.jsx)(ue,{children:Object(v.jsxs)(U.a,{children:[Object(v.jsxs)(F.a,{xs:7,style:{paddingRight:"5px"},children:[Object(v.jsx)("div",{children:Object(v.jsxs)(ce.a,{children:[Object(v.jsx)(f.a,{variant:M===le.Tools.Pencil?"secondary":"light",onClick:function(){return E(le.Tools.Pencil)},children:Object(v.jsx)("i",{className:"bi bi-pencil"})}),Object(v.jsx)(f.a,{variant:M===le.Tools.Line?"secondary":"light",onClick:function(){return E(le.Tools.Line)},children:Object(v.jsx)("i",{className:"bi bi-slash-lg"})}),Object(v.jsx)(f.a,{variant:M===le.Tools.Rectangle?"secondary":"light",onClick:function(){return E(le.Tools.Rectangle)},children:Object(v.jsx)("i",{className:"bi bi-square"})}),Object(v.jsx)(f.a,{variant:M===le.Tools.Circle?"secondary":"light",onClick:function(){return E(le.Tools.Circle)},children:Object(v.jsx)("i",{className:"bi bi-circle"})}),Object(v.jsx)(ie.a,{trigger:"click",placement:"top",overlay:function(e){return Object(v.jsxs)(ne.a,Object(T.a)(Object(T.a)({},e),{},{style:Object(T.a)(Object(T.a)({},e.style),{},{padding:"10px"}),children:["\u7dda",Object(v.jsx)("br",{}),Object(v.jsx)(se.a,{id:"lineColor",color:g,onChange:function(e){return p(e.hex)}}),Object(v.jsx)("br",{}),Object(v.jsx)("br",{}),"\u4e2d\u8eab"," ",Object(v.jsx)(f.a,{style:{padding:"0px 10px"},variant:"secondary",onClick:function(){return L("transparent")},children:"\u4e2d\u8eab\u306a\u3057"}),Object(v.jsx)("br",{}),Object(v.jsx)(se.a,{id:"fillColor",color:S,onChange:function(e){L(e.hex),p("#000"),p(g)}})]}))},style:{position:"relative"},children:Object(v.jsxs)(f.a,{variant:"light",style:{padding:"3px"},children:[Object(v.jsx)("i",{className:"bi bi-palette"})," ",Object(v.jsx)("span",{style:{border:"3px solid"+g,backgroundColor:S,width:"15px",height:"15px",display:"inline-block",verticalAlign:"middle"}})]})})]})}),Object(v.jsxs)("div",{children:[Object(v.jsx)("span",{style:{display:"inline-block",width:"20px"}}),Object(v.jsx)("i",{className:"bi bi-border-width"})," ",Object(v.jsx)("div",{style:{display:"inline-block",verticalAlign:"middle"},children:Object(v.jsx)(be.a,{min:1,max:30,value:y,onChange:function(e){return k(e.target.value)}})})]}),Object(v.jsxs)(ce.a,{children:[Object(v.jsx)(Oe,{variant:M===le.Tools.Select?"secondary":"light",onClick:function(){return E(le.Tools.Select)},children:Object(v.jsx)("i",{className:"bi bi-hand-index-thumb"})}),Object(v.jsx)(Oe,{disabled:M!==le.Tools.Select,variant:"light",onClick:function(){try{u.current.removeSelected()}catch(e){alert("\u307e\u305a\u524a\u9664\u3057\u305f\u3044\u30d1\u30fc\u30c4\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044")}},children:Object(v.jsx)("i",{className:"bi bi-trash"})}),Object(v.jsx)(Oe,{disabled:M!==le.Tools.Select,variant:"light",onClick:function(){try{u.current.copy(),u.current.paste()}catch(e){alert("\u307e\u305a\u30b3\u30d4\u30da\u3057\u305f\u3044\u30d1\u30fc\u30c4\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044")}},children:Object(v.jsx)("i",{className:"bi bi-files"})})]})]}),Object(v.jsxs)(F.a,{xs:5,children:[Object(v.jsxs)(ce.a,{style:{marginBottom:"5px"},children:[Object(v.jsx)(he,{disabled:!R,variant:"light",onClick:function(){u.current.undo(),z(u.current.canUndo()),V(u.current.canRedo())},children:Object(v.jsx)("i",{className:"bi bi-arrow-90deg-left"})}),Object(v.jsx)(he,{disabled:!W,variant:"light",onClick:function(){u.current.redo(),z(u.current.canUndo()),V(u.current.canRedo())},children:Object(v.jsx)("i",{className:"bi bi-arrow-90deg-right"})}),Object(v.jsx)(he,{variant:"light",onClick:function(){u.current.clear(),z(u.current.canUndo()),V(u.current.canRedo()),c||fe(o,u.current._fc)},children:Object(v.jsx)("i",{className:"bi bi-arrow-counterclockwise"})})]}),Object(v.jsxs)(ce.a,{children:[Object(v.jsx)(he,{variant:"light",onClick:function(){var e,o,s,l=J,j=Object(q.b)(),b=Object(X.b)();e=prompt("\u30bf\u30a4\u30c8\u30eb\uff1a"),o=prompt("\u3053\u306e\u4f5c\u54c1\u306b\u3064\u3044\u3066\u306e\u8aac\u660e\uff1a"),s=Date.now(),""===e&&(e=s);var d=u.current.toDataURL();Object(q.d)(Object(q.c)(j,"paintings/"+e),d,"data_url").then((function(e){return Object(q.a)(e.ref)})).then((function(j){Object(X.d)(Object(X.c)(b,"img_urls/"+a+"/"+s),j).then((function(j){Object(X.d)(Object(X.c)(b,"img_info/"+a+"/"+s),{title:e,detail:o,angle:l,creator_id:i.uid,prev_img_ids:!c&&Object(T.a)(Object(I.a)({},r,!0),n)}).then((function(e){Object(X.d)(Object(X.c)(b,"users/"+i.uid+"/img_ids/"+a+"/"+s),!0).then((function(e){Object(X.d)(Object(X.c)(b,"users/"+i.uid+"/name"),i.displayName).then((function(e){alert("\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3057\u307e\u3057\u305f\uff01"),t(),window.location.href="/"+a+"?pid="+s})).catch((function(e){return alert(e)}))})).catch((function(e){return alert(e)}))})).catch((function(e){return alert(e)}))})).catch((function(e){return alert(e)}))})).catch((function(e){return alert(e)}))},children:Object(v.jsx)("i",{className:"bi bi-check-lg"})}),Object(v.jsx)(he,{disabled:!0,variant:"secondary",onClick:function(){},children:Object(v.jsx)("i",{className:"bi bi-hdd"})}),Object(v.jsx)(he,{variant:"light",onClick:t,children:Object(v.jsx)("i",{className:"bi bi-x-lg"})})]})]})]})})]})},pe=n(103),me=n.n(pe);var ve=function(e){var t,n=e.loc,c=e.location,i=Object(K.e)(Y),a=Object(K.c)(Z),r=Object(h.a)(a,2),o=r[0],s=r[1],l=Object(K.e)($),b=Object(j.useState)(0),d=Object(h.a)(b,2),u=d[0],O=d[1],x=Object(K.c)(ee),g=Object(h.a)(x,2),p=(g[0],g[1]),m=Object(j.useState)(!1),w=Object(h.a)(m,2),y=w[0],k=w[1],C=Object(j.useState)([]),N=Object(h.a)(C,2),S=N[0],L=N[1],_=Object(j.useState)(!0),P=Object(h.a)(_,2),M=P[0],E=P[1],A=oe(),B=function(e){var t=e;Array.isArray(e)||(t=Object.keys(e).map((function(t){return Object(T.a)({id:t},e[t])})));var n=me.a.parse(c.search).pid;L(t),s(n||t[0].id);var i=n?t.map((function(e){return e.id})).indexOf(n):0;O(i),z(n||t[0].id),p(t[i].angle)},z=function(e){var t=Object(X.b)();Object(X.a)(Object(X.c)(t,"img_urls/"+n+"/"+e)).then((function(e){e.exists()&&l(e.val())})).catch((function(e){return console.error(e)}))},U=function(e){var t=S;1===e?t[u].likes=Object(T.a)(Object(T.a)({},t[u].likes),{},Object(I.a)({},A.uid,!0)):delete t[u].likes[A.uid],L(t)};return Object(j.useEffect)((function(){i(n);var e=me.a.parse(c.search),t=Object(X.b)();Object(X.a)(Object(X.c)(t,"img_info/"+n)).then((function(c){if(c.exists())if(e.mode&&"base"===e.mode){var i=Object.keys(c.val()[e.bid].prev_img_ids),a={};i.forEach((function(e){a[e]=c.val()[e]})),B(a)}else e.mode&&"user"===e.mode?Object(X.a)(Object(X.c)(t,"users/"+e.uid+"/img_ids/"+n)).then((function(e){var t={};Object.keys(e.val()).forEach((function(e){t[e]=c.val()[e]})),B(t)})):B(c.val())})).catch((function(e){return console.error(e)}))}),[]),Object(v.jsxs)("div",{children:[Object(v.jsx)(R,{switchPrev:function(){if(S.length>1){var e=0===u?S.length-1:u-1;O(e),s(S[e].id),z(S[e].id),p(S[e].angle);var t=me.a.parse(c.search);t.pid=S[e].id;var n=window.location.origin+window.location.pathname+"?"+me.a.stringify(t);window.history.replaceState({path:n},"",n)}},switchNext:function(){if(S.length>1){var e=u===S.length-1?0:u+1;O(e),s(S[e].id),z(S[e].id),p(S[e].angle);var t=me.a.parse(c.search);t.pid=S[e].id;var n=window.location.origin+window.location.pathname+"?"+me.a.stringify(t);window.history.replaceState({path:n},"",n)}}}),S.length>0?Object(v.jsx)(J,{imgInfo:S[u],openCanvas:function(e){var t=e.isNew;k(!0),E(t)},canvasVisibility:y,likeTrigger:function(){var e=Object(X.b)();S[u].likes&&S[u].likes[A.uid]?Object(X.d)(Object(X.c)(e,"img_info/"+n+"/"+o+"/likes/"+A.uid),null).then((function(e){return U(-1)})):Object(X.d)(Object(X.c)(e,"img_info/"+n+"/"+o+"/likes/"+A.uid),!0).then((function(e){return U(1)}))}}):Object(v.jsx)(f.a,{style:{position:"absolute",bottom:0,left:0,width:"100vw"},onClick:function(){k(!0),E(!0)},children:"\u3053\u306e\u5834\u6240\u3067\u521d\u306e\u4f5c\u54c1\u3092\u63cf\u3053\u3046\uff01"}),y&&Object(v.jsx)(ge,{isNew:M,basePrevIds:(null===(t=S[u])||void 0===t?void 0:t.prev_img_ids)||{},closeCanvas:function(){return k(!1)}})]})},we=n(1172),ye=n(1174),ke=n(1171);var Ce=function(){var e=oe(),t=Object(K.d)(Y),n=Object(j.useState)("Campus as Canvas"),c=Object(h.a)(n,2),i=c[0],a=c[1];return Object(j.useEffect)((function(){var e=me.a.parse(window.location.search);if(e.mode&&"base"===e.mode){var n=Object(X.b)();Object(X.a)(Object(X.c)(n,"img_info/"+t+"/"+e.bid+"/title")).then((function(e){a("\u300c"+e.val()+"\u300d\u306e\u30d9\u30fc\u30b9\u4f5c\u54c1")}))}else if(e.mode&&"user"===e.mode){var c=Object(X.b)();Object(X.a)(Object(X.c)(c,"users/"+e.uid+"/name")).then((function(e){a(e.val()+"\u306e\u4f5c\u54c1")}))}else t&&a(m[t].name)}),[t]),Object(v.jsx)(we.a,{style:{position:"absolute",left:0,top:0,width:"100vw",background:"rgba(255, 255, 255, 0.5)"},children:Object(v.jsxs)(z.a,{children:[t&&Object(v.jsx)(we.a.Collapse,{children:Object(v.jsxs)(ye.a,{className:"me-auto",children:[Object(v.jsx)(f.a,{className:"btn btn-sm",variant:"outline-secondary",onClick:function(){return window.location.href="/"},children:Object(v.jsx)("i",{className:"bi bi-house"})}),Object(v.jsx)("span",{style:{width:"10px"}}),Object(v.jsx)(f.a,{className:"btn btn-sm",variant:"outline-secondary",onClick:function(){return window.history.back()},children:Object(v.jsx)("i",{className:"bi bi-chevron-compact-left"})})]})}),Object(v.jsx)(we.a.Brand,{children:i}),Object(v.jsxs)(we.a.Collapse,{children:[Object(v.jsx)(ye.a,{className:"me-auto"}),Object(v.jsx)(ye.a,{children:Object(v.jsxs)(ke.a,{title:Object(v.jsx)("i",{className:"bi bi-person-circle"})||"\u30ed\u30b0\u30a4\u30f3",drop:"start",children:[Object(v.jsx)("p",{style:{textAlign:"center"},children:null===e||void 0===e?void 0:e.displayName}),e?Object(v.jsx)(ke.a.Item,{onClick:function(){(function(){var e=Object(ae.b)();return Object(ae.e)(e)})().catch((function(e){return console.error(e)}))},children:"\u30ed\u30b0\u30a2\u30a6\u30c8"}):Object(v.jsx)(ke.a.Item,{onClick:function(){re().catch((function(e){return console.error(e)}))},children:"\u30ed\u30b0\u30a4\u30f3"})]})})]})]})})},Ne=function(e){var t=e.children;return function(){var e=Object(j.useState)(!0),t=Object(h.a)(e,2),n=t[0],c=t[1],i=Object(K.e)(te);return Object(j.useEffect)((function(){var e=Object(ae.b)();return Object(ae.c)(e,(function(e){i(e),c(!1)}))}),[i]),n}()?Object(v.jsx)("p",{children:"Loading..."}):t};var Se=function(){var e=oe();return Object(v.jsx)("div",{className:"App",children:Object(v.jsx)(Ne,{children:Object(v.jsx)("div",{children:e?Object(v.jsxs)("div",{children:[Object(v.jsx)(Ce,{}),Object(v.jsxs)(O.b,{children:[Object(v.jsx)(_,{path:"/"}),Object(v.jsx)(ve,{path:"/:loc"})]})]}):Object(v.jsx)("div",{children:Object(v.jsx)("button",{onClick:function(){re().catch((function(e){return console.error(e)}))},children:"\u30ed\u30b0\u30a4\u30f3"})})})})})},Le=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,1176)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),i(e),a(e),r(e)}))},_e=n(524);var Ie=function(){var e=Object(K.d)(Y),t=Object(K.d)($),n=Object(K.d)(Z),c=Object(K.d)(ee),i=Object(j.useState)({}),a=Object(h.a)(i,2),r=a[0],o=a[1],s=Object(j.useState)("0.3 1.5 -10"),l=Object(h.a)(s,2),b=l[0],d=l[1],u=Object(j.useState)("0 0 0"),O=Object(h.a)(u,2),x=O[0],f=O[1];return Object(j.useEffect)((function(){var t=Object(X.b)();Object(X.a)(Object(X.c)(t,"img_urls/"+e)).then((function(e){e.exists()&&o(e.val())})).catch((function(e){return console.error(e)})),d("-0.3 ".concat(1.5-Math.round(10*Math.cos(c*Math.PI/180)*100)/100," ").concat(-1*Math.round(10*Math.sin(c*Math.PI/180)*100)/100)),f("".concat(c-90," 0 0"))}),[e]),Object(j.useEffect)((function(){d("-0.3 ".concat(1.5-Math.round(10*Math.cos(c*Math.PI/180)*100)/100," ").concat(-1*Math.round(10*Math.sin(c*Math.PI/180)*100)/100)),f("".concat(c-90," 0 0"))}),[c]),Object(v.jsxs)("a-scene",{id:"a-scene","vr-mode-ui":"enabled: false;",renderer:"logarithmicDepthBuffer: true;",arjs:"trackingMethod: best; sourceType: webcam;debugUIEnabled: false;",children:[Object(v.jsx)("a-assets",{children:r&&Object.keys(r).map((function(e){return Object(v.jsx)("img",{id:e,src:r[e],crossOrigin:"anonymous",alt:"Painting "+e},e)}))}),t&&Object(v.jsx)("a-image",{src:"#"+n,width:10,height:8,position:b,rotation:x})]})};n(1159);Object(_e.a)({apiKey:"AIzaSyAA4zXM0wRBrL1l65NHg_8mQcjg75ew9RQ",authDomain:"campus-coloring.firebaseapp.com",databaseURL:"https://campus-coloring.firebaseio.com",projectId:"campus-coloring",storageBucket:"campus-coloring.appspot.com",messagingSenderId:"45926036058",appId:"1:45926036058:web:a9271137ac86762843de63",measurementId:"G-WPPW3TX4QG"});var Te=function(){var e=Object(K.d)(Y);return Object(v.jsxs)("div",{style:{width:"100%",height:"100%"},children:[e&&Object(v.jsx)(Ie,{}),Object(v.jsx)(Se,{})]})};u.a.render(Object(v.jsx)(K.a,{children:Object(v.jsx)(Te,{})}),document.getElementById("root")),Le()},531:function(e,t,n){},536:function(e,t,n){},671:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=671},698:function(e,t){},700:function(e,t){},723:function(e,t){},724:function(e,t){},730:function(e,t){},732:function(e,t){},764:function(e,t){},766:function(e,t){},767:function(e,t){},772:function(e,t){},774:function(e,t){},780:function(e,t){},782:function(e,t){},801:function(e,t){},813:function(e,t){},816:function(e,t){},838:function(e,t){}},[[1160,1,2]]]);
//# sourceMappingURL=main.a71f8e16.chunk.js.map