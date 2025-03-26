const getUniqueId = () => {
  return Math.floor(Math.random() * Date.now()) + '';
};

const isValidPlacements = (placements: number[]): boolean => {
  if (placements.length === 0) return false;

  placements.sort((a, b) => a - b);

  const length = placements.length;
  if (placements[0] > 1 || placements[length - 1] > length + 1) return false;

  let count = 1;
  for (let i = 1; i < placements.length; i++) {
    if (placements[i] === placements[i - 1]) count++;
    else {
      if (placements[i] === count || placements[i] > i + 1) return false;
    }
  }
  return true;
};

export { getUniqueId, isValidPlacements };
