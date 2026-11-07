'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Compass, AlertTriangle, Info, Sliders, Sun } from 'lucide-react';
import KaTeXRenderer from '@/components/KaTeXRenderer';

const PRESET_MEDIA = [
  { name: 'Không khí / Chân không', n: 1.0 },
  { name: 'Nước', n: 1.33 },
  { name: 'Thủy tinh thường', n: 1.52 },
  { name: 'Kim cương', n: 2.42 },
];

export function OpticsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Parameters
  const [n1, setN1] = useState(1.0); // Medium 1 refractive index
  const [n2, setN2] = useState(1.52); // Medium 2 refractive index
  const [angleI, setAngleI] = useState(45); // Incident angle in degrees (0 to 89)

  // Calculate Snell's law physics
  const iRad = (angleI * Math.PI) / 180;
  const sinR = (n1 / n2) * Math.sin(iRad);
  const isTIR = sinR > 1.0; // Total Internal Reflection
  const rRad = isTIR ? null : Math.asin(sinR);
  const angleR = rRad !== null ? (rRad * 180) / Math.PI : null;

  // Critical angle if n1 > n2: igh = asin(n2 / n1)
  const criticalAngleRad = n1 > n2 ? Math.asin(n2 / n1) : null;
  const criticalAngleDeg = criticalAngleRad !== null ? (criticalAngleRad * 180) / Math.PI : null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;
    const midX = width / 2;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Medium 1 Background (Top Half)
    const m1Alpha = Math.min(0.35, (n1 - 1.0) * 0.2);
    ctx.fillStyle = `rgba(224, 242, 254, ${Math.max(0.05, m1Alpha)})`;
    ctx.fillRect(0, 0, width, midY);

    // 2. Draw Medium 2 Background (Bottom Half)
    const m2Alpha = Math.min(0.45, (n2 - 1.0) * 0.25);
    ctx.fillStyle = `rgba(186, 230, 253, ${Math.max(0.1, m2Alpha)})`;
    ctx.fillRect(0, midY, width, midY);

    // 3. Medium Interface line (Surface)
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 4. Normal line (Pháp tuyến vuông góc mặt phân cách)
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(midX, 20);
    ctx.lineTo(midX, height - 20);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    // Ray length
    const rayLength = 170;

    // 5. Draw Incident Ray (Tia tới: từ Môi trường 1 đến điểm tới O)
    // In physics, angle i is with respect to the normal
    const incidentStartX = midX - rayLength * Math.sin(iRad);
    const incidentStartY = midY - rayLength * Math.cos(iRad);

    ctx.beginPath();
    ctx.moveTo(incidentStartX, incidentStartY);
    ctx.lineTo(midX, midY);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Arrow on Incident Ray
    const midIncX = (incidentStartX + midX) / 2;
    const midIncY = (incidentStartY + midY) / 2;
    drawArrowHead(ctx, incidentStartX, incidentStartY, midX, midY, '#dc2626');

    // 6. Draw Reflected Ray (Tia phản xạ)
    // Angle of reflection = angle of incidence i
    const reflectEndX = midX + rayLength * Math.sin(iRad);
    const reflectEndY = midY - rayLength * Math.cos(iRad);

    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(reflectEndX, reflectEndY);
    ctx.strokeStyle = isTIR ? '#ef4444' : 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = isTIR ? 3.5 : 1.5;
    ctx.stroke();

    if (isTIR) {
      drawArrowHead(ctx, midX, midY, reflectEndX, reflectEndY, '#dc2626');
    }

    // 7. Draw Refracted Ray (Tia khúc xạ - nếu không bị phản xạ toàn phần)
    if (!isTIR && rRad !== null) {
      const refractEndX = midX + rayLength * Math.sin(rRad);
      const refractEndY = midY + rayLength * Math.cos(rRad);

      ctx.beginPath();
      ctx.moveTo(midX, midY);
      ctx.lineTo(refractEndX, refractEndY);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.stroke();

      drawArrowHead(ctx, midX, midY, refractEndX, refractEndY, '#059669');

      // Draw angle r arc
      if (angleR! > 2) {
        ctx.beginPath();
        const startAngle = Math.PI / 2;
        const endAngle = Math.PI / 2 - rRad;
        ctx.arc(midX, midY, 35, endAngle, startAngle);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // 8. Draw angle i arc
    if (angleI > 2) {
      ctx.beginPath();
      const startAngle = -Math.PI / 2;
      const endAngle = -Math.PI / 2 - iRad;
      ctx.arc(midX, midY, 30, Math.min(startAngle, endAngle), Math.max(startAngle, endAngle));
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // 9. Point of incidence O
    ctx.beginPath();
    ctx.arc(midX, midY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    // Text labels on Canvas
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`Môi trường 1 (n₁ = ${n1.toFixed(2)})`, 15, 30);
    ctx.fillText(`Môi trường 2 (n₂ = ${n2.toFixed(2)})`, 15, midY + 30);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Pháp tuyến (N)', midX + 8, 30);
  }, [n1, n2, angleI, iRad, rRad, angleR, isTIR]);

  function drawArrowHead(
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string
  ) {
    const headlen = 10;
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(
      midX - headlen * Math.cos(angle - Math.PI / 6),
      midY - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(midX, midY);
    ctx.lineTo(
      midX - headlen * Math.cos(angle + Math.PI / 6),
      midY - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-1">
            <Sun className="w-3.5 h-3.5" /> Mô phỏng Quang Hình Học
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Khúc Xạ Ánh Sáng & Định Luật Snell-Descartes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Khảo sát đường truyền tia sáng qua mặt phân cách hai môi trường và hiện tượng Phản xạ toàn phần
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Visualizer (Left) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-4/3 max-w-md bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
            <canvas ref={canvasRef} width={460} height={380} className="w-full h-full block" />

            {/* Total Internal Reflection Alert Overlay */}
            {isTIR && (
              <div className="absolute top-4 right-4 bg-rose-600/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 animate-pulse">
                <AlertTriangle className="w-4 h-4" /> Phản xạ toàn phần!
              </div>
            )}
          </div>

          {/* Quick Preset Pairs */}
          <div className="w-full max-w-md mt-4 flex flex-wrap gap-2 text-xs">
            <span className="font-semibold text-slate-500 py-1">Tình huống mẫu:</span>
            <button
              onClick={() => {
                setN1(1.0);
                setN2(1.33);
                setAngleI(45);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
            >
              Không khí &rarr; Nước
            </button>
            <button
              onClick={() => {
                setN1(1.0);
                setN2(1.52);
                setAngleI(60);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
            >
              Không khí &rarr; Thủy tinh
            </button>
            <button
              onClick={() => {
                setN1(1.33);
                setN2(1.0);
                setAngleI(50);
              }}
              className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold border border-rose-200 transition"
            >
              Nước &rarr; Không khí (TIR)
            </button>
          </div>
        </div>

        {/* Sliders & Angle Measurements (Right) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Angle Measurement Box */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-cyan-50/50 rounded-2xl border border-cyan-100 text-xs">
            <div>
              <span className="text-slate-500 block">Góc tới i:</span>
              <span className="text-xl font-black text-rose-600 font-mono">{angleI}°</span>
            </div>
            <div>
              <span className="text-slate-500 block">Góc khúc xạ r:</span>
              <span className="text-xl font-black text-emerald-600 font-mono">
                {isTIR ? 'Không có (TIR)' : `${angleR!.toFixed(1)}°`}
              </span>
            </div>
            {criticalAngleDeg !== null && (
              <div className="col-span-2 pt-2 border-t border-cyan-200/50 flex justify-between items-center text-slate-700">
                <span>Góc giới hạn phản xạ toàn phần (igh):</span>
                <span className="font-bold text-rose-700 font-mono">
                  {criticalAngleDeg.toFixed(1)}°
                </span>
              </div>
            )}
          </div>

          {/* Interactive Controls */}
          <div className="space-y-4 text-xs font-semibold text-slate-700">
            {/* Angle Slider */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Góc tới i (°):</span>
                <span className="font-bold text-rose-600">{angleI}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="85"
                step="1"
                value={angleI}
                onChange={(e) => setAngleI(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Medium 1 Refractive Index */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Chiết suất môi trường 1 (n₁):</span>
                <span className="font-bold text-teal-700">{n1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.42"
                step="0.01"
                value={n1}
                onChange={(e) => setN1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Medium 2 Refractive Index */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Chiết suất môi trường 2 (n₂):</span>
                <span className="font-bold text-teal-700">{n2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.42"
                step="0.01"
                value={n2}
                onChange={(e) => setN2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Theoretical Law */}
          <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-950 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-indigo-600" /> Định luật khúc xạ ánh sáng (Snell):
            </span>
            <p className="font-serif">
              <KaTeXRenderer math="n_1 \sin(i) = n_2 \sin(r)" className="mx-1" />
            </p>
            <p className="text-[11px] text-slate-600">
              Khi ánh sáng đi từ môi trường chiết quang hơn sang môi trường kém chiết quang (<KaTeXRenderer math="n_1 > n_2" />) với góc tới <KaTeXRenderer math="i \ge i_{gh}" />, hiện tượng phản xạ toàn phần xảy ra hoàn toàn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpticsSimulation;
