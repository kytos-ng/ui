const {
    defineConfig,
    globalIgnores
} = require("eslint/config");

const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    //allConfig: js.configs.all
});

module.exports = defineConfig([
    globalIgnores(["web-ui/", "coverage/"]),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {},
        },
        extends: compat.extends("eslint:recommended", "plugin:vue/recommended", "prettier"),
        rules: {
            "vue/attributes-order": "off",
            "vue/component-definition-name-casing": "off"
        },
        settings: {}
    }
]);