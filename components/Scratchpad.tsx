'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  PenTool, 
  Eraser, 
  RotateCcw, 
  RotateCw, 
  Trash2, 
  X, 
  Maximize2, 
  Minimize2, 
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

interface ScratchpadProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  isFloating?: boolean;
}

const COLORS = [
  { label: 'Đen', value: '#0f172a' },
  { label: 'Xanh dương', value: '#2563eb' },
  { label: 'Đỏ', value: '#e11d48' },
  { label: 'Xanh lá', value: '#16a34a' },
  { label: 'Vàng cam', value: '#d97706' },
  { label: 'Tím', value: '#9333ea' },
];

export function Scratchpad({
  isOpen = true,
  onClose,
  className = '',
  isFloating = true,
}: ScratchpadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#2563eb');
  const [lineWidth, setLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  // Initialize canvas resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Save current content if any
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx && canvas.width > 0 && canvas.height > 0) {
        tempCtx.drawImage(canvas, 0, 0);
      }

      canvas.width = Math.max(300, rect.width * dpr);
      canvas.height = Math.max(200, rect.height * dpr);

      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Restore
      if (tempCanvas.width > 0 && tempCanvas.height > 0) {
        ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isOpen]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory((prev) => [...prev.slice(-20), snapshot]);
      setRedoStack([]);
    } catch {
      // Ignore security errors in tests
    }
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    saveState();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.lineWidth = mode === 'eraser' ? lineWidth * 4 : lineWidth;
    ctx.strokeStyle = mode === 'eraser' ? '#ffffff' : color;
    if (mode === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
  };

  const clearCanvas = () => {
    saveState();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const undo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setRedoStack((prev) => [...prev, currentSnapshot]);

    const previousSnapshot = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    ctx.putImageData(previousSnapshot, 0, 0);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nextSnapshot = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    ctx.putImageData(nextSnapshot, 0, 0);
  };

  if (!isOpen) return null;

  const content = (
    <div
      ref={containerRef}
      className={`bg-white rounded-2xl border-2 border-slate-300 shadow-xl overflow-hidden flex flex-col ${
        isTransparent ? 'bg-white/85 backdrop-blur-xs' : ''
      } ${className}`}
    >
      {/* Toolbar Header */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left: Tools & Color Palette */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setMode('pen')}
            className={`p-1.5 rounded-lg font-bold flex items-center gap-1 transition ${
              mode === 'pen'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
            title="Bút vẽ"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bút</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('eraser')}
            className={`p-1.5 rounded-lg font-bold flex items-center gap-1 transition ${
              mode === 'eraser'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
            title="Tẩy xóa"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tẩy</span>
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Color buttons */}
          <div className="flex items-center gap-1">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => {
                  setColor(c.value);
                  setMode('pen');
                }}
                className={`w-5 h-5 rounded-full border-2 transition ${
                  color === c.value && mode === 'pen'
                    ? 'border-slate-800 scale-110 shadow-xs'
                    : 'border-white hover:scale-105'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            ))}
          </div>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Line width slider */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
            <span>Nét:</span>
            <input
              type="range"
              min={1}
              max={12}
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-16 h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsTransparent(!isTransparent)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200"
            title={isTransparent ? 'Nền đục' : 'Nền trong suốt nhìn đề'}
          >
            {isTransparent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={undo}
            disabled={history.length === 0}
            className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg hover:bg-slate-200"
            title="Hoàn tác (Undo)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={redo}
            disabled={redoStack.length === 0}
            className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg hover:bg-slate-200"
            title="Làm lại (Redo)"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={clearCanvas}
            className="p-1.5 text-rose-600 hover:text-rose-800 rounded-lg hover:bg-rose-50"
            title="Xóa trắng bảng"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 ml-1"
              title="Đóng bảng nháp"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full flex-1 min-h-[260px] bg-transparent cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full block touch-none"
        />
      </div>
    </div>
  );

  if (!isFloating) {
    return content;
  }

  // Floating Drawer / Window Mode
  return (
    <div className="fixed bottom-6 right-6 z-40 w-80 sm:w-96 md:w-[480px] h-[360px] shadow-2xl animate-scale-up">
      {content}
    </div>
  );
}

export default Scratchpad;
