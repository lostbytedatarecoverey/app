import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SERVICE_IMAGES } from '../data/services';

type ViewMode = 'inspect' | 'exploded' | 'scan';

interface HddHero3DProps {
  compact?: boolean;
  className?: string;
}

function detectSoftwareWebGL(): { supported: boolean; isSoftware: boolean } {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) {
      return { supported: false, isSoftware: true };
    }
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererParam = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(rendererParam) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    const isSoftware = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    return { supported: true, isSoftware };
  } catch {
    return { supported: false, isSoftware: true };
  }
}

/**
 * Generates a procedural radial brushed magnetic platter texture with concentric micro-tracks
 * and subtle recovery-sector glow arcs.
 */
function createPlatterTextures(maxAnisotropy: number) {
  const size = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d');

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rctx = roughCanvas.getContext('2d');

  if (ctx && rctx) {
    const cx = size / 2;
    const cy = size / 2;

    // Base metallic platter gradient
    const baseGrad = ctx.createRadialGradient(cx, cy, 42, cx, cy, 250);
    baseGrad.addColorStop(0, '#1e293b');
    baseGrad.addColorStop(0.24, '#94a3b8');
    baseGrad.addColorStop(0.45, '#e2e8f0');
    baseGrad.addColorStop(0.68, '#93c5fd');
    baseGrad.addColorStop(0.86, '#cbd5e1');
    baseGrad.addColorStop(1, '#475569');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Anisotropic sweep highlights across platter
    for (let i = 0; i < 4; i++) {
      const startAngle = (i * Math.PI) / 2 + 0.15;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle);
      const sweep = ctx.createLinearGradient(-250, -30, 250, 30);
      sweep.addColorStop(0, 'rgba(0, 212, 255, 0)');
      sweep.addColorStop(0.5, i % 2 === 0 ? 'rgba(0, 212, 255, 0.22)' : 'rgba(245, 247, 250, 0.28)');
      sweep.addColorStop(1, 'rgba(37, 99, 235, 0)');
      ctx.fillStyle = sweep;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 250, -0.32, 0.32);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Concentric magnetic data tracks
    rctx.fillStyle = '#2a2a2a';
    rctx.fillRect(0, 0, size, size);
    for (let r = 68; r < 246; r += 3.5) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = r % 21 < 3.5 ? 'rgba(0, 212, 255, 0.25)' : 'rgba(15, 23, 42, 0.14)';
      ctx.lineWidth = 0.85;
      ctx.stroke();

      rctx.beginPath();
      rctx.arc(cx, cy, r, 0, Math.PI * 2);
      rctx.strokeStyle = r % 14 < 3.5 ? '#484848' : '#1b1b1b';
      rctx.lineWidth = 1.1;
      rctx.stroke();
    }
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = maxAnisotropy;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.anisotropy = maxAnisotropy;

  return { map, roughnessMap };
}

/**
 * Generates a subtle machined dark aluminum texture for the HDD enclosure frame.
 */
function createBrushedMetalBump(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 2) {
      const shade = 112 + ((y * 37) % 32);
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(0, y, 256, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export const HddHero3D: React.FC<HddHero3DProps> = ({ compact = false, className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<ViewMode>('inspect');
  const [mode, setMode] = useState<ViewMode>('inspect');
  const [webglFailed, setWebglFailed] = useState(false);

  const handleModeChange = (nextMode: ViewMode) => {
    modeRef.current = nextMode;
    setMode(nextMode);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const { supported, isSoftware } = detectSoftwareWebGL();
    if (!supported) {
      setWebglFailed(true);
      return;
    }

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftware,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftware ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = !isSoftware;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D hard disk drive cutaway model');

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const width = container.clientWidth || 560;
    const height = container.clientHeight || (compact ? 360 : 480);
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();

    // Procedural Studio IBL Environment for crisp brushed titanium & mirror platter reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 60);
    camera.position.set(0.38, 4.55, 6.25);
    camera.lookAt(0, -0.2, 0);

    // 3-Point Studio Lighting with warm/cool temperature contrast + electric cyan accent rim
    const hemiLight = new THREE.HemisphereLight(0xcbe8ff, 0x0b1222, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e8, 2.2);
    keyLight.position.set(4.5, 7.5, 5.0);
    if (!isSoftware) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -4;
      keyLight.shadow.camera.right = 4;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00d4ff, 1.9);
    cyanRimLight.position.set(-5.0, 2.8, -3.5);
    scene.add(cyanRimLight);

    const blueFillLight = new THREE.PointLight(0x2563eb, 4.2, 12, 2);
    blueFillLight.position.set(2.4, 1.6, -2.5);
    scene.add(blueFillLight);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const { map: platterMap, roughnessMap: platterRoughMap } = createPlatterTextures(maxAniso);
    const brushedBump = createBrushedMetalBump(maxAniso);

    // Reusable disposables list
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      geometries.push(g);
      return g;
    };
    const trackMat = <T extends THREE.Material>(m: T): T => {
      materials.push(m);
      return m;
    };

    // --- MATERIALS (Distinct roughness/metalness contrast >= 0.25 between adjacent parts) ---
    const chassisOuterMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x161f2e,
        metalness: 0.72,
        roughness: 0.44,
        bumpMap: brushedBump,
        bumpScale: 0.008,
      }),
    );

    const chassisRecessMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x090e18,
        metalness: 0.35,
        roughness: 0.78,
      }),
    );

    const machinedEdgeMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x8ea2bd,
        metalness: 0.92,
        roughness: 0.22,
      }),
    );

    const platterMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        map: platterMap,
        roughnessMap: platterRoughMap,
        metalness: 0.96,
        roughness: 0.12,
        clearcoat: 0.85,
        clearcoatRoughness: 0.08,
        anisotropy: 0.75,
      }),
    );

    const spindleMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xcbd5e1,
        metalness: 0.94,
        roughness: 0.18,
      }),
    );

    const actuatorArmMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xdbeafe,
        metalness: 0.88,
        roughness: 0.26,
      }),
    );

    const copperCoilMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xc2783e,
        metalness: 0.85,
        roughness: 0.32,
      }),
    );

    const flexRibbonMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x8a5a2b,
        metalness: 0.45,
        roughness: 0.5,
      }),
    );

    const cyanGlowMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x00d4ff,
        emissiveIntensity: 1.4,
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.88,
      }),
    );

    const blueTrackMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        emissive: 0x2563eb,
        emissiveIntensity: 1.1,
        metalness: 0.1,
        roughness: 0.25,
        transparent: true,
        opacity: 0.65,
      }),
    );

    // --- ROOT HDD ASSEMBLY GROUP ---
    const hddRoot = new THREE.Group();
    hddRoot.rotation.set(0.18, -0.42, 0.04);
    scene.add(hddRoot);

    // 1. Primary Silhouette: Rounded-rectangle Extruded Aluminum Chassis Body
    const chassisW = 2.65;
    const chassisD = 3.55;
    const rCorner = 0.2;
    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(-chassisW / 2 + rCorner, -chassisD / 2);
    bodyShape.lineTo(chassisW / 2 - rCorner, -chassisD / 2);
    bodyShape.quadraticCurveTo(chassisW / 2, -chassisD / 2, chassisW / 2, -chassisD / 2 + rCorner);
    bodyShape.lineTo(chassisW / 2, chassisD / 2 - rCorner);
    bodyShape.quadraticCurveTo(chassisW / 2, chassisD / 2, chassisW / 2 - rCorner, chassisD / 2);
    bodyShape.lineTo(-chassisW / 2 + rCorner, chassisD / 2);
    bodyShape.quadraticCurveTo(-chassisW / 2, chassisD / 2, -chassisW / 2, chassisD / 2 - rCorner);
    bodyShape.lineTo(-chassisW / 2, -chassisD / 2 + rCorner);
    bodyShape.quadraticCurveTo(-chassisW / 2, -chassisD / 2, -chassisW / 2 + rCorner, -chassisD / 2);

    const chassisGeo = trackGeo(
      new THREE.ExtrudeGeometry(bodyShape, {
        depth: 0.36,
        bevelEnabled: true,
        bevelThickness: 0.045,
        bevelSize: 0.045,
        bevelSegments: 3,
      }),
    );
    chassisGeo.rotateX(Math.PI / 2);
    chassisGeo.center();

    const chassisBase = new THREE.Mesh(chassisGeo, chassisOuterMat);
    chassisBase.position.y = -0.18;
    chassisBase.castShadow = !isSoftware;
    chassisBase.receiveShadow = !isSoftware;
    hddRoot.add(chassisBase);

    // Machined metallic top lip rim
    const rimGeo = trackGeo(new THREE.BoxGeometry(chassisW + 0.04, 0.04, chassisD + 0.04));
    const chassisRim = new THREE.Mesh(rimGeo, machinedEdgeMat);
    chassisRim.position.y = 0.02;
    hddRoot.add(chassisRim);

    // Dark recessed interior platter cavity
    const recessGeo = trackGeo(new THREE.BoxGeometry(chassisW - 0.24, 0.08, chassisD - 0.26));
    const chassisRecess = new THREE.Mesh(recessGeo, chassisRecessMat);
    chassisRecess.position.y = 0.015;
    hddRoot.add(chassisRecess);

    // SATA Power & Data rear connector edge detail
    const sataHousingGeo = trackGeo(new THREE.BoxGeometry(1.15, 0.14, 0.16));
    const sataHousing = new THREE.Mesh(sataHousingGeo, chassisRecessMat);
    sataHousing.position.set(-0.35, -0.22, chassisD / 2 + 0.05);
    hddRoot.add(sataHousing);

    const sataPinsGeo = trackGeo(new THREE.BoxGeometry(0.95, 0.03, 0.12));
    const sataPins = new THREE.Mesh(sataPinsGeo, copperCoilMat);
    sataPins.position.set(-0.35, -0.21, chassisD / 2 + 0.08);
    hddRoot.add(sataPins);

    // 2. Dual Stacked Magnetic Disk Platters + Spindle Group (floats up in exploded mode)
    const platterStackGroup = new THREE.Group();
    platterStackGroup.position.set(0, 0.12, -0.34);
    hddRoot.add(platterStackGroup);

    const platterRadius = 1.08;
    const platterGeo = trackGeo(new THREE.CylinderGeometry(platterRadius, platterRadius, 0.036, 64));

    const lowerPlatter = new THREE.Mesh(platterGeo, platterMat);
    lowerPlatter.position.y = 0.0;
    lowerPlatter.castShadow = !isSoftware;
    lowerPlatter.receiveShadow = !isSoftware;
    platterStackGroup.add(lowerPlatter);

    const spacerRingGeo = trackGeo(new THREE.CylinderGeometry(0.37, 0.37, 0.08, 32));
    const spacerRing = new THREE.Mesh(spacerRingGeo, chassisRecessMat);
    spacerRing.position.y = 0.05;
    platterStackGroup.add(spacerRing);

    const upperPlatter = new THREE.Mesh(platterGeo, platterMat);
    upperPlatter.position.y = 0.1;
    upperPlatter.castShadow = !isSoftware;
    upperPlatter.receiveShadow = !isSoftware;
    platterStackGroup.add(upperPlatter);

    // Central brushed titanium spindle clamp
    const spindleHubGeo = trackGeo(new THREE.CylinderGeometry(0.32, 0.34, 0.18, 36));
    const spindleHub = new THREE.Mesh(spindleHubGeo, spindleMat);
    spindleHub.position.y = 0.09;
    platterStackGroup.add(spindleHub);

    const spindleCapGeo = trackGeo(new THREE.CylinderGeometry(0.14, 0.14, 0.21, 24));
    const spindleCap = new THREE.Mesh(spindleCapGeo, chassisOuterMat);
    spindleCap.position.y = 0.095;
    platterStackGroup.add(spindleCap);

    // 6 Instanced Torx Clamp Screws on spindle hub + 6 Perimeter Chassis Screws
    const screwGeo = trackGeo(new THREE.CylinderGeometry(0.032, 0.032, 0.03, 12));
    const screwInstanced = new THREE.InstancedMesh(screwGeo, machinedEdgeMat, 12);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2;
      dummy.position.set(Math.cos(ang) * 0.22, 0.19, Math.sin(ang) * 0.22);
      dummy.updateMatrix();
      screwInstanced.setMatrixAt(i, dummy.matrix);
    }
    const cornerOffsets: Array<[number, number]> = [
      [-1.16, -1.25],
      [1.16, -1.25],
      [-1.16, 0.34],
      [1.16, 0.34],
      [-1.16, 1.88],
      [1.16, 1.88],
    ];
    cornerOffsets.forEach(([cx, cz], idx) => {
      dummy.position.set(cx, -0.07, cz);
      dummy.updateMatrix();
      screwInstanced.setMatrixAt(6 + idx, dummy.matrix);
    });
    screwInstanced.instanceMatrix.needsUpdate = true;
    screwInstanced.computeBoundingSphere();
    platterStackGroup.add(screwInstanced);

    // 3. Articulated Actuator Read/Write Head Assembly Group (floats independently in exploded mode)
    const actuatorLayerGroup = new THREE.Group();
    actuatorLayerGroup.position.set(-0.74, 0.19, 0.96);
    hddRoot.add(actuatorLayerGroup);

    // Voice-Coil Magnet Yoke Bracket
    const vcmShape = new THREE.Shape();
    vcmShape.absarc(0, 0, 0.56, Math.PI * 0.72, Math.PI * 1.48, false);
    vcmShape.absarc(0, 0, 0.26, Math.PI * 1.48, Math.PI * 0.72, true);
    const vcmGeo = trackGeo(
      new THREE.ExtrudeGeometry(vcmShape, {
        depth: 0.14,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 2,
      }),
    );
    vcmGeo.rotateX(Math.PI / 2);
    const vcmMagnet = new THREE.Mesh(vcmGeo, machinedEdgeMat);
    vcmMagnet.position.set(0.08, 0.08, 0.14);
    actuatorLayerGroup.add(vcmMagnet);

    // Copper Voice Coil Accent
    const coilGeo = trackGeo(new THREE.TorusGeometry(0.32, 0.045, 10, 24, Math.PI * 0.55));
    coilGeo.rotateX(Math.PI / 2);
    const copperCoil = new THREE.Mesh(coilGeo, copperCoilMat);
    copperCoil.position.set(0.06, 0.01, 0.14);
    copperCoil.rotation.z = Math.PI * 0.85;
    actuatorLayerGroup.add(copperCoil);

    // Pivoting Arm Sub-Group
    const actuatorPivot = new THREE.Group();
    actuatorLayerGroup.add(actuatorPivot);

    const bearingGeo = trackGeo(new THREE.CylinderGeometry(0.2, 0.22, 0.2, 28));
    const pivotBearing = new THREE.Mesh(bearingGeo, spindleMat);
    pivotBearing.position.y = 0.04;
    actuatorPivot.add(pivotBearing);

    const bearingCoreGeo = trackGeo(new THREE.CylinderGeometry(0.09, 0.09, 0.23, 20));
    const pivotCore = new THREE.Mesh(bearingCoreGeo, chassisOuterMat);
    pivotCore.position.y = 0.045;
    actuatorPivot.add(pivotCore);

    // Tapered machined actuator arm reaching over upper platter
    const armShape = new THREE.Shape();
    armShape.moveTo(-0.14, 0);
    armShape.lineTo(0.14, 0);
    armShape.lineTo(0.038, 1.38);
    armShape.lineTo(-0.038, 1.38);
    armShape.closePath();

    const armGeo = trackGeo(
      new THREE.ExtrudeGeometry(armShape, {
        depth: 0.045,
        bevelEnabled: true,
        bevelThickness: 0.012,
        bevelSize: 0.01,
        bevelSegments: 2,
      }),
    );
    armGeo.rotateX(-Math.PI / 2);
    const actuatorArm = new THREE.Mesh(armGeo, actuatorArmMat);
    actuatorArm.position.set(0, 0.05, 0);
    actuatorArm.rotation.y = -0.34;
    actuatorArm.castShadow = !isSoftware;
    actuatorPivot.add(actuatorArm);

    // Read/Write Head Slider Tip with subtle cyan scan laser point
    const headTipGeo = trackGeo(new THREE.BoxGeometry(0.07, 0.025, 0.14));
    const headTip = new THREE.Mesh(headTipGeo, cyanGlowMat);
    headTip.position.set(0.47, 0.06, -1.32);
    headTip.rotation.y = -0.34;
    actuatorPivot.add(headTip);

    // Flex PCB Ribbon Cable curving from actuator pivot to drive corner
    const ribbonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.08, 0.03, 0.04),
      new THREE.Vector3(0.44, 0.03, 0.28),
      new THREE.Vector3(0.82, 0.02, 0.12),
      new THREE.Vector3(1.16, 0.0, 0.42),
    ]);
    const ribbonGeo = trackGeo(new THREE.TubeGeometry(ribbonCurve, 24, 0.026, 8, false));
    const ribbonMesh = new THREE.Mesh(ribbonGeo, flexRibbonMat);
    actuatorLayerGroup.add(ribbonMesh);

    // 4. Floating Holographic Data Reconstruction Arcs & Sector Streams
    const dataFieldGroup = new THREE.Group();
    dataFieldGroup.position.set(0, 0.38, -0.34);
    hddRoot.add(dataFieldGroup);

    const outerArcGeo = trackGeo(new THREE.TorusGeometry(1.12, 0.012, 8, 64, Math.PI * 1.15));
    outerArcGeo.rotateX(Math.PI / 2);
    const outerArc = new THREE.Mesh(outerArcGeo, cyanGlowMat);
    outerArc.position.y = 0.08;
    dataFieldGroup.add(outerArc);

    const midArcGeo = trackGeo(new THREE.TorusGeometry(0.84, 0.01, 8, 48, Math.PI * 0.85));
    midArcGeo.rotateX(Math.PI / 2);
    const midArc = new THREE.Mesh(midArcGeo, blueTrackMat);
    midArc.position.y = 0.22;
    midArc.rotation.y = 1.9;
    dataFieldGroup.add(midArc);

    const innerArcGeo = trackGeo(new THREE.TorusGeometry(0.56, 0.009, 8, 40, Math.PI * 0.65));
    innerArcGeo.rotateX(Math.PI / 2);
    const innerArc = new THREE.Mesh(innerArcGeo, cyanGlowMat);
    innerArc.position.y = 0.34;
    innerArc.rotation.y = 3.8;
    dataFieldGroup.add(innerArc);

    // Floating Data Stream Particles rising cleanly from platter sectors
    const particleCount = 110;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const pSeeds = new Float32Array(particleCount * 3);
    const cCyan = new THREE.Color(0x00d4ff);
    const cBlue = new THREE.Color(0x3b82f6);
    const cLight = new THREE.Color(0xe2e8f0);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.38 + ((i * 73) % 100) / 100 * 0.72;
      const angle = ((i * 137.5) % 360) * (Math.PI / 180);
      const yOffset = ((i * 41) % 100) / 100 * 0.95;

      pSeeds[i * 3] = radius;
      pSeeds[i * 3 + 1] = angle;
      pSeeds[i * 3 + 2] = yOffset;

      pPositions[i * 3] = Math.cos(angle) * radius;
      pPositions[i * 3 + 1] = yOffset;
      pPositions[i * 3 + 2] = Math.sin(angle) * radius;

      const pick = i % 3 === 0 ? cCyan : i % 3 === 1 ? cBlue : cLight;
      pColors[i * 3] = pick.r;
      pColors[i * 3 + 1] = pick.g;
      pColors[i * 3 + 2] = pick.b;
    }

    const particleGeo = trackGeo(new THREE.BufferGeometry());
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const particleMat = trackMat(
      new THREE.PointsMaterial({
        size: 0.048,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    const dataParticles = new THREE.Points(particleGeo, particleMat);
    dataFieldGroup.add(dataParticles);

    // Subtle grounding glow ring beneath drive
    const groundRingGeo = trackGeo(new THREE.RingGeometry(1.55, 1.92, 64));
    groundRingGeo.rotateX(-Math.PI / 2);
    const groundRingMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.14,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    const groundRing = new THREE.Mesh(groundRingGeo, groundRingMat);
    groundRing.position.set(0, -0.52, 0);
    hddRoot.add(groundRing);

    if (!isSoftware) {
      renderer.compile(scene, camera);
    }

    // Pointer interaction (smooth drag/hover rotation without heavy OrbitControls overhead)
    let pointerX = 0;
    let pointerY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragYawOffset = 0;
    let targetYawOffset = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (isDragging) {
        const dx = e.clientX - dragStartX;
        targetYawOffset = dragYawOffset + dx * 0.008;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragYawOffset = targetYawOffset;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onPointerLeave = () => {
      isDragging = false;
      pointerX = 0;
      pointerY = 0;
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);

    // ResizeObserver for crisp responsive sizing
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(240, Math.floor(entry.contentRect.width));
      const h = Math.max(240, Math.floor(entry.contentRect.height));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    resizeObserver.observe(container);

    // Animation loop with software WebGL afterDraw() pacing per Three.js skill
    let disposed = false;
    let frameId = 0;
    let timeoutId = 0;
    let elapsed = 0;
    let lastTime = performance.now();

    let explodeFactor = 0;
    let currentYaw = -0.42;
    let currentPitch = 0.2;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const status = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
          if (status === gl.UNSIGNALED) {
            timeoutId = window.setTimeout(poll, 8);
          } else {
            if (sync) gl.deleteSync(sync);
            timeoutId = window.setTimeout(cb, 85);
          }
        };
        timeoutId = window.setTimeout(poll, 8);
      } else {
        timeoutId = window.setTimeout(cb, 95);
      }
    };

    const renderFrame = () => {
      if (disposed) return;

      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      if (!reducedMotion) {
        elapsed += dt;
      }

      const activeMode = modeRef.current;
      const targetExplode = activeMode === 'exploded' ? 1 : 0;
      explodeFactor = THREE.MathUtils.damp(explodeFactor, targetExplode, 5.5, dt);

      // Smoothly elevate floating mechanical layers
      platterStackGroup.position.y = 0.12 + explodeFactor * 0.42;
      upperPlatter.position.y = 0.1 + explodeFactor * 0.26;
      actuatorLayerGroup.position.y = 0.19 + explodeFactor * 0.72;
      dataFieldGroup.position.y = 0.38 + explodeFactor * 0.86;

      // Spin magnetic platters smoothly
      const spinSpeed = activeMode === 'scan' ? 3.8 : 1.5;
      if (!reducedMotion) {
        lowerPlatter.rotation.y += dt * spinSpeed;
        upperPlatter.rotation.y += dt * spinSpeed;
        outerArc.rotation.y -= dt * 0.45;
        midArc.rotation.y += dt * 0.65;
        innerArc.rotation.y -= dt * 0.82;
      }

      // Precision actuator head sweep over platter sectors
      const sweepFreq = activeMode === 'scan' ? 3.2 : 1.1;
      const sweepAmp = activeMode === 'scan' ? 0.24 : 0.14;
      actuatorPivot.rotation.y = reducedMotion
        ? 0.05
        : Math.sin(elapsed * sweepFreq) * sweepAmp + Math.sin(elapsed * sweepFreq * 2.7) * 0.04;

      // Subtle data stream rise
      if (!reducedMotion) {
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < particleCount; i++) {
          const r = pSeeds[i * 3];
          const baseAng = pSeeds[i * 3 + 1] + elapsed * (activeMode === 'scan' ? 0.9 : 0.35);
          const yCycle = (pSeeds[i * 3 + 2] + elapsed * (activeMode === 'scan' ? 0.45 : 0.2)) % 1.05;
          posAttr.setXYZ(i, Math.cos(baseAng) * r, yCycle, Math.sin(baseAng) * r);
        }
        posAttr.needsUpdate = true;
      }

      // Gentle chassis breathing & pointer parallax damping
      const baseYaw = -0.42 + targetYawOffset + (reducedMotion ? 0 : Math.sin(elapsed * 0.35) * 0.14);
      const targetYaw = baseYaw + pointerX * 0.24;
      const targetPitch = 0.22 + pointerY * 0.12 + explodeFactor * 0.08;
      currentYaw = THREE.MathUtils.damp(currentYaw, targetYaw, 4.5, dt);
      currentPitch = THREE.MathUtils.damp(currentPitch, targetPitch, 4.5, dt);

      hddRoot.rotation.y = currentYaw;
      hddRoot.rotation.x = currentPitch;
      hddRoot.position.y = 0.22 + (reducedMotion ? 0 : Math.sin(elapsed * 1.1) * 0.05);

      renderer.render(scene, camera);

      if (!reducedMotion) {
        if (isSoftware) {
          afterDraw(renderFrame);
        } else {
          frameId = window.requestAnimationFrame(renderFrame);
        }
      }
    };

    renderFrame();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      platterMap.dispose();
      platterRoughMap.dispose();
      brushedBump.dispose();
      envRT.dispose();
      renderer.dispose();
    };
  }, [compact]);

  return (
    <div
      data-testid="hdd-3d-viewport"
      data-view-mode={mode}
      className={`relative w-full overflow-hidden rounded-2xl border border-[#A7B2C4]/15 bg-[#0C1220] ${
        compact ? 'h-[320px] sm:h-[360px]' : 'h-[340px] sm:h-[430px] lg:h-[500px]'
      } ${className}`}
    >
      {/* Subtle radial atmospheric studio light backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 52% 45%, rgba(0, 212, 255, 0.12) 0%, rgba(37, 99, 235, 0.08) 38%, rgba(7, 9, 14, 0.92) 78%)',
        }}
      />

      {webglFailed ? (
        <div className="relative flex h-full w-full items-center justify-center p-4">
          <img
            src={SERVICE_IMAGES.hdd}
            alt="Precision hard disk drive magnetic platters and read-write head assembly"
            referrerPolicy="no-referrer"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      ) : (
        <div ref={mountRef} className="relative h-full w-full cursor-grab active:cursor-grabbing" />
      )}

      {/* Compact bottom-center interactive mode control dock (solid rgba surface, no backdrop-filter over WebGL) */}
      {!webglFailed && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-[#A7B2C4]/20 bg-[#07090E]/92 p-1 shadow-lg">
          {(
            [
              { id: 'inspect', label: 'Drive View' },
              { id: 'exploded', label: 'Exploded Layers' },
              { id: 'scan', label: 'Sector Scan' },
            ] as Array<{ id: ViewMode; label: string }>
          ).map((item) => {
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleModeChange(item.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[#00D4FF] text-[#07090E]'
                    : 'text-[#A7B2C4] hover:bg-[#101827] hover:text-[#F5F7FA]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
