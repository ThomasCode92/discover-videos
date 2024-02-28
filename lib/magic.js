import { Magic } from 'magic-sdk';

function createMagic() {
  if (typeof window === 'undefined') return null;
  return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY);
}

export const magic = createMagic();
