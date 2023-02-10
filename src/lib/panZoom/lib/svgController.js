var isIE = require('./isIE')
var isSupport3d = require('./isSupport3d')
var useTransform3d = !isIE && isSupport3d

module.exports = makeSvgController

function makeSvgController(svgElement) {
  var elementValid = (svgElement instanceof SVGElement)
  if (!elementValid) {
    throw new Error('svg element is required for svg.panzoom to work')
  }

  var owner = svgElement.ownerSVGElement
  if (!owner) {
    throw new Error(
      'Do not apply panzoom to the root <svg> element. ' +
      'Use its child instead (e.g. <g></g>). ' +
      'As of March 2016 only FireFox supported transform on the root element')
  }

  owner.setAttribute('tabindex', 1); // TODO: not sure if this is really polite

  var api = {
    getBBox: getBBox,
    getScreenCTM: getScreenCTM,
    getOwner: getOwner,
    applyTransform: useTransform3d ? applyTransform3d : applyTransform,
    initTransform: initTransform
  }

  return api

  function getOwner() {
    return owner
  }

  function getBBox() {
    var bbox =  svgElement.getBBox()
    return {
      left: bbox.x,
      top: bbox.y,
      width: bbox.width,
      height: bbox.height,
    }
  }

  function getScreenCTM() {
    return owner.getScreenCTM()
  }

  function initTransform(transform) {
    var screenCTM = svgElement.getScreenCTM()
    transform.x = screenCTM.e;
    transform.y = screenCTM.f;
    transform.scale = screenCTM.a;
    owner.removeAttributeNS(null, 'viewBox');
  }

  function applyTransform(transform) {
    svgElement.setAttribute('transform', 'matrix(' +
      transform.scale + ' 0 0 ' +
      transform.scale + ' ' +
      transform.x + ' ' + transform.y + ')')
  }

  function applyTransform3d(transform) {
    svgElement.setAttribute('transform', 'matrix3d(' +
      transform.scale + ' 0 0 0 ' +
      '0 ' + transform.scale + ' 0 0 ' +
      '0 0 1 0 ' +
      transform.x + ' ' + transform.y + ' 0 1)')
  }
}