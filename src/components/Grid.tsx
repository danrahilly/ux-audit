interface GridCellProps {
  rowIndex: number;
  colIndex: number;
}

function GridCell({ rowIndex, colIndex }: GridCellProps) {
  return (
    <div 
      className="basis-0 bg-muted/5 grow h-[32px] min-h-px min-w-px relative rounded-[var(--radius)] shrink-0"
      data-row={rowIndex}
      data-col={colIndex}
    >
      <div 
        aria-hidden="true" 
        className="absolute border border-border/30 border-solid inset-0 pointer-events-none rounded-[var(--radius)]" 
      />
    </div>
  );
}

interface GridRowProps {
  rowIndex: number;
}

function GridRow({ rowIndex }: GridRowProps) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      {[...Array(24).keys()].map((colIndex) => (
        <GridCell key={colIndex} rowIndex={rowIndex} colIndex={colIndex} />
      ))}
    </div>
  );
}

interface GridProps {
  rows?: number;
}

export function Grid({ rows = 26 }: GridProps) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full p-[12px]">
      {[...Array(rows).keys()].map((rowIndex) => (
        <GridRow key={rowIndex} rowIndex={rowIndex} />
      ))}
    </div>
  );
}
