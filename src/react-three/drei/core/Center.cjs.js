"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("three"),r=require("react");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function u(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var o=n(e),i=u(r);const c=i.forwardRef((function({children:e,disableX:r,disableY:n,disableZ:u,left:c,right:a,top:l,bottom:f,front:d,back:s,onCentered:p,precise:b=!0,...m},g){const h=i.useRef(null),x=i.useRef(null),y=i.useRef(null);return i.useLayoutEffect((()=>{x.current.matrixWorld.identity();const e=(new t.Box3).setFromObject(y.current,b),o=new t.Vector3,i=new t.Sphere,m=e.max.x-e.min.x,g=e.max.y-e.min.y,j=e.max.z-e.min.z;e.getCenter(o),e.getBoundingSphere(i);const v=l?g/2:f?-g/2:0,O=c?-m/2:a?m/2:0,w=d?j/2:s?-j/2:0;x.current.position.set(r?0:-o.x+O,n?0:-o.y+v,u?0:-o.z+w),void 0!==p&&p({parent:h.current.parent,container:h.current,width:m,height:g,depth:j,boundingBox:e,boundingSphere:i,center:o,verticalAlignment:v,horizontalAlignment:O,depthAlignment:w})}),[e]),i.useImperativeHandle(g,(()=>h.current),[]),i.createElement("group",o.default({ref:h},m),i.createElement("group",{ref:x},i.createElement("group",{ref:y},e)))}));exports.Center=c;