import React, { useReducer, useRef, useState } from "react";
import { initializeGrid, isCellSelected, sendGridState } from "../lib/grid";
import gridReducer from "../state/grid/reducer";
import * as gridActions from "../state/grid/actions";
import Cell from "./cell";
import classNames from "classnames/bind";
import styles from "./grid.module.scss";
import useDebouncedEffect from "../hooks/use-debounced-effect";

const classes = classNames.bind(styles);

const Grid = () => {
  const [grid, dispatch] = useReducer(gridReducer, initializeGrid(5));
  const [dragging, setDragging] = useState(null);
  const mouseDownTimeoutId = useRef(null);
  const mouseClickTimeout = useRef(null);
  const [startingPoint, setStartingPoint] = useState([]);
  const [endingPoint, setEndingPoint] = useState([]);
  const [sendingState, setSendingState] = useState(false);
  const [statusResponse, setStatusResponse] = useState(null);

  useDebouncedEffect(
    () => {
      setSendingState(true);
      sendGridState(grid).then((res) => {
        setSendingState(false);
        setStatusResponse(res.status);
      });
    },
    [grid],
    2000
  );

  const onCellLongPress = (column, row) => {
    setDragging(true);
    setStartingPoint([column, row]);
    setEndingPoint([column, row]);
  };
  const handleCellMouseDown = (column, row) => {
    mouseDownTimeoutId.current = setTimeout(() => {
      onCellLongPress(column, row);
      mouseDownTimeoutId.current = null;
    }, 1000);
  };

  const onCellDoubleClick = (column, row) => {
    dispatch(gridActions.setColumn(column, row));
  };

  const onCellClick = (column, row) => {
    const { row: timeoutRow, column: timeoutColumn, id: timeoutId } =
      mouseClickTimeout.current || {};
    if (timeoutRow === row && timeoutColumn === column) {
      clearTimeout(timeoutId);
      mouseClickTimeout.current = null;
      onCellDoubleClick(column, row);
    } else {
      const id = setTimeout(() => {
        dispatch(gridActions.flipCell(column, row));
        mouseClickTimeout.current = null;
      }, 300);
      mouseClickTimeout.current = {
        id,
        row,
        column,
      };
    }
  };

  const handleGridMouseUp = () => {
    if (dragging) {
      setDragging(false);
      dispatch(gridActions.setSelectedCells(startingPoint, endingPoint));
    }
  };

  const handleCellMouseUp = (column, row) => {
    if (mouseDownTimeoutId.current) {
      clearTimeout(mouseDownTimeoutId.current);
      onCellClick(column, row);
    }
  };

  const handleCellMouseOver = (column, row) => {
    if (dragging) {
      setEndingPoint([column, row]);
    }
  };

  return (
    <div>
      <div
        className={classes("grid")}
        onMouseUp={handleGridMouseUp}
        onTouchEnd={handleGridMouseUp}
      >
        {grid.map((column, i) => (
          <div key={i} className={classes("column")}>
            {column.map((value, j) => (
              <Cell
                key={j}
                value={value}
                column={i}
                row={j}
                selected={
                  dragging && isCellSelected([i, j], startingPoint, endingPoint)
                }
                onMouseDown={handleCellMouseDown}
                onMouseOver={handleCellMouseOver}
                onMouseUp={handleCellMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
      {sendingState && <div>Sending State to API...</div>}
      {!sendingState && statusResponse && (
        <div>Status Response: {statusResponse}</div>
      )}
    </div>
  );
};

export default Grid;
