import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import {
	AnimationClip,
	BooleanKeyframeTrack,
	ColorKeyframeTrack,
	NumberKeyframeTrack,
	// Vector3,
	VectorKeyframeTrack
} from 'three';

/*
// Architecture questions to answer: 
    - Will UI pages be stored in the same object as the scene pages?
        - What UI pages do we have?
            - Counter 
            - Future pages...?
    
    - Is it better to use React Three Fiber or Three.js directly? Or a mixter of the two. if mixture, what does that look like?
*/

type Vector3 = {
    x: number;
    y: number;
    z: number;
}

type Euler = {
    _x: number;
    _y: number;
    _z: number;
};

type AnimationAction = {
    name: string;
    duration: number;
    time: number;
    weight: number;
    repetitions: number;
    clampWhenFinished: boolean;
    enabled: boolean;
    zeroSlopeAtStart: boolean;
    zeroSlopeAtEnd: boolean;
};

type Mesh = {
    name: string;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    scale: THREE.Vector3;
    children: THREE.Object3D[];
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
};

type Model = {
    id: string;
    name: string;
    // url: string;
    path: string;
    // meshes: THREE.Mesh[] | null; 
    positions: Vector3[];
    rotations: Euler[];
    scale: Vector3;
    animations: THREE.AnimationClip[] | null; 
    nodes: THREE.BufferGeometry[] | null;
    materials: THREE.Material[] | null;
    visible: boolean;
}


type Scene = {
    id: string;
    title: string;
    thumbnail: string;
    section_count: number;
    universe: {
        size: number;
        radius: number;
    };
    camera: {
        positions: Vector3[];
        rotations: Euler[];
        animations: THREE.AnimationAction[];
    };
    models: Model[];
    text: any[] | null;
    speach: any[] | null;
    music: any[] | null;
};
// Animations
// https://threejs.org/examples/jsm/animation/AnimationClipCreator.js

function Rotation( period: number, axis = 'x' ) {
    const times = [ 0, period ], values = [ 0, 360 ];
    const trackName = '.rotation[' + axis + ']';
    const track = new NumberKeyframeTrack( trackName, times, values );
    return new AnimationClip( trackName, period, [ track ] );
};


const pages = {
    test_page: {
        id: 'test_page',
        title: 'Fullerenes',
        thumbnail: "url('./lesson_thumbnails/fullereneTile.png')",
        section_count: 6,

        universe: {
            radius: 10,
            size: 100
        },

        camera: {
            positions: [
                { x: 0, y: 0, z: 0 },
                { x: 0.5, y: 0, z: 1 },
                { x: 1, y: 0, z: 1.5 },
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 0, z: 0 },
            ],
            rotations: [
                { _x: 0, _y: 0, _z: 0 },
                { _x: 0.5, _y: 0, _z: 0 },
                { _x: 1, _y: 0, _z: 0 },
                { _x: 0, _y: 0, _z: 0 },
                { _x: 0, _y: 0, _z: 0 },
                { _x: 0, _y: 0, _z: 0 },
            ],
            animations: [
            ],
        },

        // model is positioned same as camera, but z-1. how can I link camera position to model position but with z-1?
        models: [
            {
                id: 'model0',
                path: '/lesson3_models/model0.glb',
                positions: [
                    { x: 0, y: 0, z: -1 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: [
                    Rotation( 1, 'x' ),
                ],
                meshes: null,
                nodes: null, 
                materials: null,
                visible: true,
                name: 'model0',
                scale: { x: 1, y: 1, z: 1 },
            },
            // {
            //     id: 'model1',
            //     path: '/lesson4_models/model1.glb',
            //     positions: [
            //         { x: 0, y: 0, z: -1 }
            //     ],
            //     rotations: [
            //         { _x: 0, _y: 0, _z: 0 }
            //     ],
            //     animations: null,
            //     meshes: null,
            //     nodes: null, 
            //     materials: null,
            //     visible: true,
            //     name: 'model1',
            //     scale: { x: 1, y: 1, z: 1 },
            // },
        ],

        text: [
            '',
            'In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of Helium gas...',
            'The result? Novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered. This molecule would go on to be named Buckminsterfullerene. Often shortened to fullerene, and nicknamed Buckyball.',
            'Each molecule of Fullerene is composed of pure carbon. The carbon atoms arrange themselves as hexagons and pentagons (highlighted in red), like the seams of a soccer ball. Fullerenes are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space. And because they are essentially hollow cages, they can be manipulated to make materials never before known.',
            'For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known. These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as novel drug delivery systems. Scientists have even turned their attention to buckyballs in their quest for a cure for AIDS.',
            'How can buckyballs help cure aids? An enzyme (HIV-1-Protease) that is required for HIV to reproduce, exhibits a nonpolar pocket in its three-dimensional structure. On the model to the right, notice how the nonpolar Fullerene fits the exact diameter of the enzyme\'s binding pocket. If this pocket is blocked, the production of virus ceases. Because buckyballs are nonpolar, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible blockers.',
        ],

        speach: null,
        music: null
    },
};

function LoadModel( i: number ) {
    return new Promise( (resolve, reject) => {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
        loader.setDRACOLoader( dracoLoader );
        loader.load(
            pages.test_page.models[i].path,
            (gltf: any) => {
                resolve(gltf);
                console.log(gltf);
            },
            (xhr: any) => {
                // console.log((xhr.loaded / xhr.total) + 'loaded');
            },
            (error: any) => {
                console.error(error);
                reject(error);
            }
        );
    });
};

async function LoadAllModelsOfPage() {
    const models: any = [];
    for (let i = 0; i < pages.test_page.models.length; i++) {
        models[i] = await LoadModel(i);
    };
    return models; // [model0, model1, model2, ...]
};

async function ExtractAllMeshesOfPage() {
    const models = await LoadAllModelsOfPage();
    const extracted_meshes = models.map( (gltf: any) => gltf.scene.children.filter( ( child: any ) => child.isMesh && child.__removed === undefined ));
    return extracted_meshes; // [ [mesh0, mesh1, mesh2, ...], [mesh0, mesh1, mesh2, ...], [mesh0, mesh1, mesh2, ...], ... ]
}

async function AddAllMeshesToPageData() {
    const extracted_meshes = await ExtractAllMeshesOfPage();
    const new_pages = JSON.parse(JSON.stringify(pages));
    new_pages.test_page.models = new_pages.test_page.models.map( (model: any, i: number) => {
        return { ...model, meshes: extracted_meshes[i] }
    });
    return new_pages;
};

console.log( AddAllMeshesToPageData() );













// copy the pages object. then for each model[i], add loaded_meshes[i].
// const new_pages = JSON.parse(JSON.stringify(pages));
// new_pages.test_page.models = new_pages.test_page.models.map( (model: any, i: number) => {
//     return {
//         ...model,
//         meshes: loaded_meshes[i]
//     };
// });
// return new_pages;

// function AddAllMeshesToPageData() {
//     ExtractAllMeshesOfPage().then( (extracted_meshes: any) => {
//         const new_pages = JSON.parse(JSON.stringify(pages));
//         new_pages.test_page.models = new_pages.test_page.models.map( (model: any, i: number) => {
//             return {
//                 ...model,
//                 meshes: extracted_meshes[i]
//             };
//         });
//         return new_pages;
//     });
// };

// const loaded_meshes = gltfs[i].scene.children.filter( ( child: any ) => child.isMesh && child.__removed === undefined );
// pages.test_page.models[i].meshes = loaded_meshes;











// export default scene_configs;
// Adds gltf meshes to the models array above:
// function ExtractGLTFMeshes(i: number) {
//     scene.models[i]._mesh = gltfs[i].scene.children.filter( ( child: any ) => child.isMesh && child.__removed === undefined );
//     // console.log(scene);
// };













































function RotationAnimation(arg0: number, arg1: string): THREE.AnimationAction
{
    throw new Error('Function not implemented.');
}
// {
//     id: 'nanotube',
//     title: 'Nanotubes',
//     thumbnail: "url('./lesson_thumbnails/nanotube.png')",
//     speach: null,
//     text: null,
//     models: [],
// },

// {
//     id: 'diamond',
//     title: 'Diamonds',
//     thumbnail: "url('./lesson_thumbnails/diamond.png')",
//     speach: null,
//     text: null,
//     models: [],
// },

// {
//     id: 'graphenes',
//     title: 'Graphenes',
//     thumbnail: "url('./lesson_thumbnails/graphene.png')",
//     speach: null,
//     text: null,
//     models: [],
// },

// {
//     id: 'chirality',
//     title: 'Chirality',
//     thumbnail: "url('./lesson_thumbnails/chirality.png')",
//     speach: null,
//     text: null,
//     models: [],
// }

// React Way: 
// If using useLoader or useGLTF hook, you must use the <Suspense> component to wrap the component that uses the hook as loading is asynchronous 
// requires suspension or promisification. 
// Also, keep in mind that hooks are about React and jsx. The functions return jsx pages, you need real vanilla object pages here.

/*
function LoadGLTF_React( i: number ) {
    const result: any = useLoader( GLTFLoader, scene.models[i].path );

    return (
        <Suspense fallback={ null }>
            <primitive object={result.scene} />        
        </Suspense>
        
    )
};
*/ 


/* 

// methods: {
//     animations: [
//         function rotate(ref: { current: { rotation: { y: number; }; }; }, delta: number) {
//             ref.current.rotation.y -= delta;
//         },
//     ],
// }



// Old Camera Config Data Structure: 
0: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
1: { position: { x: 0.5, y: 0, z: 1 }, rotation: { x: 0.5, y: 0, z: 0 } },
2: { position: { x: 1, y: 0, z: 1.5 }, rotation: { x: 1, y: 0, z: 0 } },
3: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
4: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
5: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },




textArrOfObj: [
    { section: 0, text: FullereneText[0] },
    { section: 1, text: FullereneText.s1 },
    { section: 2, text: FullereneText.s2 },
    { section: 3, text: FullereneText.s3 },
    { section: 4, text: FullereneText.s4 },
    { section: 5, text: FullereneText.s5 },
],

textArr: [
    FullereneText[0],
    FullereneText[1],
    FullereneText[2],
    FullereneText[3],
    FullereneText[4],
    FullereneText[5],
],

textObj: {
    0: FullereneText[0],
    1: FullereneText[1],
    2: FullereneText[2],
    3: FullereneText[3],
    4: FullereneText[4],
    5: FullereneText[5],
},

cameraPositions: {
    p0: [0, 0, 0],
    p1: [0.5, 0, 1]
},

cameraSettings: {
    s0: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    s1: { position: { x: 0.5, y: 0, z: 1 }, rotation: { x: 0.5, y: 0, z: 0 } },
    s2: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    s3: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    s4: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    s5: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
},
*/ 