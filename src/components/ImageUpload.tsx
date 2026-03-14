import React from 'react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, X, CheckCircle2 } from 'lucide-react';

export default function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadComplete(false);
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
    }, 3000); // 3s liquid animation
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    setUploadComplete(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white/60 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-white/80 relative overflow-hidden">
      <div className="mb-8">
        <h3 className="font-display text-2xl text-[#1A1A1A] tracking-tight mb-1">Upload Product</h3>
        <p className="text-sm text-[#878681] font-sans">Drag and drop high-res images for DRAGHO.</p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative w-full aspect-square rounded-2xl border-2 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer
          ${isDragging ? 'border-[#1A1A1A] bg-[#1A1A1A]/5' : 'border-dashed border-[#878681]/30 bg-[#FAFAFA]/50 hover:bg-[#FAFAFA]'}
          ${preview ? 'border-none border-solid' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center pointer-events-none px-6 text-center"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1A1A1A]">
                <UploadCloud size={28} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-[#1A1A1A] mb-1">Click or drag image to upload</p>
              <p className="text-xs text-[#878681]">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              
              {/* Liquid Uploading Overlay */}
              {isUploading && (
                <motion.div 
                  className="absolute inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative w-28 h-28 rounded-full border border-white/50 overflow-hidden flex items-center justify-center shadow-2xl bg-white/20">
                    {/* Liquid Wave Effect */}
                    <motion.div 
                      className="absolute w-[250%] h-[250%] bg-[#1A1A1A] rounded-[42%]"
                      initial={{ y: "80%", rotate: 0 }}
                      animate={{ y: "-10%", rotate: 360 }}
                      transition={{ 
                        y: { duration: 3, ease: "easeInOut" },
                        rotate: { duration: 3, ease: "linear" }
                      }}
                    />
                    <span className="relative z-20 text-white text-[10px] font-bold tracking-widest uppercase mix-blend-difference">Uploading</span>
                  </div>
                </motion.div>
              )}

              {/* Success Overlay */}
              {uploadComplete && (
                <motion.div 
                  className="absolute inset-0 bg-[#1A1A1A]/10 flex items-center justify-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="bg-white text-[#1A1A1A] p-4 rounded-full shadow-2xl"
                  >
                    <CheckCircle2 size={36} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              )}

              {/* Remove Button */}
              {!isUploading && (
                <button
                  onClick={clearFile}
                  className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-white transition-colors shadow-sm"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
