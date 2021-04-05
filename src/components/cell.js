import React from "react";
import classNames from "classnames/bind";
import styles from "./cell.module.scss";

const classes = classNames.bind(styles);

const Cell = ({
  value,
  column,
  row,
  onMouseDown,
  onMouseUp,
  selected,
  onMouseOver,
}) => {
  const handleMouseDown = () => onMouseDown(column, row);
  const handleMouseUp = () => onMouseUp(column, row);
  const handleMouseOver = () => onMouseOver(column, row);

  const handleTouchStart = (e) => {
    e.preventDefault();
    handleMouseDown();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleMouseUp();
  };

  const handleTouchMove = (e) => {
    const element = document.elementFromPoint(
      e.touches[0].pageX,
      e.touches[0].pageY
    );
    const { column, row } = element?.dataset || {};
    if (column && row) {
      onMouseOver(column, row);
    }
  };

  return (
    <div
      className={classes("cell", value ? "green" : "red", { selected })}
      data-column={column}
      data-row={row}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    />
  );
};

export default Cell;
