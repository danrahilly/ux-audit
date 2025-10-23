import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Toggle } from "./ui/toggle";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";

interface PageElement {
  id: string;
  type: string;
  properties: Record<string, any>;
}

interface PropertiesPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
  selectedElement: PageElement | null;
  onUpdateElement: (id: string, properties: Record<string, any>) => void;
  canvasBackgroundColor?: string;
  onCanvasBackgroundColorChange?: (color: string) => void;
}

function PropertySection({ 
  title, 
  children,
  isCollapsible = false,
  defaultOpen = true 
}: { 
  title: string; 
  children: React.ReactNode;
  isCollapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (isCollapsible) {
    return (
      <div className="flex flex-col gap-[8px]">
        <div
          className="bg-white relative rounded-[6px] shrink-0 w-full cursor-pointer hover:bg-[#f8f8f9] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-row items-center justify-between size-full px-[8px] py-[6px]">
            <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic text-[#05052f] text-[14px]">{title}</p>
            <ChevronDown 
              className={`size-4 text-[#05052f] transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        {isOpen && (
          <div className="flex flex-col gap-[8px]">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="bg-white relative rounded-[6px] shrink-0 w-full">
        <div className="flex flex-row items-center size-full px-[8px] py-[6px]">
          <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic text-[#05052f] text-[14px]">{title}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        {children}
      </div>
    </div>
  );
}

function PropertyField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic text-[#05052f] text-[12px] px-[4px]">
        {label}
      </label>
      {children}
    </div>
  );
}

export function PropertiesPanel({
  isCollapsed,
  onToggle,
  selectedElement,
  onUpdateElement,
  canvasBackgroundColor = "#000000",
  onCanvasBackgroundColorChange,
}: PropertiesPanelProps) {
  if (isCollapsed) {
    return null;
  }

  const handlePropertyChange = (key: string, value: any) => {
    if (selectedElement) {
      onUpdateElement(selectedElement.id, {
        ...selectedElement.properties,
        [key]: value,
      });
    }
  };

  return (
    <div className="bg-white relative w-[13.33rem] shrink-0">
      <div aria-hidden="true" className="absolute border-[#e6e6ea] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full overflow-y-auto scrollbar-hide">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[8px] relative size-full">
          
          {/* Header */}
          <div className="w-full">
            <h3 className="font-['Inter:Bold',_sans-serif] font-bold leading-[20px] not-italic text-[#05052f] text-[15px] px-[4px] py-[4px]">
              Properties
            </h3>
          </div>

          {!selectedElement ? (
            <PropertySection title="Background" isCollapsible={true} defaultOpen={true}>
              <PropertyField label="Canvas Color">
                <Input
                  type="color"
                  value={canvasBackgroundColor}
                  onChange={(e) => onCanvasBackgroundColorChange?.(e.target.value)}
                  className="h-10 cursor-pointer"
                />
              </PropertyField>
              <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic text-[#828297] text-[11px] px-[4px]">
                Default: White (#ffffff)
              </p>
            </PropertySection>
          ) : (
            <>
              {/* Element Info */}
              <div className="bg-[#f8f8f9] rounded-[6px] p-[8px] w-full">
                <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic text-[#828297] text-[11px]">
                  ID: {selectedElement.id}
                </p>
                <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic text-[#828297] text-[11px] mt-[2px]">
                  Type: {selectedElement.type}
                </p>
              </div>
              
              {selectedElement.type === "text" && (
                <Tabs defaultValue="layout" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-[#f8f8f9] p-[2px]">
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="text">Text</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="layout" className="flex flex-col gap-[8px] mt-[8px]">
                    <PropertyField label="Text Align">
                      <Select
                        value={selectedElement.properties.align || "left"}
                        onValueChange={(value) => handlePropertyChange("align", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </PropertyField>
                    <PropertyField label="Width (px)">
                      <Input
                        type="number"
                        value={selectedElement.properties.width || 200}
                        onChange={(e) => handlePropertyChange("width", parseInt(e.target.value))}
                        min={50}
                        max={1000}
                      />
                    </PropertyField>
                    <PropertyField label="Height (px)">
                      <Input
                        type="number"
                        value={selectedElement.properties.height || 100}
                        onChange={(e) => handlePropertyChange("height", parseInt(e.target.value))}
                        min={50}
                        max={1000}
                      />
                    </PropertyField>
                  </TabsContent>
                  
                  <TabsContent value="text" className="flex flex-col gap-[8px] mt-[8px]">
                    <PropertyField label="Font Family">
                      <Select
                        value={selectedElement.properties.fontFamily || "inter"}
                        onValueChange={(value) => handlePropertyChange("fontFamily", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="manrope">Manrope</SelectItem>
                        </SelectContent>
                      </Select>
                    </PropertyField>
                    
                    <PropertyField label="Text Size">
                      <Select
                        value={selectedElement.properties.fontSize || "base"}
                        onValueChange={(value) => handlePropertyChange("fontSize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2xl">2XL (20px)</SelectItem>
                          <SelectItem value="xl">XL (18px)</SelectItem>
                          <SelectItem value="lg">Large (15px)</SelectItem>
                          <SelectItem value="base">Base (13px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </PropertyField>
                    
                    <PropertyField label="Text Weight">
                      <div className="flex gap-2">
                        <Toggle
                          pressed={selectedElement.properties.fontWeight === "bold"}
                          onPressedChange={(pressed) => 
                            handlePropertyChange("fontWeight", pressed ? "bold" : "normal")
                          }
                          aria-label="Toggle bold"
                          className="flex-1"
                        >
                          Bold
                        </Toggle>
                        <Toggle
                          pressed={selectedElement.properties.fontStyle === "italic"}
                          onPressedChange={(pressed) => 
                            handlePropertyChange("fontStyle", pressed ? "italic" : "normal")
                          }
                          aria-label="Toggle italic"
                          className="flex-1"
                        >
                          Italic
                        </Toggle>
                      </div>
                    </PropertyField>
                    
                    <PropertyField label="Text Color">
                      <Input
                        type="color"
                        value={selectedElement.properties.color || "#ffffff"}
                        onChange={(e) => handlePropertyChange("color", e.target.value)}
                        className="h-10 cursor-pointer"
                      />
                    </PropertyField>
                  </TabsContent>
                </Tabs>
              )}

              {selectedElement.type === "image" && (
                <>
                  <PropertyField label="Image URL">
                    <Input
                      value={selectedElement.properties.url || ""}
                      onChange={(e) => handlePropertyChange("url", e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </PropertyField>
                  <PropertyField label="Alt Text">
                    <Input
                      value={selectedElement.properties.alt || ""}
                      onChange={(e) => handlePropertyChange("alt", e.target.value)}
                      placeholder="Image description"
                    />
                  </PropertyField>
                  <PropertyField label="Width (px)">
                    <Input
                      type="number"
                      value={selectedElement.properties.width || 300}
                      onChange={(e) => handlePropertyChange("width", parseInt(e.target.value))}
                      min={50}
                      max={1000}
                    />
                  </PropertyField>
                  <PropertyField label="Height (px)">
                    <Input
                      type="number"
                      value={selectedElement.properties.height || 300}
                      onChange={(e) => handlePropertyChange("height", parseInt(e.target.value))}
                      min={50}
                      max={1000}
                    />
                  </PropertyField>
                </>
              )}

              {selectedElement.type === "checkout" && (
                <>
                  <PropertyField label="Product Name">
                    <Input
                      value={selectedElement.properties.productName || ""}
                      onChange={(e) => handlePropertyChange("productName", e.target.value)}
                      placeholder="Amazing Product"
                    />
                  </PropertyField>
                  <PropertyField label="Price">
                    <Input
                      value={selectedElement.properties.price || ""}
                      onChange={(e) => handlePropertyChange("price", e.target.value)}
                      placeholder="$99.00"
                    />
                  </PropertyField>
                  <PropertyField label="Button Text">
                    <Input
                      value={selectedElement.properties.buttonText || ""}
                      onChange={(e) => handlePropertyChange("buttonText", e.target.value)}
                      placeholder="Buy Now"
                    />
                  </PropertyField>
                </>
              )}

              {selectedElement.type === "bump-sale" && (
                <>
                  <PropertyField label="Offer Title">
                    <Input
                      value={selectedElement.properties.offerTitle || ""}
                      onChange={(e) => handlePropertyChange("offerTitle", e.target.value)}
                      placeholder="Special Offer!"
                    />
                  </PropertyField>
                  <PropertyField label="Offer Description">
                    <Textarea
                      value={selectedElement.properties.offerDescription || ""}
                      onChange={(e) => handlePropertyChange("offerDescription", e.target.value)}
                      placeholder="Add this to your order..."
                      rows={3}
                    />
                  </PropertyField>
                  <PropertyField label="Offer Price">
                    <Input
                      value={selectedElement.properties.offerPrice || ""}
                      onChange={(e) => handlePropertyChange("offerPrice", e.target.value)}
                      placeholder="$29.00"
                    />
                  </PropertyField>
                </>
              )}

              {/* Common Padding Field */}
              <div className="w-full h-px bg-[#e6e6ea] my-[4px]" />
              <PropertyField label="Padding (px)">
                <Input
                  type="number"
                  value={selectedElement.properties.padding || 16}
                  onChange={(e) => handlePropertyChange("padding", parseInt(e.target.value))}
                  min={0}
                  max={100}
                />
              </PropertyField>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
