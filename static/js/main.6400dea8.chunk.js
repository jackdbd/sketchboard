(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,r){e.exports={board:"styles-module__board--1-URo"}},43:function(e,t,r){e.exports={"fallback-ui":"styles-module__fallback-ui--jafEg"}},52:function(e,t,r){e.exports=r(60)},59:function(e,t,r){},60:function(e,t,r){"use strict";r.r(t);var n,a=r(71),c=r(1),o=r.n(c),i=r(38),l=r.n(i),u=r(19),s=r(4),b=r(65),p=function(e){var t=Object(c.useState)(e.getValue()),r=Object(s.a)(t,2),n=r[0],a=r[1];Object(c.useEffect)(function(){var t=e.pipe(Object(b.a)(1)).subscribe(function(e){return a(e)});return function(){return t.unsubscribe()}});return[n,function(t){return e.next(t)}]},f=r(66),d=r(11),m=r(73),v=r(67),h=r(25),y=r(68),O=r(69),g=r(72),E=r(70),j=function(e,t){var r=Object(s.a)(e,2),n=r[0],a=r[1],c=Object(s.a)(t,2),o=c[0],i=c[1];return Math.sqrt(Math.pow(o-n,2)+Math.pow(i-a,2))},w=function(e){var t=Object(s.a)(e,2),r=t[0],n=t[1],a=r.clientX,c=r.clientY;return{cx:a,cy:c,r:j([a,c],[n.clientX,n.clientY])}},k=function(e){var t=Object(s.a)(e,3),r=t[0],n=t[1],a=t[2];return{p0:{x:r.clientX,y:r.clientY},p1:{x:n.clientX,y:n.clientY},p2:{x:a.clientX,y:a.clientY}}},C=function(e){return{x:e.clientX,y:e.clientY}},x=function(e){return[e[0][0],e[0][1],e[1][1]]},S=function(e,t){return Object(f.a)(e,t)},D=new m.a({circlesDrawn:0,clickCount:0,coordinates:[],lastClick:[0,0],trianglesDrawn:0}),P=r(35),A={fill:"#FF5722",opacity:"1",stroke:"#6A1B9A","stroke-dasharray":void 0,"stroke-opacity":"1","stroke-width":"1px"},T=new m.a(A),N="http://www.w3.org/2000/svg",F=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:A;e.setAttribute("fill",t.fill||""),e.setAttribute("opacity",t.opacity||""),e.setAttribute("stroke",t.stroke||""),e.setAttribute("stroke-dasharray",t["stroke-dasharray"]||""),e.setAttribute("stroke-opacity",t["stroke-opacity"]||""),e.setAttribute("stroke-width",t["stroke-width"]||"")},R=function(e,t,r,n){e.appendChild(function(e,t,r){var n=document.createElementNS(N,"circle");return n.setAttribute("cx","".concat(e.cx)),n.setAttribute("cy","".concat(e.cy)),n.setAttribute("r","".concat(e.r)),F(n,t),r&&n.setAttribute("id",r),n}(t,r,n))},I=function(e,t,r){var n=document.querySelector("#".concat("circle-feedback"));n?function(e,t,r){e.setAttribute("cx","".concat(t.cx)),e.setAttribute("cy","".concat(t.cy)),e.setAttribute("r","".concat(t.r)),F(e,r)}(n,t,r):R(e,t,r,"circle-feedback")},z=function(e,t,r){e.appendChild(function(e,t){var r=e.p0,n=e.p1,a=e.p2,c=document.createElementNS(N,"polygon");return c.setAttribute("points","".concat(r.x,",").concat(r.y," ").concat(n.x,",").concat(n.y," ").concat(a.x,",").concat(a.y)),F(c,t),c}(t,r))},B=function(e,t){return"".concat(e).concat(t.x,",").concat(t.y," ")},q=function(e,t,r){e.setAttribute("points",t.reduce(B,"")),F(e,r)},X=function(e,t,r,n){e.appendChild(function(e,t,r){var n=document.createElementNS(N,"polygon");return n.setAttribute("id",r),q(n,e,t),n}(t,r,n))},Y=function(e,t,r){var n=document.querySelector("#".concat("polygon-feedback"));n?function(e,t,r){q(e,t,r)}(n,t,r):X(e,t,r,"polygon-feedback")};function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function _(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(r,!0).forEach(function(t){Object(u.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}!function(e){e.Three="3",e.Four="4",e.FiveTen="5 10",e.Odd="4 1 2",e.Even="4 1 2 3",e.Other="20 10 5 5 5 10"}(n||(n={}));var G,J=function(e,t,r){var a=_({},r,{"stroke-dasharray":n.Four});return{complete:function(){!function(e){var t=document.querySelector("#".concat("polygon-feedback"));t&&e.removeChild(t)}(e)},next:function(r){var n=[].concat(Object(P.a)(t),[C(r)]);Y(e,n,a)}}},V=function(e,t,r){var a=_({},r,{"stroke-dasharray":n.Four});return{complete:function(){!function(e){var t=document.querySelector("#".concat("circle-feedback"));t&&e.removeChild(t)}(e)},next:function(r){if(t.length){var n=[].concat(Object(P.a)(t),[C(r)]),c=Object(s.a)(n,2),o=c[0],i=c[1],l=j([o.x,o.y],[i.x,i.y]),u={cx:o.x,cy:o.y,r:l};I(e,u,a)}}}};!function(e){e.BezierCurve="Bezier Curve",e.Circle="Circle",e.Rectangle="Rectangle",e.Triangle="Triangle"}(G||(G={}));var L={dropdownChangesCount:0,shape:G.Circle},U=new m.a(L),H=r(10),K=function(){var e=p(U),t=Object(s.a)(e,2),r=t[0],n=t[1];return o.a.createElement("div",{className:Object(H.a)("font-size:biggish")},o.a.createElement("label",{htmlFor:"shape-select-id"},"shape-selector"),o.a.createElement("div",{className:"box"},o.a.createElement("select",{id:"shape-select-id","data-testid":"sidebar-select-test-id",name:"shape-selector",onChange:function(e){n({dropdownChangesCount:r.dropdownChangesCount+1,shape:e.target.value})}},o.a.createElement("option",{value:G.Circle},"Circle"),o.a.createElement("option",{value:G.Triangle},"Triangle"),o.a.createElement("option",{value:G.Rectangle},"Rectangle"),o.a.createElement("option",{value:G.BezierCurve},"Bezier Curve"))))},Q=r(39),W=r.n(Q);function Z(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function $(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Z(r,!0).forEach(function(t){Object(u.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Z(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var ee=function(){var e=p(D),t=Object(s.a)(e,2),r=t[0],n=t[1],a=p(U),i=Object(s.a)(a,1)[0].shape,l=p(T),u=Object(s.a)(l,1)[0],b=Object(c.useRef)(null),f=Object(c.useRef)(null);return Object(c.useEffect)(function(){if(!f.current)throw new Error("ASSERT: ref NOT ready!");var e,t=S(f.current,"click"),r=S(f.current,"mousedown"),n=S(f.current,"mousemove"),a=[],c=t.subscribe(function(e){a.push(C(e))});switch(i){case G.Circle:var o=function(e,t,r,n){var a=n?console.log:d.a,c=e.pipe(Object(y.a)(2),Object(O.a)(a));return t.pipe(Object(g.a)(function(){return r}),Object(E.a)(c))}(t,r,n,!1),l=V(f.current,a,u);e=o.subscribe(l);break;case G.Triangle:var s=function(e,t,r,n){var a=n?console.log:d.a,c=e.pipe(Object(y.a)(3),Object(O.a)(a));return t.pipe(Object(g.a)(function(){return r}),Object(E.a)(c))}(t,r,n,!1),b=J(f.current,a,u);e=s.subscribe(b);break;default:var p="TODO: ".concat(i," not yet implemented");throw new Error(p)}return function(){c.unsubscribe(),e&&e.unsubscribe()}},[f,i,u,r.circlesDrawn,r.trianglesDrawn]),Object(c.useEffect)(function(){if(!f.current)throw new Error("ASSERT: ref NOT ready!");var e,t=S(f.current,"click");switch(i){case G.Circle:var a=function(e){return e.pipe(Object(v.a)(),Object(h.a)(w))}(t);e=a.subscribe(function(e){f.current&&R(f.current,e,u),n($({},r,{circlesDrawn:r.circlesDrawn+1,clickCount:r.clickCount+2,lastClick:[e.cx,e.cy]}))});break;case G.Triangle:var c=function(e){return e.pipe(Object(v.a)(),Object(v.a)(),Object(h.a)(x),Object(h.a)(k))}(t);e=c.subscribe(function(e){f.current&&z(f.current,e,u),n($({},r,{clickCount:r.clickCount+3,trianglesDrawn:r.trianglesDrawn+1}))});break;default:var o="TODO: ".concat(i," not yet implemented");throw new Error(o)}return function(){e&&e.unsubscribe()}},[n,i,u,r]),o.a.createElement("div",{className:W.a.board,"data-testid":"board-container-test-id",ref:b},o.a.createElement("svg",{"data-testid":"board-svg-test-id",height:"100%",preserveAspectRatio:"xMinYMin meet",ref:f,width:"100%"}))},te=r(40),re=r(41),ne=r(48),ae=r(42),ce=r(49),oe=r(9),ie=r(43),le=r.n(ie),ue=function(e){var t=e.error,r=e.errorInfo,n=e.eventId,a=e.onReportCrashButtonClick;return o.a.createElement("div",{className:le.a["fallback-ui"],"data-testid":"fallback-ui-div-container-test-id"},o.a.createElement("h1",null,"Something went wrong."),o.a.createElement("details",null,t.toString(),o.a.createElement("br",null),r&&r.componentStack),n&&o.a.createElement("button",{onClick:a},"Report feedback"))},se=function(e){function t(e){var r;return Object(te.a)(this,t),(r=Object(ne.a)(this,Object(ae.a)(t).call(this,e))).onReportCrash=function(){a.b({eventId:r.state.eventId})},r.state={error:void 0,errorInfo:void 0,eventId:void 0},r}return Object(ce.a)(t,e),Object(re.a)(t,[{key:"componentDidCatch",value:function(e,t){var r=this;oe.b(function(n){n.setExtras(t);var a=oe.a(e);r.setState({error:e,errorInfo:t,eventId:a})})}},{key:"render",value:function(){var e=this.props,t=e.children,r=e.debug,n=this.state,a=n.error,c=n.errorInfo,i=n.eventId;return a&&r&&console.error("--- ERROR ---",a),a?o.a.createElement(ue,{error:a,errorInfo:c,eventId:i,onReportCrashButtonClick:this.onReportCrash}):o.a.createElement(o.a.Fragment,null,t)}}]),t}(o.a.Component),be=function(){return o.a.createElement(se,{debug:!0},o.a.createElement(ee,null))},pe=r(46),fe=r(47),de=function(){var e=document.querySelector("svg");e&&Object(fe.saveSvgAsPng)(e,"drawing.png",{scale:.5})},me=function(){var e=document.querySelector("svg");if(e){var t=new XMLSerializer,r=new Blob([t.serializeToString(e)],{type:"image/svg+xml"});Object(pe.saveAs)(r,"disegno.svg")}},ve=function(){return o.a.createElement("div",{className:Object(H.a)("font-size:biggish")},o.a.createElement("label",null,"Exports"),o.a.createElement("div",{className:Object(H.a)("box","stack"),style:{display:"flex",flexDirection:"column"}},o.a.createElement("button",{onClick:me,style:{fontSize:"1em"},type:"button"},"Save as SVG"),o.a.createElement("button",{onClick:de,style:{fontSize:"1em"},type:"button"},"Save as PNG")))},he=function(){var e=p(D),t=Object(s.a)(e,1)[0],r=t.circlesDrawn,n=t.clickCount,a=t.trianglesDrawn,c=p(U),i=Object(s.a)(c,1)[0].shape;return o.a.createElement("div",{className:"stack"},o.a.createElement("p",null,"Selected shape: ".concat(i)),o.a.createElement("p",null,"Click count: ".concat(n)),o.a.createElement("p",null,"Circles drawn: ".concat(r)),o.a.createElement("p",null,"Triangles drawn: ".concat(a)))};function ye(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function Oe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ye(r,!0).forEach(function(t){Object(u.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ye(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var ge=function(){var e=p(U),t=Object(s.a)(e,1)[0].shape,r=p(T),a=Object(s.a)(r,2),c=a[0],i=a[1];return o.a.createElement("div",{className:"font-size:biggish"},o.a.createElement("label",null,"Config style for ".concat(t)),o.a.createElement("div",{className:Object(H.a)("box")},o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"fill"},"fill"),o.a.createElement("input",{id:"fill",name:"fill",onChange:function(e){i(Oe({},c,{fill:e.target.value}))},type:"color",value:c.fill})),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"opacity"},"opacity"),o.a.createElement("input",{id:"opacity",max:"1",min:"0",name:"opacity",onChange:function(e){i(Oe({},c,{opacity:e.target.value}))},step:"0.1",type:"number",value:c.opacity})),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"stroke"},"stroke"),o.a.createElement("input",{id:"stroke",name:"stroke",onChange:function(e){i(Oe({},c,{stroke:e.target.value}))},type:"color",value:c.stroke})),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"stroke-dasharray"},"stroke-dasharray"),o.a.createElement("select",{id:"stroke-dasharray",name:"stroke-dasharray",onChange:function(e){var t=e.nativeEvent.srcElement.options;i(Oe({},c,{"stroke-dasharray":t[t.selectedIndex].value}))}},o.a.createElement("option",{value:"none"},"No dashes nor gaps"),o.a.createElement("optgroup",{label:"Dashes and gaps of the same size"},o.a.createElement("option",{value:n.Three},n.Three),o.a.createElement("option",{value:n.Four},n.Four)),o.a.createElement("optgroup",{label:"Dashes and gaps of different size"},o.a.createElement("option",{value:n.FiveTen},n.FiveTen),o.a.createElement("option",{value:n.Odd},n.Odd),o.a.createElement("option",{value:n.Even},n.Even),o.a.createElement("option",{value:n.Other},n.Other)))),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"stroke-opacity"},"stroke-opacity"),o.a.createElement("input",{id:"stroke-opacity",max:"1",min:"0",name:"stroke-opacity",onChange:function(e){i(Oe({},c,{"stroke-opacity":e.target.value}))},step:"0.1",type:"number",value:c["stroke-opacity"]})),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"stroke-width"},"stroke-width"),o.a.createElement("input",{id:"stroke-width",name:"stroke-width",onChange:function(e){i(Oe({},c,{"stroke-width":e.target.value}))},placeholder:"e.g. 20px",type:"text",value:c["stroke-width"]}))))},Ee=function(){return o.a.createElement("div",{className:Object(H.a)("stack"),"data-testid":"sidebar-container-test-id"},o.a.createElement(K,null),o.a.createElement(ge,null),o.a.createElement(ve,null),o.a.createElement(he,null))},je=function(e){var t=e.children,r=e.noStretch,n=e.side;return Object(c.useEffect)(function(){if(2!==t.length)throw new Error("The Sidebar layout must have exactly 2 children")},[t,n]),o.a.createElement("div",{className:Object(H.a)("with-sidebar-on-the-".concat(n)),style:{height:"100%",flexGrow:1}},o.a.createElement("div",{className:Object(H.a)(r?"not-stretched-wrapper":"stretched-wrapper")},t))};r(59);a.a({dsn:"https://94f09b0a51c74127b82e3fa4d47857c2@sentry.io/1547393"}),l.a.render(o.a.createElement(function(){return o.a.createElement(je,{side:"right"},o.a.createElement(be,null),o.a.createElement(Ee,null))},null),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.6400dea8.chunk.js.map