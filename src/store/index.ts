import { useContext, createContext } from 'react'
import counter from './counter'

class RootStore {
  Counter = counter
}

const store = new RootStore()

const Context = createContext(store)

export const useStore = () => {
  return useContext(Context)
}
