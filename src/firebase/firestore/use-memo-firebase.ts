
'use client';

import { useMemo, DependencyList } from 'react';

/**
 * A hook to stabilize Firebase references or queries.
 * Prevents infinite loops when a reference/query is used as a dependency in other hooks.
 */
export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(factory, deps);
}
