import svgPaths from "../imports/svg-rf7fm3dflb";

interface ElementsPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onDragStateChange: (isDragging: boolean) => void;
  onImageElementClick: () => void;
}

function TextIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p241ec200} fill="#21C3C5" />
        </g>
      </svg>
    </div>
  );
}

function ImageIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p21bf7300} fill="#21C3C5" />
        </g>
      </svg>
    </div>
  );
}

function CheckoutIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p3a1c4a80} fill="#21C3C5" />
        </g>
      </svg>
    </div>
  );
}

function BumpSaleIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p316c7d00} fill="#21C3C5" />
        </g>
      </svg>
    </div>
  );
}

function ElementItem({ 
  icon, 
  label, 
  onDragStart, 
  onDragEnd, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onDragStart: (e: React.DragEvent) => void; 
  onDragEnd: () => void; 
  onClick: () => void; 
}) {
  return (
    <div 
      className="bg-white relative rounded-[6px] shrink-0 w-full cursor-pointer hover:bg-[#f8f8f9] transition-colors"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[8px] py-[6px] relative w-full">
          {icon}
          <p className="basis-0 font-['Inter:Medium',_sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#05052f] text-[14px]">{label}</p>
        </div>
      </div>
    </div>
  );
}

export function ElementsPanel({ isCollapsed, onToggle, onDragStateChange, onImageElementClick }: ElementsPanelProps) {
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("elementType", type);
    e.dataTransfer.effectAllowed = "copy";
    onDragStateChange(true);
  };

  const handleDragEnd = () => {
    onDragStateChange(false);
  };

  const handleElementClick = (type: string) => {
    if (type === "image") {
      onImageElementClick();
    }
  };

  if (isCollapsed) {
    return null;
  }

  return (
    <div className="bg-white relative w-[13.33rem] shrink-0">
      <div aria-hidden="true" className="absolute border-[#e6e6ea] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-start p-[8px] relative size-full">
          <ElementItem
            icon={<TextIcon />}
            label="Text"
            onDragStart={(e) => handleDragStart(e, "text")}
            onDragEnd={handleDragEnd}
            onClick={() => handleElementClick("text")}
          />
          <ElementItem
            icon={<ImageIcon />}
            label="Image"
            onDragStart={(e) => handleDragStart(e, "image")}
            onDragEnd={handleDragEnd}
            onClick={() => handleElementClick("image")}
          />
          <ElementItem
            icon={<CheckoutIcon />}
            label="Checkout"
            onDragStart={(e) => handleDragStart(e, "checkout")}
            onDragEnd={handleDragEnd}
            onClick={() => handleElementClick("checkout")}
          />
          <ElementItem
            icon={<BumpSaleIcon />}
            label="Bump Sale"
            onDragStart={(e) => handleDragStart(e, "bump-sale")}
            onDragEnd={handleDragEnd}
            onClick={() => handleElementClick("bump-sale")}
          />
        </div>
      </div>
    </div>
  );
}
