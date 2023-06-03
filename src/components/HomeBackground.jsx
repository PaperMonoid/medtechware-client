import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useRef, useEffect } from 'react';

const parentStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    display: 'block',
    width: '100%',
    height: '80vh'
};

const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url(./craiyon_171125_inside_modern_home_cozy_environment_photorealistic.png)',
    backgroundSize: 'cover',
    backgroundPosition: '60% 0%',
    filter: "blur(5px)",
};

const rendererStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    display: 'block',
    width: '100%',
    height: '100%',
};


function updateCharacterPosition(object, element, renderer, scene, camera) {
    // Get new sizes
     const elementWidth = element.offsetWidth;
     const elementHeight = element.offsetHeight;

    // Update camera aspect ratio
    camera.aspect = elementWidth / elementHeight;
    camera.updateProjectionMatrix();

    // Resize renderer
    renderer.setSize(elementWidth, elementHeight);

    // Position arm model (this will depend on the model dimensions, so adjust as needed)
    let aspect = elementWidth / elementHeight;
    let modelWidth = 1; // Replace this with the width of your model in its local units
    object.position.x = 2.5 * aspect * modelWidth;
    object.position.y = -2.5;  // Adjust as necessary based on the dimensions of your model

    // Adjust camera position if necessary
    camera.position.z = 5; // You may need to adjust this based on the size of your model and the desired view

    // Ensure the renderer viewport is correct
    renderer.setViewport(0, 0, elementWidth, elementHeight);

    // Render again
    renderer.render(scene, camera);
}


function createScene(element) {
    const clock = new THREE.Clock();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, element.offsetWidth / element.offsetHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setSize(element.offsetWidth, element.offsetHeight);
    element.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xb8d0e0, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(3, 3, 3);
    scene.add(directionalLight);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
    backLight.position.set(-3, 3, -3);
    scene.add(backLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-3, -3, 3);
    scene.add(fillLight);

    const loader = new GLTFLoader();
    loader.load('/ArmWithAnimations.glb', function (gltf) {
        const object = gltf.scene;
        const animations = gltf.animations;
	scene.add(object);

        const skinTones = [
            [111, 53, 27],
            [111, 73, 54],
            [101, 56, 30],
            [73, 40, 21],
            [49, 28, 14],
            [235, 192, 133],
            [255, 204, 148],
        ];
        const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
        object.traverse((node) => {
            if (node.isMesh && node.name === "Arm") {
                const characterMesh = node;
                const characterMaterial = characterMesh.material;
                characterMaterial.color = new THREE.Color(
                    skinTone[0] / 255.0,
                    skinTone[1] / 255.0,
                    skinTone[2] / 255.0
                );
            }
        });

        //object.scale.set(1.2, 1.2, 1.2);
        //object.position.set(2, -3, 0);
        //object.position.set(2, -3, 0);
        object.scale.set(4, 4, 4);
        object.rotation.y = (3.1415/180.0) * 280.0;

        const animation = Math.round(Math.random()) * 2;

        const mixer = new THREE.AnimationMixer(object);
        const action1 = mixer.clipAction(animations[animation]);
        action1.play();
        action1.setLoop(THREE.LoopOnce, 1);
        action1.clampWhenFinished = true;
        mixer.addEventListener('finished', function () {
            const action2 = mixer.clipAction(animations[animation + 1]);
            action2.reset();
            action2.play();
        });


        function animate() {
	    requestAnimationFrame(animate);
            if (mixer) mixer.update(clock.getDelta());
	    renderer.render(scene, camera);
        }
        animate();

        const updateCharacter = () => updateCharacterPosition(object, element, renderer, scene, camera);
        window.addEventListener("resize", updateCharacter, false);
        updateCharacter();
    }, undefined, function (error) {
	console.error(error);
    });

    camera.position.z = 5;
}


export default function HomeBackground() {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (element.children.length == 0) {
            createScene(element);
        }
    }, []);

    return (
        <div style={parentStyle}>
          <div style={backgroundStyle}></div>
          <div
            ref={ref}
            style={rendererStyle}>
          </div>
        </div>
    );
}
