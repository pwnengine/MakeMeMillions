export const generate_random = (min, max): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};