import { SWRConfig } from 'swr';

import fetcher from '@/services/fetcher';

export default function Providers({ children }) {
  return <SWRConfig value={{ fetcher: fetcher }}>{children}</SWRConfig>;
}
