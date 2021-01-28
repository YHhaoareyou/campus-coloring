(this["webpackJsonpcampus-coloring"]=this["webpackJsonpcampus-coloring"]||[]).push([[0],{114:function(e,t,n){},115:function(e,t,n){},127:function(e,t,n){"use strict";n.r(t);var a=n(3),i=n(54),r=n.n(i),s=n(61),o=n(22),c=n(23),l=n(26),u=n(25),d=n(1),h=n.n(d),p=n(36),m=n.n(p),g=(n(114),n(37)),j=(n(115),n(116),n(38)),b=n(62),f=n(142),O=n(140);function v(){var e=Object(g.a)(["\n  position: absolute;\n  left: 0;\n  top: 45%;\n  width: 95%;\n  height: 5%;\n"]);return v=function(){return e},e}var x=Object(j.a)(f.a)(v()),I=function(e){var t=e.switchToPrev,n=e.switchToNext;return Object(a.jsxs)(x,{children:[Object(a.jsx)(f.a.Column,{width:1,children:Object(a.jsx)(O.a,{icon:"angle left",onClick:t,circular:!0})}),Object(a.jsx)(f.a.Column,{width:13}),Object(a.jsx)(f.a.Column,{width:1,children:Object(a.jsx)(O.a,{icon:"angle right",onClick:n,circular:!0})})]})},y=n(143),w=n(56),k=n(57),C=n(99),S=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).state={likes:e.props.image.likes||0,isClicked:!1},e.like=function(){var t=e.props,n=t.location,a=t.image;t.db.ref("locations/"+n).child(a.id.toString()).child("likes").set(a.likes?a.likes+1:1),e.setState((function(e){return Object(w.a)(Object(w.a)({},e),{},{likes:e.likes+1,isClicked:!0})}))},e}return Object(c.a)(n,[{key:"componentDidUpdate",value:function(e){e.image&&this.props.image&&e.image!==this.props.image&&this.setState({likes:this.props.image.likes||0,isClicked:!1})}},{key:"render",value:function(){var e=this.state,t=e.likes,n=e.isClicked;return Object(a.jsxs)(O.a,{color:"red",style:{marginTop:"1.5rem",padding:"0.8rem 0.3rem 0.6rem 1rem"},onClick:this.like,disabled:n,children:[Object(a.jsx)(k.a,{name:"heart"}),Object(a.jsx)(C.a,{style:{top:"1rem"},floating:!0,children:t})]})}}]),n}(h.a.Component);function D(){var e=Object(g.a)(["\n  position: absolute;\n  left: 0;\n  bottom: 5%;\n  width: 100%;\n  height: 15%;\n"]);return D=function(){return e},e}var L=Object(j.a)(f.a)(D()),A=function(e){var t=e.location,n=e.image,i=e.openCanvas,r=e.db;return Object(a.jsxs)(L,{children:[Object(a.jsx)(f.a.Column,{width:8,style:{padding:"1rem"},children:Object(a.jsxs)(y.a,{children:[Object(a.jsx)("h4",{children:n.name}),Object(a.jsx)("p",{children:n.description})]})}),Object(a.jsx)(f.a.Column,{width:2,style:{padding:"1rem 0px"},children:Object(a.jsx)(S,{location:t,image:n,db:r})}),Object(a.jsxs)(f.a.Column,{width:6,style:{padding:"1rem"},children:[Object(a.jsx)(O.a,{color:"green",onClick:i,style:{padding:"1rem 0.2rem",width:"100%"},children:"Create new"}),Object(a.jsx)(O.a,{color:"orange",onClick:i,disabled:!0,style:{padding:"1rem 0.2rem",width:"100%"},children:"Paint on this"})]})]})},T=n(98),R=function(e){var t=e.db,n=e.storage,i=e.location,r=e.resetCanvas,s=e.closeCanvas;return Object(a.jsx)(T.ReactPainter,{width:.85*window.innerHeight,height:.75*window.innerHeight,onSave:function(e){var a,r,s,o;do{s=prompt("What's your name? Any nickname is fine!")}while(!s);do{a=prompt("Please name your painting:")}while(!a);r=prompt("Please write something about this painting:"),o=window.confirm("Do you allow other users create paintings basing on this one?"),(new Image).src=e;var c=Date.now();n.ref().child("images/"+a).put(e).then((function(e){return e.ref.getDownloadURL()})).then((function(e){t.ref("image_urls").child(c).set(e).then((function(e){t.ref("locations").child(i+"/"+c).set({name:a,description:r,timestamp:c,user:s,is_public:o}).then((function(e){alert("Uploaded! Refresh the page to see your materpiece!")})).catch((function(e){alert(e)}))}))}))},render:function(e){var t=e.canvas,n=e.triggerSave,o=e.setColor,c=e.setLineWidth;return Object(a.jsxs)("div",{style:{zIndex:"1000"},children:[Object(a.jsx)("h2",{style:{margin:"0px"},children:i||"none"}),Object(a.jsx)("div",{style:{backgroundColor:"rgba(0, 0, 0, 0)",border:"5px solid #666"},children:t}),Object(a.jsxs)("div",{style:{padding:"1rem",background:"#ccc"},children:[Object(a.jsxs)("div",{children:["Color"," ",Object(a.jsx)("input",{type:"color",onChange:function(e){return o(e.target.value)},style:{width:"30%"}})," ","Width"," ",Object(a.jsx)("input",{type:"number",placeholder:"5",min:"1",max:"20",onChange:function(e){return c(e.target.value)},style:{width:"30%"}})]}),Object(a.jsxs)("div",{style:{paddingTop:"1rem"},children:[Object(a.jsx)(O.a,{color:"red",icon:"close",onClick:s}),Object(a.jsx)(O.a,{color:"orange",onClick:r,children:"Reset"}),Object(a.jsx)(O.a,{color:"green",onClick:n,children:"Save!!"})]})]})]})}})};function P(){var e=Object(g.a)(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n"]);return P=function(){return e},e}function U(){var e=Object(g.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 90%;\n"]);return U=function(){return e},e}var W=Object(j.a)("div")(U()),E=Object(j.a)("div")(P()),M=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).state={isCanvasOpen:!1,currentImg:e.props.imagesInfo&&e.props.imagesInfo.length&&e.props.imagesInfo[0]},e.signIn=function(){try{e.props.auth.signInWithRedirect(new b.a.auth.GoogleAuthProvider)}catch(t){alert(t)}},e.signOut=function(){try{e.props.auth.signOut()}catch(t){alert(t)}},e.switchToPrevImage=function(){var t=e.props,n=t.imagesInfo,a=t.setDisplayImageIndex,i=e.state.currentImg,r=0===n.indexOf(i)?n.length-1:n.indexOf(i)-1;e.setState({currentImg:n[r]}),a(r)},e.switchToNextImage=function(){var t=e.props,n=t.imagesInfo,a=t.setDisplayImageIndex,i=e.state.currentImg,r=n.indexOf(i)+1===n.length?0:n.indexOf(i)+1;e.setState({currentImg:n[r]}),a(r)},e.resetCanvas=function(){e.setState({isCanvasOpen:!1},(function(){return e.setState({isCanvasOpen:!0})}))},e}return Object(c.a)(n,[{key:"componentDidUpdate",value:function(e){this.props.imagesInfo&&e.imagesInfo!==this.props.imagesInfo&&(this.props.imagesInfo.length>0?this.setState({currentImg:this.props.imagesInfo[0]}):this.setState({currentImg:null}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.currentLocation,i=t.db,r=t.storage,s=this.state,o=s.isCanvasOpen,c=s.currentImg;return Object(a.jsx)(W,{children:Object(a.jsxs)(E,{children:[o&&Object(a.jsx)(R,{location:n,db:i,storage:r,resetCanvas:this.resetCanvas,closeCanvas:function(){return e.setState({isCanvasOpen:!1})}}),c&&!o&&Object(a.jsx)(I,{switchToPrev:this.switchToPrevImage,switchToNext:this.switchToNextImage}),c&&!o&&Object(a.jsx)(A,{location:n,image:c,openCanvas:function(){return e.setState({isCanvasOpen:!0})},db:i})]})})}}]),n}(h.a.Component),N=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).entityRef=h.a.createRef(),a}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return Object(a.jsx)("a-nft",{markerhandler:!0,type:"nft",url:"https://yhhaoareyou.github.io/campus-coloring/descriptors/"+this.props.location,smooth:"true",smoothCount:"10",smoothTolerance:".01",smoothThreshold:"5",id:"a-nft","data-location":this.props.location,children:this.props.images.map((function(t,n){return Object(a.jsx)("a-image",{src:"#"+t.id,width:n===e.props.displayImageIndex?.5*window.innerWidth:0,height:n===e.props.displayImageIndex?.5*window.innerWidth:0,position:"200 0 50",rotation:"-90 0 0"},t.id)}))})}}]),n}(h.a.Component),B=n.p+"static/media/hiro-marker.81a8bff1.png",z=(n(123),n(128),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).state={locationNames:[],currentLocation:"",currentImages:[],imageUrlsById:{}},e}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=Object(s.a)(r.a.mark((function e(){var t,n,a,i,s,o,c,l=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props,n=t.db,a=t.dbData,i=a.image_urls,s=a.locations,this.setState({imageUrlsById:i,locationNames:Object.keys(s)}),o=function(e){l.setState({currentImages:e}),l.props.setImagesInfo(e)},c=function(e){l.setState({currentLocation:e}),l.props.setLocation(e)},window.AFRAME.registerComponent("markerhandler",{init:function(){this.el.sceneEl.addEventListener("markerFound",(function(e){var t=e.target.dataset.location;c(t),n.ref("locations").child(t).once("value",(function(e){var t=[],n=e.val();for(var a in n)t.push(Object(w.a)(Object(w.a)({},n[a]),{},{id:a}));o(t)}))})),this.el.sceneEl.addEventListener("markerLost",(function(e){return o([])}))}});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){delete window.AFRAME.components.markerhandler}},{key:"render",value:function(){var e=this,t=this.state,n=t.locationNames,i=t.currentLocation,r=t.currentImages,s=t.imageUrlsById,o=Object.keys(s).length>0,c=n.length>0;return Object(a.jsxs)("a-scene",{id:"a-scene","vr-mode-ui":"enabled: false;",renderer:"logarithmicDepthBuffer: true;",embedded:!0,arjs:"trackingMethod: best; sourceType: webcam;debugUIEnabled: false;",children:[o&&Object(a.jsxs)("a-assets",{children:[Object(a.jsx)("img",{id:"hiroMarker",src:B,alt:"hiroMarker"}),Object.keys(s).map((function(e){return Object(a.jsx)("img",{id:e,src:s[e],alt:e,crossOrigin:"anonymous"},e)}))]}),o&&c&&n.map((function(t){return Object(a.jsx)(N,{location:t,images:i===t&&r.length>0?r:[],displayImageIndex:e.props.displayImageIndex},t)})),Object(a.jsx)("a-entity",{camera:!0})]})}}]),n}(h.a.Component)),_=(n(125),b.a.initializeApp({apiKey:"AIzaSyAA4zXM0wRBrL1l65NHg_8mQcjg75ew9RQ",authDomain:"campus-coloring.firebaseapp.com",databaseURL:"https://campus-coloring.firebaseio.com",projectId:"campus-coloring",storageBucket:"campus-coloring.appspot.com",messagingSenderId:"45926036058",appId:"1:45926036058:web:a9271137ac86762843de63",measurementId:"G-WPPW3TX4QG"})),F=_.auth(),G=_.database(),H=_.storage(),Q=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).state={imagesInfo:null,currentLocation:null,user:"loading",displayImageIndex:0,dbData:null},e.setImagesInfo=function(t){return e.setState({imagesInfo:t})},e.setLocation=function(t){return e.setState({currentLocation:t})},e.setDisplayImageIndex=function(t){return e.setState({displayImageIndex:t})},e}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=Object(s.a)(r.a.mark((function e(){var t,n=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return F.onAuthStateChanged((function(e){e?n.setState({user:e}):n.setState({user:null})})),e.next=3,G.ref().once("value");case 3:t=e.sent,this.setState({dbData:t.val()});case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(a.jsxs)("div",{style:{width:"100%",height:"100%"},children:[this.state.dbData&&Object(a.jsx)(z,{db:G,storage:H,dbData:this.state.dbData,setImagesInfo:this.setImagesInfo,setLocation:this.setLocation,displayImageIndex:this.state.displayImageIndex}),Object(a.jsx)(M,{imagesInfo:this.state.imagesInfo,currentLocation:this.state.currentLocation,auth:F,user:this.state.user,db:G,storage:H,setDisplayImageIndex:this.setDisplayImageIndex})]})}}]),n}(h.a.Component);m.a.render(Object(a.jsx)(Q,{}),document.getElementById("root"))}},[[127,1,2]]]);
//# sourceMappingURL=main.7b30eee0.chunk.js.map