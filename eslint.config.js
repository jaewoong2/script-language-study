import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks'; // 불러온 플러그인을 직접 객체로 참조
import tseslint from '@typescript-eslint/eslint-plugin'; // 타입스크립트 ESLint 플러그인
import reactRefresh from 'eslint-plugin-react-refresh'; // react-refresh 불러오기
import prettier from 'eslint-config-prettier'; // Prettier 설정 가져오기
import tailwindcss from 'eslint-plugin-tailwindcss'; // Tailwind CSS 플러그인
import tanstackQuery from '@tanstack/eslint-plugin-query'; // Tanstack query 플러그인

export default [
  ...js.configs.recommended, // 기본 ESLint 자바스크립트 설정
  {
    ignores: ['dist/*'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      // 플러그인을 객체 형태로 선언
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      tailwindcss: tailwindcss,
      '@tanstack/query': tanstackQuery,
    },
    rules: {
      ...reactHooks.configs.recommended
        .rules,
      '@typescript-eslint/no-unused-vars':
        'warn',
      'no-unused-vars': 'warn',
      'react-refresh/only-export-components':
        [
          'warn',
          { allowConstantExport: true },
        ],
    },
  },
  prettier,
];
