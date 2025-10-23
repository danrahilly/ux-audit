// Grid configuration constants
export const GRID_CONFIG = {
  cellHeight: 32,
  gap: 12,
  padding: 12,
  columns: 24,
  rows: 26,
};

/**
 * Calculates the column width based on canvas width
 */
export function getColumnWidth(canvasWidth: number): number {
  const availableWidth = canvasWidth - (GRID_CONFIG.padding * 2);
  const totalGapWidth = GRID_CONFIG.gap * (GRID_CONFIG.columns - 1);
  const columnWidth = (availableWidth - totalGapWidth) / GRID_CONFIG.columns;
  return columnWidth;
}

/**
 * Snaps a position to the nearest grid cell
 */
export function snapToGrid(
  x: number,
  y: number,
  canvasWidth: number
): { x: number; y: number } {
  const columnWidth = getColumnWidth(canvasWidth);

  // Calculate which column this x position is closest to
  const adjustedX = x - GRID_CONFIG.padding;
  const columnIndex = Math.round(adjustedX / (columnWidth + GRID_CONFIG.gap));
  const snappedX = GRID_CONFIG.padding + columnIndex * (columnWidth + GRID_CONFIG.gap);

  // Calculate which row this y position is closest to
  const adjustedY = y - GRID_CONFIG.padding;
  const rowIndex = Math.round(adjustedY / (GRID_CONFIG.cellHeight + GRID_CONFIG.gap));
  const snappedY = GRID_CONFIG.padding + rowIndex * (GRID_CONFIG.cellHeight + GRID_CONFIG.gap);

  return {
    x: Math.max(GRID_CONFIG.padding, snappedX),
    y: Math.max(GRID_CONFIG.padding, snappedY),
  };
}

/**
 * Gets the grid cell position for a given column and row index
 */
export function getGridCellPosition(
  col: number,
  row: number,
  canvasWidth: number
): { x: number; y: number } {
  const columnWidth = getColumnWidth(canvasWidth);
  
  const x = GRID_CONFIG.padding + col * (columnWidth + GRID_CONFIG.gap);
  const y = GRID_CONFIG.padding + row * (GRID_CONFIG.cellHeight + GRID_CONFIG.gap);
  
  return { x, y };
}

/**
 * Snaps a dimension (width or height) to the nearest grid size
 */
export function snapDimensionToGrid(
  dimension: number,
  canvasWidth: number,
  isWidth: boolean = true
): number {
  const columnWidth = getColumnWidth(canvasWidth);
  const cellSize = isWidth ? columnWidth : GRID_CONFIG.cellHeight;
  
  // Calculate how many cells this dimension should span
  // We need to account for gaps between cells
  const numCells = Math.round((dimension + GRID_CONFIG.gap) / (cellSize + GRID_CONFIG.gap));
  const clampedCells = Math.max(1, numCells); // Minimum 1 cell
  
  // Calculate the snapped dimension
  const snappedDimension = clampedCells * cellSize + (clampedCells - 1) * GRID_CONFIG.gap;
  
  return snappedDimension;
}
