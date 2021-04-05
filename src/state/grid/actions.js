import { FLIP_CELL, SET_SELECTED_CELLS, SET_COLUMN } from "./action-types";

export const flipCell = (column, row) => ({
  type: FLIP_CELL,
  column,
  row,
});

export const setSelectedCells = (startingPoint, endingPoint) => ({
  type: SET_SELECTED_CELLS,
  startingPoint,
  endingPoint,
});

export const setColumn = (column, row) => ({
  type: SET_COLUMN,
  column,
  row,
});
