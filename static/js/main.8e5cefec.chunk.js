(this["webpackJsonpcampus-coloring"]=this["webpackJsonpcampus-coloring"]||[]).push([[0],{51:function(e,t,n){},52:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var a=n(4),r=n(10),i=n(11),o=n(14),c=n(13),s=n(1),u=n.n(s),l=n(8),d=n.n(l),h=(n(51),n(23)),p=(n(52),n(53),n(78)),m=n(24),f=n(17);function j(){var e=Object(h.a)(["\n  width: 100%;\n  text-align: center;\n"]);return j=function(){return e},e}function b(){var e=Object(h.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n"]);return b=function(){return e},e}var g=Object(m.a)("div")(b()),v=Object(m.a)("div")(j());var O=function(e){var t=e.isCanvasOpen,n=e.auth,r=e.user;return Object(a.jsxs)(g,{children:[Object(a.jsxs)(v,{children:[r&&"loading"!==r&&Object(a.jsxs)("span",{children:[r.displayName,", welcome! "]}),r?"loading"===r?Object(a.jsx)("h2",{children:"Loading..."}):Object(a.jsx)(p.a,{onClick:function(){try{n.signOut()}catch(e){alert(e)}},children:"Sign out"}):Object(a.jsx)(p.a,{onClick:function(){try{n.signInWithRedirect(new f.a.auth.GoogleAuthProvider)}catch(e){alert(e)}},children:"Sign in"})]}),t&&Object(a.jsx)("canvas",{style:{background:"#fff"},children:"\u3086\u3073\u3086\u3073\uff01"})]})},y=n(28),k=n.n(y),w=n(29),x=n(36),I=function(e){Object(o.a)(n,e);var t=Object(c.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={isImgLoaded:!1},a.entityRef=u.a.createRef(),a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){return e.setState({isImgLoaded:!0})}),1e4),setTimeout((function(){return e.entityRef.current&&e.entityRef.current.setAttribute("scale",{x:5,y:5,z:5})}),15e3)}},{key:"render",value:function(){return Object(a.jsx)("a-nft",{markerhandler:!0,type:"nft",url:"http://localhost:1549/campus-coloring/https://raw.githack.com/YHhaoareyou/campus-coloring/master/public/descriptors/takeuchi",smooth:"true",smoothCount:"10",smoothTolerance:".01",smoothThreshold:"5",id:"a-nft","data-location":this.props.location,children:this.state.isImgLoaded&&Object(a.jsx)("a-image",{src:"#hiroMarker",width:"200",height:"200",position:"100 0 0",rotation:"-90 0 0",ref:this.entityRef})})}}]),n}(u.a.Component),C=n.p+"static/media/hiro-marker.81a8bff1.png",A=(n(60),n(65),function(e){Object(o.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={isImgLoaded:!1,locationNames:[],currentImages:[]},e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=Object(x.a)(k.a.mark((function e(){var t,n,a,r,i=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.db,e.next=3,t.ref().once("value");case 3:n=e.sent,a=n.val(),console.log(a),this.setState({locationNames:Object.keys(a)}),r=function(e){i.setState({currentImages:e})},window.AFRAME.components.markerhandler||window.AFRAME.registerComponent("markerhandler",{init:function(){this.el.sceneEl.addEventListener("markerFound",(function(e){t.ref(e.target.dataset.location).once("value",(function(e){var t=[],n=e.val();for(var a in n)t.push(Object(w.a)(Object(w.a)({},n[a]),{},{id:a}));r(t)}))})),this.el.sceneEl.addEventListener("markerLost",(function(e){return r([])}))}}),setTimeout((function(){return i.setState({isImgLoaded:!0})}),5e3);case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){delete window.AFRAME.components.markerhandler}},{key:"render",value:function(){var e=this.state,t=e.isImgLoaded,n=e.locationNames,r=e.currentImages;return Object(a.jsxs)("a-scene",{id:"a-scene","vr-mode-ui":"enabled: false;",renderer:"logarithmicDepthBuffer: true;",embedded:!0,arjs:"trackingMethod: best; sourceType: webcam;debugUIEnabled: false;",children:[Object(a.jsxs)("a-assets",{children:[t&&Object(a.jsx)("img",{id:"hiroMarker",src:C,alt:"hiroMarker"}),r&&r.map((function(e){return Object(a.jsx)("img",{id:e.id,src:e.url,alt:e.name},e.id)}))]}),n&&n.map((function(e,t){return Object(a.jsx)(I,{location:e},t)})),Object(a.jsx)("a-entity",{camera:!0})]})}}]),n}(u.a.Component)),L=(n(62),f.a.initializeApp({apiKey:"AIzaSyAA4zXM0wRBrL1l65NHg_8mQcjg75ew9RQ",authDomain:"campus-coloring.firebaseapp.com",databaseURL:"https://campus-coloring.firebaseio.com",projectId:"campus-coloring",storageBucket:"campus-coloring.appspot.com",messagingSenderId:"45926036058",appId:"1:45926036058:web:a9271137ac86762843de63",measurementId:"G-WPPW3TX4QG"})),R=L.auth(),S=L.database(),M=L.storage(),E=function(e){Object(o.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={isCanvasOpen:!1,user:"loading"},e.openCanvas=function(){return e.setState({isCanvasOpen:!0})},e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;R.onAuthStateChanged((function(t){t?e.setState({user:t}):e.setState({user:null})}))}},{key:"render",value:function(){return Object(a.jsxs)("div",{style:{width:"100%",height:"100%"},children:[Object(a.jsx)(A,{openCanvas:this.openCanvas,db:S,storage:M}),Object(a.jsx)(O,{isCanvasOpen:this.state.isCanvasOpen,auth:R,user:this.state.user})]})}}]),n}(u.a.Component);d.a.render(Object(a.jsx)(E,{}),document.getElementById("root"))}},[[64,1,2]]]);
//# sourceMappingURL=main.8e5cefec.chunk.js.map