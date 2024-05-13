import { Magic } from 'magic-sdk';

function createMagic() {
  if (typeof window === 'undefined') return null;
  return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY, {
    testMode: process.env.NEXT_PUBLIC_TEST_MODE === 'true',
  });
}

export const magic = createMagic();
