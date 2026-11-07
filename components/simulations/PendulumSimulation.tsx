'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sliders, Activity, Info } from 'lucide-react';
import KaTeXRenderer from '@/components/KaTeXRenderer';

export function PendulumSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation parameters
  const [length, setLength] = useState(1.5); // meters (0.5 to 3.0)
  const [mass, setMass] = useState(1.0); // kg (0.1 to 2.0)
  const [gravity, setGravity] = useState(9.8); // m/s^2 (1.6 to 24.8)
  const [damping, setDamping] = useState(0.002); // air resistance
  const [isPlaying, setIsPlaying] = useState(true);

  // Physics dynamic state in refs for smooth 60fps canvas loop
  const stateRef = useRef({
    theta: Math.PI / 4, // 45 degrees initial deflection
    omega: 0.0,         // angular velocity (rad/s)
    alpha: 0.0,         // angular acceleration (rad/s^2)
  });

  // Energy stats for React HUD
  const [energies, setEnergies] = useState({ ke: 0, pe: 0, total: 0, thetaDeg: 45, speed: 0 });

  // Reset function
  const handleReset = (initAngleDeg = 45) => {
    stateRef.current = {
      theta: (initAngleDeg * Math.PI) / 180,
      omega: 0.0,
      alpha: 0.0,
    };
  };

  // Preset planets for gravity
  const setPlanetGravity = (name: string, val: number) => {
    setGravity(val);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05); // cap dt at 50ms to prevent explosion
      lastTime = time;

      if (isPlaying) {
        // Simple Pendulum differential equation:
        // d2theta/dt2 = -(g / L) * sin(theta) - damping * omega
        const g = gravity;
        const L = length;
        const b = damping;

        const currentTheta = stateRef.current.theta;
        const currentOmega = stateRef.current.omega;

        const alpha = -(g / L) * Math.sin(currentTheta) - b * currentOmega;
        const newOmega = currentOmega + alpha * dt;
        const newTheta = currentTheta + newOmega * dt;

        stateRef.current = {
          theta: newTheta,
          omega: newOmega,
          alpha,
        };
      }

      // Compute energies
      const theta = stateRef.current.theta;
      const omega = stateRef.current.omega;
      const v = length * omega;
      const ke = 0.5 * mass * v * v;
      const h = length * (1 - Math.cos(theta));
      const pe = mass * gravity * h;
      const total = ke + pe;

      setEnergies({
        ke: Math.max(0, ke),
        pe: Math.max(0, pe),
        total: Math.max(0, total),
        thetaDeg: (theta * 180) / Math.PI,
        speed: Math.abs(v),
      });

      // Canvas dimensions
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Draw grid / background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Pivot location
      const pivotX = width / 2;
      const pivotY = 50;

      // Scale: 1 meter = 90 pixels
      const pixelLength = length * 95;
      const bobX = pivotX + pixelLength * Math.sin(theta);
      const bobY = pivotY + pixelLength * Math.cos(theta);

      // 1. Draw dashed equilibrium line
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(pivotX, pivotY + pixelLength + 30);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw angle arc
      if (Math.abs(theta) > 0.05) {
        ctx.beginPath();
        const startAngle = Math.PI / 2;
        const endAngle = Math.PI / 2 + theta;
        ctx.arc(pivotX, pivotY, 35, Math.min(startAngle, endAngle), Math.max(startAngle, endAngle));
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 3. Draw String
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 4. Draw Pivot
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // 5. Draw Bob (radius proportional to mass)
      const bobRadius = 14 + mass * 6;
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        bobX - bobRadius * 0.3,
        bobY - bobRadius * 0.3,
        bobRadius * 0.1,
        bobX,
        bobY,
        bobRadius
      );
      gradient.addColorStop(0, '#38bdf8');
      gradient.addColorStop(0.7, '#0284c7');
      gradient.addColorStop(1, '#0369a1');
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = '#0c4a6e';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Velocity vector arrow on bob
      if (Math.abs(v) > 0.05) {
        const velScale = 15;
        const vx = v * Math.cos(theta) * velScale;
        const vy = -v * Math.sin(theta) * velScale;
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        ctx.lineTo(bobX + vx, bobY + vy);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [length, mass, gravity, damping, isPlaying]);

  // Theoretical period: T = 2 * pi * sqrt(L / g)
  const theoreticalPeriod = 2 * Math.PI * Math.sqrt(length / gravity);
  const frequency = 1 / theoreticalPeriod;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-1">
            <Activity className="w-3.5 h-3.5" /> Mô phỏng Dao động Cơ học
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Con Lắc Đơn & Định Luật Bảo Toàn Cơ Năng
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Khảo sát dao động điều hòa của con lắc đơn và sự chuyển hóa giữa Động năng ($W_d$) và Thế năng ($W_t$)
          </p>
        </div>

        {/* Play/Pause & Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Tạm dừng' : 'Tiếp tục'}
          </button>

          <button
            type="button"
            onClick={() => handleReset(45)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Đặt lại con lắc về 45 độ"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Visualizer (Left) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-4/3 max-w-md bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={460}
              height={380}
              className="w-full h-full block"
            />

            {/* Quick angle reset buttons overlay */}
            <div className="absolute bottom-3 left-3 flex gap-1.5 text-[11px] font-bold">
              <button
                onClick={() => handleReset(15)}
                className="px-2 py-1 rounded bg-white/90 text-slate-700 border border-slate-300 hover:bg-white"
              >
                15°
              </button>
              <button
                onClick={() => handleReset(30)}
                className="px-2 py-1 rounded bg-white/90 text-slate-700 border border-slate-300 hover:bg-white"
              >
                30°
              </button>
              <button
                onClick={() => handleReset(45)}
                className="px-2 py-1 rounded bg-white/90 text-slate-700 border border-slate-300 hover:bg-white"
              >
                45°
              </button>
              <button
                onClick={() => handleReset(60)}
                className="px-2 py-1 rounded bg-white/90 text-slate-700 border border-slate-300 hover:bg-white"
              >
                60°
              </button>
            </div>
          </div>

          {/* Energy Conservation Visualizer Bar */}
          <div className="w-full max-w-md mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Bảo toàn cơ năng:</span>
              <span className="font-mono text-indigo-700">{energies.total.toFixed(2)} J</span>
            </div>

            {/* Stacked Progress Bar */}
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-red-500 transition-all duration-75"
                style={{
                  width: `${energies.total > 0 ? (energies.ke / energies.total) * 100 : 0}%`,
                }}
                title={`Động năng: ${energies.ke.toFixed(2)} J`}
              />
              <div
                className="h-full bg-blue-500 transition-all duration-75"
                style={{
                  width: `${energies.total > 0 ? (energies.pe / energies.total) * 100 : 0}%`,
                }}
                title={`Thế năng: ${energies.pe.toFixed(2)} J`}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1 text-red-600">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                Động năng Wđ: {energies.ke.toFixed(2)} J
              </span>
              <span className="flex items-center gap-1 text-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Thế năng Wt: {energies.pe.toFixed(2)} J
              </span>
            </div>
          </div>
        </div>

        {/* Parameter Sliders & Real-Time Physics HUD (Right) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Real-time Measurement HUD */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-teal-50/50 rounded-2xl border border-teal-100 text-xs">
            <div>
              <span className="text-slate-500 block">Chu kỳ dao động T:</span>
              <span className="text-base font-black text-teal-900 font-mono">
                {theoreticalPeriod.toFixed(2)} s
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Tần số f:</span>
              <span className="text-base font-black text-teal-900 font-mono">
                {frequency.toFixed(2)} Hz
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Góc lệch tức thời θ:</span>
              <span className="text-base font-black text-slate-800 font-mono">
                {energies.thetaDeg.toFixed(1)}°
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Vận tốc tức thời v:</span>
              <span className="text-base font-black text-slate-800 font-mono">
                {energies.speed.toFixed(2)} m/s
              </span>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-4 text-xs font-semibold text-slate-700">
            {/* Length Slider */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Chiều dài dây l (m):</span>
                <span className="font-bold text-teal-700">{length.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.05"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Mass Slider */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Khối lượng vật nặng m (kg):</span>
                <span className="font-bold text-teal-700">{mass.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.1"
                value={mass}
                onChange={(e) => setMass(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Gravity Planet Selectors */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>Gia tốc trọng trường g (m/s²):</span>
                <span className="font-bold text-teal-700">{gravity.toFixed(1)} m/s²</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setPlanetGravity('Trái đất', 9.8)}
                  className={`py-1 rounded-md border text-center transition ${
                    gravity === 9.8 ? 'bg-teal-600 text-white font-bold' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Trái Đất (9.8)
                </button>
                <button
                  type="button"
                  onClick={() => setPlanetGravity('Mặt trăng', 1.6)}
                  className={`py-1 rounded-md border text-center transition ${
                    gravity === 1.6 ? 'bg-teal-600 text-white font-bold' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Mặt Trăng (1.6)
                </button>
                <button
                  type="button"
                  onClick={() => setPlanetGravity('Sao hỏa', 3.7)}
                  className={`py-1 rounded-md border text-center transition ${
                    gravity === 3.7 ? 'bg-teal-600 text-white font-bold' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Sao Hỏa (3.7)
                </button>
                <button
                  type="button"
                  onClick={() => setPlanetGravity('Sao mộc', 24.8)}
                  className={`py-1 rounded-md border text-center transition ${
                    gravity === 24.8 ? 'bg-teal-600 text-white font-bold' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Sao Mộc (24.8)
                </button>
              </div>
            </div>

            {/* Damping Slider */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Ma sát / Lực cản không khí:</span>
                <span className="font-bold text-teal-700">
                  {damping === 0 ? 'Không ma sát' : (damping * 1000).toFixed(0)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.01"
                step="0.001"
                value={damping}
                onChange={(e) => setDamping(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Formula Cheat Card */}
          <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-950 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-indigo-600" /> Công thức vật lý:
            </span>
            <p className="font-serif">
              Chu kỳ: <KaTeXRenderer math="T = 2\pi\sqrt{\frac{l}{g}}" className="mx-1" /> (không phụ thuộc vào khối lượng m)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendulumSimulation;
