export default function shipGrid(player: string) {
  const grid = document.getElementById(`${player}-ships`);
  [...Array(10).keys()].forEach((i) => {
    [...Array(10).keys()].forEach((j) => {
      const cell = document.createElement('div');
      cell.id = `${i}${j}`;
      // TODO: configure more tailwind classnames
      cell.className =
        'w-8 bg-white outline outline-2 dark:outline-white outline-black dark:bg-black aspect-square md:w-12 lg:w-14 xl:w-16 2xl:w-18';
      if (player === 'enemy') {
        cell.classList.add('hover:bg-gray-900');
        cell.classList.add('dark:hover:bg-slate-100');
      }
      grid?.append(cell);
    });
  });
}
