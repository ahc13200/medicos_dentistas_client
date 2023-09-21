import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLayoutStore = defineStore('LAYOUT', () => {
  const [showSidebarDrawer, toggleShowSidebarDrawer] = useToggle(false)

  return {
    showSidebarDrawer,
    toggleShowSidebarDrawer,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
