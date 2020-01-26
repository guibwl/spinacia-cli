module.exports = {
  "extends": "react-app",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "window": false,
    "location": false,
    "$$": false,
    "wx": false,
    "document": false,
    "localStorage": false,
    "sessionStorage": false
  },
  "rules": {
    "comma-dangle":1,//对象字面量项尾不能有逗号
    "no-empty":1,//块语句中的内容不能为空
    "no-undef-init":2,//变量初始化时不能直接给他赋值为undefined
    "no-var": 2,  // 不使用var声明变量
    "no-multi-spaces": 1,  // 语句前后不出现超过1个空格
    "no-unused-vars": 1,  // 不能出现声明后未使用的变量
    "no-trailing-spaces": 1, // 禁止使用行尾空格
    "space-infix-ops": 1, // 运算符两边需要空格
    "no-useless-concat": 1,
    "prefer-destructuring": [1, {
      "object": true, // 强制对象
      "array": false
    }], // 优先使用数组和对象解构 (prefer-destructuring)
    "no-restricted-globals": 0, // 禁止声明外部作用域中已定义的变量(这里将它关掉，是因为类似location的api是可以直接使用)
    "no-octal-escape": 1, //禁止在字符串中使用八进制转义序列
    "react/jsx-tag-spacing": 1, // 在闭合标签之前使用空格
    "react/self-closing-comp": 1, // 如果标签内没有任何子元素，则需要闭合
    "react/jsx-pascal-case": 1,  // react组件使用帕斯卡的命名方式
    "react/jsx-key":1,//在数组或迭代器中验证JSX具有KEY属性
  }
}