import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import { Timeline } from "gsap/gsap-core";

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Texture Loader
 */
const textureLoader = new THREE.TextureLoader();

// Background
const space = textureLoader.load("/textures/space.jpg");
scene.background = space;

// Star
function addStar() {
  const starTexture = textureLoader.load("/textures/star.png");
  const geometry = new THREE.PlaneGeometry(0.15, 0.15);
  const material = new THREE.MeshStandardMaterial({
    map: starTexture,
    transparent: true,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(500).fill().forEach(addStar);

// Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Sun
const sunTexture = textureLoader.load("/textures/sun.jpg");
const sun = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
sun.name = "sun-desc";

// Mercury
const mercuryTexture = textureLoader.load("/textures/mercury.jpg");
const mercury = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
);
mercury.name = "mercury-desc";
mercury.position.y = -3;

// Venus
const venusTexture = textureLoader.load("/textures/venus.jpg");
const venus = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);
venus.name = "venus-desc";
venus.position.y = -6;

// Earth
const earthTexture = textureLoader.load("/textures/earth.jpg");
const earthNormalMap = textureLoader.load("/textures/earth_normal_map.png");
const earth = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormalMap,
  })
);
earth.name = "earth-desc";
earth.position.y = -9;

// Mars
const marsTexture = textureLoader.load("/textures/mars.jpg");
const mars = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);
mars.name = "mars-desc";
mars.position.y = -12;

// Jupiter
const jupiterTexture = textureLoader.load("/textures/jupiter.jpg");
const jupiter = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiter.name = "jupiter-desc";
jupiter.position.y = -15;

// Saturn
const saturnTexture = textureLoader.load("/textures/saturn.jpg");
const saturn = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);
saturn.name = "saturn-desc";
saturn.position.y = -18;

// Uranus
const uranusTexture = textureLoader.load("/textures/uranus.jpg");
const uranus = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);
uranus.name = "uranus-desc";
uranus.position.y = -21;

// Neptune
const neptuneTexture = textureLoader.load("/textures/neptune.jpg");
const neptune = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);
neptune.name = "neptune-desc";
neptune.position.y = -24;

scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);

// Objects
let objs = [];

scene.traverse((object) => {
  if (object.isMesh && object.name != "") objs.push(object);
});

// Lights
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.x = 0;
pointLight.position.y = -5;
pointLight.position.z = 7;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const gridHelper = new THREE.GridHelper(25, 50);
// scene.add(gridHelper);

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Mouse
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
}

window.addEventListener("scroll", handleScroll);

function handleScroll() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.y = t * 0.01;
}

/**
 * Animate
 */
const raycaster = new THREE.Raycaster();
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  let rotationX = elapsedTime * 0.2;
  let rotationY = elapsedTime * 0.1;
  let rotationZ = elapsedTime * 0.2;

  sun.rotation.set(rotationX, rotationY, rotationZ);
  mercury.rotation.set(rotationX, rotationY, rotationZ);
  venus.rotation.set(rotationX, rotationY, rotationZ);
  earth.rotation.set(rotationX, rotationY, rotationZ);
  mars.rotation.set(rotationX, rotationY, rotationZ);
  jupiter.rotation.set(rotationX, rotationY, rotationZ);
  saturn.rotation.set(rotationX, rotationY, rotationZ);
  uranus.rotation.set(rotationX, rotationY, rotationZ);
  neptune.rotation.set(rotationX, rotationY, rotationZ);

  // Raycaster
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objs);
  const tl = new Timeline();

  for (const intersect of intersects) {
    gsap.to(intersect.object.scale, { x: 1.7, y: 1.7 });
    gsap.to(intersect.object.rotation, { y: -0.5 });
    gsap.to(intersect.object.position, { x: 4, z: -0.9 });

    const element = document.querySelector(`.${intersect.object.name}`);
    // tl.to(element, { y: 0, duration: 1 }, "-=1");
    tl.to(element, { x: 100, duration: 1 }, "-=1");
    tl.to(element, { opacity: 3, duration: 1 });
  }

  for (const object of objs) {
    gsap.to(object.scale, { x: 1, y: 1 });
    gsap.to(object.rotation, { y: 0 });
    gsap.to(object.position, { x: 0, z: 0 });

    const element = document.querySelector(`.${object.name}`);
    // tl.to(element, { y: -100, duration: 1 }, "-=1");
    tl.to(element, { x: 350, duration: 1 }, "-=1");
    tl.to(element, { opacity: 0, duration: 1 }, "-=1");
  }

  // Update Orbital Controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
