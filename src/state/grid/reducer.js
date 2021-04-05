import { isCellSelected } from "../../lib/grid";
import { FLIP_CELL, SET_SELECTED_CELLS, SET_COLUMN } from "./action-types";

const reducer = (state, action) => {
  switch (action.type) {
    case FLIP_CELL:
      return state.map((column, i) => {
        if (i === action.column) {
          return column.map((row, j) => {
            if (j === action.row) {
              return !state[i][j];
            }
            return row;
          });
        }
        return column;
      });
    case SET_SELECTED_CELLS: {
      const valueToFlip =
        state[action.startingPoint[0]][action.startingPoint[1]];
      return state.map((column, i) => {
        return column.map((row, j) => {
          if (
            isCellSelected([i, j], action.startingPoint, action.endingPoint)
          ) {
            return valueToFlip;
          }
          return row;
        });
      });
    }
    case SET_COLUMN: {
      const valueToFlip = state[action.column][action.row];
      return state.map((column, i) => {
        if (i === action.column) {
          return column.map(() => valueToFlip);
        }
        return column;
      });
    }
    default:
      return state;
  }
};

export default reducer;
