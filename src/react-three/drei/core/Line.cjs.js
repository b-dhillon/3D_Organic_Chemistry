"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("react"),r=require("three"),n=require("@react-three/fiber"),i=require("three-stdlib");function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function a(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var s=o(e),c=a(t);const u=c.forwardRef((function({points:e,color:t="black",vertexColors:o,linewidth:a,lineWidth:u,dashed:l,...f},d){const h=n.useThree((e=>e.size)),[p]=c.useState((()=>new i.Line2)),[b]=c.useState((()=>new i.LineMaterial)),m=c.useMemo((()=>{const t=new i.LineGeometry,n=e.map((e=>{const t=Array.isArray(e);return e instanceof r.Vector3?[e.x,e.y,e.z]:e instanceof r.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e}));if(t.setPositions(n.flat()),o){const e=o.map((e=>e instanceof r.Color?e.toArray():e));t.setColors(e.flat())}return t}),[e,o]);return c.useLayoutEffect((()=>{p.computeLineDistances()}),[e,p]),c.useLayoutEffect((()=>{l?b.defines.USE_DASH="":delete b.defines.USE_DASH,b.needsUpdate=!0}),[l,b]),c.useEffect((()=>()=>m.dispose()),[m]),c.createElement("primitive",s.default({object:p,ref:d},f),c.createElement("primitive",{object:m,attach:"geometry"}),c.createElement("primitive",s.default({object:b,attach:"material",color:t,vertexColors:Boolean(o),resolution:[h.width,h.height],linewidth:null!=a?a:u,dashed:l},f)))}));exports.Line=u;