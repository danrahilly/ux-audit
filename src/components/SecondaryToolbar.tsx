import svgPaths from "../imports/svg-90q0q78x2n";
import { Sparkles } from "lucide-react";

function UndoIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2bef5300} fill="var(--foreground)" />
      </svg>
    </div>
  );
}

function RedoIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p9304850} fill="var(--foreground)" />
      </svg>
    </div>
  );
}

function UndoButton({ onClick, disabled }: { onClick?: () => void; disabled?: boolean }) {
  return (
    <div 
      className={`box-border content-stretch flex items-center overflow-clip p-[6px] relative rounded-[var(--radius)] shrink-0 transition-colors ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-input-background cursor-pointer'
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <UndoIcon />
    </div>
  );
}

function RedoButton({ onClick, disabled }: { onClick?: () => void; disabled?: boolean }) {
  return (
    <div 
      className={`box-border content-stretch flex items-center overflow-clip p-[6px] relative rounded-[var(--radius)] shrink-0 transition-colors ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-input-background cursor-pointer'
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <RedoIcon />
    </div>
  );
}

function UndoRedoGroup({ 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo 
}: { 
  onUndo?: () => void; 
  onRedo?: () => void; 
  canUndo?: boolean; 
  canRedo?: boolean; 
}) {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center px-[2px] py-0 relative shrink-0">
      <UndoButton onClick={onUndo} disabled={!canUndo} />
      <RedoButton onClick={onRedo} disabled={!canRedo} />
    </div>
  );
}

function UndoRedoSection({ 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo 
}: { 
  onUndo?: () => void; 
  onRedo?: () => void; 
  canUndo?: boolean; 
  canRedo?: boolean; 
}) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <UndoRedoGroup onUndo={onUndo} onRedo={onRedo} canUndo={canUndo} canRedo={canRedo} />
      <div className="bg-border h-[24px] shrink-0 w-px" />
    </div>
  );
}

function PageNavigation() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center pl-[4px] pr-0 py-0 relative shrink-0">
      <p className="relative shrink-0 text-foreground cursor-pointer hover:text-[#21C3C5] transition-colors">Settings</p>
      <p className="relative shrink-0 text-foreground cursor-pointer hover:text-[#21C3C5] transition-colors">Layers</p>
      <p className="relative shrink-0 text-foreground cursor-pointer hover:text-[#21C3C5] transition-colors">Forms</p>
      <p className="relative shrink-0 text-foreground cursor-pointer hover:text-[#21C3C5] transition-colors">Products</p>
      <p className="relative shrink-0 text-foreground cursor-pointer hover:text-[#21C3C5] transition-colors">Fonts</p>
    </div>
  );
}

function WorkflowNavigation() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center pl-[4px] pr-0 py-0 relative shrink-0">
      <p className="relative shrink-0 text-foreground cursor-pointer hover:text-[#21C3C5] transition-colors">Editor</p>
      <p className="relative shrink-0 text-foreground cursor-pointer hover:text-[#21C3C5] transition-colors">Debug</p>
    </div>
  );
}

function HelpNavigation() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center pl-[4px] pr-0 py-0 relative shrink-0">
      <p className="relative shrink-0 text-foreground cursor-pointer hover:text-[#21C3C5] transition-colors">Help</p>
    </div>
  );
}

function LeftSection({ 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo 
}: { 
  onUndo?: () => void; 
  onRedo?: () => void; 
  canUndo?: boolean; 
  canRedo?: boolean; 
}) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex gap-[12px] items-center relative">
        <UndoRedoSection onUndo={onUndo} onRedo={onRedo} canUndo={canUndo} canRedo={canRedo} />
        <PageNavigation />
        <div className="bg-border h-[24px] shrink-0 w-px" />
        <WorkflowNavigation />
        <div className="bg-border h-[24px] shrink-0 w-px" />
        <HelpNavigation />
      </div>
    </div>
  );
}

function PropertiesIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p39d36700} fill="white" />
      </svg>
    </div>
  );
}

interface PropertiesButtonProps {
  onClick?: () => void;
}

function PropertiesButton({ onClick }: PropertiesButtonProps) {
  return (
    <div 
      className="bg-[#21C3C5] box-border content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[var(--radius)] shrink-0 cursor-pointer hover:bg-[#21C3C5]/90 transition-colors"
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border border-[#21C3C5] border-solid inset-0 pointer-events-none rounded-[var(--radius)]" />
      <PropertiesIcon />
      <p className="relative shrink-0 text-nowrap text-white" style={{ fontSize: '12px', fontWeight: 'var(--font-weight-bold)' }}>Properties</p>
    </div>
  );
}

interface UxAuditButtonProps {
  onClick?: () => void;
}

function UxAuditButton({ onClick }: UxAuditButtonProps) {
  return (
    <div 
      className="box-border content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[var(--radius)] shrink-0 cursor-pointer transition-all hover:opacity-90"
      style={{
        background: 'linear-gradient(135deg, #21C3C5 0%, #1AA8AA 100%)'
      }}
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border border-[#21C3C5] border-solid inset-0 pointer-events-none rounded-[var(--radius)]" />
      <Sparkles className="size-[20px] shrink-0" style={{ color: 'white' }} />
      <p className="relative shrink-0 text-nowrap text-white" style={{ fontSize: '12px', fontWeight: 'var(--font-weight-bold)' }}>UX Audit</p>
    </div>
  );
}

function RightSection({ onPropertiesClick, onUxAuditClick }: { onPropertiesClick?: () => void; onUxAuditClick?: () => void }) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex gap-[12px] items-center relative">
        <UxAuditButton onClick={onUxAuditClick} />
        <PropertiesButton onClick={onPropertiesClick} />
      </div>
    </div>
  );
}

function Content({ 
  onPropertiesClick,
  onUxAuditClick,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}: { 
  onPropertiesClick?: () => void;
  onUxAuditClick?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}) {
  return (
    <div className="basis-0 bg-background grow min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-border border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pb-[13px] pl-[8px] pr-[16px] pt-[12px] relative w-full">
          <LeftSection onUndo={onUndo} onRedo={onRedo} canUndo={canUndo} canRedo={canRedo} />
          <RightSection onPropertiesClick={onPropertiesClick} onUxAuditClick={onUxAuditClick} />
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p29840600} fill="#21C3C5" />
      </svg>
    </div>
  );
}

function PlusButton({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="bg-background box-border content-stretch flex items-start pb-[17px] pl-[16px] pr-[17px] pt-[16px] relative shrink-0 cursor-pointer hover:bg-input-background transition-colors"
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border-border border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <PlusIcon />
    </div>
  );
}

interface SecondaryToolbarProps {
  onPropertiesClick?: () => void;
  onUxAuditClick?: () => void;
  onPlusClick?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export default function SecondaryToolbar({ 
  onPropertiesClick, 
  onUxAuditClick,
  onPlusClick,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}: SecondaryToolbarProps) {
  return (
    <div className="bg-foreground content-stretch flex items-center justify-between relative size-full">
      <PlusButton onClick={onPlusClick} />
      <Content 
        onPropertiesClick={onPropertiesClick}
        onUxAuditClick={onUxAuditClick}
        onUndo={onUndo}
        onRedo={onRedo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </div>
  );
}
