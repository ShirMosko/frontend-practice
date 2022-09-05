const randomIntBetween = (min, max) => {
  return  Math.floor((Math.random() * max) + min)
}

const randomNegPos = () => {
  return 0.5 - Math.random()
}

module.exports = {
  randomIntBetween,
  randomNegPos
}
