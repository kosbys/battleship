export default function shipGrid(player: string) {
  const grid = document.getElementById(`${player}-ships`);
  [...Array(10).keys()].forEach((i) => {
    [...Array(10).keys()].forEach((j) => {
      const cell = document.createElement('div');
      cell.style.outline = '1px solid black';
      cell.id = `${i}${j}`;
      // TODO: configure more tailwind classnames
      cell.classList.add('w-12');
      cell.textContent = `${i}${j}`;
      grid?.append(cell);
    });
  });
}
