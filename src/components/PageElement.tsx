import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Trash2 } from "lucide-react";
import { useState, useRef, RefObject, useEffect } from "react";
import { snapToGrid, snapDimensionToGrid } from "../utils/gridSnapping";

interface PageElementProps {
  element: {
    id: string;
    type: string;
    properties: Record<string, any>;
  };
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onUpdateElement: (id: string, properties: Record<string, any>) => void;
  canvasRef: RefObject<HTMLDivElement>;
  onDragStateChange: (isDragging: boolean) => void;
}

export function PageElement({ element, isSelected, onSelect, onDelete, onUpdateElement, canvasRef, onDragStateChange }: PageElementProps) {
  const { type, properties } = element;
  const padding = properties.padding !== undefined ? properties.padding : 16;
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<'option1' | 'option2'>('option1');
  const [isHighlighted, setIsHighlighted] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; elementX: number; elementY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number; startPosX: number; startPosY: number } | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const previousContentRef = useRef(properties.content);

  // Trigger highlight animation when content changes (for automated improvements)
  useEffect(() => {
    if (type === "text" && properties.content !== previousContentRef.current) {
      setIsHighlighted(true);
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 1000);
      previousContentRef.current = properties.content;
      return () => clearTimeout(timer);
    }
  }, [properties.content, type]);

  const handleTextBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.textContent || "";
    if (newContent !== properties.content) {
      onUpdateElement(element.id, {
        ...properties,
        content: newContent,
      });
    }
  };

  const handleTextInput = (e: React.FormEvent<HTMLDivElement>) => {
    const textElement = e.currentTarget;
    const newContent = textElement.textContent || "";
    
    // Auto-expand height based on content
    if (canvasRef.current) {
      const canvasBounds = canvasRef.current.getBoundingClientRect();
      const naturalHeight = textElement.scrollHeight;
      
      // Snap the natural height to grid
      const snappedHeight = snapDimensionToGrid(naturalHeight, canvasBounds.width, false);
      
      if (snappedHeight !== properties.height) {
        onUpdateElement(element.id, {
          ...properties,
          content: newContent,
          height: snappedHeight,
        });
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Always stop propagation to prevent canvas deselection
    e.stopPropagation();
    
    // Don't start dragging if clicking on non-text interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('label')) {
      onSelect();
      return;
    }

    e.preventDefault();
    
    // Blur any focused contentEditable to prevent editing during drag
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    setIsDragging(true);
    onSelect();
    onDragStateChange(true);

    // Calculate element and canvas dimensions once at the start
    if (!canvasRef.current || !elementRef.current) return;
    
    const canvasBounds = canvasRef.current.getBoundingClientRect();
    const elementBounds = elementRef.current.getBoundingClientRect();
    
    // For scaled elements, account for the scale factor (0.7667 = 15% larger than original 0.6667)
    const scaleFactor = type === "checkout" ? 0.7667 : 1;
    const elementWidth = elementBounds.width / scaleFactor;
    const elementHeight = elementBounds.height / scaleFactor;

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elementX: properties.x || 0,
      elementY: properties.y || 0,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragRef.current || !canvasRef.current) return;

      const deltaX = moveEvent.clientX - dragRef.current.startX;
      const deltaY = moveEvent.clientY - dragRef.current.startY;

      let newX = dragRef.current.elementX + deltaX;
      let newY = dragRef.current.elementY + deltaY;

      // Calculate boundaries using the dimensions captured at drag start
      const maxX = canvasBounds.width - (elementWidth * scaleFactor);
      const maxY = canvasBounds.height - (elementHeight * scaleFactor);

      // Clamp position within canvas boundaries
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      // Snap to grid
      const snapped = snapToGrid(newX, newY, canvasBounds.width);

      onUpdateElement(element.id, {
        ...properties,
        x: snapped.x,
        y: snapped.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onDragStateChange(false);
      dragRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleResizeStart = (e: React.MouseEvent, direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw') => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(direction);
    onSelect();
    onDragStateChange(true);

    // Get current dimensions and position
    const currentWidth = properties.width || (elementRef.current?.offsetWidth || 200);
    const currentHeight = properties.height || (elementRef.current?.offsetHeight || 100);
    const currentX = properties.x || 0;
    const currentY = properties.y || 0;

    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: currentWidth,
      startHeight: currentHeight,
      startPosX: currentX,
      startPosY: currentY,
    };

    const handleResizeMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current || !canvasRef.current) return;

      const canvasBounds = canvasRef.current.getBoundingClientRect();
      
      // For checkout element, account for scale (0.7667 = 15% larger than original 0.6667)
      const scaleFactor = type === "checkout" ? 0.7667 : 1;
      
      // Scale the mouse deltas to account for element scaling
      const deltaX = (moveEvent.clientX - resizeRef.current.startX) / scaleFactor;
      const deltaY = (moveEvent.clientY - resizeRef.current.startY) / scaleFactor;

      let newWidth = resizeRef.current.startWidth;
      let newHeight = resizeRef.current.startHeight;
      let newX = resizeRef.current.startPosX;
      let newY = resizeRef.current.startPosY;

      // Calculate new dimensions and position based on resize direction
      // East (right edge)
      if (direction === 'e' || direction === 'ne' || direction === 'se') {
        newWidth = Math.max(50, resizeRef.current.startWidth + deltaX);
      }
      // West (left edge)
      if (direction === 'w' || direction === 'nw' || direction === 'sw') {
        const widthChange = deltaX;
        newWidth = Math.max(50, resizeRef.current.startWidth - widthChange);
        // Adjust position to keep right edge fixed
        const actualWidthChange = resizeRef.current.startWidth - newWidth;
        newX = resizeRef.current.startPosX + (actualWidthChange * scaleFactor);
      }
      // South (bottom edge)
      if (direction === 's' || direction === 'se' || direction === 'sw') {
        newHeight = Math.max(50, resizeRef.current.startHeight + deltaY);
      }
      // North (top edge)
      if (direction === 'n' || direction === 'ne' || direction === 'nw') {
        const heightChange = deltaY;
        newHeight = Math.max(50, resizeRef.current.startHeight - heightChange);
        // Adjust position to keep bottom edge fixed
        const actualHeightChange = resizeRef.current.startHeight - newHeight;
        newY = resizeRef.current.startPosY + (actualHeightChange * scaleFactor);
      }

      // Limit width and height to stay within canvas
      const maxWidth = (canvasBounds.width - newX * scaleFactor) / scaleFactor;
      const maxHeight = (canvasBounds.height - newY * scaleFactor) / scaleFactor;
      
      newWidth = Math.min(newWidth, maxWidth);
      newHeight = Math.min(newHeight, maxHeight);

      // Prevent negative positions
      newX = Math.max(0, newX);
      newY = Math.max(0, newY);

      // Snap dimensions to grid
      const snappedWidth = snapDimensionToGrid(newWidth, canvasBounds.width, true);
      const snappedHeight = snapDimensionToGrid(newHeight, canvasBounds.width, false);
      
      // When resizing from west or north edges, adjust position to maintain opposite edge
      let finalX = newX;
      let finalY = newY;
      
      if (direction === 'w' || direction === 'nw' || direction === 'sw') {
        // Calculate how much the width changed after snapping
        const widthDiff = newWidth - snappedWidth;
        finalX = newX + (widthDiff * scaleFactor);
      }
      
      if (direction === 'n' || direction === 'ne' || direction === 'nw') {
        // Calculate how much the height changed after snapping
        const heightDiff = newHeight - snappedHeight;
        finalY = newY + (heightDiff * scaleFactor);
      }
      
      // Snap position to grid
      const snappedPosition = snapToGrid(finalX, finalY, canvasBounds.width);

      onUpdateElement(element.id, {
        ...properties,
        width: Math.round(snappedWidth),
        height: Math.round(snappedHeight),
        x: snappedPosition.x,
        y: snappedPosition.y,
      });
    };

    const handleResizeEnd = () => {
      setIsResizing(null);
      onDragStateChange(false);
      resizeRef.current = null;
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
    };

    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const renderContent = () => {
    switch (type) {
      case "text":
        const getFontFamily = () => {
          switch (properties.fontFamily) {
            case "inter":
              return "var(--font-family-inter)";
            case "manrope":
              return "var(--font-family-manrope)";
            default:
              return "var(--font-family-inter)";
          }
        };
        
        const getFontSize = () => {
          // Check if fontSize is a custom pixel value
          if (properties.fontSize && properties.fontSize.includes('px')) {
            return properties.fontSize;
          }
          
          switch (properties.fontSize) {
            case "2xl":
              return "var(--text-2xl)";
            case "xl":
              return "var(--text-xl)";
            case "lg":
              return "var(--text-lg)";
            case "base":
              return "var(--text-base)";
            default:
              return "var(--text-base)";
          }
        };
        
        const getFontWeight = () => {
          return properties.fontWeight === "bold" ? "var(--font-weight-bold)" : "var(--font-weight-normal)";
        };
        
        return (
          <div 
            className="p-4 rounded-[var(--radius)] outline-none whitespace-pre-wrap overflow-visible"
            style={{ 
              textAlign: properties.align || "left",
              width: `${properties.width || 200}px`,
              minHeight: `${properties.height || 100}px`,
              fontFamily: getFontFamily(),
              fontSize: getFontSize(),
              fontWeight: getFontWeight(),
              fontStyle: properties.fontStyle || "normal",
              color: properties.color || "var(--canvas-foreground)",
            }}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleTextBlur}
            onInput={handleTextInput}
            onDoubleClick={(e) => {
              e.stopPropagation();
              // Focus the contentEditable for editing on double-click
              const target = e.currentTarget;
              target.focus();
              // Select all text
              const selection = window.getSelection();
              const range = document.createRange();
              range.selectNodeContents(target);
              selection?.removeAllRanges();
              selection?.addRange(range);
            }}
            dangerouslySetInnerHTML={{ __html: properties.content || "Type your text here..." }}
          />
        );

      case "image":
        return (
          <ImageWithFallback
            src={properties.url || "https://via.placeholder.com/600x400"}
            alt={properties.alt || "Image"}
            className="rounded-[var(--radius)] object-cover"
            style={{
              width: `${properties.width || 300}px`,
              height: `${properties.height || 300}px`,
            }}
          />
        );

      case "checkout":
        return (
          <div 
            className="bg-background rounded-[var(--radius)] p-6 grid grid-cols-[1fr_auto] gap-8"
            style={{
              width: `${properties.width || 768}px`,
              height: `${properties.height || 800}px`,
              overflow: 'auto',
            }}
          >
            {/* Left Column - Form */}
            <div className="flex flex-col gap-6">
              {/* Customer Information */}
              <div className="border border-border rounded-[var(--radius)] p-4 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-card-foreground">Customer Information</h4>
                  <button className="text-muted-foreground hover:text-foreground">−</button>
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-foreground placeholder:text-muted-foreground"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-foreground placeholder:text-muted-foreground"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Billing Information */}
              <div className="border border-border rounded-[var(--radius)] p-4 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-card-foreground">Billing Information</h4>
                  <button className="text-muted-foreground hover:text-foreground">−</button>
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your street address"
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-foreground placeholder:text-muted-foreground"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <input
                    type="text"
                    placeholder="Your city"
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-foreground placeholder:text-muted-foreground"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <input
                    type="text"
                    placeholder="ZIP code"
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-foreground placeholder:text-muted-foreground"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <select 
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-foreground cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option>United States</option>
                  </select>
                  <select 
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-muted-foreground cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option>Select your state</option>
                  </select>
                </div>
              </div>

              {/* Pricing Option */}
              <div className="border border-border rounded-[var(--radius)] p-4 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-card-foreground">Pricing Option</h4>
                  <button className="text-muted-foreground hover:text-foreground">−</button>
                </div>
                <div className="flex flex-col gap-3">
                  <label className={`flex items-center gap-3 p-3 rounded-[var(--radius)] cursor-pointer ${
                    selectedPricing === 'option1' ? 'border-2 border-primary' : 'border border-border'
                  }`}>
                    <input 
                      type="radio" 
                      name={`pricing-${element.id}`} 
                      checked={selectedPricing === 'option1'}
                      onChange={() => setSelectedPricing('option1')}
                      className="w-4 h-4 cursor-pointer" 
                      onClick={(e) => e.stopPropagation()} 
                    />
                    <div className="flex-1">
                      <div className="text-card-foreground">{properties.price || "$10.00"}</div>
                      <div className="text-muted-foreground">One-time purchase</div>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-[var(--radius)] cursor-pointer ${
                    selectedPricing === 'option2' ? 'border-2 border-primary' : 'border border-border'
                  }`}>
                    <input 
                      type="radio" 
                      name={`pricing-${element.id}`} 
                      checked={selectedPricing === 'option2'}
                      onChange={() => setSelectedPricing('option2')}
                      className="w-4 h-4 cursor-pointer" 
                      onClick={(e) => e.stopPropagation()} 
                    />
                    <div className="flex-1">
                      <div className="text-card-foreground">$20.00</div>
                      <div className="text-muted-foreground">One-time purchase</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border border-border rounded-[var(--radius)] p-4 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-card-foreground">Payment Information</h4>
                  <button className="text-muted-foreground hover:text-foreground">−</button>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`payment-${element.id}`} defaultChecked className="w-4 h-4 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                    <span className="text-card-foreground">Card</span>
                  </label>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="block text-muted-foreground mb-1">Card number</label>
                      <input
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-foreground placeholder:text-muted-foreground"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-muted-foreground mb-1">Expiration</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-foreground placeholder:text-muted-foreground"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div>
                        <label className="block text-muted-foreground mb-1">Security Code</label>
                        <input
                          type="text"
                          placeholder="CVC"
                          className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] text-foreground placeholder:text-muted-foreground"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`payment-${element.id}`} className="w-4 h-4 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                      <span className="text-card-foreground">Afterpay</span>
                      <span className="text-muted-foreground ml-auto">Buy now pay later</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`payment-${element.id}`} className="w-4 h-4 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                      <span className="text-card-foreground">Affirm</span>
                      <span className="text-muted-foreground ml-auto">Buy now pay later</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`payment-${element.id}`} className="w-4 h-4 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                      <span className="text-card-foreground">Klarna</span>
                      <span className="text-muted-foreground ml-auto">Buy now pay later</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Summary */}
            <div className="w-64 flex flex-col gap-6">
              <div className="border border-border rounded-[var(--radius)] p-4 bg-card">
                <h4 className="text-card-foreground mb-4">Total Payment</h4>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">{properties.productName || "Product Name"}</span>
                  <span className="text-card-foreground">{properties.price || "$10.00"}</span>
                </div>
                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-card-foreground">Total</span>
                    <span className="text-card-foreground">{properties.price || "$10.00"}</span>
                  </div>
                </div>
                <Button className="w-full bg-[#21C3C5] text-white hover:bg-[#21C3C5]/90 mb-4">
                  {properties.buttonText || "Complete Order"}
                </Button>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-[10px]">VISA</div>
                  <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-[10px]">MC</div>
                  <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-[10px]">DISC</div>
                  <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-[10px]">AMEX</div>
                  <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-[10px]">PP</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "bump-sale":
        return (
          <div 
            className="border-2 border-accent rounded-[var(--radius)] p-4 bg-card overflow-visible [&_*]:outline-none"
            style={{
              width: `${properties.width || 400}px`,
              minHeight: `${properties.height || 150}px`,
            }}
          >
            <div className="flex items-start gap-3">
              <Checkbox className="mt-1" onClick={(e) => e.stopPropagation()} />
              <div className="flex-1">
                <h4 className="text-card-foreground mb-2">
                  {properties.offerTitle || "Special Offer!"}
                </h4>
                <p className="text-muted mb-2">
                  {properties.offerDescription || "Add this to your order for a special price"}
                </p>
                <span className="text-accent">
                  {properties.offerPrice || "$29.00"}
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={elementRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={`absolute group ${
        isSelected ? "ring-2 ring-[#21C3C5] rounded-[var(--radius)]" : ""
      } ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${
        type === "checkout" ? "origin-top-left" : ""
      } ${
        isHighlighted ? "animate-highlight" : ""
      } transition-all duration-300`}
      style={{ 
        padding: `${padding}px`,
        left: `${properties.x || 0}px`,
        top: `${properties.y || 0}px`,
        transform: type === "checkout" ? "scale(0.7667)" : undefined,
      }}
    >
      {renderContent()}
      
      {isSelected && (
        <>
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <Button
              size="icon"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="h-8 w-8"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          {/* Resize Handles - 8 circular handles */}
          {/* Top-left corner */}
          <div
            className="absolute -top-2 -left-2 w-3 h-3 cursor-nwse-resize bg-background border-2 border-[#21C3C5] rounded-full hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          
          {/* Top edge */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 cursor-ns-resize bg-background border-2 border-[#21C3C5] rounded-full hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          
          {/* Top-right corner */}
          <div
            className="absolute -top-2 -right-2 w-3 h-3 cursor-nesw-resize bg-background border-2 border-[#21C3C5] rounded-full hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          
          {/* Right edge */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -right-2 w-3 h-3 cursor-ew-resize bg-background border-2 border-[#21C3C5] rounded-full hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          
          {/* Bottom-right corner */}
          <div
            className="absolute -bottom-2 -right-2 w-3 h-3 cursor-nwse-resize bg-background border-2 border-[#21C3C5] rounded-full hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          
          {/* Bottom edge */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 cursor-ns-resize bg-background border-2 border-[#21C3C5] rounded-full hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          
          {/* Bottom-left corner */}
          <div
            className="absolute -bottom-2 -left-2 w-3 h-3 cursor-nesw-resize bg-background border-2 border-[#21C3C5] rounded-full hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          
          {/* Left edge */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -left-2 w-3 h-3 cursor-ew-resize bg-background border-2 border-[#21C3C5] rounded-full hover:scale-125 transition-transform"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
        </>
      )}
    </div>
  );
}
