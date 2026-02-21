// Lazy load: only init 3D when section is near viewport
const julius3dContainer = document.getElementById('julius3dContainer');
if (julius3dContainer) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            observer.disconnect();
            initJulius3DScene();
        }
    }, { rootMargin: '200px' });
    observer.observe(julius3dContainer);
}

async function initJulius3DScene() {
    const [THREE, { GLTFLoader }, { DRACOLoader }] = await Promise.all([
        import('three'),
        import('three/addons/loaders/GLTFLoader.js'),
        import('three/addons/loaders/DRACOLoader.js')
    ]);

    const container = document.getElementById('julius3dContainer');
    const loadingEl = document.getElementById('julius3dLoading');
    const hintEl = document.getElementById('julius3dHint');
    const spotlightEl = document.getElementById('julius3dSpotlight');
    if (!container) return;

    // ===== SCENE =====
    const scene = new THREE.Scene();

    // ===== CAMERA =====
    const camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 5);

    // ===== RENDERER =====
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ===== LIGHTING — VERY BRIGHT =====

    // Hemisphere light (sky blue + ground warm)
    const hemiLight = new THREE.HemisphereLight(0xddeeff, 0x887766, 0.8);
    scene.add(hemiLight);

    // Ambient — soft base
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Key light — front-right, warm
    const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.8);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    // Fill light — front-left, softer
    const fillLight = new THREE.DirectionalLight(0xe8f0ff, 0.8);
    fillLight.position.set(-3, 3, 4);
    scene.add(fillLight);

    // Rim light — blue accent from behind
    const rimLight = new THREE.DirectionalLight(0x4488ff, 1.5);
    rimLight.position.set(0, 2, -5);
    scene.add(rimLight);

    // Front face light — gentle
    const faceLight = new THREE.PointLight(0xffffff, 1.0, 12);
    faceLight.position.set(0, 1.5, 4);
    scene.add(faceLight);

    // Mouse-follow spotlight (moves with cursor)
    const mouseLight = new THREE.SpotLight(0xffffff, 2.0, 15, Math.PI / 6, 0.5, 1);
    mouseLight.position.set(0, 3, 5);
    scene.add(mouseLight);
    const mouseLightTarget = new THREE.Object3D();
    mouseLightTarget.position.set(0, 1, 0);
    scene.add(mouseLightTarget);
    mouseLight.target = mouseLightTarget;

    // ===== MOUSE TRACKING =====
    let mouseNormX = 0, mouseNormY = 0;    // normalized -1 to 1
    let mouseRawX = 0.5, mouseRawY = 0.5;  // 0 to 1 for spotlight
    let currentRotY = 0, currentRotX = 0;
    let currentPosX = 0;
    let isHovering = false;
    let juliusModel = null;
    let juliusPivot = null;  // pivot group to handle base rotation
    let baseY = 0;

    // Track mouse on the whole page
    window.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mouseNormX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
        mouseNormY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

        // For CSS spotlight
        mouseRawX = (e.clientX - rect.left) / rect.width;
        mouseRawY = (e.clientY - rect.top) / rect.height;
    }, { passive: true });

    container.addEventListener('mouseenter', () => {
        isHovering = true;
        if (hintEl) setTimeout(() => { hintEl.style.opacity = '0'; }, 1500);
    });
    container.addEventListener('mouseleave', () => {
        isHovering = false;
        // Smoothly return to center
        mouseNormX = 0;
        mouseNormY = 0;
    });

    // ===== CSS SPOTLIGHT (follows mouse) =====
    function updateSpotlight() {
        if (!spotlightEl || !isHovering) return;
        const x = mouseRawX * 100;
        const y = mouseRawY * 100;
        spotlightEl.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(255,255,255,0.08), transparent 40%)`;
    }

    // ===== LOAD MODEL (Draco compressed) =====
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('/assets/3d/julius-3d-opt.glb', (gltf) => {
        juliusModel = gltf.scene;

        // Auto-center and scale
        const box = new THREE.Box3().setFromObject(juliusModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        juliusModel.scale.setScalar(scale);

        // Center the model at origin
        juliusModel.position.x = -center.x * scale;
        juliusModel.position.y = -box.min.y * scale;
        juliusModel.position.z = -center.z * scale;

        // Rotate model to face camera
        juliusModel.rotation.y = -Math.PI * 0.6;

        // Wrap in pivot group — mouse tracking rotates the pivot, not the model
        juliusPivot = new THREE.Group();
        juliusPivot.add(juliusModel);
        baseY = 0;

        // Point camera at model center
        const modelCenter = new THREE.Vector3(0, (size.y * scale) / 2, 0);
        camera.lookAt(modelCenter);

        scene.add(juliusPivot);

        // Hide loading
        if (loadingEl) {
            loadingEl.style.transition = 'opacity 0.6s';
            loadingEl.style.opacity = '0';
            setTimeout(() => loadingEl.remove(), 600);
        }
        if (hintEl) {
            setTimeout(() => { hintEl.style.opacity = '1'; }, 800);
        }
    },
    (progress) => {
        if (loadingEl && progress.total) {
            const pct = Math.round((progress.loaded / progress.total) * 100);
            const span = loadingEl.querySelector('span');
            if (span) span.textContent = `Carregando Julius 3D... ${pct}%`;
        }
    },
    (error) => {
        console.error('Erro ao carregar Julius 3D:', error);
        if (loadingEl) {
            loadingEl.innerHTML = '<span style="color:rgba(255,255,255,0.5);">Não foi possível carregar o modelo 3D</span>';
        }
    });

    // ===== ANIMATION LOOP =====
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        if (juliusPivot) {
            // Smooth lerp factor — fast enough to feel responsive
            const lerpSpeed = isHovering ? 0.08 : 0.03;

            // Target rotation from mouse position (applied to pivot)
            const targetRotY = mouseNormX * 0.5;       // horizontal: ~30deg max
            const targetRotX = mouseNormY * -0.15;     // vertical: ~9deg max
            const targetPosX = mouseNormX * 0.08;      // subtle lean sideways

            // Smooth interpolation
            currentRotY += (targetRotY - currentRotY) * lerpSpeed;
            currentRotX += (targetRotX - currentRotX) * lerpSpeed;
            currentPosX += (targetPosX - currentPosX) * lerpSpeed;

            // Apply rotation to pivot (model keeps its base Math.PI rotation)
            juliusPivot.rotation.y = currentRotY;
            juliusPivot.rotation.x = currentRotX;

            // Subtle side lean
            juliusPivot.position.x = currentPosX;

            // Idle breathing float
            juliusPivot.position.y = baseY + Math.sin(t * 1.5) * 0.015;

            // Move the 3D spotlight to follow mouse in scene space
            mouseLightTarget.position.x = mouseNormX * 2;
            mouseLightTarget.position.y = 1 + mouseNormY * -1;
            mouseLight.position.x = mouseNormX * 3;
            mouseLight.position.y = 3 + mouseNormY * -1;
        }

        // Update CSS spotlight
        updateSpotlight();

        renderer.render(scene, camera);
    }
    animate();

    // ===== RESIZE =====
    const resizeObserver = new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
    resizeObserver.observe(container);
}
