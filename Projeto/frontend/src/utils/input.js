export const handleChange = (callback) => {
  return (e) => {
    callback(e.target.value)
  }
}