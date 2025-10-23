import { useState } from "react";
import { Button } from "./ui/button";
import { Lightbulb, X } from "lucide-react";

interface SuggestionOverlayProps {
  suggestionNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  padding: number;
  analysisText: string;
  suggestionText: string;
  onImprove: () => void;
  onDismiss: () => void;
  canvasWidth?: number;
  canvasHeight?: number;
  forceVerticalAlign?: 'top' | 'bottom';
}

export function SuggestionOverlay({
  suggestionNumber,
  x,
  y,
  width,
  height,
  padding,
  analysisText,
  suggestionText,
  onImprove,
  onDismiss,
  canvasWidth = 1080,
  canvasHeight = 1200,
  forceVerticalAlign,
}: SuggestionOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImprove = () => {
    onImprove();
    setIsExpanded(false);
  };

  const handleIgnore = () => {
    setIsExpanded(false);
    onDismiss();
  };

  // Calculate popup dimensions
  const POPUP_WIDTH = 400;
  const POPUP_SPACING = 12;
  const BUTTON_HEIGHT = 36; // Approximate button height
  
  // Element boundaries
  const elementLeft = x;
  const elementRight = x + width + (padding * 2);
  const elementTop = y;
  const elementBottom = y + height + (padding * 2);
  const elementCenterX = x + (width + padding * 2) / 2;
  
  // Determine horizontal positioning
  // Try right side first, then left side
  let horizontalAlign: 'left' | 'right' = 'left';
  let horizontalPosition: 'inside-left' | 'inside-right' = 'inside-left';
  
  // Check if popup fits on the right side of canvas when aligned to left of element
  if (elementRight + POPUP_WIDTH <= canvasWidth) {
    horizontalAlign = 'left';
    horizontalPosition = 'inside-left';
  } 
  // Check if popup fits when aligned to right of element
  else if (elementLeft >= POPUP_WIDTH) {
    horizontalAlign = 'right';
    horizontalPosition = 'inside-right';
  }
  // Otherwise, keep it on the left but it might overflow (best effort)
  else {
    horizontalAlign = 'left';
    horizontalPosition = 'inside-left';
  }
  
  // Determine vertical positioning for the button
  // Try below first, then above
  let verticalAlign: 'top' | 'bottom' = 'bottom';
  
  if (forceVerticalAlign) {
    // Use forced alignment if provided
    verticalAlign = forceVerticalAlign;
  } else {
    // Estimate expanded popup height (approximate)
    const ESTIMATED_POPUP_HEIGHT = 300;
    
    // Check if there's more room below or above the element
    const spaceBelow = canvasHeight - elementBottom;
    const spaceAbove = elementTop;
    
    if (spaceBelow >= ESTIMATED_POPUP_HEIGHT + POPUP_SPACING) {
      // Enough room below
      verticalAlign = 'bottom';
    } else if (spaceAbove >= ESTIMATED_POPUP_HEIGHT + POPUP_SPACING) {
      // Not enough room below, but enough above
      verticalAlign = 'top';
    } else {
      // Neither has enough room, use the side with more space
      verticalAlign = spaceBelow > spaceAbove ? 'bottom' : 'top';
    }
  }
  
  // Determine vertical positioning for the expanded popup
  // This can be different from the button position to ensure popup stays on-canvas
  let popupVerticalAlign: 'top' | 'bottom' = verticalAlign;
  
  if (isExpanded) {
    const ESTIMATED_POPUP_HEIGHT = 300;
    const spaceBelow = canvasHeight - elementBottom;
    const spaceAbove = elementTop;
    
    // For expanded popup, always choose the side with more space to ensure visibility
    if (spaceBelow >= ESTIMATED_POPUP_HEIGHT + POPUP_SPACING) {
      // Enough room below
      popupVerticalAlign = 'bottom';
    } else if (spaceAbove >= ESTIMATED_POPUP_HEIGHT + POPUP_SPACING) {
      // Not enough room below, but enough above
      popupVerticalAlign = 'top';
    } else {
      // Neither has enough room, use the side with more space
      popupVerticalAlign = spaceBelow > spaceAbove ? 'bottom' : 'top';
    }
  }

  return (
    <div
      className={`absolute pointer-events-none ${isExpanded ? 'z-50' : 'z-40'}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width + padding * 2}px`,
        height: `${height + padding * 2}px`,
      }}
    >
      <div className="relative w-full h-full">
        {/* Suggestion Button */}
        {!isExpanded && (
          <div
            className={`absolute pointer-events-auto animate-in fade-in duration-300 ${
              verticalAlign === 'top' ? "top-0 slide-in-from-top-2" : "bottom-0 slide-in-from-bottom-2"
            } ${horizontalPosition === 'inside-left' ? "left-0" : "right-0"}`}
            style={{
              transform: verticalAlign === 'top'
                ? "translate(0, calc(-100% - 12px))"
                : "translate(0, calc(100% + 12px))",
            }}
          >
            <Button
              onClick={() => setIsExpanded(true)}
              className="bg-[#21C3C5] text-white hover:bg-[#21C3C5]/90 shadow-[var(--elevation-sm)] gap-2"
              size="sm"
            >
              <Lightbulb className="w-4 h-4" />
              Suggestion {suggestionNumber}
            </Button>
          </div>
        )}

        {/* Expanded Suggestion Box */}
        {isExpanded && (
          <div
            className={`absolute pointer-events-auto animate-in fade-in duration-300 ${
              popupVerticalAlign === 'top' ? "top-0 slide-in-from-top-2" : "bottom-0 slide-in-from-bottom-2"
            } ${horizontalPosition === 'inside-left' ? "left-0" : "right-0"}`}
            style={{
              transform: popupVerticalAlign === 'top'
                ? "translate(0, calc(-100% - 12px))"
                : "translate(0, calc(100% + 12px))",
            }}
          >
            <div className="bg-card border-2 border-border rounded-[var(--radius)] shadow-[var(--elevation-sm)] p-4 w-[400px] max-w-[calc(100vw-2rem)]">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#21C3C5] shrink-0" />
                  <h3 className="text-card-foreground">UX Suggestion</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={handleIgnore}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <p className="text-muted">
                  {analysisText}
                </p>

                <div className="bg-input-background rounded-[var(--radius-sm)] p-3">
                  <p className="text-card-foreground mb-1">
                    <strong>Suggestion:</strong>
                  </p>
                  <p className="text-card-foreground whitespace-pre-line">
                    {suggestionText}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleIgnore}
                    className="flex-1"
                  >
                    Ignore
                  </Button>
                  <Button
                    onClick={handleImprove}
                    className="flex-1 bg-[#21C3C5] text-white hover:bg-[#21C3C5]/90"
                  >
                    Improve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
