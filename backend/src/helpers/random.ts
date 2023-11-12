import { Page } from 'playwright'

export const generate_random = (min, max): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const random_timeout = async (page, min = 3000, max = 5000): Promise<void> => {
  await page.waitForTimeout(generate_random(min, max));
}