<script setup lang="ts">
definePageMeta({ name: "home" });
</script>

<template>
    <main
        id="main"
        tabindex="-1"
        class="home page-gutter min-h-[calc(100svh_-_112px)] grid [grid-template-columns:1fr_1.05fr] gap-[6vw] items-center pt-7 pb-[8vh] [@media(min-width:1600px)]:gap-[7vw] [@media(max-width:900px)_and_(min-width:701px)]:gap-[3vw] [@media(max-width:900px)_and_(min-width:701px)]:[grid-template-columns:1fr_1fr] [@media(max-width:700px)]:min-h-[calc(100svh_-_88px)] [@media(max-width:700px)]:[grid-template-columns:1fr] [@media(max-width:700px)]:gap-6 [@media(max-width:700px)]:pt-3 [@media(max-width:700px)]:pb-[26px] [@media(max-width:700px)]:[align-content:start] [@media(max-height:650px)_and_(min-width:701px)]:pt-3 [@media(max-height:650px)_and_(min-width:701px)]:pb-7 pl-[10vw] pr-[10vw] [@media(max-width:700px)]:pl-[8vw] [@media(max-width:700px)]:pr-[8vw]"
    >
        <div class="home-copy min-w-0 relative z-[2]">
            <div class="home-introduction">
                <p class="eyebrow [.home-introduction_&]:text-[9px] [.home-introduction_&]:text-muted [@media(max-width:700px)]:[.home-introduction_&]:text-[8px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                    {{ $t('p.greeting') }}
                </p><p class="introduction text-[clamp(16px,1.55vw,24px)] leading-[1.65] tracking-[-.025em] max-w-110 mt-[17px] [@media(max-width:900px)_and_(min-width:701px)]:text-[16px] [@media(max-width:700px)]:text-[14px] [@media(max-width:700px)]:leading-[1.7] [@media(max-width:700px)]:mt-[10px] [@media(max-width:700px)]:max-w-[310px]">
                    {{ $t('p.introduction') }}
                </p>
            </div>
            <nav
                class="home-links flex gap-[34px] mt-[30px] [&>*]:flex-1 [&>*]:max-w-[195px] [&&_.portfolio-link-large]:gap-3 [&&_.portfolio-link-large]:whitespace-nowrap [@media(min-width:1600px)]:mt-10 [@media(max-width:900px)_and_(min-width:701px)]:gap-[22px] [@media(max-width:900px)_and_(min-width:701px)]:[&&_.portfolio-link-large]:text-[24px] [@media(max-width:700px)]:gap-7 [@media(max-width:700px)]:mt-4 [@media(max-width:700px)]:[&&_.portfolio-link-large]:text-[clamp(21px,6.2vw,25px)] [@media(max-width:700px)]:[&&_.portfolio-link-large]:[padding:.4em_0_.6em] [@media(max-height:650px)_and_(min-width:701px)]:mt-[15px] [@media(max-width:360px)]:gap-5"
                :aria-label="$t('p.navigation')"
            >
                <PortfolioLink
                    to="/projects"
                    large
                >
                    {{ $t('p.work') }}
                </PortfolioLink><PortfolioLink
                    to="/about"
                    large
                >
                    {{ $t('p.about') }}
                </PortfolioLink>
            </nav>
        </div>
        <div class="home-experiment min-w-0 relative [@media(max-width:700px)]:[&&_.living-system]:h-[245px] [@media(max-width:700px)]:[&&_.system-expanded]:h-[490px]">
            <p class="motivation [font:9px/1.7_var(--font-mono)] text-muted tracking-[.015em] [margin:25px_0_0_12px] max-w-[310px] [@media(min-width:1600px)]:text-[10px] [@media(max-width:900px)_and_(min-width:701px)]:text-[8px] [@media(max-width:700px)]:hidden [@media(max-height:650px)_and_(min-width:701px)]:mt-[15px]">
                {{ $t('p.motivation') }}
            </p>
        </div>
    </main>
</template>
