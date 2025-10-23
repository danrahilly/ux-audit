import { useState, useRef, useEffect } from "react";
import { PageElement } from "./PageElement";
import { Grid } from "./Grid";
import { UxScanAnimation } from "./UxScanAnimation";
import { SuggestionOverlay } from "./SuggestionOverlay";
import { snapToGrid } from "../utils/gridSnapping";
import peopleMobile from "figma:asset/b1b20d466bf7a778c8562b1d3b17302f97b4ef61.png";

interface CanvasElement {
  id: string;
  type: string;
  properties: Record<string, any>;
}

interface CanvasProps {
  elements: CanvasElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onAddElement: (element: CanvasElement) => void;
  onDeleteElement: (id: string) => void;
  onUpdateElement: (id: string, properties: Record<string, any>) => void;
  onAddAndUpdateElements: (newElement: CanvasElement, updateId: string, updateProperties: Record<string, any>) => void;
  isGridVisible: boolean;
  onDragStateChange: (isDragging: boolean) => void;
  onOpenImagePicker: (position: { x: number; y: number }) => void;
  isUxScanning?: boolean;
  onUxScanComplete?: () => void;
  backgroundColor?: string;
  isUxAuditActive?: boolean;
}

export function Canvas({
  elements,
  selectedElementId,
  onSelectElement,
  onAddElement,
  onDeleteElement,
  onUpdateElement,
  onAddAndUpdateElements,
  isGridVisible,
  onDragStateChange,
  onOpenImagePicker,
  isUxScanning = false,
  onUxScanComplete,
  backgroundColor = "#000000",
  isUxAuditActive = false,
}: CanvasProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [canvasHeight, setCanvasHeight] = useState(1200);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());
  const canvasRef = useRef<HTMLDivElement>(null);

  // Dynamically find elements to create suggestions for
  const checkoutElement = elements.find(el => el.type === "checkout");
  const benefitsListElement = elements.find(el => el.id === "benefits-list-1");
  const ctaElement = elements.find(el => el.id === "cta-1");
  
  // Suggestion configurations for different elements
  const suggestions = [
    {
      elementId: "headline-1",
      sortOrder: 1,
      analysisText: "The headline could be improved to improve conversion by making it shorter more focused",
      suggestionText: "Stop Scrolling. Start Earning: Turn Every Post Into a Paycheck",
    },
    {
      elementId: "benefits-list-1",
      sortOrder: 3,
      analysisText: "The content could be improved to be more concise and focused on the benefits of the course",
      suggestionText: "Here's what you'll master inside the course:\n\nThe 3-Part Profit Formula for turning likes and shares into actual dollars\n\nContent That Converts: Create posts that attract attention and drive action\n\nZero-Follower Monetization: How to make money even if you're starting from scratch\n\nPlatform Secrets: Unlock the best money-making strategies for Instagram, TikTok & YouTube\n\nBrand Partnership Blueprint: Get paid to collaborate — even with a small audience\n\nAutomation Tools & Templates to save time and scale your results faster",
    },
    // Only add CTA suggestion if the CTA element exists
    ...(ctaElement ? [{
      elementId: ctaElement.id,
      sortOrder: 4,
      analysisText: "Consider moving the position of the element to make use of the available space. This will ensure a smoother user experience on your page.",
      suggestionText: "Widen element to use full canvas width",
      isSpecialAction: true,
      actionType: "widen-cta",
    }] : []),
    // Only add checkout suggestion if a checkout element exists
    ...(checkoutElement ? [{
      elementId: checkoutElement.id,
      sortOrder: 2,
      analysisText: "Consider introducing a product image and changing the layout of your page. Product images can reassure customers and reduce buyer hesitation or cart abandonment",
      suggestionText: "Add a product image to increase trust and conversion",
      isSpecialAction: true,
      actionType: "add-checkout-image",
    }] : []),
  ];
  


  // Calculate dynamic canvas height based on element positions
  useEffect(() => {
    const calculateCanvasHeight = () => {
      if (elements.length === 0) {
        return 1200; // Default minimum height
      }

      // Find the lowest bottom edge of all elements
      let maxBottom = 0;
      elements.forEach((element) => {
        const { y = 0, height = 100, padding = 16 } = element.properties;
        // For checkout elements, account for the scale factor
        const scaleFactor = element.type === "checkout" ? 0.6667 : 1;
        const elementBottom = y + (height * scaleFactor) + (padding * 2);
        maxBottom = Math.max(maxBottom, elementBottom);
      });

      // Add buffer space at the bottom (300px) and ensure minimum height
      const calculatedHeight = Math.max(1200, maxBottom + 300);
      return calculatedHeight;
    };

    const newHeight = calculateCanvasHeight();
    setCanvasHeight(newHeight);
  }, [elements]);

  // Reset dismissed suggestions when UX audit becomes active
  useEffect(() => {
    if (isUxAuditActive) {
      setDismissedSuggestions(new Set());
    }
  }, [isUxAuditActive]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const elementType = e.dataTransfer.getData("elementType");
    if (!elementType) return;

    // Get canvas bounds to calculate drop position
    if (!canvasRef.current) return;
    const canvasBounds = canvasRef.current.getBoundingClientRect();
    
    // Calculate drop position relative to canvas
    const dropX = e.clientX - canvasBounds.left;
    const dropY = e.clientY - canvasBounds.top;
    
    // Snap to grid
    const snapped = snapToGrid(dropX, dropY, canvasBounds.width);

    // If it's an image element, open the image picker instead of creating immediately
    if (elementType === "image") {
      onOpenImagePicker({ x: snapped.x, y: snapped.y });
      return;
    }

    const defaultProps = getDefaultProperties(elementType);
    const newElement: CanvasElement = {
      id: `${elementType}-${Date.now()}`,
      type: elementType,
      properties: {
        ...defaultProps,
        x: snapped.x,
        y: snapped.y,
      },
    };

    onAddElement(newElement);
  };

  const getDefaultProperties = (type: string): Record<string, any> => {
    switch (type) {
      case "text":
        return {
          content: "Type your text here...",
          align: "left",
          padding: 16,
          width: 200,
          height: 100,
          x: 50,
          y: 50,
          color: "#ffffff",
        };
      case "image":
        return {
          url: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600",
          alt: "Placeholder image",
          width: 300,
          height: 300,
          padding: 16,
          x: 50,
          y: 50,
        };
      case "checkout":
        return {
          productName: "Product Name",
          price: "$10.00",
          buttonText: "Complete Order",
          padding: 16,
          width: 768,
          height: 800,
          x: 50,
          y: 50,
        };
      case "bump-sale":
        return {
          offerTitle: "Special Offer!",
          offerDescription: "Add this to your order for a limited time price",
          offerPrice: "$29.00",
          padding: 16,
          width: 400,
          height: 150,
          x: 50,
          y: 50,
        };
      default:
        return { padding: 16, x: 50, y: 50 };
    }
  };

  // Calculate dynamic grid rows based on canvas height
  // Original grid had 26 rows for 1200px, so each row is ~46.15px
  const baseRowHeight = 1200 / 26;
  const gridRows = Math.ceil(canvasHeight / baseRowHeight);

  return (
    <div
      className="flex-1 overflow-auto bg-muted/30 scrollbar-hide"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => onSelectElement(null)}
    >
      <div className="min-h-full p-8">
        <div
          ref={canvasRef}
          className={`max-w-6xl mx-auto rounded-[var(--radius-xl)] shadow-[var(--elevation-sm)] transition-all relative overflow-hidden ${
            isDragOver ? "ring-2 ring-ring ring-offset-4" : ""
          }`}
          style={{ minHeight: `${canvasHeight}px`, backgroundColor }}
        >
          {/* Grid Background Layer - only visible when dragging */}
          {isGridVisible && (
            <div className="absolute inset-0 pointer-events-none z-0">
              <Grid rows={gridRows} />
            </div>
          )}

          {/* UX Scan Animation */}
          {isUxScanning && onUxScanComplete && (
            <UxScanAnimation 
              isScanning={isUxScanning} 
              onComplete={onUxScanComplete}
            />
          )}

          {/* Content Layer */}
          {elements.length === 0 ? (
            <div className="flex items-center justify-center relative z-10" style={{ height: `${canvasHeight}px` }}>
              <p className="text-canvas-foreground opacity-50">
                Drag elements from the left panel to start building your page
              </p>
            </div>
          ) : (
            <div className="relative z-10" style={{ minHeight: `${canvasHeight}px` }}>
              {elements.map((element) => (
                <PageElement
                  key={element.id}
                  element={element}
                  isSelected={selectedElementId === element.id}
                  onSelect={() => {
                    onSelectElement(element.id);
                  }}
                  onDelete={() => onDeleteElement(element.id)}
                  onUpdateElement={onUpdateElement}
                  canvasRef={canvasRef}
                  onDragStateChange={onDragStateChange}
                />
              ))}

              {/* Suggestion Overlays */}
              {isUxAuditActive && suggestions
                // Sort suggestions by element position (top to bottom, left to right)
                .map((suggestion) => {
                  const element = elements.find(el => el.id === suggestion.elementId);
                  return { suggestion, element };
                })
                .filter(({ element }) => element && !dismissedSuggestions.has(element.id))
                .sort((a, b) => {
                  // If both have sortOrder, use that for sorting
                  const sortOrderA = (a.suggestion as any).sortOrder;
                  const sortOrderB = (b.suggestion as any).sortOrder;
                  
                  if (sortOrderA !== undefined && sortOrderB !== undefined) {
                    return sortOrderA - sortOrderB;
                  }
                  
                  // Otherwise, fall back to position-based sorting
                  const yA = a.element?.properties.y || 0;
                  const yB = b.element?.properties.y || 0;
                  const xA = a.element?.properties.x || 0;
                  const xB = b.element?.properties.x || 0;
                  // Sort by Y position first, then by X position
                  if (yA !== yB) return yA - yB;
                  return xA - xB;
                })
                .map(({ suggestion, element }, index) => {
                  if (!element) return null;
                  
                  // Account for element scaling (checkout elements are scaled to 0.7667)
                  const scaleFactor = element.type === "checkout" ? 0.7667 : 1;
                  const effectiveWidth = (element.properties.width || 0) * scaleFactor;
                  const effectiveHeight = (element.properties.height || 0) * scaleFactor;
                  const effectivePadding = (element.properties.padding || 16) * scaleFactor;
                  
                  return (
                    <SuggestionOverlay
                      key={suggestion.elementId}
                      suggestionNumber={(suggestion as any).sortOrder}
                      x={element.properties.x || 0}
                      y={element.properties.y || 0}
                      width={effectiveWidth}
                      height={effectiveHeight}
                      padding={effectivePadding}
                      analysisText={suggestion.analysisText}
                      suggestionText={suggestion.suggestionText}
                      canvasWidth={1080}
                      canvasHeight={canvasHeight}
                      forceVerticalAlign={suggestion.elementId === "headline-1" ? "top" : undefined}
                      onImprove={() => {
                      const actionType = (suggestion as any).actionType;
                      
                      if (actionType === "widen-cta") {
                        // Special handling for CTA suggestion - widen to full canvas width and move 100px higher
                        const benefitsList = elements.find(el => el.id === "benefits-list-1");
                        const benefitsBottom = benefitsList 
                          ? (benefitsList.properties.y || 380) + (benefitsList.properties.height || 450)
                          : 830;
                        const reducedSpacing = 2.5; // Half of original 5px spacing
                        const newCtaY = benefitsBottom + reducedSpacing - 100; // 732.5 - moved 100px higher
                        
                        onUpdateElement(suggestion.elementId, {
                          ...element.properties,
                          x: 0,
                          width: 1080,
                          y: Math.round(newCtaY), // 733 - positioned 100px higher
                        });
                        setDismissedSuggestions(prev => new Set(prev).add(suggestion.elementId));
                      } else if (actionType === "add-checkout-image") {
                        // Special handling for checkout suggestion - automatically add image and reposition checkout
                        const benefitsList = elements.find(el => el.id === "benefits-list-1");
                        const ctaElement = elements.find(el => el.id === "cta-1");
                        
                        if (benefitsList && ctaElement) {
                          // Position image on the right side of the canvas with 30px margin
                          const imageX = 750; // Canvas width (1080) - image width (300) - margin (30)
                          const imageY = benefitsList.properties.y || 380;
                          
                          // Create new image element using media gallery image
                          const newImageElement: CanvasElement = {
                            id: `image-${Date.now()}`,
                            type: "image",
                            properties: {
                              x: imageX,
                              y: imageY,
                              width: 300,
                              height: 300,
                              url: peopleMobile,
                              alt: "People using mobile phones",
                              padding: 0,
                            },
                          };
                          
                          // Position checkout below CTA element and centered on canvas - moved significantly higher
                          const ctaY = ctaElement.properties.y || 880;
                          const ctaHeight = ctaElement.properties.height || 150;
                          const reducedSpacing = 2.5; // Half of original 5px spacing
                          const newCheckoutY = Math.round(ctaY + ctaHeight + reducedSpacing) - 200;
                          const newCheckoutX = 315; // Center on canvas (1080 - 450) / 2 = 315
                          
                          // Use the combined function to add image and update checkout in a single state update
                          onAddAndUpdateElements(newImageElement, element.id, {
                            ...element.properties,
                            y: newCheckoutY,
                            x: newCheckoutX,
                          });
                        }
                        setDismissedSuggestions(prev => new Set(prev).add(suggestion.elementId));
                      } else if (suggestion.elementId === "benefits-list-1") {
                        // Special handling for benefits list - update content, widen to image, and left align
                        const imageElement = elements.find(el => el.type === "image");
                        const benefitsX = element.properties.x || 50;
                        
                        // Calculate width to stretch to the image element if it exists
                        let newWidth = 670; // Default width if no image (750 - 50 - 30)
                        if (imageElement) {
                          const imageX = imageElement.properties.x || 750;
                          newWidth = imageX - benefitsX - 30; // 30px spacing
                        }
                        
                        onUpdateElement(suggestion.elementId, {
                          ...element.properties,
                          content: suggestion.suggestionText,
                          width: newWidth,
                          align: "left",
                        });
                        setDismissedSuggestions(prev => new Set(prev).add(suggestion.elementId));
                      } else {
                        // Default handling - update content with suggestion text
                        onUpdateElement(suggestion.elementId, {
                          ...element.properties,
                          content: suggestion.suggestionText,
                        });
                        setDismissedSuggestions(prev => new Set(prev).add(suggestion.elementId));
                      }
                    }}
                    onDismiss={() => {
                      setDismissedSuggestions(prev => new Set(prev).add(suggestion.elementId));
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
