import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
    ignores: [".agents/**", ".codex/**", ".cache/**", ".data/**", ".output/**"],
}, {
    rules: {
        "vue/no-multiple-template-root": "off",
    },
});
