import { useState, useEffect, useRef } from "react";
import { ElementsPanel } from "./components/ElementsPanel";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { Canvas } from "./components/Canvas";
import { ImagePicker } from "./components/ImagePicker";
import TopHeader from "./imports/TopHeader";
import SecondaryToolbar from "./components/SecondaryToolbar";
import { toast as sonnerToast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import svgPaths from "./imports/svg-cqlljexmea";

// Custom toast components matching TipPopUp design
function InfoIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.pff25100} fill="#E6E6EA" />
      </svg>
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p115c2f00} fill="#E6E6EA" />
      </svg>
    </div>
  );
}

// Custom toast wrapper functions
const toast = {
  success: (message: string, options?: any) => {
    sonnerToast.success(
      <div className="flex flex-col gap-[12px] w-full">
        <div className="flex gap-[8px] items-center w-full">
          <InfoIcon />
          <p className="font-['Inter'] font-bold text-[12px] text-[#e6e6ea] leading-[20px] flex-1 normal-case">Success!</p>
          <CloseIcon />
        </div>
        <div className="bg-[#373759] h-px w-full" />
        <p className="font-['Inter'] font-medium text-[12px] text-[#e6e6ea] leading-[20px] normal-case">{message}</p>
      </div>,
      { ...options, unstyled: true, className: "bg-[#05052f] rounded-[var(--radius)] shadow-[var(--elevation-sm)] p-[16px] w-[280px]" }
    );
  },
  error: (message: string, options?: any) => {
    sonnerToast.error(
      <div className="flex flex-col gap-[12px] w-full">
        <div className="flex gap-[8px] items-center w-full">
          <InfoIcon />
          <p className="font-['Inter'] font-bold text-[12px] text-[#e6e6ea] leading-[20px] flex-1 normal-case">Error</p>
          <CloseIcon />
        </div>
        <div className="bg-[#373759] h-px w-full" />
        <p className="font-['Inter'] font-medium text-[12px] text-[#e6e6ea] leading-[20px] normal-case">{message}</p>
      </div>,
      { ...options, unstyled: true, className: "bg-[#05052f] rounded-[var(--radius)] shadow-[var(--elevation-sm)] p-[16px] w-[280px]" }
    );
  },
  info: (message: string, options?: any) => {
    sonnerToast.info(
      <div className="flex flex-col gap-[12px] w-full">
        <div className="flex gap-[8px] items-center w-full">
          <InfoIcon />
          <p className="font-['Inter'] font-bold text-[12px] text-[#e6e6ea] leading-[20px] flex-1 normal-case">Tip</p>
          <CloseIcon />
        </div>
        <div className="bg-[#373759] h-px w-full" />
        <p className="font-['Inter'] font-medium text-[12px] text-[#e6e6ea] leading-[20px] normal-case">{message}</p>
      </div>,
      { ...options, unstyled: true, className: "bg-[#05052f] rounded-[var(--radius)] shadow-[var(--elevation-sm)] p-[16px] w-[280px]" }
    );
  },
};

interface PageElement {
  id: string;
  type: string;
  properties: Record<string, any>;
}

const STORAGE_KEY = "page-builder-elements";
const CANVAS_SETTINGS_KEY = "page-builder-canvas-settings";
const DEFAULT_TEMPLATE_KEY = "page-builder-default-template";

const DEFAULT_ELEMENTS: PageElement[] = [
  {
    id: "headline-1",
    type: "text",
    properties: {
      content: "Turn Your Social Media Posts into Profits — Even If You're Starting from Scratch!",
      align: "center",
      padding: 16,
      width: 993,
      height: 164,
      x: 12,
      y: 56,
      fontSize: "48px",
      fontWeight: "bold",
      color: "#000000",
    },
  },
  {
    id: "description-1",
    type: "text",
    properties: {
      content: "Are you tired of watching others go viral and get paid while your content goes unnoticed?\nOur \"Monetize Your Influence\" eCourse shows you the exact steps to transform your social media presence into a consistent income stream — without needing millions of followers or expensive ads.",
      align: "center",
      padding: 16,
      width: 949,
      height: 76,
      x: 55.68619791666667,
      y: 232,
      color: "#000000",
      fontSize: "lg",
      fontWeight: "bold",
    },
  },
  {
    id: "benefits-list-1",
    type: "text",
    properties: {
      content: "💡 Inside this course, you'll discover how to:\n\nBuild a personal brand that attracts followers and sponsors\n\nCreate scroll-stopping content that drives engagement and sales\n\nTurn your passion into profit using proven monetization methods\n\nLeverage platforms like Instagram, TikTok, and YouTube for multiple income streams\n\nGrow your audience fast with organic strategies that actually work\n\nAutomate and scale your content business so you can earn even while you sleep\n\nWhether you're a beginner or a creator looking to level up, this course gives you the blueprint to make social media your most powerful income source.",
      align: "left",
      padding: 16,
      width: 381,
      height: 472,
      x: 12,
      y: 364,
      color: "#000000",
      fontSize: "lg",
    },
  },
  {
    id: "checkout-1",
    type: "checkout",
    properties: {
      productName: "Monetize Your Influence eCourse",
      price: "$197.00",
      buttonText: "Enrol Now",
      padding: 16,
      width: 818,
      height: 1176,
      x: 405.17578125000006,
      y: 364,
    },
  },
  {
    id: "cta-1",
    type: "text",
    properties: {
      content: "🚀 Ready to Start Earning from Your Content?\n\nDon't wait another day to cash in on your creativity.\n👉 Enroll now and start your journey to social media success!",
      align: "center",
      padding: 16,
      width: 294,
      height: 164,
      x: 55.68619791666667,
      y: 980,
      color: "#000000",
      fontSize: "xl",
      fontWeight: "bold",
    },
  },
];

export default function App() {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  
  // Load saved elements from localStorage on mount, or use defaults
  const [pageElements, setPageElements] = useState<PageElement[]>(() => {
    try {
      // First, try to load the user's current work
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      
      // If no saved work, try to load the default template
      const defaultTemplate = localStorage.getItem(DEFAULT_TEMPLATE_KEY);
      if (defaultTemplate) {
        const template = JSON.parse(defaultTemplate);
        // Handle both old format (just elements) and new format (with settings)
        return template.elements || template;
      }
    } catch (error) {
      console.error("Failed to load saved page elements:", error);
    }
    // Fall back to hardcoded defaults
    return DEFAULT_ELEMENTS;
  });
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [pendingImagePosition, setPendingImagePosition] = useState<{ x: number; y: number } | null>(null);
  const [isUxScanning, setIsUxScanning] = useState(false);
  const [isUxAuditActive, setIsUxAuditActive] = useState(false);
  
  // Load saved canvas settings from localStorage on mount, default to black
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState<string>(() => {
    try {
      // First try to load current work's canvas settings
      const saved = localStorage.getItem(CANVAS_SETTINGS_KEY);
      if (saved) {
        const settings = JSON.parse(saved);
        return settings.backgroundColor || "#000000";
      }
      
      // If no saved work, check if there's a default template with canvas settings
      const defaultTemplate = localStorage.getItem(DEFAULT_TEMPLATE_KEY);
      if (defaultTemplate) {
        const template = JSON.parse(defaultTemplate);
        if (template.canvasSettings && template.canvasSettings.backgroundColor) {
          return template.canvasSettings.backgroundColor;
        }
      }
    } catch (error) {
      console.error("Failed to load saved canvas settings:", error);
    }
    return "#ffffff";
  });

  // History management for undo/redo (unlimited)
  const historyRef = useRef<PageElement[][]>([]);
  const historyIndexRef = useRef(-1);
  const [, forceUpdate] = useState({});
  const isUndoRedoAction = useRef(false);
  const isInitialized = useRef(false);

  // Initialize history on mount with the initial pageElements
  useEffect(() => {
    if (!isInitialized.current) {
      const initialCopy = JSON.parse(JSON.stringify(pageElements));
      historyRef.current = [initialCopy];
      historyIndexRef.current = 0;
      isInitialized.current = true;
    }
  }, []);

  // Add to history when pageElements changes (but not during undo/redo or initial render)
  useEffect(() => {
    // Skip if not initialized yet
    if (!isInitialized.current) {
      return;
    }

    // Skip if this is an undo/redo action
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    // Create a deep copy of current state
    const elementsCopy = JSON.parse(JSON.stringify(pageElements));
    
    // Check if the state actually changed (compare stringified versions)
    const currentState = historyRef.current[historyIndexRef.current];
    if (JSON.stringify(currentState) === JSON.stringify(elementsCopy)) {
      return; // No actual change, don't add to history
    }
    
    // Remove any future history if we're not at the end
    historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    
    // Add new state
    historyRef.current.push(elementsCopy);
    historyIndexRef.current++;
    
    // Force re-render to update button states
    forceUpdate({});
  }, [pageElements]);

  // Undo function
  const handleUndo = () => {
    if (historyIndexRef.current > 0) {
      isUndoRedoAction.current = true;
      historyIndexRef.current--;
      const previousState = JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current]));
      setPageElements(previousState);
      forceUpdate({});
    }
  };

  // Redo function
  const handleRedo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      isUndoRedoAction.current = true;
      historyIndexRef.current++;
      const nextState = JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current]));
      setPageElements(nextState);
      forceUpdate({});
    }
  };

  // Check if undo/redo is available
  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  // Save to localStorage function
  const handleSave = () => {
    try {
      // Save page elements
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pageElements));
      
      // Save canvas settings
      const canvasSettings = {
        backgroundColor: canvasBackgroundColor,
      };
      localStorage.setItem(CANVAS_SETTINGS_KEY, JSON.stringify(canvasSettings));
      
      toast.success("Page saved successfully!", {
        duration: 2000,
      });
    } catch (error) {
      console.error("Failed to save page elements:", error);
      toast.error("Failed to save page. Please try again.", {
        duration: 3000,
      });
    }
  };

  // Set current state as default template
  const handleSetAsDefault = () => {
    try {
      // Prepare the data to save
      const templateData = {
        elements: pageElements,
        backgroundColor: canvasBackgroundColor
      };
      
      // Save to localStorage
      const defaultState = {
        elements: pageElements,
        canvasSettings: {
          backgroundColor: canvasBackgroundColor,
        },
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem(DEFAULT_TEMPLATE_KEY, JSON.stringify(defaultState));
      localStorage.setItem("FIGMA_MAKE_PENDING_DEFAULT_UPDATE", JSON.stringify(templateData));
      
      toast.success("Template saved! Copy this command and send it to the AI:\n\nUpdate DEFAULT_ELEMENTS in App.tsx with: " + pageElements.length + " elements", {
        duration: 6000,
      });
      
      console.log("%c📋 COPY THIS MESSAGE AND SEND TO AI:", "font-size: 16px; font-weight: bold; color: #21C3C5;");
      console.log(`\nUpdate the DEFAULT_ELEMENTS in App.tsx with this template data:\n${JSON.stringify(templateData, null, 2)}`);
    } catch (error) {
      console.error("Failed to set default template:", error);
      toast.error("Failed to set default template. Please try again.", {
        duration: 3000,
      });
    }
  };

  const handleAddElement = (element: PageElement) => {
    setPageElements([...pageElements, element]);
    setSelectedElementId(element.id);
  };

  const handleDeleteElement = (id: string) => {
    setPageElements(pageElements.filter((el) => el.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  };

  const handleUpdateElement = (id: string, properties: Record<string, any>) => {
    setPageElements(
      pageElements.map((el) => (el.id === id ? { ...el, properties } : el))
    );
  };

  const handleAddAndUpdateElements = (newElement: PageElement, updateId: string, updateProperties: Record<string, any>) => {
    setPageElements(prevElements => {
      const updatedElements = prevElements.map(el => 
        el.id === updateId ? { ...el, properties: updateProperties } : el
      );
      return [...updatedElements, newElement];
    });
    setSelectedElementId(newElement.id);
  };

  const handleOpenImagePicker = (position?: { x: number; y: number }) => {
    if (position) {
      setPendingImagePosition(position);
    }
    setIsImagePickerOpen(true);
  };

  const handleSelectImageFromPicker = (url: string, alt: string) => {
    const position = pendingImagePosition || { x: 100, y: 100 };
    const newElement: PageElement = {
      id: `element-${Date.now()}`,
      type: "image",
      properties: {
        x: position.x,
        y: position.y,
        width: 300,
        height: 300,
        url,
        alt,
        padding: 0,
      },
    };
    
    handleAddElement(newElement);
    setPendingImagePosition(null);
  };

  const selectedElement = pageElements.find((el) => el.id === selectedElementId) || null;

  return (
    <div className="size-full flex flex-col bg-background">
      <Toaster />
      {/* Top Toolbar */}
      <div className="h-[56px] shrink-0">
        <TopHeader onSave={handleSave} onSetDefault={handleSetAsDefault} />
      </div>

      {/* Secondary Toolbar */}
      <div className="h-[57px] shrink-0">
        <SecondaryToolbar 
          onPlusClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
          onPropertiesClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
          onUxAuditClick={() => {
            setIsUxScanning(true);
            setIsUxAuditActive(false);
            toast.info("Scanning page for UX insights...", {
              duration: 2000,
            });
          }}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        <ElementsPanel
          isCollapsed={leftSidebarCollapsed}
          onToggle={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
          onDragStateChange={setIsGridVisible}
          onImageElementClick={() => handleOpenImagePicker()}
        />

        <Canvas
          elements={pageElements}
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
          onAddElement={handleAddElement}
          onDeleteElement={handleDeleteElement}
          onUpdateElement={handleUpdateElement}
          onAddAndUpdateElements={handleAddAndUpdateElements}
          isGridVisible={isGridVisible}
          onDragStateChange={setIsGridVisible}
          onOpenImagePicker={handleOpenImagePicker}
          isUxScanning={isUxScanning}
          onUxScanComplete={() => {
            setIsUxScanning(false);
            setIsUxAuditActive(true);
            
            toast.success("UX Audit has been completed", {
              duration: 3000,
            });
          }}
          backgroundColor={canvasBackgroundColor}
          isUxAuditActive={isUxAuditActive}
        />

        <PropertiesPanel
          isCollapsed={rightSidebarCollapsed}
          onToggle={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
          selectedElement={selectedElement}
          onUpdateElement={handleUpdateElement}
          canvasBackgroundColor={canvasBackgroundColor}
          onCanvasBackgroundColorChange={setCanvasBackgroundColor}
        />
      </div>

      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelectImage={handleSelectImageFromPicker}
      />
    </div>
  );
}
