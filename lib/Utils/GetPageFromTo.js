"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPageFromTo = GetPageFromTo;

/**
 *  获取分页数据  page page_size 的计算结果
 * @param {*} query  请求中携带的 参数
 * @returns {Promise} Promise<any>
 */
function GetPageFromTo(query) {
  return new Promise(function (resolve) {
    var page, page_size;
    page = (query === null || query === void 0 ? void 0 : query.page) || 1;
    page_size = (query === null || query === void 0 ? void 0 : query.page_size) || 15;
    var pam = {
      from: (page - 1) * page_size,
      to: Number(page_size)
    };
    pam = Object.assign({}, pam, query);
    return resolve({
      pam: pam,
      page: page,
      page_size: page_size
    });
  });
}