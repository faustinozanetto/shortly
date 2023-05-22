'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

type QueriesProviderProps = {
  children: React.ReactNode;
};

const QueriesProvider: React.FC<QueriesProviderProps> = (props) => {
  const { children } = props;

  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueriesProvider;
