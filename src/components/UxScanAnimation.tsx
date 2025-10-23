import { motion } from "motion/react";

interface UxScanAnimationProps {
  isScanning: boolean;
  onComplete: () => void;
}

export function UxScanAnimation({ isScanning, onComplete }: UxScanAnimationProps) {
  if (!isScanning) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Main scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[100px]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #21C3C5 40%, #21C3C5 60%, transparent 100%)',
          opacity: 0.4,
          filter: 'blur(8px)',
        }}
        initial={{ top: '-100px' }}
        animate={{ 
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: 1,
        }}
        onAnimationComplete={onComplete}
      />
      
      {/* Secondary scan line for depth */}
      <motion.div
        className="absolute left-0 right-0 h-[60px]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #21C3C5 50%, transparent 100%)',
          opacity: 0.3,
          filter: 'blur(4px)',
        }}
        initial={{ top: '-60px' }}
        animate={{ 
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          delay: 0.1,
          repeat: 1,
        }}
      />

      {/* Sharp scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: '#21C3C5',
          boxShadow: '0 0 10px #21C3C5, 0 0 20px #21C3C5',
          opacity: 0.8,
        }}
        initial={{ top: '-2px' }}
        animate={{ 
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: 1,
        }}
      />

      {/* Overlay effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #21C3C5 50%, transparent 100%)',
          opacity: 0.05,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: 1,
        }}
      />

      {/* Grid scan effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#21C3C5 1px, transparent 1px),
            linear-gradient(90deg, #21C3C5 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: 1,
        }}
      />
    </div>
  );
}
