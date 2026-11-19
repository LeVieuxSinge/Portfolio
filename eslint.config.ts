import withNuxt from "./.nuxt/eslint.config.mjs";

// Lint maintained source and tooling only; generated files, caches, and retained development guidance are excluded.
export default withNuxt({
    ignores: [".agents/**", ".codex/**", ".cache/**", ".data/**", ".output/**"],
}, {
    rules: {
        // Vue 3 fragments support components that render a normal surface plus a portal.
        "vue/no-multiple-template-root": "off",
    },
});
