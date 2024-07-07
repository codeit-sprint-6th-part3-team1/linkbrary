module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['./eslint/react.js', './eslint/typescript.js', './eslint/import.js', './eslint/prettier.js', 'next/core-web-vitals'],
  rules: {
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/function-component-definition': 'off', //컴포넌틑 function 함수 강제화
    'jsx-a11y/anchor-is-valid': 'off', // 유효하지 않은 href 사용 금지
    '@typescript-eslint/no-unsafe-return': 'off', // any return 금지
    '@typescript-eslint/no-unsafe-argument': 'off', // any argument 금지
  },
};
