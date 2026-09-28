// src/components/scrollytelling/ParticleField.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three/webgpu';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const ParticleField = () => {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return undefined;

    if (mountedRef.current) return undefined;
    mountedRef.current = true;

    const container = containerRef.current;
    if (!container) return undefined;

    container.innerHTML = '';

    let renderer;
    let scene;
    let camera;
    let points;
    let basePositions;
    let animationId;
    let isActive = true;
    let resizeObserver;

    const waitForSize = () =>
      new Promise((resolve) => {
        const check = () => {
          const w = container.offsetWidth;
          const h = container.offsetHeight;
          if (w > 0 && h > 0) resolve({ w, h });
          else requestAnimationFrame(check);
        };
        check();
      });

    const init = async () => {
      try {
        if (!navigator.gpu) {
          console.warn('[ParticleField] WebGPU not available');
          return;
        }

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
          console.warn('[ParticleField] No WebGPU adapter');
          return;
        }

        const { w, h } = await waitForSize();
        console.log('[ParticleField] Container:', w, 'x', h);

        renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
        await renderer.init();

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h, false);

        const canvas = renderer.domElement;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        container.appendChild(canvas);

        // ── Camera ──────────────────────────────────────────────
        const cameraDistance = 8;
        const fov = 45;
        const fovRadians = (fov * Math.PI) / 180;
        const visibleHeight = 2 * Math.tan(fovRadians / 2) * cameraDistance;
        const visibleWidth = visibleHeight * (w / h);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 100);
        camera.position.set(0, 0, cameraDistance);

        // ── Particles ───────────────────────────────────────────
        const COUNT = 2000;

        // Compute positions in JS (simple, reliable)
        basePositions = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
          basePositions[i * 3 + 0] = (Math.random() - 0.5) * visibleWidth * 1.1;
          basePositions[i * 3 + 1] = (Math.random() - 0.5) * visibleHeight * 1.1;
          basePositions[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(basePositions.slice(), 3)
        );

        // Standard PointsMaterial — guaranteed to render
        const material = new THREE.PointsMaterial({
          color: 0xffd966,        // Bright gold (hex)
          size: 2.0,             // World units at camera distance
          sizeAttenuation: true,  // Particles get smaller when far
          transparent: true,
          opacity: 1.5,
          depthWrite: false,
          blending: THREE.AdditiveBlending, // Gold glow effect
        });

        points = new THREE.Points(geometry, material);
        scene.add(points);

        console.log('[ParticleField] Points added, count:', COUNT);

        // ── Animation loop ──────────────────────────────────────
        const positionAttr = geometry.attributes.position;
        const startTime = performance.now();

        const animate = () => {
          if (!isActive) return;

          try {
            const elapsed = (performance.now() - startTime) / 1000;
            const t = elapsed * 0.3;

            // Update positions with wave motion
            const arr = positionAttr.array;
            for (let i = 0; i < COUNT; i++) {
              const i3 = i * 3;
              const bx = basePositions[i3 + 0];
              const by = basePositions[i3 + 1];
              const bz = basePositions[i3 + 2];

              arr[i3 + 0] = bx + Math.sin(by * 0.5 + t) * 0.15;
              arr[i3 + 1] = by + Math.cos(bx * 0.5 + t) * 0.15;
              arr[i3 + 2] = bz + Math.sin((bx + by) * 0.3 + t * 0.5) * 0.2;
            }
            positionAttr.needsUpdate = true;

            renderer.render(scene, camera);
          } catch (err) {
            console.warn('[ParticleField] Render error:', err);
            return;
          }
          animationId = requestAnimationFrame(animate);
        };
        animate();

        resizeObserver = new ResizeObserver((entries) => {
          const entry = entries[0];
          if (!entry || !renderer || !camera) return;
          const { width, height } = entry.contentRect;
          if (width <= 0 || height <= 0) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        });
        resizeObserver.observe(container);

        console.log('[ParticleField] Initialized successfully');
      } catch (err) {
        console.warn('[ParticleField] Init failed:', err);
      }
    };

    init();

    return () => {
      isActive = false;
      mountedRef.current = false;
      if (animationId) cancelAnimationFrame(animationId);
      if (resizeObserver) resizeObserver.disconnect();
      if (points) {
        points.geometry.dispose();
        points.material.dispose();
        if (points.parent) points.parent.remove(points);
      }
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentElement) {
          renderer.domElement.parentElement.removeChild(renderer.domElement);
        }
      }
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 5,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default ParticleField;