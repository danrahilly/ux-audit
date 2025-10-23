function OldCell() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.03)] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="OLD_Cell">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.16)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function OldRow() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="OLD_Row">
      {[...Array(24).keys()].map((_, i) => (
        <OldCell key={i} />
      ))}
    </div>
  );
}

export default function OldGridDontUseItOrFigmaWillCrashSadFace() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="OLD_Grid (Don\'t use it or Figma will crash, sad-face)">
      {[...Array(3).keys()].map((_, i) => (
        <OldRow key={i} />
      ))}
    </div>
  );
}