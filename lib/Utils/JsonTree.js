"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenerateOptions = GenerateOptions;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 *  递归 生成 级联数据  接送tree
 * @param {*} params  json 远数据
 * @param {*} obj   要添加的 额外参数
 * @param {*} key  要添加的字段名
 */
function GenerateOptions(params, obj, key) {
  //生成Cascader级联数据
  return new Promise(function (resolve) {
    var result = [];
    params.map(function (el) {
      if (getTop(el, params)) {
        // if (el.pid === 0) {
        var tmp = getchilds(el.id, params, obj);
        el = Object.assign({}, el, obj);

        if (tmp.length) {
          el[key] = tmp;
        }

        result.push(el);
      }
    });
    return resolve(result);
  });
}

function getchilds(id, array, obj, key) {
  var childs = new Array();

  var _iterator = _createForOfIteratorHelper(array),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var arr = _step.value;

      //循环获取子节点
      if (arr.pid == id) {
        arr = Object.assign({}, arr, obj);
        childs.push(arr);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  for (var _i = 0, _childs = childs; _i < _childs.length; _i++) {
    var child = _childs[_i];
    //获取子节点的子节点
    var childscopy = getchilds(child.id, array, obj, key); //递归获取子节点

    if (childscopy.length > 0) {
      child[key] = childscopy;
    }
  }

  return childs;
} // 获取顶层元素


function getTop(el, data) {
  if (data.filter(function (d) {
    return d.id === el.pid;
  }).length) {
    return false;
  } else {
    return true;
  }
}