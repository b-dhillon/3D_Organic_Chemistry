"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../core/Billboard.cjs.js"),r=require("../core/QuadraticBezierLine.cjs.js"),s=require("../core/CubicBezierLine.cjs.js"),o=require("../core/CatmullRomLine.cjs.js"),t=require("../core/Line.cjs.js"),i=require("../core/PositionalAudio.cjs.js"),c=require("../core/Text.cjs.js"),u=require("../core/Text3D.cjs.js"),a=require("../core/Effects.cjs.js"),n=require("../core/GradientTexture.cjs.js"),j=require("../core/Image.cjs.js"),p=require("../core/Edges.cjs.js"),x=require("../core/Trail.cjs.js"),l=require("../core/Sampler.cjs.js"),q=require("../core/ComputedAttribute.cjs.js"),d=require("../core/Clone.cjs.js"),m=require("../core/MarchingCubes.cjs.js"),C=require("../core/Decal.cjs.js"),h=require("../core/Svg.cjs.js"),M=require("../core/OrthographicCamera.cjs.js"),S=require("../core/PerspectiveCamera.cjs.js"),P=require("../core/CubeCamera.cjs.js"),b=require("../core/DeviceOrientationControls.cjs.js"),B=require("../core/FlyControls.cjs.js"),f=require("../core/MapControls.cjs.js"),g=require("../core/OrbitControls.cjs.js"),T=require("../core/TrackballControls.cjs.js"),v=require("../core/ArcballControls.cjs.js"),A=require("../core/TransformControls.cjs.js"),L=require("../core/PointerLockControls.cjs.js"),k=require("../core/FirstPersonControls.cjs.js"),D=require("../core/GizmoHelper.cjs.js"),E=require("../core/GizmoViewcube.cjs.js"),R=require("../core/GizmoViewport.cjs.js"),G=require("../core/useCubeTexture.cjs.js"),w=require("../core/useFBX.cjs.js"),z=require("../core/useGLTF.cjs.js"),F=require("../core/useKTX2.cjs.js"),O=require("../core/useProgress.cjs.js"),I=require("../core/useTexture.cjs.js"),V=require("../core/useVideoTexture.cjs.js"),y=require("../core/Stats.cjs.js"),H=require("../core/useDepthBuffer.cjs.js"),Q=require("../core/useAspect.cjs.js"),X=require("../core/useCamera.cjs.js"),K=require("../core/useDetectGPU.cjs.js"),W=require("../core/useHelper.cjs.js"),N=require("../core/useBVH.cjs.js"),U=require("../core/useContextBridge.cjs.js"),_=require("../core/useAnimations.cjs.js"),J=require("../core/useFBO.cjs.js"),Y=require("../core/useIntersect.cjs.js"),Z=require("../core/useBoxProjectedEnv.cjs.js"),$=require("../core/BBAnchor.cjs.js"),ee=require("../core/CurveModifier.cjs.js"),re=require("../core/MeshDistortMaterial.cjs.js"),se=require("../core/MeshWobbleMaterial.cjs.js"),oe=require("../core/MeshReflectorMaterial.cjs.js"),te=require("../core/MeshRefractionMaterial.cjs.js"),ie=require("../core/PointMaterial.cjs.js"),ce=require("../core/shaderMaterial.cjs.js"),ue=require("../core/softShadows.cjs.js"),ae=require("../core/shapes.cjs.js"),ne=require("../core/RoundedBox.cjs.js"),je=require("../core/ScreenQuad.cjs.js"),pe=require("../core/Center.cjs.js"),xe=require("../core/Bounds.cjs.js"),le=require("../core/CameraShake.cjs.js"),qe=require("../core/Float.cjs.js"),de=require("../core/Stage.cjs.js"),me=require("../core/Backdrop.cjs.js"),Ce=require("../core/Shadow.cjs.js"),he=require("../core/ContactShadows.cjs.js"),Me=require("../core/AccumulativeShadows.cjs.js"),Se=require("../core/Reflector.cjs.js"),Pe=require("../core/SpotLight.cjs.js"),be=require("../core/Environment.cjs.js"),Be=require("../core/Lightformer.cjs.js"),fe=require("../core/Sky.cjs.js"),ge=require("../core/Stars.cjs.js"),Te=require("../core/Cloud.cjs.js"),ve=require("../core/Sparkles.cjs.js"),Ae=require("../core/useMatcapTexture.cjs.js"),Le=require("../core/useNormalTexture.cjs.js"),ke=require("../core/Points.cjs.js"),De=require("../core/Instances.cjs.js"),Ee=require("../core/Segments.cjs.js"),Re=require("../core/Detailed.cjs.js"),Ge=require("../core/Preload.cjs.js"),we=require("../core/BakeShadows.cjs.js"),ze=require("../core/meshBounds.cjs.js"),Fe=require("../core/AdaptiveDpr.cjs.js"),Oe=require("../core/AdaptiveEvents.cjs.js"),Ie=require("../core/PerformanceMonitor.cjs.js"),Ve=require("../core/RenderTexture.cjs.js"),ye=require("../core/Mask.cjs.js");require("@babel/runtime/helpers/extends"),require("react"),require("@react-three/fiber"),require("react-merge-refs"),require("three"),require("three-stdlib"),require("troika-three-text"),require("suspend-react"),require("meshline"),require("lodash.pick"),require("lodash.omit"),require("zustand"),require("stats.js"),require("../helpers/useEffectfulState.cjs.js"),require("detect-gpu"),require("three-mesh-bvh"),require("../materials/BlurPass.cjs.js"),require("../materials/ConvolutionMaterial.cjs.js"),require("../materials/MeshReflectorMaterial.cjs.js"),require("../materials/MeshRefractionMaterial.cjs.js"),require("../helpers/environment-assets.cjs.js"),require("../materials/SpotLightMaterial.cjs.js"),require("react-composer"),exports.Billboard=e.Billboard,exports.QuadraticBezierLine=r.QuadraticBezierLine,exports.CubicBezierLine=s.CubicBezierLine,exports.CatmullRomLine=o.CatmullRomLine,exports.Line=t.Line,exports.PositionalAudio=i.PositionalAudio,exports.Text=c.Text,exports.Text3D=u.Text3D,exports.Effects=a.Effects,exports.isWebGL2Available=a.isWebGL2Available,exports.GradientTexture=n.GradientTexture,exports.Image=j.Image,exports.Edges=p.Edges,exports.Trail=x.Trail,exports.useTrail=x.useTrail,exports.Sampler=l.Sampler,exports.useSurfaceSampler=l.useSurfaceSampler,exports.ComputedAttribute=q.ComputedAttribute,exports.Clone=d.Clone,exports.MarchingCube=m.MarchingCube,exports.MarchingCubes=m.MarchingCubes,exports.MarchingPlane=m.MarchingPlane,exports.Decal=C.Decal,exports.Svg=h.Svg,exports.OrthographicCamera=M.OrthographicCamera,exports.PerspectiveCamera=S.PerspectiveCamera,exports.CubeCamera=P.CubeCamera,exports.DeviceOrientationControls=b.DeviceOrientationControls,exports.FlyControls=B.FlyControls,exports.MapControls=f.MapControls,exports.OrbitControls=g.OrbitControls,exports.TrackballControls=T.TrackballControls,exports.ArcballControls=v.ArcballControls,exports.TransformControls=A.TransformControls,exports.PointerLockControls=L.PointerLockControls,exports.FirstPersonControls=k.FirstPersonControls,exports.GizmoHelper=D.GizmoHelper,exports.useGizmoContext=D.useGizmoContext,exports.GizmoViewcube=E.GizmoViewcube,exports.GizmoViewport=R.GizmoViewport,exports.useCubeTexture=G.useCubeTexture,exports.useFBX=w.useFBX,exports.useGLTF=z.useGLTF,exports.useKTX2=F.useKTX2,exports.useProgress=O.useProgress,exports.IsObject=I.IsObject,exports.useTexture=I.useTexture,exports.useVideoTexture=V.useVideoTexture,exports.Stats=y.Stats,exports.useDepthBuffer=H.useDepthBuffer,exports.useAspect=Q.useAspect,exports.useCamera=X.useCamera,exports.useDetectGPU=K.useDetectGPU,exports.useHelper=W.useHelper,exports.useBVH=N.useBVH,exports.useContextBridge=U.useContextBridge,exports.useAnimations=_.useAnimations,exports.useFBO=J.useFBO,exports.useIntersect=Y.useIntersect,exports.useBoxProjectedEnv=Z.useBoxProjectedEnv,exports.BBAnchor=$.BBAnchor,exports.CurveModifier=ee.CurveModifier,exports.MeshDistortMaterial=re.MeshDistortMaterial,exports.MeshWobbleMaterial=se.MeshWobbleMaterial,exports.MeshReflectorMaterial=oe.MeshReflectorMaterial,exports.MeshRefractionMaterial=te.MeshRefractionMaterial,exports.PointMaterial=ie.PointMaterial,exports.PointMaterialImpl=ie.PointMaterialImpl,exports.shaderMaterial=ce.shaderMaterial,exports.softShadows=ue.softShadows,exports.Box=ae.Box,exports.Capsule=ae.Capsule,exports.Circle=ae.Circle,exports.Cone=ae.Cone,exports.Cylinder=ae.Cylinder,exports.Dodecahedron=ae.Dodecahedron,exports.Extrude=ae.Extrude,exports.Icosahedron=ae.Icosahedron,exports.Lathe=ae.Lathe,exports.Octahedron=ae.Octahedron,exports.Plane=ae.Plane,exports.Polyhedron=ae.Polyhedron,exports.Ring=ae.Ring,exports.Sphere=ae.Sphere,exports.Tetrahedron=ae.Tetrahedron,exports.Torus=ae.Torus,exports.TorusKnot=ae.TorusKnot,exports.Tube=ae.Tube,exports.RoundedBox=ne.RoundedBox,exports.ScreenQuad=je.ScreenQuad,exports.Center=pe.Center,exports.Bounds=xe.Bounds,exports.useBounds=xe.useBounds,exports.CameraShake=le.CameraShake,exports.Float=qe.Float,exports.Stage=de.Stage,exports.Backdrop=me.Backdrop,exports.Shadow=Ce.Shadow,exports.ContactShadows=he.ContactShadows,exports.AccumulativeShadows=Me.AccumulativeShadows,exports.RandomizedLight=Me.RandomizedLight,exports.accumulativeContext=Me.accumulativeContext,exports.Reflector=Se.Reflector,exports.SpotLight=Pe.SpotLight,exports.Environment=be.Environment,exports.EnvironmentCube=be.EnvironmentCube,exports.EnvironmentMap=be.EnvironmentMap,exports.EnvironmentPortal=be.EnvironmentPortal,exports.useEnvironment=be.useEnvironment,exports.Lightformer=Be.Lightformer,exports.Sky=fe.Sky,exports.calcPosFromAngles=fe.calcPosFromAngles,exports.Stars=ge.Stars,exports.Cloud=Te.Cloud,exports.Sparkles=ve.Sparkles,exports.useMatcapTexture=Ae.useMatcapTexture,exports.useNormalTexture=Le.useNormalTexture,exports.Point=ke.Point,exports.Points=ke.Points,exports.PointsBuffer=ke.PointsBuffer,exports.PositionPoint=ke.PositionPoint,exports.Instance=De.Instance,exports.Instances=De.Instances,exports.Merged=De.Merged,exports.Segment=Ee.Segment,exports.SegmentObject=Ee.SegmentObject,exports.Segments=Ee.Segments,exports.Detailed=Re.Detailed,exports.Preload=Ge.Preload,exports.BakeShadows=we.BakeShadows,exports.meshBounds=ze.meshBounds,exports.AdaptiveDpr=Fe.AdaptiveDpr,exports.AdaptiveEvents=Oe.AdaptiveEvents,exports.PerformanceMonitor=Ie.PerformanceMonitor,exports.usePerformanceMonitor=Ie.usePerformanceMonitor,exports.RenderTexture=Ve.RenderTexture,exports.Mask=ye.Mask,exports.useMask=ye.useMask;