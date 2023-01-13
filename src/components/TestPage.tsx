// @ts-nocheck
import { useState } from 'react';
import { OrbitControls, PerspectiveCamera, useHelper, useAnimations } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './redux/actions';
import { AnimationAction, CameraHelper } from 'three';
import Universe from './Universe';
import * as THREE from 'three'
// import scene_config_data from './scene_configs';
// import UpdateCamera from './UpdateCamera.jsx';

/* 
To-do: 

- Add test models to all proper locations of lesson -- need to figure out what these locations are first.
- Figure out why Models() is being called twice.
- Clean up and get a high level understanding of everything that you've re-factored.

- Reasonging for switching from useFrame() to AnimationActions
    - This should enhance performance as the computations should be done ahead of time.
    - It will also increase animation control with .start(), .stop(), .clampWhenFinished() etc... methods on the AnimtionAction object. 
        - https://threejs.org/docs/#api/en/animation/AnimationAction
    - This will allow you to have central stores of data and a proper pipeline.
    - Implement this with the UpdateCamera animation as well. 
*/


export default function Page( props ): any {
    const [ page ] = useState( props.data );

    return (
        <Suspense>
            <UI />
            <Scene data={ page } />
        </Suspense>
    );
};

// Mounts components to scene graph and renders 3D scene.
function Scene( props ): any {
    console.log( 'Scene() Called' );
    const counter = useSelector( ( state: any ) => state.counter );

    function StateCheck() {
        useThree( ( state ) => {
            console.log('state', state);
        });
    }




    return (
        <Suspense>
            <Canvas>

                < Universe universe_data={ props.data.universe } />
                < Camera counter={ counter } camera_data={ props.data.camera } />
                < Models data={ props.data } counter={ counter } />

                < ambientLight intensity={10} />
                < spotLight position={[-10, 10, 10] } intensity={.9} />
                < DevelopmentCamera  />
                < StateCheck />

            </Canvas>
        </Suspense>
    );
};

// Creates camera, handles its updates and renders the cameraHelper when called.
function Camera( props: { counter: number, camera_data: any } ) {
    const ref = useRef();
    const [ translateAnimationActions, setTranslateAnimationActions ] = useState( [] );
    const [ rotateAnimationActions, setRotateAnimationActions ] = useState( [] );
    const [ mixers, setMixers ] = useState( [] );


    // Loops through camera animations[] --> creates an AnimationAction for each rotation and translation animation:
    function CreateAllAnimationActions( fiber_camera, allAnimationData: any ) {
        let mixers = [];
        function CreateAnimationAction( animationData ) {
            const mixer = new THREE.AnimationMixer( fiber_camera );
            const animationAction = mixer.clipAction( animationData );
            animationAction.repetitions = 1;
            animationAction.clampWhenFinished = true;
            mixers.push( mixer );
            return animationAction
        }
        const allTranslateAnimationActions = allAnimationData.map( ( animationData: any ) => CreateAnimationAction( animationData[0] ) );
        const allRotateAnimationActions = allAnimationData.map( ( animationData: any ) => CreateAnimationAction( animationData[1] ) );
        setTranslateAnimationActions( allTranslateAnimationActions );
        setRotateAnimationActions( allRotateAnimationActions );
        setMixers( mixers );

    }; useEffect( () => CreateAllAnimationActions( ref.current, props.camera_data.animations ), [] );
                                                                    // ^  [ [ t, r ], [ t, r ] ]

    // Trigger proper camera animation based on counter:
    function AnimationController() {
        if( translateAnimationActions.length ) translateAnimationActions[ props.counter ].play();
        if( rotateAnimationActions.length ) rotateAnimationActions[ props.counter ].play();
        
    }; useEffect( AnimationController, [ translateAnimationActions, props.counter ] );


    useFrame( ( _, delta ) => {
        if( mixers.length ) mixers[ props.counter ].update( delta );
    });
    useHelper(ref, CameraHelper);

    return (
        <>
            <PerspectiveCamera ref={ref} position={[0,0,5]} fov={45} near={.1} far={2}/>
            {/* <UpdateCamera _ref={ref} counter={ counter } camera_data={ camera_data } /> */}
        </>
    );
};


// Loops data.models[] --> returns array of fiber models to mount to scene graph
// Creates AnimationController: Counter changes --> animation at the current counter index is played.

function Models( props: any )  {  

    const [ animationActions, setAnimationActions ] = useState( [] );

    useEffect( () => AnimationController( animationActions, props.counter ), [ animationActions, props.counter ] );

    useFrame( ( _, delta ) => {
        if( animationActions.length ) animationActions[ props.counter ]._mixer.update( delta );
    });

    const sceneModels = props.data.models.map( ( model: any , i: number ) => {
        return (
            <CreateModel 
                key={ model.id } 
                position={ model.positions[0] }
                name={ model.name }
                model={ model }
                setAnimationActions={ setAnimationActions }
                visible={ (props.counter === i ? true : false) }
            />
        );
    });

    return (
        <>
            { sceneModels }
        </>
    )
};


// Grabs meshes and animations from data --> creates a group of all the meshes per model:
// [ meshes ] mounted to the scene graph when Models();
function CreateModel( props: any ) {
    console.log('CreateModel() Called');

    const ref = useRef(), animationData = props.model.animations[0];
    let modelName;
    const fiber_model = props.model.meshes.map( ( mesh: any ) => {
        modelName = mesh.name;
        return <mesh 
            geometry={ mesh.geometry } 
            material={ mesh.material }  
            ref={ ref }
            scale={ 1 } 
            key={ mesh.uuid } 
            name={ mesh.name }
        />
    });

    useEffect( () => props.setAnimationActions( ( animationAction: any ) => [ ...animationAction, CreateAnimationAction( ref.current, animationData ) ] ), []);
    return (
        <group visible={ props.visible } name={ modelName } ref={ref} position={ [ props.position.x, props.position.y, props.position.z ] } >
            { fiber_model }
        </group>
    );
};

function CreateAnimationAction( fiber_model, animationData ) {
    const mixer = new THREE.AnimationMixer( fiber_model );
    const animationAction = mixer.clipAction( animationData );
    return animationAction;
}; 

function AnimationController(animations: any, counter: number) {
    if( animations.length ) {
        // This is a side effect...change to setAnimations?
        animations.forEach( ( animation: any ) => {
            animation.stop();
            animation.reset();
        });
        animations[ counter ].play();
    }
}


// Renders the UI and creates event handlers to handle user input.
function UI(): JSX.Element {
    // console.log('UI() called');

    const dispatch = useDispatch();
    return (
        <button 
            style={{
                position: 'absolute', 
                zIndex: '5', 
                width: '100px', 
                height: '33px'
            }} 
            onClick={ () => dispatch( increment() ) } 
        >
        Next
        </button> 
    )
};


// Creates a zoomed out camera with 360 orbit controls to make dev easier:
function DevelopmentCamera() {
    const ref: any = useRef();
    const set = useThree((state) => state.set);

    // Makes the camera known to the system:
    useEffect( () => set({ camera: ref.current }) );

    // Updates camera every frame:
    useFrame( () => { ref.current.updateMatrixWorld() } );

    // Adds 3D OrbitControls:
    function CameraControls() {
        const { camera, gl } = useThree();
        const ref: any = useRef();
        useFrame( (_, delta) => ref.current.update(delta) );
        return <OrbitControls ref={ref} args={[camera, gl.domElement]} />;
    };

    // Need to disable controls when camera is moving
    return (
        <>
            <PerspectiveCamera ref={ref} position={[0,0,40]} fov={45} aspect={1}/>
            <CameraControls />
        </>
    );
};

// console.log( 'scene graph', useThree( (state) => state ) );
// const set = useThree( (state) => state.set ); 
// useEffect( () => set({ camera: ref.current }) );