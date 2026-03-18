'use client'

import { useState } from 'react'
import { Image, Upload, Zap, ZoomIn, ZoomOut } from 'lucide-react'

const mockImages = [
  { id: '1', name: 'Cell Viability Plate 1', type: 'Fluorescence', date: '2026-02-15', detections: 142, confluency: 78 },
  { id: '2', name: 'Colony Formation Assay', type: 'Brightfield', date: '2026-02-10', detections: 85, confluency: 45 },
  { id: '3', name: 'Western Blot - EGFR', type: 'Chemiluminescence', date: '2026-02-08', detections: 6, confluency: 0 },
  { id: '4', name: 'IF Staining - Ki67', type: 'Fluorescence', date: '2026-02-05', detections: 230, confluency: 82 },
]

export default function ImageAnalysis() {
  const [selectedImage, setSelectedImage] = useState(mockImages[0])
  const [zoom, setZoom] = useState(1)
  const [analyzing, setAnalyzing] = useState(false)

  return (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      <div className="glass p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-white/70 mb-3">IMAGE LIBRARY</h3>
        <button className="w-full mb-3 py-2.5 rounded-xl bg-white/5 border border-dashed border-white/20 text-white/40 text-sm hover:bg-white/10 flex items-center justify-center gap-2">
          <Upload className="w-4 h-4" /> Upload Image
        </button>
        <div className="space-y-2">
          {mockImages.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selectedImage.id === img.id ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <p className="font-medium text-sm">{img.name}</p>
              <p className="text-xs text-white/40">{img.type} | {img.date}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">{img.detections} detections</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-2 flex flex-col gap-4">
        <div className="glass p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white/70">{selectedImage.name}</h3>
            <div className="flex gap-2">
              <button onClick={() => setZoom(Math.max(0.5, zoom - 0.25))} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-white/50 py-1.5">{(zoom * 100).toFixed(0)}%</span>
              <button onClick={() => setZoom(Math.min(3, zoom + 0.25))} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setAnalyzing(true); setTimeout(() => setAnalyzing(false), 2000) }}
                className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs hover:bg-blue-500/30 flex items-center gap-1"
              >
                <Zap className="w-3 h-3" /> {analyzing ? 'Analyzing...' : 'Run AI Analysis'}
              </button>
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-black/40 overflow-hidden relative">
            {/* Simulated image area with detections */}
            <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}>
              <div className="w-full h-full relative">
                {/* Background grid simulating microscopy image */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
                  backgroundSize: '15px 15px',
                }} />
                {/* Simulated cell detections */}
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute border-2 border-emerald-400/60 rounded-full"
                    style={{
                      width: `${20 + Math.random() * 30}px`,
                      height: `${20 + Math.random() * 30}px`,
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                    }}
                  />
                ))}
                {/* ROI markers */}
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={`roi-${i}`}
                    className="absolute border-2 border-amber-400/80 rounded"
                    style={{
                      width: `${80 + Math.random() * 40}px`,
                      height: `${60 + Math.random() * 40}px`,
                      left: `${15 + i * 30}%`,
                      top: `${20 + Math.random() * 40}%`,
                    }}
                  >
                    <span className="absolute -top-4 left-0 text-[9px] text-amber-400 bg-black/50 px-1 rounded">ROI-{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="grid grid-cols-4 gap-3">
          <div className="glass p-3">
            <p className="text-[10px] text-white/40">Detections</p>
            <p className="text-xl font-bold text-blue-400">{selectedImage.detections}</p>
          </div>
          <div className="glass p-3">
            <p className="text-[10px] text-white/40">Confluency</p>
            <p className="text-xl font-bold text-emerald-400">{selectedImage.confluency}%</p>
          </div>
          <div className="glass p-3">
            <p className="text-[10px] text-white/40">Image Type</p>
            <p className="text-sm font-bold text-purple-400">{selectedImage.type}</p>
          </div>
          <div className="glass p-3">
            <p className="text-[10px] text-white/40">AI Confidence</p>
            <p className="text-xl font-bold text-amber-400">94%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
