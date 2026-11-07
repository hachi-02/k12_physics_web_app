'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Zap, ToggleLeft, ToggleRight, Info, Gauge, Lightbulb } from 'lucide-react';
import KaTeXRenderer from '@/components/KaTeXRenderer';

export function CircuitSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Circuit parameters
  const [voltage, setVoltage] = useState(12); // Volts (0 to 24)
  const [resistance, setResistance] = useState(10); // Ohms (1 to 100)
  const [isSwitchClosed, setIsSwitchClosed] = useState(true);

  // Ohm's Law Calculations:
  // Current I = U / R (Amperes)
  // Power P = U * I = U^2 / R (Watts)
  const current = isSwitchClosed && resistance > 0 ? voltage / resistance : 0;
  const power = isSwitchClosed ? current * voltage : 0;

  // Normalized luminosity for bulb (0 to 1)
  // Max power around 24V / 2 ohm = 288W, normalize up to 60W as bright
  const luminosity = Math.min(1.0, power / 40);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let electronOffset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Circuit wire dimensions (Rectangular loop)
      const left = 70;
      const right = width - 70;
      const top = 60;
      const bottom = height - 70;

      // 1. Draw Wires (Copper/Blue line)
      ctx.beginPath();
      ctx.strokeStyle = isSwitchClosed ? '#0284c7' : '#94a3b8';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Top wire (interrupted by Switch)
      ctx.moveTo(left, top);
      ctx.lineTo(width / 2 - 30, top);

      ctx.moveTo(width / 2 + 30, top);
      ctx.lineTo(right, top);

      // Right wire (interrupted by Bulb)
      ctx.lineTo(right, height / 2 - 35);
      ctx.moveTo(right, height / 2 + 35);
      ctx.lineTo(right, bottom);

      // Bottom wire (interrupted by Ammeter)
      ctx.lineTo(width / 2 + 35, bottom);
      ctx.moveTo(width / 2 - 35, bottom);
      ctx.lineTo(left, bottom);

      // Left wire (interrupted by Battery)
      ctx.lineTo(left, height / 2 + 30);
      ctx.moveTo(left, height / 2 - 30);
      ctx.lineTo(left, top);

      ctx.stroke();

      // 2. Draw Battery DC (Left Center)
      const batX = left;
      const batY = height / 2;
      // Negative plate (shorter, thicker)
      ctx.beginPath();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 5;
      ctx.moveTo(batX - 16, batY + 12);
      ctx.lineTo(batX + 16, batY + 12);
      ctx.stroke();

      // Positive plate (longer, thinner)
      ctx.beginPath();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.moveTo(batX - 26, batY - 12);
      ctx.lineTo(batX + 26, batY - 12);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('+', batX - 25, batY - 20);
      ctx.fillStyle = '#0f172a';
      ctx.fillText('-', batX - 22, batY + 30);

      // 3. Draw Switch (Top Center)
      const swX1 = width / 2 - 25;
      const swX2 = width / 2 + 25;
      ctx.beginPath();
      ctx.arc(swX1, top, 4, 0, Math.PI * 2);
      ctx.arc(swX2, top, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(swX1, top);
      if (isSwitchClosed) {
        ctx.lineTo(swX2, top);
      } else {
        ctx.lineTo(swX2 - 10, top - 24); // open switch
      }
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.fillText(isSwitchClosed ? 'Công tắc ĐÓNG' : 'Công tắc MỞ', width / 2 - 35, top - 28);

      // 4. Draw Lightbulb (Right Center)
      const bulbX = right;
      const bulbY = height / 2;

      // Glow halo if active
      if (isSwitchClosed && luminosity > 0.05) {
        const glowRadius = 30 + luminosity * 45;
        const glow = ctx.createRadialGradient(bulbX, bulbY, 10, bulbX, bulbY, glowRadius);
        glow.addColorStop(0, `rgba(251, 191, 36, ${0.4 + luminosity * 0.5})`);
        glow.addColorStop(0.5, `rgba(245, 158, 11, ${0.2 + luminosity * 0.3})`);
        glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.beginPath();
        ctx.arc(bulbX, bulbY, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      // Bulb glass circle
      ctx.beginPath();
      ctx.arc(bulbX, bulbY, 24, 0, Math.PI * 2);
      ctx.fillStyle = isSwitchClosed && luminosity > 0.1
        ? `rgba(254, 240, 138, ${Math.min(1.0, 0.4 + luminosity * 0.6)})`
        : '#e2e8f0';
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bulb filament
      ctx.beginPath();
      ctx.moveTo(bulbX - 8, bulbY + 12);
      ctx.lineTo(bulbX, bulbY - 6);
      ctx.lineTo(bulbX + 8, bulbY + 12);
      ctx.strokeStyle = isSwitchClosed && luminosity > 0.1 ? '#d97706' : '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Tải R = ${resistance}Ω`, bulbX - 35, bulbY + 45);

      // 5. Draw Ammeter (Bottom Center)
      const ammeterX = width / 2;
      const ammeterY = bottom;
      ctx.beginPath();
      ctx.arc(ammeterX, ammeterY, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('A', ammeterX - 5, ammeterY + 5);

      // 6. Animate Electron particles along circuit when closed
      if (isSwitchClosed && current > 0) {
        electronOffset = (electronOffset + current * 1.5) % 30;

        ctx.fillStyle = '#f59e0b';
        // Along top wire (Conventional current from + to -; electrons flow opposite)
        for (let x = left + 20; x < right; x += 30) {
          const drawX = (x + electronOffset) % (right - left) + left;
          if (drawX > left && drawX < right) {
            ctx.beginPath();
            ctx.arc(drawX, top, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [voltage, resistance, isSwitchClosed, current, luminosity]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1">
            <Zap className="w-3.5 h-3.5" /> Mô phỏng Điện Học KHTN
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Mạch Điện Một Chiều & Định Luật Ôm
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Khảo sát mối quan hệ giữa Hiệu điện thế (U), Điện trở (R), Cường độ dòng điện (I) và Độ sáng bóng đèn
          </p>
        </div>

        {/* Switch Toggle Button */}
        <button
          type="button"
          onClick={() => setIsSwitchClosed(!isSwitchClosed)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
            isSwitchClosed
              ? 'bg-teal-600 hover:bg-teal-700 text-white'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
          }`}
        >
          {isSwitchClosed ? <ToggleRight className="w-5 h-5 text-teal-200" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
          {isSwitchClosed ? 'Công tắc: Đang ĐÓNG' : 'Công tắc: Đang NGẮT'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Visualizer (Left) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-4/3 max-w-md bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
            <canvas ref={canvasRef} width={460} height={380} className="w-full h-full block" />
          </div>

          {/* Quick Voltage Presets */}
          <div className="w-full max-w-md mt-4 flex flex-wrap gap-2 text-xs">
            <span className="font-semibold text-slate-500 py-1">Nguồn pin chuẩn:</span>
            <button
              onClick={() => setVoltage(1.5)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Pin tiểu 1.5V
            </button>
            <button
              onClick={() => setVoltage(9.0)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Pin vuông 9V
            </button>
            <button
              onClick={() => setVoltage(12.0)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Ắc quy 12V
            </button>
            <button
              onClick={() => setVoltage(24.0)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Nguồn công nghiệp 24V
            </button>
          </div>
        </div>

        {/* Meters & Sliders (Right) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Virtual Instruments HUD */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-200/70 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-indigo-600" /> Ampe kế (I):
              </span>
              <span className="text-2xl font-black text-indigo-900 font-mono">
                {current.toFixed(2)} A
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-rose-600" /> Vôn kế (U):
              </span>
              <span className="text-2xl font-black text-rose-700 font-mono">
                {isSwitchClosed ? voltage.toFixed(1) : '0.0'} V
              </span>
            </div>

            <div className="col-span-2 pt-2 border-t border-amber-200/60 flex justify-between items-center text-slate-800">
              <span className="flex items-center gap-1 font-semibold">
                <Lightbulb className="w-4 h-4 text-amber-600" /> Công suất phát sáng (P = I²R):
              </span>
              <span className="text-lg font-black text-amber-700 font-mono">
                {power.toFixed(1)} W
              </span>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-4 text-xs font-semibold text-slate-700">
            {/* Voltage Slider */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Hiệu điện thế nguồn U (V):</span>
                <span className="font-bold text-rose-600">{voltage.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="0.5"
                value={voltage}
                onChange={(e) => setVoltage(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Resistance Slider */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Điện trở bóng đèn R (Ω):</span>
                <span className="font-bold text-teal-700">{resistance.toFixed(0)} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={resistance}
                onChange={(e) => setResistance(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Scientific Formulas Card */}
          <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-950 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-indigo-600" /> Định luật Ôm cho đoạn mạch:
            </span>
            <p className="font-serif">
              Cường độ dòng điện: <KaTeXRenderer math="I = \frac{U}{R}" className="mx-1" />
            </p>
            <p className="font-serif">
              Công suất điện: <KaTeXRenderer math="P = U \cdot I = I^2 \cdot R = \frac{U^2}{R}" className="mx-1" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircuitSimulation;
