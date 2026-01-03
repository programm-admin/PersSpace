// eslint.config.cjs
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const templateParser = require('@angular-eslint/template-parser');

module.exports = [
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                sourceType: 'module',
                // typed ESLint ausschalten für die ignorierten Dateien
                project: undefined,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            '@angular-eslint': angularPlugin,
        },
        rules: {
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@angular-eslint/no-constructor-injection': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        files: ['src/**/*.html'], // Alle Angular-Templates
        // Hier der wichtige Teil:
        languageOptions: {
            parser: templateParser,
        },
        plugins: {
            '@angular-eslint/template': angularTemplatePlugin,
        },
        rules: {
            // Hier kannst du Regeln setzen, z.B.
            '@angular-eslint/template/banana-in-box': 'error',
            '@angular-eslint/template/no-negated-async': 'error',
        },
    },
];
