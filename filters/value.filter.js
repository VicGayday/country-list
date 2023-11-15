Vue.filter("value", function (value) {
  const x = typeof value
  switch (x) {
    case "boolean":
      return value ? "да" : "нет"
    case "string":
      return value
    default:
      return value
  }
})
