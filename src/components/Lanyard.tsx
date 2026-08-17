/* eslint-disable react/no-unknown-property */
import React, { Component, useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';
import kirtiPhoto from '../assets/kirti-gupta.jpg';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// Preload assets to avoid runtime frame drops
try {
  useGLTF.preload(cardGLB);
  useTexture.preload(lanyard);
} catch (e) {
  console.warn('Lanyard assets preloading:', e);
}

// 1x1 transparent pixel fallback
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

// Self-contained Error Boundary so WebGL or Rapier failures NEVER crash the site
class LanyardErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn('Lanyard 3D component handled runtime error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[450px] flex items-center justify-center p-4">
          <div className="relative w-64 h-80 rounded-2xl bg-[#0D0F0F] border border-emerald-500/30 p-4 shadow-2xl flex flex-col items-center justify-between text-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
            <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase mt-2">
              GRAPHIC DESIGNER
            </span>
            <div className="w-36 h-44 rounded-xl overflow-hidden border border-white/10 shadow-md my-2">
              <img src={kirtiPhoto} alt="Kirti Gupta" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">KIRTI GUPTA</h3>
              <p className="text-xs text-slate-400">Brand Architect & Designer</p>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function Lanyard({
  position = [0, 0, 14],
  gravity = [0, -40, 0],
  fov = 24,
  transparent = true,
  frontImage = kirtiPhoto,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1.2
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LanyardErrorBoundary>
      <div className="lanyard-wrapper">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="w-48 h-64 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
            </div>
          }
        >
          <Canvas
            camera={{ position: position, fov: fov }}
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{ alpha: transparent, antialias: true }}
            onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
          >
            <ambientLight intensity={Math.PI} />
            <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
              <Band
                isMobile={isMobile}
                frontImage={frontImage}
                backImage={backImage}
                imageFit={imageFit}
                lanyardImage={lanyardImage}
                lanyardWidth={lanyardWidth}
              />
            </Physics>
            <Environment blur={0.75}>
              <Lightformer
                intensity={2}
                color="white"
                position={[0, -1, 5]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[-1, -1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[1, 1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={10}
                color="#10B981"
                position={[-10, 0, 14]}
                rotation={[0, Math.PI / 2, Math.PI / 3]}
                scale={[100, 10, 1]}
              />
            </Environment>
          </Canvas>
        </Suspense>
      </div>
    </LanyardErrorBoundary>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}: BandProps) {
  const band = useRef<any>(null),
    fixed = useRef<any>(null),
    j1 = useRef<any>(null),
    j2 = useRef<any>(null),
    j3 = useRef<any>(null),
    card = useRef<any>(null);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps: any = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  const gltf = useGLTF(cardGLB) as any;
  const nodes = gltf?.nodes || {};
  const materials = gltf?.materials || {};

  const texture = useTexture(lanyardImage || lanyard);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  const cardMap = useMemo(() => {
    const baseMap = materials?.base?.map;
    if (!baseMap || (!frontImage && !backImage)) return baseMap;

    const baseImg = baseMap.image;
    if (!baseImg) return baseMap;

    const W = baseImg.width || 512;
    const H = baseImg.height || 512;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img: HTMLImageElement, rect: { x: number; y: number; w: number; h: number }) => {
      if (!img || !img.width || !img.height) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex?.image) drawFitted(frontTex.image as HTMLImageElement, FRONT_UV_RECT);
    if (backImage && backTex?.image) drawFitted(backTex.image as HTMLImageElement, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState<boolean>(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp?.());
      card.current?.setNextKinematicTranslation?.({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current &&
      band.current &&
      band.current.geometry
    ) {
      [j1, j2].forEach(ref => {
        if (!ref.current) return;
        const currentTrans = ref.current.translation?.();
        if (!currentTrans) return;
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(currentTrans);
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(currentTrans)));
        ref.current.lerped.lerp(
          currentTrans,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      const t3 = j3.current.translation?.();
      const tfixed = fixed.current.translation?.();
      const cardAngvel = card.current.angvel?.();
      const cardRot = card.current.rotation?.();

      if (t3 && tfixed && j1.current.lerped && j2.current.lerped) {
        curve.points[0].copy(t3);
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(tfixed);
        band.current.geometry.setPoints?.(curve.getPoints(isMobile ? 16 : 32));
      }

      if (cardAngvel && cardRot && card.current.setAngvel) {
        ang.copy(cardAngvel);
        rot.copy(cardRot);
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      }
    }
  });

  curve.curveType = 'chordal';
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => (e.target?.releasePointerCapture?.(e.pointerId), drag(false))}
            onPointerDown={(e: any) => {
              if (card.current && card.current.translation) {
                e.target?.setPointerCapture?.(e.pointerId);
                const currentTrans = card.current.translation();
                if (currentTrans) {
                  drag(new THREE.Vector3().copy(e.point).sub(vec.copy(currentTrans)));
                }
              }
            }}
          >
            {nodes?.card?.geometry ? (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap}
                  map-anisotropy={16}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            ) : (
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.8, 1.125, 0.02]} />
                <meshStandardMaterial map={cardMap} roughness={0.5} metalness={0.2} />
              </mesh>
            )}

            {nodes?.clip?.geometry ? (
              <mesh geometry={nodes.clip.geometry} material={materials?.metal} material-roughness={0.3} />
            ) : (
              <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.08, 16]} />
                <meshStandardMaterial color="#34D399" metalness={0.9} />
              </mesh>
            )}

            {nodes?.clamp?.geometry ? (
              <mesh geometry={nodes.clamp.geometry} material={materials?.metal} />
            ) : null}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

export default Lanyard;
