/**
 * MoizCare - SIM-RS Terintegrasi & Modern
 * Generative Particle Background Engine (Gray / Monochrome Edition)
 * Inspired by https://v0-optimus-delta.vercel.app/
 *
 * Core Features:
 *   1. 3D Orbit Ellipses (Grand gyroscopic celestial orbits tumbling & spinning in 3D space)
 *   2. Concentric Lingkaran (Concentric rings with fluid counter-rotation & breathing pulse)
 *   3. Galactic Spiral Vortex (Archimedean multi-arm particle stream)
 *   4. 3D ASCII Core Sphere (Optimus signature 3-axis rotating glyph lattice)
 *   5. Ambient Cosmic Dust (Floating particles with constellation links & mouse parallax)
 *   6. Robust Delta-Time RAF Loop (Auto-resume on tab focus, zero freeze bug)
 */

(function () {
  'use strict';

  // Crisp Monochrome / Silver Gray Palette
  const PALETTE = {
    pureWhite:    'rgba(255, 255, 255, ',
    silverBright: 'rgba(240, 246, 255, ',
    silverMid:    'rgba(195, 208, 226, ',
    slateLight:   'rgba(155, 170, 192, ',
    slateMid:     'rgba(115, 128, 148, ',
    slateDark:    'rgba(75, 88, 105, ',
    trackBright:  'rgba(225, 238, 255, ',
    trackMid:     'rgba(165, 182, 205, ',
    trackDim:     'rgba(110, 125, 145, '
  };

  const GLYPHS = ['·', '•', '○', '●', '▪', '+', '░', '▒', '✕', '✧', '◇'];
  const SPHERE_GLYPHS = '░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯·∘○◯◌●◉+';

  class GenerativeBackground {
    constructor() {
      this.canvas = document.getElementById('generativeCanvas');
      if (!this.canvas) {
        console.warn('[GenerativeBg] Canvas not found.');
        return;
      }

      this.ctx = this.canvas.getContext('2d', { alpha: true });
      if (!this.ctx) {
        console.warn('[GenerativeBg] 2D context not acquired.');
        return;
      }

      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      // Mouse & Inertial Parallax
      this.mouse = {
        x: this.width * 0.6,
        y: this.height * 0.44,
        targetX: this.width * 0.6,
        targetY: this.height * 0.44,
        tiltX: 0,
        tiltY: 0,
        targetTiltX: 0,
        targetTiltY: 0
      };

      // Animation State
      this.time = 0;
      this.lastTime = performance.now();
      this.rafId = null;
      this.scrollY = window.scrollY || 0;

      // Initialize generative systems
      this.initStructures();
      this.bindEvents();
      this.resize();

      // Launch robust animation loop
      this.startLoop();
    }

    startLoop() {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.lastTime = performance.now();

      const loop = (timestamp) => {
        const dt = Math.min((timestamp - this.lastTime) / 1000, 0.06);
        this.lastTime = timestamp;
        this.time += dt;

        this.render();
        this.rafId = requestAnimationFrame(loop);
      };

      this.rafId = requestAnimationFrame(loop);
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize(), { passive: true });

      window.addEventListener('mousemove', (e) => {
        this.mouse.targetX = e.clientX;
        this.mouse.targetY = e.clientY;
        const normX = (e.clientX / this.width - 0.5) * 2;
        const normY = (e.clientY / this.height - 0.5) * 2;
        this.mouse.targetTiltX = normY * 0.32; // tilt around X
        this.mouse.targetTiltY = normX * 0.38; // tilt around Y
      }, { passive: true });

      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY || 0;
      }, { passive: true });

      // Robust tab visibility & focus handlers (never freeze on tab switch)
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          this.startLoop();
        }
      });

      window.addEventListener('focus', () => {
        this.startLoop();
      });
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.resetTransform();
      this.ctx.scale(this.dpr, this.dpr);

      const baseDim = Math.min(this.width, this.height);
      this.scale = Math.max(0.70, Math.min(1.25, baseDim / 800));
    }

    getEpicenter() {
      if (this.width > 992) {
        return {
          x: this.width * 0.60 + this.mouse.tiltY * 50,
          y: Math.min(this.height * 0.44, 430) + (this.scrollY * 0.12) - this.mouse.tiltX * 35
        };
      } else {
        return {
          x: this.width * 0.50 + this.mouse.tiltY * 25,
          y: this.height * 0.38 + (this.scrollY * 0.10) - this.mouse.tiltX * 20
        };
      }
    }

    initStructures() {
      const baseDim = Math.min(this.width, this.height);
      this.scale = Math.max(0.70, Math.min(1.25, baseDim / 800));

      // -------------------------------------------------------------
      // 1. LINGKARAN (Concentric Circular Rings with Breathing Waves)
      // -------------------------------------------------------------
      this.circles = [
        { radius: 95, count: 32, speed: 0.45, glyph: '·', color: PALETTE.silverMid, pulseFreq: 2.2, pulseAmp: 6 },
        { radius: 185, count: 48, speed: -0.35, glyph: '•', color: PALETTE.silverBright, pulseFreq: 1.8, pulseAmp: 8 },
        { radius: 295, count: 64, speed: 0.28, glyph: '○', color: PALETTE.slateLight, pulseFreq: 1.4, pulseAmp: 10 },
        { radius: 430, count: 80, speed: -0.22, glyph: '+', color: PALETTE.slateMid, pulseFreq: 1.0, pulseAmp: 12 },
        { radius: 580, count: 96, speed: 0.15, glyph: '·', color: PALETTE.slateDark, pulseFreq: 0.8, pulseAmp: 15 }
      ];

      // -------------------------------------------------------------
      // 2. SPIRAL (Archimedean Galactic Arms with Active Outward Stream)
      // -------------------------------------------------------------
      this.spiralArms = 3;
      this.spiralParticles = [];
      const totalSpiral = 160;

      for (let i = 0; i < totalSpiral; i++) {
        const arm = i % this.spiralArms;
        const progress = i / totalSpiral;
        this.spiralParticles.push({
          arm: arm,
          progress: progress,
          baseRadius: 45 + Math.pow(progress, 1.15) * 600,
          angleOffset: (arm * (Math.PI * 2 / this.spiralArms)) + (progress * Math.PI * 4.2),
          speed: 0.40 + (1 - progress) * 0.50, // Active vortex angular speed
          size: 1.5 + (1 - progress) * 2.2,
          jitterRadius: (Math.random() - 0.5) * 26 * progress,
          jitterAngle: (Math.random() - 0.5) * 0.15,
          glyph: Math.random() > 0.65 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
          alphaBase: 0.35 + (1 - progress) * 0.65
        });
      }

      // -------------------------------------------------------------
      // 3. ORBIT BESAR 3D (Grand 3D Gyroscopic Astrolabe Orbits)
      // High-eccentricity 3D ellipses tumbling, yawing, and streaming actively
      // -------------------------------------------------------------
      this.orbits = [
        {
          name: 'Equatorial Celestial Orbit',
          radiusX: 620,
          radiusY: 280,
          basePitch: 1.05,       // ~60 deg inclination
          baseRoll: 0.45,
          baseYaw: 0.20,
          yawSpeed: 0.42,        // Continuous 3D rotation around Y (~24 deg/sec)
          pitchSpeed: 0.36,      // Active 3D precession wave
          rollSpeed: 0.26,
          particleSpeed: 1.05,   // Fast orbital bead stream
          dashSpeed: 95,         // Flowing laser dash speed (px/sec)
          particleCount: 64,
          color: PALETTE.silverBright,
          trackColor: PALETTE.trackBright,
          trackAlpha: 0.60,
          lineWidth: 2.2,
          comets: [0.0, 0.50],   // 2 glowing comet heads with motion tails
          nodes: [
            { t: 0.18, label: 'ORB-01', size: 6.0 },
            { t: 0.68, label: 'ORB-02', size: 5.5 }
          ]
        },
        {
          name: 'Transverse Astrolabe Orbit',
          radiusX: 740,
          radiusY: 330,
          basePitch: -0.92,      // ~ -53 deg
          baseRoll: -0.55,
          baseYaw: 1.15,
          yawSpeed: -0.34,       // Counter-rotating 3D plane
          pitchSpeed: 0.32,
          rollSpeed: -0.22,
          particleSpeed: -0.85,  // Counter-stream along ring
          dashSpeed: -80,
          particleCount: 72,
          color: PALETTE.silverMid,
          trackColor: PALETTE.trackMid,
          trackAlpha: 0.52,
          lineWidth: 2.0,
          comets: [0.25, 0.75],
          nodes: [
            { t: 0.38, label: 'AST-A', size: 5.0 },
            { t: 0.88, label: 'AST-B', size: 5.0 }
          ]
        },
        {
          name: 'Polar Meridian Orbit',
          radiusX: 470,
          radiusY: 210,
          basePitch: 1.48,       // ~ 85 deg (steep polar inclination)
          baseRoll: 0.25,
          baseYaw: -0.65,
          yawSpeed: 0.50,        // Swift polar gimbal spin
          pitchSpeed: -0.40,
          rollSpeed: 0.30,
          particleSpeed: 1.30,   // Fast satellite stream
          dashSpeed: 115,
          particleCount: 50,
          color: PALETTE.pureWhite,
          trackColor: PALETTE.trackBright,
          trackAlpha: 0.58,
          lineWidth: 2.2,
          comets: [0.12, 0.62],
          nodes: [
            { t: 0.45, label: 'POLAR-I', size: 6.0 }
          ]
        },
        {
          name: 'Horizon Celestial Boundary',
          radiusX: 920,
          radiusY: 410,
          basePitch: 0.68,
          baseRoll: -0.88,
          baseYaw: 1.55,
          yawSpeed: -0.22,       // Wide outer celestial sweep
          pitchSpeed: 0.24,
          rollSpeed: -0.18,
          particleSpeed: -0.60,
          dashSpeed: -55,
          particleCount: 80,
          color: PALETTE.slateMid,
          trackColor: PALETTE.trackMid,
          trackAlpha: 0.42,
          lineWidth: 1.8,
          comets: [0.35],
          nodes: [
            { t: 0.08, label: 'SYS-EXT', size: 4.5 }
          ]
        }
      ];

      // Precompute orbit particles
      this.orbits.forEach(orbit => {
        orbit.particles = [];
        for (let i = 0; i < orbit.particleCount; i++) {
          const t = i / orbit.particleCount;
          orbit.particles.push({
            t: t,
            speedMul: 0.94 + Math.random() * 0.12,
            size: 2.2 + Math.random() * 2.4,
            glyph: Math.random() > 0.65 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null
          });
        }
      });

      // -------------------------------------------------------------
      // 4. 3D CORE SPHERE (Optimus Signature Parametric Constellation)
      // -------------------------------------------------------------
      this.sphereRadius = 145;
      this.spherePoints = [];
      const stepU = 0.20;
      const stepV = 0.20;
      for (let u = 0; u < Math.PI * 2; u += stepU) {
        for (let v = 0; v < Math.PI; v += stepV) {
          const x = Math.sin(v) * Math.cos(u);
          const y = Math.cos(v);
          const z = Math.sin(v) * Math.sin(u);
          const charIdx = Math.floor(Math.random() * SPHERE_GLYPHS.length);
          this.spherePoints.push({
            origX: x,
            origY: y,
            origZ: z,
            char: SPHERE_GLYPHS[charIdx]
          });
        }
      }

      // -------------------------------------------------------------
      // 5. AMBIENT COSMIC DUST (Full Viewport Floating Particles)
      // -------------------------------------------------------------
      this.ambientParticles = [];
      const ambientCount = 70;
      for (let i = 0; i < ambientCount; i++) {
        this.ambientParticles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: 1.2 + Math.random() * 2.2,
          alpha: 0.20 + Math.random() * 0.50,
          glyph: Math.random() > 0.75 ? '·' : null
        });
      }
    }

    // 3D Matrix Rotation
    rotate3D(x, y, z, pitch, roll, yaw) {
      // 1. Yaw around Y axis
      const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const y1 = y;

      // 2. Pitch around X axis
      const cosP = Math.cos(pitch), sinP = Math.sin(pitch);
      const y2 = y1 * cosP - z1 * sinP;
      const z2 = y1 * sinP + z1 * cosP;
      const x2 = x1;

      // 3. Roll around Z axis
      const cosR = Math.cos(roll), sinR = Math.sin(roll);
      const x3 = x2 * cosR - y2 * sinR;
      const y3 = x2 * sinR + y2 * cosR;
      const z3 = z2;

      return { x: x3, y: y3, z: z3 };
    }

    project(p, cx, cy, focalLength = 950) {
      const scale = focalLength / (focalLength + p.z);
      return {
        x: cx + p.x * scale,
        y: cy + p.y * scale,
        z: p.z,
        scale: scale
      };
    }

    render() {
      // Lerp mouse tilt for silky smooth inertia
      this.mouse.tiltX += (this.mouse.targetTiltX - this.mouse.tiltX) * 0.06;
      this.mouse.tiltY += (this.mouse.targetTiltY - this.mouse.tiltY) * 0.06;

      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      // Clear Canvas
      ctx.clearRect(0, 0, w, h);

      const center = this.getEpicenter();
      const currentScale = this.scale;

      // 1. Ambient Cosmic Dust
      this.renderAmbientDust(ctx, w, h);

      // 2. Concentric Lingkaran (Circles)
      this.renderCircles(ctx, center, currentScale);

      // 3. Galactic Spiral
      this.renderSpiral(ctx, center, currentScale);

      // 4. Grand 3D Gyroscopic Orbit Ellipses
      this.renderGrandOrbits(ctx, center, currentScale);

      // 5. 3D ASCII Core Sphere (Optimus style)
      this.renderCoreSphere(ctx, center, currentScale);
    }

    renderAmbientDust(ctx, w, h) {
      const particles = this.ambientParticles;
      const count = particles.length;

      ctx.save();
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Subtle mouse repulsion
        const dx = p.x - this.mouse.targetX;
        const dy = p.y - this.mouse.targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          p.x += (dx / dist) * force * 1.8;
          p.y += (dy / dist) * force * 1.8;
        }

        ctx.fillStyle = `${PALETTE.slateLight}${p.alpha})`;
        if (p.glyph) {
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Constellation links
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 90) {
            const lineAlpha = (1 - dist2 / 90) * 0.15;
            ctx.strokeStyle = `${PALETTE.trackBright}${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }

    renderCircles(ctx, center, currentScale) {
      ctx.save();
      const cx = center.x;
      const cy = center.y;

      this.circles.forEach((circle, idx) => {
        // Breathing radius pulsation
        const pulse = Math.sin(this.time * circle.pulseFreq + idx) * circle.pulseAmp;
        const r = (circle.radius + pulse) * currentScale;

        // 1. Faint circular orbit track
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${PALETTE.trackMid}0.22)`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash(idx % 2 === 0 ? [5, 10] : [3, 12]);
        ctx.stroke();

        // 2. Circumferential particles with active rotation
        ctx.setLineDash([]);
        const angleBase = this.time * circle.speed;
        const step = (Math.PI * 2) / circle.count;

        for (let i = 0; i < circle.count; i++) {
          const angle = angleBase + i * step;
          const px = cx + Math.cos(angle) * r;
          const py = cy + Math.sin(angle) * r;

          const alpha = 0.35 + 0.55 * Math.abs(Math.sin(angle * 2 + this.time * 2));
          ctx.fillStyle = `${circle.color}${alpha})`;

          if (i % 6 === 0) {
            ctx.font = '12px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(circle.glyph, px, py);
          } else {
            ctx.beginPath();
            const dotSize = i % 3 === 0 ? 2.4 : 1.5;
            ctx.arc(px, py, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }

          // Accent ticks on outer rings
          if (idx >= 2 && i % 8 === 0) {
            const tr1 = r - 5;
            const tr2 = r + 5;
            ctx.strokeStyle = `${PALETTE.silverBright}${alpha * 0.85})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(angle) * tr1, cy + Math.sin(angle) * tr1);
            ctx.lineTo(cx + Math.cos(angle) * tr2, cy + Math.sin(angle) * tr2);
            ctx.stroke();
          }
        }
      });

      ctx.restore();
    }

    renderSpiral(ctx, center, currentScale) {
      ctx.save();
      const cx = center.x;
      const cy = center.y;

      // Rotating spiral arm guide lines
      ctx.lineWidth = 1.0;
      ctx.setLineDash([5, 12]);
      for (let arm = 0; arm < this.spiralArms; arm++) {
        ctx.beginPath();
        const baseOffset = arm * (Math.PI * 2 / this.spiralArms);
        for (let step = 0; step <= 45; step++) {
          const prog = step / 45;
          const rad = (35 + Math.pow(prog, 1.2) * 540) * currentScale;
          const theta = baseOffset + (prog * Math.PI * 3.8) + (this.time * 0.32);
          const sx = cx + Math.cos(theta) * rad;
          const sy = cy + Math.sin(theta) * rad;
          if (step === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `${PALETTE.slateDark}0.16)`;
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Flowing spiral particles
      const particles = this.spiralParticles;
      const count = particles.length;

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        const currentAngle = p.angleOffset + (this.time * p.speed);
        const radius = (p.baseRadius + p.jitterRadius) * currentScale;

        const px = cx + Math.cos(currentAngle + p.jitterAngle) * radius;
        const py = cy + Math.sin(currentAngle + p.jitterAngle) * radius;

        const wave = Math.sin(p.progress * 12 - this.time * 4);
        const alpha = Math.max(0.12, Math.min(0.95, p.alphaBase + wave * 0.30));

        if (p.glyph) {
          ctx.font = `${Math.floor(11 + (1 - p.progress) * 4)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = `${PALETTE.silverBright}${alpha})`;
          ctx.fillText(p.glyph, px, py);
        } else {
          ctx.fillStyle = `${PALETTE.silverMid}${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, p.size * currentScale, 0, Math.PI * 2);
          ctx.fill();

          if (p.progress < 0.25) {
            ctx.beginPath();
            ctx.arc(px, py, p.size * 2.2 * currentScale, 0, Math.PI * 2);
            ctx.fillStyle = `${PALETTE.pureWhite}${alpha * 0.35})`;
            ctx.fill();
          }
        }
      }

      ctx.restore();
    }

    renderGrandOrbits(ctx, center, currentScale) {
      ctx.save();
      const cx = center.x;
      const cy = center.y;

      const tiltX = this.mouse.tiltX;
      const tiltY = this.mouse.tiltY;

      this.orbits.forEach((orbit, orbitIdx) => {
        const rx = orbit.radiusX * currentScale;
        const ry = orbit.radiusY * currentScale;

        // CONTINUOUS 3D ROTATION & PRECESSION:
        // Every 3D orbit plane continuously yaws, pitches, and tumbles in space!
        const planePitch = orbit.basePitch + Math.sin(this.time * orbit.pitchSpeed + orbitIdx * 1.4) * 0.42 + tiltX;
        const planeYaw   = orbit.baseYaw   + (this.time * orbit.yawSpeed) + tiltY;
        const planeRoll  = orbit.baseRoll  + Math.cos(this.time * orbit.rollSpeed + orbitIdx * 0.8) * 0.32;

        // Precompute 3D points along the closed ellipse track (96 sample points)
        const trackSteps = 96;
        const trackPoints = [];

        for (let i = 0; i <= trackSteps; i++) {
          const theta = (i / trackSteps) * Math.PI * 2;
          const lx = Math.cos(theta) * rx;
          const ly = Math.sin(theta) * ry;
          const lz = Math.sin(theta * 2 + this.time * 2.2) * 16 * currentScale;

          const rot = this.rotate3D(lx, ly, lz, planePitch, planeRoll, planeYaw);
          const proj = this.project(rot, cx, cy);
          trackPoints.push({ proj: proj, z: rot.z });
        }

        // -------------------------------------------------------------
        // LAYER 1: 3D Base Ellipse Guide Track (Faint depth-slicing line)
        // -------------------------------------------------------------
        for (let i = 0; i < trackSteps; i++) {
          const p1 = trackPoints[i];
          const p2 = trackPoints[i + 1];
          const midZ = (p1.z + p2.z) / 2;

          const depthRatio = (midZ + 450) / 900; // 0 (far) to 1 (near)
          const clampedDepth = Math.max(0.15, Math.min(1.0, depthRatio));
          const lineAlpha = orbit.trackAlpha * clampedDepth * 0.70;

          ctx.beginPath();
          ctx.moveTo(p1.proj.x, p1.proj.y);
          ctx.lineTo(p2.proj.x, p2.proj.y);
          ctx.strokeStyle = `${orbit.trackColor}${lineAlpha})`;
          ctx.lineWidth = clampedDepth > 0.5 ? (orbit.lineWidth * 0.8) : (orbit.lineWidth * 0.5);
          ctx.stroke();
        }

        // -------------------------------------------------------------
        // LAYER 2: High-Speed Flowing 3D Laser Dash Stream
        // Active line-dash animation racing around the ellipse perimeter
        // -------------------------------------------------------------
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(trackPoints[0].proj.x, trackPoints[0].proj.y);
        for (let i = 1; i <= trackSteps; i++) {
          ctx.lineTo(trackPoints[i].proj.x, trackPoints[i].proj.y);
        }
        ctx.closePath();
        ctx.strokeStyle = `${orbit.trackColor}${orbit.trackAlpha * 0.95})`;
        ctx.lineWidth = orbit.lineWidth;
        ctx.setLineDash([22, 16, 6, 16]);
        ctx.lineDashOffset = -this.time * orbit.dashSpeed;
        ctx.stroke();
        ctx.restore();

        // -------------------------------------------------------------
        // LAYER 3: 3D Orbital Comets (Fast meteors with luminous fading tails)
        // -------------------------------------------------------------
        if (orbit.comets && orbit.comets.length) {
          orbit.comets.forEach(basePhase => {
            const tComet = ((basePhase + (this.time * orbit.particleSpeed * 0.14)) % 1 + 1) % 1;
            const tailSteps = 12;

            for (let s = tailSteps; s >= 0; s--) {
              const tPoint = ((tComet - s * 0.006) % 1 + 1) % 1;
              const theta = tPoint * Math.PI * 2;
              const lx = Math.cos(theta) * rx;
              const ly = Math.sin(theta) * ry;
              const lz = Math.sin(theta * 2 + this.time * 2.2) * 16 * currentScale;

              const rot = this.rotate3D(lx, ly, lz, planePitch, planeRoll, planeYaw);
              const proj = this.project(rot, cx, cy);

              const frac = 1 - (s / tailSteps);
              const cometAlpha = frac * 0.85;

              ctx.save();
              if (s === 0) {
                // Bright glowing comet nucleus
                ctx.fillStyle = `${PALETTE.pureWhite}0.98)`;
                ctx.shadowColor = 'rgba(235, 245, 255, 0.95)';
                ctx.shadowBlur = 14 * proj.scale * currentScale;

                ctx.beginPath();
                ctx.arc(proj.x, proj.y, 4.2 * proj.scale * currentScale, 0, Math.PI * 2);
                ctx.fill();

                // Crosshair sparkle
                ctx.strokeStyle = `${PALETTE.pureWhite}0.85)`;
                ctx.lineWidth = 1.0;
                const spk = 7 * proj.scale * currentScale;
                ctx.beginPath();
                ctx.moveTo(proj.x - spk, proj.y);
                ctx.lineTo(proj.x + spk, proj.y);
                ctx.moveTo(proj.x, proj.y - spk);
                ctx.lineTo(proj.x, proj.y + spk);
                ctx.stroke();
              } else {
                // Fading tail beads
                ctx.fillStyle = `${PALETTE.silverBright}${cometAlpha})`;
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, (1.2 + frac * 2.5) * proj.scale * currentScale, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.restore();
            }
          });
        }

        // -------------------------------------------------------------
        // LAYER 4: Satellite Stations (Tech Badges & Pulsing Radar Waves)
        // -------------------------------------------------------------
        if (orbit.nodes && orbit.nodes.length) {
          orbit.nodes.forEach((node, nIdx) => {
            const currentT = ((node.t + (this.time * orbit.particleSpeed * 0.05)) % 1 + 1) % 1;
            const theta = currentT * Math.PI * 2;
            const lx = Math.cos(theta) * rx;
            const ly = Math.sin(theta) * ry;
            const lz = Math.sin(theta * 2 + this.time * 2.2) * 16 * currentScale;

            const rot = this.rotate3D(lx, ly, lz, planePitch, planeRoll, planeYaw);
            const proj = this.project(rot, cx, cy);
            const pScale = proj.scale * currentScale;
            const zNorm = Math.max(0, Math.min(1, (rot.z + 450) / 900));
            const alpha = 0.40 + zNorm * 0.60;

            ctx.save();

            // 1. Expanding radar pulse ring
            const radarPhase = ((this.time * 1.8 + nIdx * 0.5) % 1);
            const radarRadius = (node.size * 1.2 + radarPhase * 24) * pScale;
            ctx.strokeStyle = `${PALETTE.trackBright}${(1 - radarPhase) * 0.70 * alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, radarRadius, 0, Math.PI * 2);
            ctx.stroke();

            // 2. Solid node core with glow
            ctx.fillStyle = `${PALETTE.pureWhite}${alpha})`;
            ctx.shadowColor = 'rgba(235, 245, 255, 0.90)';
            ctx.shadowBlur = 12 * pScale;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, node.size * pScale, 0, Math.PI * 2);
            ctx.fill();

            // 3. Rotating outer reticle bracket
            ctx.strokeStyle = `${PALETTE.silverBright}${alpha * 0.85})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, node.size * 1.8 * pScale, 0, Math.PI * 2);
            ctx.stroke();

            // 4. Tech Monospace Label Badge
            ctx.font = `${Math.max(9, Math.floor(10 * pScale))}px "JetBrains Mono", monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = `${PALETTE.pureWhite}${alpha * 0.95})`;
            ctx.fillText(`[${node.label}]`, proj.x, proj.y - (node.size * 2.2 * pScale));

            ctx.restore();
          });
        }

        // -------------------------------------------------------------
        // LAYER 5: 3D Depth-Sorted Streaming Orbital Particles
        // -------------------------------------------------------------
        const projectedParticles = [];

        orbit.particles.forEach((p) => {
          const currentTheta = (p.t * Math.PI * 2) + (this.time * orbit.particleSpeed * p.speedMul);
          const lx = Math.cos(currentTheta) * rx;
          const ly = Math.sin(currentTheta) * ry;
          const lz = Math.sin(currentTheta * 2 + this.time * 2.2) * 16 * currentScale;

          const rot = this.rotate3D(lx, ly, lz, planePitch, planeRoll, planeYaw);
          const proj = this.project(rot, cx, cy);

          projectedParticles.push({
            proj: proj,
            data: p,
            z: rot.z
          });
        });

        // Depth sort: render furthest (negative Z) to nearest (positive Z)
        projectedParticles.sort((a, b) => a.z - b.z);

        projectedParticles.forEach(item => {
          const proj = item.proj;
          const p = item.data;
          const zNorm = Math.max(0, Math.min(1, (item.z + 450) / 900));

          const alpha = 0.28 + zNorm * 0.70;
          const particleScale = proj.scale * currentScale;

          if (p.glyph) {
            ctx.font = `${Math.floor(11 * particleScale)}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = `${orbit.color}${alpha})`;
            ctx.fillText(p.glyph, proj.x, proj.y);
          } else {
            const r = p.size * particleScale * (0.8 + zNorm * 0.7);
            ctx.fillStyle = `${orbit.color}${alpha})`;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, r, 0, Math.PI * 2);
            ctx.fill();

            if (zNorm > 0.65) {
              ctx.beginPath();
              ctx.arc(proj.x, proj.y, r * 2.4, 0, Math.PI * 2);
              ctx.fillStyle = `${PALETTE.pureWhite}${alpha * 0.35})`;
              ctx.fill();
            }
          }
        });
      });

      ctx.restore();
    }

    renderCoreSphere(ctx, center, currentScale) {
      ctx.save();
      const cx = center.x;
      const cy = center.y;
      const sphereR = this.sphereRadius * currentScale;

      // 3-axis continuous rotation (Optimus style)
      const rotA = this.time * 0.75;
      const rotB = this.time * 0.55 + this.mouse.tiltX;
      const rotC = this.time * 0.38 + this.mouse.tiltY;

      ctx.font = `${Math.max(10, Math.floor(12 * currentScale))}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const projected = [];

      this.spherePoints.forEach(pt => {
        // Optimus 3-axis rotation equations:
        let x1 = pt.origX * Math.cos(rotA) - pt.origZ * Math.sin(rotA);
        let y1 = pt.origY;
        let z1 = pt.origX * Math.sin(rotA) + pt.origZ * Math.cos(rotA);

        let x2 = x1;
        let y2 = y1 * Math.cos(rotB) - z1 * Math.sin(rotB);
        let z2 = y1 * Math.sin(rotB) + z1 * Math.cos(rotB);

        let x3 = x2 * Math.cos(rotC) - y2 * Math.sin(rotC);
        let y3 = x2 * Math.sin(rotC) + y2 * Math.cos(rotC);
        let z3 = z2;

        const screenX = cx + x3 * sphereR;
        const screenY = cy + y3 * sphereR;

        projected.push({
          x: screenX,
          y: screenY,
          z: z3,
          char: pt.char
        });
      });

      // Sort by depth
      projected.sort((a, b) => a.z - b.z);

      projected.forEach(p => {
        const normZ = (p.z + 1) / 2;
        const alpha = 0.18 + normZ * 0.75;
        ctx.fillStyle = `${PALETTE.silverBright}${alpha})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      ctx.restore();
    }
  }

  // Export to window and initialize once DOM is ready
  window.GenerativeBackground = GenerativeBackground;

  function init() {
    window.generativeBg = new GenerativeBackground();
    console.log('%c[MoizCare] 3D Generative Orbit Engine v4.0 ACTIVE & ANIMATING', 'color:#00f0ff;font-weight:bold;background:#050814;padding:4px 8px;border-radius:4px');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
