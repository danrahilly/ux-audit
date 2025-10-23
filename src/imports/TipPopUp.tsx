import svgPaths from "./svg-cqlljexmea";

function MediumIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path d={svgPaths.pff25100} fill="var(--fill-0, #E6E6EA)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function MediumIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Medium Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Medium Icon">
          <path d={svgPaths.p115c2f00} fill="var(--fill-0, #E6E6EA)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] items-start relative w-full">
        <MediumIcon />
        <p className="basis-0 font-['Inter:Bold',_sans-serif] font-bold grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#e6e6ea] text-[12px] uppercase">Tip</p>
        <MediumIcon1 />
      </div>
    </div>
  );
}

export default function TipPopUp() {
  return (
    <div className="bg-[#05052f] relative rounded-[8px] shadow-[0px_8px_8px_0px_rgba(5,5,47,0.16)] size-full" data-name="Tip pop-up">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start overflow-clip pb-[16px] pt-[12px] px-[16px] relative size-full">
          <Frame35 />
          <div className="bg-[#373759] h-px relative shrink-0 w-full">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-px w-full" />
          </div>
          <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#e6e6ea] text-[12px] w-full">Use ‘Element Outlines’ in the Display menu to easily find invisible elements.</p>
        </div>
      </div>
    </div>
  );
}