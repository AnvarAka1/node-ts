export default (time = 20000) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(''), time)
  })
}
