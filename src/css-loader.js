function loader(source) {
  const reg = /url\((.+?)\)/g;
  let pos = 0;
  let current;
  const arr = ["const list = []"];
  while (current = reg.exec(source)) {
    const [matchUrl, g] = current;
    let last = reg.lastIndex - matchUrl.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);

    pos = reg.lastIndex;
    // 替换require => url(require('xxx'))
    arr.push(`list.push('url('+require(${g})+')')`);
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  arr.push(`module.exports=list.join('')`);
  return arr.join('\r\n');
}

module.exports = loader;
