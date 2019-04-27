module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
},
  "extends": [
    "airbnb-base",
    "plugin:react/recommended",
    "eslint:recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true,
    "jest": true
  },
  "globals": {
    "window": false,
    "define": false,
    "location": false,
    "document": false,
    "navigator": false,
    "localStorage": false,
    "sessionStorage": false,
    "setTimeout": false,
    "wx": false,
    "$$": false,
    "IMALL": false
  },
  "rules": {

    /** overwrite eslint:recommended */
    // Possible Errors
    "no-console": [1, { allow: ["warn", "error"]}],
    "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-empty": 1,

    /** auto fix by eslint */
    // Possible Errors
    "no-extra-parens": "error",
    "no-extra-semi": "error",
    "no-regex-spaces": "error",
    "no-unsafe-negation": "error",
    // Best Practices
    "dot-location": ["error", "property"],
    "no-multi-spaces": "error",
    "no-useless-return": "error",
    // Variables
    "no-undef-init": "error",
    // Stylistic Issues
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": "error",
    "brace-style": "error",
    "comma-dangle": ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "only-multiline",
      "exports": "only-multiline",
      "functions": "never"
    }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "func-call-spacing": ["error", "never"],
    "indent": ["error", 2, {
      "SwitchCase": 1,
      "VariableDeclarator": {
        "var": 2,
        "let": 2,
        "const": 2
      },
      "MemberExpression": 1,
      "FunctionExpression": {
        "body": 1,
        "parameters": 2
      },
      "CallExpression": {
        "arguments": 1
      },
      "ArrayExpression": 1,
      "ObjectExpression": 1
    }],
    "jsx-quotes": ["error", "prefer-double"],
    "key-spacing": ["error", {
       "beforeColon": false,
       "afterColon": true,
       "mode": "strict"
    }],
    "keyword-spacing": ["error", {
       "before": true,
       "after": true
    }],
    "linebreak-style": ["error", "unix"],
    "lines-around-comment": ["error", { "beforeBlockComment": true }],
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: false }],
    "new-parens": "error",
    "no-lonely-if": "error",
    "no-multiple-empty-lines": "error",
    "no-trailing-spaces": ["error", {
      "skipBlankLines": true,
      "ignoreComments": true
    }],
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": ["error", "beside", { "overrides": { "while": "below" } }],
    "object-curly-spacing": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]},
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any",    prev: "directive", next: "directive" }
    ],
    "quote-props": ["error", "always"],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "semi": ["error", "always"],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "semi-style": ["error", "last"],
    "space-before-blocks": "error",
    "space-before-function-paren": "error",
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": ["error", "always"],
    "switch-colon-spacing": ["error", {"after": true, "before": false}],
    "template-tag-spacing": "error",
    // ECMAScript 6
    "arrow-spacing": "error",
    "generator-star-spacing": ["error", {"before": true, "after": false}],
    "prefer-const": "error",
    "prefer-template": "error",
    "rest-spread-spacing": ["error"],
    "template-curly-spacing": "error",

    /** customize by self from eslint */
    "no-unused-expressions": ["warn", {
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "no-restricted-globals": 0, // 禁用特定的全局变量 (no-restricted-globals),
    "prefer-destructuring": ["warn", {
      "object": true, // 强制对象
      "array": false
    }], // 优先使用数组和对象解构 (prefer-destructuring)
    "one-var": ["warn", {
      var: "consecutive",
      let: "never",
      const: "never"
    }],
    "max-len": ["off", {
      "code": 120,
    }],
    "no-bitwise": 0,
    "no-mixed-operators": 0,
    "no-useless-constructor": 0,
    "no-new": 0,

    /** eslint-plugin-import */
    "import/no-unresolved": 0,
    "import/no-named-as-default-member": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": [1, {
      "devDependencies": [
        "**/__test__/**/*.js",
        "**/__test__/**/*.jsx",
        "**/*_test.jsx",
        "**/*_test.js"
      ]
    }],

    /** eslint-plugin-jsx-a11y */
    "jsx-a11y/img-has-alt": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-static-element-interactions": 0,

    /** eslint-plugin-react */
    "react/no-string-refs": 0,
    "react/self-closing-comp": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-curly-spacing": 0,
    "react/no-string-refs": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-boolean-value": 0,
    "react/no-did-mount-set-state": 1,
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-max-props-per-line": 0,
    "react/require-default-props": 0,
    "react/sort-comp": 0,
    "react/prefer-stateless-function": 0,
    "react/prop-types": [0, { "ignore": ["children", "key"] }],
    "react/no-find-dom-node": 0,
    "react/no-unused-prop-types": 1,
    "react/forbid-prop-types": [1, { "forbid": ["array"] }],
    "react/no-array-index-key": 0
  },
  "settings": {
    "react": {
      // default to "createReactClass"
      "createClass": "createReactClass", // Regex for Component Factory to use,
      "pragma": "React", // Pragma to use, default to "React"
      "version": "16.0", // React version, default to the latest React stable release
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": ["forbidExtraProps"]
    // The names of any functions used to wrap the
    // propTypes object, e.g. `forbidExtraProps`.
    // If this isn't set, any propTypes wrapped in
    // a function will be skipped.
  }
};
