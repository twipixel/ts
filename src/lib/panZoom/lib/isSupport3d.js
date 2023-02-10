var isSupport3d = detectdSupport3d()
module.exports = isSupport3d

function detectdSupport3d() {
  var el = document.createElement('p')
  var has3d
  const transforms = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform'
  }

  // Add it to the body to get the computed style
  document.body.insertBefore(el, null)

  for (const t in transforms) {
    if (transforms.hasOwnProperty(t)) {
      if (el.style[t] !== undefined) {
        el.style[t] = 'translate3d(1px,1px,1px)'
        has3d = window.getComputedStyle(el).getPropertyValue(transforms[t])
      }
    }
  }

  document.body.removeChild(el)

  return has3d !== undefined && has3d.length > 0 && has3d !== 'none'
}