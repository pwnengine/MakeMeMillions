import { Page } from 'playwright'

export const generate_random = (min, max): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const random_timeout = async (page, min = 3000, max = 5000): Promise<void> => {
  await page.waitForTimeout(generate_random(min, max));
}

export const random_string = (len: number): string => {
  const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  let str: string = '';
  for(let q: number = 0; q < len; ++q) {
    str = str+abc[generate_random(1, 26) - 1];
  }

  return str;
};