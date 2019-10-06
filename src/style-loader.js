const loaderUtils = require('loader-utils');
/**
 * @description 导出脚本
 *
 * @param {*} source
 * @returns
 */
function loader(source) {
  const str = `
    const style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `;
  return str;
}

// 在style-loader中写了pitch
// style-loader less-loader!css-loader/./index.less
loader.pitch = function (remainingRequest) { // 剩余的请求
  // style-loader处理 less-loader!css-loader/./index.less
  // require路径返回的就是css-loader处理好的结果 require('!!css-loader!less-loader!index.less')
  console.log(remainingRequest);
  const str = `
    const style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    document.head.appendChild(style);
  `;
  return str;
}

module.exports = loader;
