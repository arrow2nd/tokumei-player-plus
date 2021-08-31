import { useState } from 'react'

export const useForceUpdate = (): (() => void) => {
  const [, forceUpdate] = useState(false)
  return () => forceUpdate((prev) => !prev)
}
