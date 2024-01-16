import { WritableAtom, atom, useSetAtom } from 'jotai'
import type { useHydrateAtoms } from 'jotai/react/utils'
import { useEffect, useMemo } from 'react'

type AnyWritableAtom = WritableAtom<unknown, any[], any>
type InferAtomTuples<T> = {
  [K in keyof T]: T[K] extends readonly [infer A, unknown]
    ? A extends WritableAtom<unknown, infer Args, any>
      ? readonly [A, Args[0]]
      : T[K]
    : never
}
export type INTERNAL_InferAtomTuples<T> = InferAtomTuples<T>

const isSSR = typeof window === 'undefined'
export const useSyncAtoms: typeof useHydrateAtoms = (values: any) => {
  const syncAtomsAtom = useMemo(
    () =>
      atom(null, (get, set) => {
        for (const [atom, value] of values) {
          set(atom, value)
        }
      }),
    [values]
  )
  const syncAtoms = useSetAtom(syncAtomsAtom)

  isSSR && syncAtoms()
  useEffect(() => {
    syncAtoms()
  }, [syncAtoms, values])
}
