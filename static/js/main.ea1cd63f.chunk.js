(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,r){e.exports={sidebar:"styles-module__sidebar--179zX",select:"styles-module__select--34NKF"}},23:function(e,t,r){e.exports={board:"styles-module__board--1-URo","svg-board":"styles-module__svg-board--qNj_X"}},34:function(e,t,r){e.exports={"fallback-ui":"styles-module__fallback-ui--jafEg"}},42:function(e,t,r){e.exports=r(50)},49:function(e,t,r){},50:function(e,t,r){"use strict";r.r(t);var n=r(58),a=r(1),c=r.n(a),o=r(26),i=r.n(o),l=r(27),s=r(7),u=r(55),b=function(e){var t=Object(a.useState)(e.getValue()),r=Object(s.a)(t,2),n=r[0],c=r[1];Object(a.useEffect)(function(){var t=e.pipe(Object(u.a)(1)).subscribe(function(e){return c(e)});return function(){return t.unsubscribe()}});return[n,function(t){return e.next(t)}]},d=r(56),p=r(59),f=r(57),v=r(28),m=function(e){var t=Object(s.a)(e,2),r=t[0],n=t[1],a=r.clientX,c=r.clientY;return{cx:a,cy:c,r:function(e,t){var r=Object(s.a)(e,2),n=r[0],a=r[1],c=Object(s.a)(t,2),o=c[0],i=c[1];return Math.sqrt(Math.pow(o-n,2)+Math.pow(i-a,2))}([a,c],[n.clientX,n.clientY])}},g=function(e){var t=Object(s.a)(e,3),r=t[0],n=t[1],a=t[2];return{p0:{x:r.clientX,y:r.clientY},p1:{x:n.clientX,y:n.clientY},p2:{x:a.clientX,y:a.clientY}}};var h,O=function(e){return[e[0][0],e[0][1],e[1][1]]},w=function(e){return t=e,Object(d.a)(t,"click");var t},j=new p.a({circlesDrawn:0,clickCount:0,coordinates:[],lastClick:[0,0],trianglesDrawn:0}),E=function(e,t){e.appendChild(function(e){var t=document.createElementNS("http://www.w3.org/2000/svg","circle");return t.setAttribute("cx","".concat(e.cx)),t.setAttribute("cy","".concat(e.cy)),t.setAttribute("r","".concat(e.r)),t.setAttribute("fill","red"),t.setAttribute("stroke","black"),t.setAttribute("stroke-width","20px"),t.setAttribute("stroke-opacity","0.5"),t}(t))},y=function(e,t){e.appendChild(function(e){var t=e.p0,r=e.p1,n=e.p2,a=document.createElementNS("http://www.w3.org/2000/svg","polygon");return a.setAttribute("points","".concat(t.x,",").concat(t.y," ").concat(r.x,",").concat(r.y," ").concat(n.x,",").concat(n.y)),a.setAttribute("fill","green"),a.setAttribute("stroke","orange"),a.setAttribute("stroke-width","20px"),a.setAttribute("stroke-opacity","0.5"),a}(t))},C=r(14),k=r(29),S=r(30);!function(e){e.BezierCurve="Bezier Curve",e.Circle="Circle",e.Rectangle="Rectangle",e.Triangle="Triangle"}(h||(h={}));var x={dropdownChangesCount:0,shape:h.Circle},R=new p.a(x),A=r(22),N=r.n(A),I=function(){var e=document.querySelector("svg");e&&Object(S.saveSvgAsPng)(e,"drawing.png",{scale:.5})},D=function(){var e=document.querySelector("svg");if(e){var t=new XMLSerializer,r=new Blob([t.serializeToString(e)],{type:"image/svg+xml"});Object(k.saveAs)(r,"disegno.svg")}},T=function(e){var t=e.label,r=b(R),n=Object(s.a)(r,2),a=n[0],o=n[1],i=a.dropdownChangesCount,l=a.shape;return c.a.createElement("div",{className:Object(C.a)(N.a.sidebar,"stack"),"data-testid":"sidebar-container-test-id"},c.a.createElement("div",{className:Object(C.a)("stack-small")},c.a.createElement("label",{htmlFor:"shape-select-id"},t),c.a.createElement("select",{className:N.a.select,id:"shape-select-id","data-testid":"sidebar-select-test-id",name:"shape-selector",onChange:function(e){o({dropdownChangesCount:a.dropdownChangesCount+1,shape:e.target.value})}},c.a.createElement("option",{value:h.Circle},"Circle"),c.a.createElement("option",{value:h.Triangle},"Triangle"),c.a.createElement("option",{value:h.Rectangle},"Rectangle"),c.a.createElement("option",{value:h.BezierCurve},"Bezier Curve"))),c.a.createElement("div",{className:Object(C.a)("stack-large")},c.a.createElement("p",null,"You selected ".concat(l)),c.a.createElement("p",null,"You changed shape ".concat(i," times"))),c.a.createElement("button",{onClick:D,type:"button"},"Save as SVG"),c.a.createElement("button",{onClick:I,type:"button"},"Save as PNG"))},_=r(23),P=r.n(_);function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function X(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(r,!0).forEach(function(t){Object(l.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var Y=function(){var e=b(j),t=Object(s.a)(e,2),r=t[0],n=t[1],o=b(R),i=Object(s.a)(o,1)[0].shape,l=Object(a.useRef)(null),u=Object(a.useRef)(null);Object(a.useEffect)(function(){if(!l.current)throw new Error("ASSERT: ref NOT ready!");if(!u.current)throw new Error("ASSERT: ref NOT ready!");var e,t;switch(i){case h.Circle:var a=(t=l.current,w(t).pipe(Object(f.a)(),Object(v.a)(m)));e=a.subscribe(function(e){u.current&&E(u.current,e),n(X({},r,{circlesDrawn:r.circlesDrawn+1,clickCount:r.clickCount+2}))});break;case h.Triangle:var c=function(e){return w(e).pipe(Object(f.a)(),Object(f.a)(),Object(v.a)(O),Object(v.a)(g))}(l.current);e=c.subscribe(function(e){u.current&&y(u.current,e),n(X({},r,{clickCount:r.clickCount+3,trianglesDrawn:r.trianglesDrawn+1}))});break;default:var o="TODO: ".concat(i," not yet implemented");throw new Error(o)}return function(){e&&e.unsubscribe()}},[n,i,r]);return c.a.createElement("div",{className:P.a.board,"data-testid":"board-container-test-id",onClick:function(e){var t=function(e){var t=e.target.getBoundingClientRect(),r=e.clientX,n=e.clientY;return[r-t.left,n-t.top]}(e),r=Object(s.a)(t,2),n=r[0],a=r[1];console.log("onClick",n,a)},ref:l},c.a.createElement("svg",{className:P.a["svg-board"],"data-testid":"board-svg-test-id",height:"100%",ref:u,preserveAspectRatio:"xMinYMin meet",width:"100%"}))},z=r(31),M=r(32),q=r(37),F=r(33),G=r(38),J=r(6),V=r(34),K=r.n(V),L=function(e){var t=e.error,r=e.errorInfo,n=e.eventId,a=e.onReportCrashButtonClick;return c.a.createElement("div",{className:K.a["fallback-ui"],"data-testid":"fallback-ui-div-container-test-id"},c.a.createElement("h1",null,"Something went wrong."),c.a.createElement("details",null,t.toString(),c.a.createElement("br",null),r&&r.componentStack),n&&c.a.createElement("button",{onClick:a},"Report feedback"))},U=function(e){function t(e){var r;return Object(z.a)(this,t),(r=Object(q.a)(this,Object(F.a)(t).call(this,e))).onReportCrash=function(){n.b({eventId:r.state.eventId})},r.state={error:void 0,errorInfo:void 0,eventId:void 0},r}return Object(G.a)(t,e),Object(M.a)(t,[{key:"componentDidCatch",value:function(e,t){var r=this;J.b(function(n){n.setExtras(t);var a=J.a(e);r.setState({error:e,errorInfo:t,eventId:a})})}},{key:"render",value:function(){var e=this.props,t=e.children,r=e.debug,n=this.state,a=n.error,o=n.errorInfo,i=n.eventId;return a&&r&&console.error("--- ERROR ---",a),a?c.a.createElement(L,{error:a,errorInfo:o,eventId:i,onReportCrashButtonClick:this.onReportCrash}):c.a.createElement(c.a.Fragment,null,t)}}]),t}(c.a.Component),H=function(){return c.a.createElement(U,{debug:!0},c.a.createElement(Y,null))},Q=function(e){var t=e.children,r=e.noStretch,n=e.side;return Object(a.useEffect)(function(){if(2!==t.length)throw new Error("The Sidebar layout must have exactly 2 children")},[t,n]),c.a.createElement("div",{className:Object(C.a)("with-sidebar-on-the-".concat(n)),style:{height:"100%",flexGrow:1}},c.a.createElement("div",{className:Object(C.a)(r?"not-stretched-wrapper":"stretched-wrapper")},t))};r(49);n.a({dsn:"https://94f09b0a51c74127b82e3fa4d47857c2@sentry.io/1547393"}),i.a.render(c.a.createElement(function(){return c.a.createElement(Q,{side:"right"},c.a.createElement(H,null),c.a.createElement(T,{label:"some label"}))},null),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.ea1cd63f.chunk.js.map