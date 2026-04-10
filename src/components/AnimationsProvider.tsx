'use client';

import { useEffect } from 'react';

export default function AnimationsProvider() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // ── PARTICLES ──────────────────────────────────────────
    const canvas = document.getElementById('particles') as HTMLCanvasElement | null;
    if (canvas && !isTouch) {
      const ctx = canvas.getContext('2d')!;
      let W = 0, H = 0;
      const pts: any[] = [];

      const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
      resize();
      window.addEventListener('resize', resize);
      cleanups.push(() => window.removeEventListener('resize', resize));

      const rand = (a: number, b: number) => Math.random() * (b - a) + a;

      class Particle {
        x = rand(0, W); y = rand(0, H); r = rand(.5, 2.2);
        vx = rand(-.25, .25); vy = rand(-.7, -.15);
        op = rand(.1, .55); life = 0; max = rand(180, 550);
        hue = rand(36, 52); cur = 0;
        update() {
          this.x += this.vx; this.y += this.vy; this.life++;
          this.cur = this.op * Math.sin(this.life / this.max * Math.PI);
          if (this.life >= this.max || this.y < -8) { Object.assign(this, new Particle()); }
        }
        draw() {
          ctx.save(); ctx.globalAlpha = this.cur;
          ctx.fillStyle = `hsl(${this.hue},58%,64%)`;
          ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, 6.28); ctx.fill(); ctx.restore();
        }
      }
      for (let i = 0; i < 75; i++) {
        const p = new Particle();
        p.life = Math.random() * p.max;
        pts.push(p);
      }
      let rafId: number;
      const loop = () => {
        ctx.clearRect(0, 0, W, H);
        pts.forEach(p => { p.update(); p.draw(); });
        rafId = requestAnimationFrame(loop);
      };
      loop();
      cleanups.push(() => cancelAnimationFrame(rafId));
    } else if (canvas && isTouch) {
      canvas.style.display = 'none';
    }

    // ── CURSOR ─────────────────────────────────────────────
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    const glow = document.getElementById('glowOverlay');
    
    if (!isTouch && (cur || ring || glow)) {
      let mx = 0, my = 0, rx = 0, ry = 0;

      const onMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;
        if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
        if (glow) glow.style.background = `radial-gradient(550px at ${mx}px ${my}px,rgba(200,169,110,.045) 0%,transparent 70%)`;
      };
      document.addEventListener('mousemove', onMove);
      cleanups.push(() => document.removeEventListener('mousemove', onMove));

      let ringRaf = 0;
      const animRing = () => {
        rx += (mx - rx) * .11; ry += (my - ry) * .11;
        if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
        ringRaf = requestAnimationFrame(animRing);
      };
      animRing();
      cleanups.push(() => cancelAnimationFrame(ringRaf));

      const hoverTargets = Array.from(
        document.querySelectorAll('a,button,.plan-card,.gallery-item,.pq-item'),
      );
      const onEnter = () => {
        if (cur) { cur.style.width = '18px'; cur.style.height = '18px'; }
        if (ring) { ring.style.width = '52px'; ring.style.height = '52px'; }
      };
      const onLeave = () => {
        if (cur) { cur.style.width = '12px'; cur.style.height = '12px'; }
        if (ring) { ring.style.width = '36px'; ring.style.height = '36px'; }
      };
      hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
      cleanups.push(() => {
        hoverTargets.forEach(el => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    } else {
      if (cur) cur.style.display = 'none';
      if (ring) ring.style.display = 'none';
      if (glow) glow.style.display = 'none';
      document.body.style.cursor = 'auto';
    }

    // ── SCROLL REVEAL ──────────────────────────────────────
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: .05, rootMargin: '0px 0px -20px 0px' }); // Adjusted for mobile
    reveals.forEach(r => observer.observe(r));
    cleanups.push(() => observer.disconnect());

      // ── COUNTER ────────────────────────────────────────────
      const counters = document.querySelectorAll<HTMLElement>('.stat-number');
      const cObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const txt = el.textContent || '';
          const num = parseInt(txt.replace(/\D/g, ''));
          if (isNaN(num)) return;
          const suf = txt.replace(/[0-9]/g, '');
          let v = 0; const step = num / 90;
          const t = setInterval(() => {
            v += step; if (v >= num) { el.textContent = txt; clearInterval(t); return; }
            el.textContent = Math.floor(v) + suf;
          }, 16);
          cObs.unobserve(el);
        });
      }, { threshold: .5 });
      counters.forEach(c => cObs.observe(c));
      cleanups.push(() => cObs.disconnect());

      // ── SMOOTH SCROLL ──────────────────────────────────────
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          const target = document.querySelector(a.getAttribute('href')!);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, []);

  return null;
}
