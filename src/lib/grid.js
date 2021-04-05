export const initializeGrid = (size) => {
  const grid = [];
  for (let i = 0; i < size; i += 1) {
    grid[i] = [];
    for (let j = 0; j < size; j += 1) {
      grid[i][j] = true;
    }
  }
  return grid;
};

export const isCellSelected = (cellPosition, startingPoint, endingPoint) => {
  const minColumn = Math.min(startingPoint[0], endingPoint[0]);
  const maxColumn = Math.max(startingPoint[0], endingPoint[0]);
  const minRow = Math.min(startingPoint[1], endingPoint[1]);
  const maxRow = Math.max(startingPoint[1], endingPoint[1]);

  return (
    cellPosition[0] >= minColumn &&
    cellPosition[0] <= maxColumn &&
    cellPosition[1] >= minRow &&
    cellPosition[1] <= maxRow
  );
};

export const sendGridState = (grid) =>
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(grid),
  });
