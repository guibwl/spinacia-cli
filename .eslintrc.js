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
	  "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
	  "no-global-assign": ["error"],
	  "quotes": ["error", "single", { "allowTemplateLiterals": true }],
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
	  "no-unused-expressions": ["warn", {
		"allowShortCircuit": true,
		"allowTernary": true
	  }],
	  "no-restricted-globals": 0, // 禁用特定的全局变量 (no-restricted-globals),
	  "comma-dangle": ["error", {
		"arrays": "only-multiline",
		"objects": "only-multiline",
		"imports": "only-multiline",
		"exports": "only-multiline",
		"functions": "never"
	  }], // 要求或禁止使用拖尾逗号 (comma-dangle)
	  "prefer-destructuring": ["warn", {
		"object": true, // 强制对象
		"array": false
	  }], // 优先使用数组和对象解构 (prefer-destructuring)
	  "no-trailing-spaces": ["error", {
		"skipBlankLines": true,
		"ignoreComments": true
	  }], // 禁用行尾空白 (no-trailing-spaces)
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
	  "import/no-unresolved": 0,
	  "no-new": 0,
	  "react/no-string-refs": 0,
	  "jsx-a11y/no-static-element-interactions": 0,
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
	  "jsx-a11y/img-has-alt": 0,
	  "jsx-a11y/label-has-for": 0,
	  "jsx-a11y/no-noninteractive-element-interactions": 0,
	  "import/no-named-as-default-member": 0,
	  "import/prefer-default-export": 0,
	  "import/no-extraneous-dependencies": [1, {"devDependencies": ["**/__test__/**/*.js", "**/__test__/**/*.jsx", "**/*_test.jsx", "**/*_test.js"]}],
	  "no-empty": 1,
	  "no-console": [1, { allow: ["warn", "error"]}],
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
  