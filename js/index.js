// Navbar toggle
const navbarToggle = document.querySelector(".navbar-toggle");
const navbarCollapse = document.querySelector(".navbar-collapse");

navbarToggle.addEventListener("click", function () {
  navbarCollapse.classList.toggle("open");
});

// Smooth scroll
const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

// Sticky navbar
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Set up the three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the full-size images of the artworks as textures
const textures = [
  new THREE.TextureLoader().load("./img/image1.png"),
  new THREE.TextureLoader().load("./img/image2.png"),
  // Other textures
];

// Create 3D objects for each artwork using the THREE.Mesh class
const artworks = textures.map((texture) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  return new THREE.Mesh(geometry, material);
});

// Add the 3D objects to the scene and position them in the 3D space
artworks.forEach((artwork, index) => {
  artwork.position.set(0, 0, 0);
  artwork.visible = false;
  scene.add(artwork);
});

// Use JavaScript to bind a click event listener to each thumbnail element
const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    // Get the index of the selected artwork
    const index = this.dataset.index;

    // Show the corresponding 3D object in the scene
    artworks.forEach((artwork, i) => {
      console.log(i == index);
      artwork.visible = i == index;
    });
  });
});
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = true;
// Animate the scene
const animate = function () {
  requestAnimationFrame(animate);
  camera.position.z = 3;
  renderer.render(scene, camera);
};

animate();
