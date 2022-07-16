export default function shipGrid() {
  const grid = document.getElementById('player-ships');
  [...Array(10).keys()].forEach((i) => {
    [...Array(10).keys()].forEach((j) => {
      const cell = document.createElement('div');
      cell.style.outline = '1px solid black';
      cell.className = `${i}${j}`;
      cell.textContent = `${i}${j}`;
      grid?.append(cell);
    });
  });
}
