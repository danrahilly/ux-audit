import svgPaths from "./svg-90q0q78x2n";

function LargeIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Large Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Large Icon">
          <path d={svgPaths.p29840600} fill="var(--fill-0, #0000FF)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Plus() {
  return (
    <div className="bg-white box-border content-stretch flex items-start pb-[17px] pl-[16px] pr-[17px] pt-[16px] relative shrink-0" data-name="Plus">
      <div aria-hidden="true" className="absolute border-[#e6e6ea] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <LargeIcon />
    </div>
  );
}

function MediumIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path d={svgPaths.p2bef5300} fill="var(--fill-0, #05052F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="box-border content-stretch flex items-center overflow-clip p-[6px] relative rounded-[8px] shrink-0">
      <MediumIcon />
    </div>
  );
}

function MediumIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path d={svgPaths.p9304850} fill="var(--fill-0, #05052F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="box-border content-stretch flex items-center overflow-clip p-[6px] relative rounded-[8px] shrink-0">
      <MediumIcon1 />
    </div>
  );
}

function Icons() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center px-[2px] py-0 relative shrink-0" data-name="Icons">
      <Frame36 />
      <Frame37 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Icons />
      <div className="bg-[#e6e6ea] h-[24px] shrink-0 w-px" />
    </div>
  );
}

function Page() {
  return (
    <div className="box-border content-stretch flex font-['Inter:Medium',_sans-serif] font-medium gap-[12px] items-center leading-[20px] not-italic pl-[4px] pr-0 py-0 relative shrink-0 text-[#05052f] text-[14px] text-center text-nowrap whitespace-pre" data-name="Page">
      <p className="relative shrink-0">Settings</p>
      <p className="relative shrink-0">Layers</p>
      <p className="relative shrink-0">Forms</p>
      <p className="relative shrink-0">Products</p>
      <p className="relative shrink-0">Fonts</p>
    </div>
  );
}

function Workflow() {
  return (
    <div className="box-border content-stretch flex font-['Inter:Medium',_sans-serif] font-medium gap-[12px] items-center leading-[20px] not-italic pl-[4px] pr-0 py-0 relative shrink-0 text-[#05052f] text-[14px] text-center text-nowrap whitespace-pre" data-name="Workflow">
      <p className="relative shrink-0">Editor</p>
      <p className="relative shrink-0">Debug</p>
    </div>
  );
}

function Help() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center pl-[4px] pr-0 py-0 relative shrink-0" data-name="Help">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#05052f] text-[14px] text-center text-nowrap whitespace-pre">Help</p>
    </div>
  );
}

function Left() {
  return (
    <div className="relative shrink-0" data-name="Left">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] items-center relative">
        <Frame71 />
        <Page />
        <div className="bg-[#e6e6ea] h-[24px] shrink-0 w-px" />
        <Workflow />
        <div className="bg-[#e6e6ea] h-[24px] shrink-0 w-px" />
        <Help />
      </div>
    </div>
  );
}

function MediumIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path d={svgPaths.p39d36700} fill="var(--fill-0, white)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[blue] box-border content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[blue] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <MediumIcon2 />
      <p className="font-['Inter:Bold',_sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">Properties</p>
    </div>
  );
}

function Right() {
  return (
    <div className="relative shrink-0" data-name="Right">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] items-center relative">
        <Button />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div aria-hidden="true" className="absolute border-[#e6e6ea] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pb-[13px] pl-[8px] pr-[16px] pt-[12px] relative w-full">
          <Left />
          <Right />
        </div>
      </div>
    </div>
  );
}

export default function Toolbar() {
  return (
    <div className="bg-[#05052f] content-stretch flex items-center justify-between relative size-full" data-name="Toolbar">
      <Plus />
      <Content />
    </div>
  );
}