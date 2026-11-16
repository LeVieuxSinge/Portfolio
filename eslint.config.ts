import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
    ignores: [".agents/**", ".codex/**", "docs/**", ".cache/**", ".data/**", ".output/**"],
}, {
    rules: {
        "vue/no-multiple-template-root": "off",
    },
});
