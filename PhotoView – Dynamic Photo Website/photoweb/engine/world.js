export const SPACING = 450; // Increased for ultra-large frames
export const GRID_COLS = 5; 
export const TOTAL_WIDTH = SPACING * GRID_COLS;
export const TOTAL_HEIGHT = SPACING * GRID_COLS;

export function wrap(v, max) {
  return ((v % max) + max) % max;
}
