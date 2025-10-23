import svgPaths from "./svg-9csxmjlpix";
import logoImage from "figma:asset/f62544cfa6d16960dee75b149685dd508db6869c.png";

function Logo() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Logo">
      <img src={logoImage} alt="Logo" className="block size-full object-contain" />
    </div>
  );
}

function MediumIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path clipRule="evenodd" d={svgPaths.p20c000} fill="var(--fill-0, #828297)" fillRule="evenodd" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Breadcrumb">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#e6e6ea] text-[14px] text-nowrap whitespace-pre">Pagename One</p>
      <MediumIcon />
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#e6e6ea] text-[14px] text-nowrap whitespace-pre">Main Page</p>
    </div>
  );
}

function MediumIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path d={svgPaths.p3f641f00} fill="var(--fill-0, #08D359)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Logo />
      <Breadcrumb />
      <MediumIcon1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#21C3C5] box-border content-stretch flex items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#21C3C5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Bold',_sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">View Page</p>
    </div>
  );
}

function Left() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Left">
      <Frame67 />
      <Button />
    </div>
  );
}

function MediumIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path d={svgPaths.p38ddad80} fill="var(--fill-0, white)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="basis-0 bg-[#21C3C5] grow h-full min-h-px min-w-px relative rounded-[6px] shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center justify-center p-[4px] relative size-full">
          <MediumIcon2 />
        </div>
      </div>
    </div>
  );
}

function MediumIcon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path d={svgPaths.p2f1df300} fill="var(--fill-0, #828297)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[6px] shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center justify-center p-[4px] relative size-full">
          <MediumIcon3 />
        </div>
      </div>
    </div>
  );
}

function Switch() {
  return (
    <div className="bg-[#33383E] h-[36px] relative rounded-[8px] shrink-0 w-[78px]" data-name="Switch">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip p-[3px] relative rounded-[inherit] w-[78px]">
        <Frame14 />
        <Frame15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#33383E] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function LargeIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Large Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Large Icon">
          <g id="icon">
            <path clipRule="evenodd" d={svgPaths.p3df96170} fill="var(--fill-0, #E6E6EA)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3e8c92b0} fill="var(--fill-0, #E6E6EA)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame69() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start p-[4px] relative rounded-[8px] shrink-0">
      <LargeIcon />
    </div>
  );
}

function LargeIcon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Large Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Large Icon">
          <path d={svgPaths.p2df1d080} fill="var(--fill-0, #E6E6EA)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame70({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="box-border content-stretch flex gap-[10px] items-start p-[4px] relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onClick}
    >
      <LargeIcon1 />
    </div>
  );
}

function Icons({ onSaveClick }: { onSaveClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Icons">
      <Frame69 />
      <Frame70 onClick={onSaveClick} />
    </div>
  );
}

function MediumIcon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path d={svgPaths.p39a1d300} fill="var(--fill-0, white)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#21C3C5] box-border content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#21C3C5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <MediumIcon4 />
      <p className="font-['Inter:Bold',_sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">Publish</p>
    </div>
  );
}

function SetDefaultButton({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="bg-[#05052f] box-border content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#05052f]/90 transition-colors border border-[#21C3C5] border-solid" 
      data-name="SetDefaultButton"
      onClick={onClick}
    >
      <p className="font-['Inter:Bold',_sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[12px] text-nowrap text-[#21C3C5] whitespace-pre">Set as Default</p>
    </div>
  );
}

function Button2({ onSetDefaultClick }: { onSetDefaultClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Button">
      <SetDefaultButton onClick={onSetDefaultClick} />
      <Button1 />
    </div>
  );
}

function Right({ onSaveClick, onSetDefaultClick }: { onSaveClick?: () => void; onSetDefaultClick?: () => void }) {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="Right">
      <Icons onSaveClick={onSaveClick} />
      <Button2 onSetDefaultClick={onSetDefaultClick} />
    </div>
  );
}

export default function TopHeader({ onSave, onSetDefault }: { onSave?: () => void; onSetDefault?: () => void }) {
  return (
    <div className="bg-[#33383E] relative size-full" data-name="Top Header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[16px] py-[8px] relative size-full">
          <Left />
          <Switch />
          <Right onSaveClick={onSave} onSetDefaultClick={onSetDefault} />
        </div>
      </div>
    </div>
  );
}