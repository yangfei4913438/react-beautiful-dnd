module.exports = {
  eslintIntegration: false, // 使用eslint的代码格式进行校验
  arrowParens: 'avoid', // 箭头函数参数括号，默认avoid 可选 avoid| always,avoid 能省略括号的时候就省略 例如x => x，always 总是有括号
  singleQuote: true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
  printWidth: 100, // 换行字符串阈值
  proseWrap: 'preserve', // 代码超出是否要换行 preserve保留
};
