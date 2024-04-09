const files = import.meta.glob('./**.ts', { import: 'default' })
// const modules: Record<string, any> = {}
class RootStore {
  constructor() {}
}
Object.keys(files).forEach(async path => {
  if (path === './index.ts') return

  const fileName = path.replace(/(\.\/|\.ts)/g, '')
  // 使用这种会有警告
  // const module = await import(/* @vite-ignore */ path)
  // modules[fileName] = await files[path]();

  ;(RootStore.prototype as any)[fileName] = await files[path]()
})

// class RootStore {
//   constructor(modules: Record<string, any>) {
//     for (const key in modules) {
//       ;(this as any)[key] = modules[key]
//     }
//   }
// }
export default new RootStore()
