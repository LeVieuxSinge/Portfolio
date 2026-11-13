<script setup lang="ts">
definePageMeta({ key: route => route.path });
const route = useRoute();
const { t } = useI18n();
const { resolvedProjects } = useProjectsData();
const { description } = useProjectPresentation();
const project = resolvedProjects.find(item => item.slug === route.params.slug);
if (!project) throw createError({ statusCode: 404, statusMessage: t("p.projectNotFound"), fatal: true });
const index = resolvedProjects.indexOf(project);
const previous = resolvedProjects[(index - 1 + resolvedProjects.length) % resolvedProjects.length]!;
const next = resolvedProjects[(index + 1) % resolvedProjects.length]!;
const paragraphs = computed(() => description(project).split(/\n|(?=I was responsible)|(?=J’étais responsable)|(?=J’ai pris en charge)/).filter(Boolean));
const assets = project.assets.filter(asset => asset.src !== project.cover);
useHead({ title: project.name });
useSeoMeta({ description: () => description(project).slice(0, 180), ogTitle: `${project.name} — Xavier Champoux`, ogImage: project.cover });
</script>

<template>
    <div>
        <main
            id="main"
            tabindex="-1"
            class="case-study page-gutter page-content pl-[10vw] pr-[10vw] pt-[62px] pb-25 [@media(max-width:700px)]:pl-[8vw] [@media(max-width:700px)]:pr-[8vw] [@media(max-width:700px)]:pt-[34px] [@media(max-width:700px)]:pb-[70px]"
        >
            <NuxtLinkLocale
                to="/projects"
                class="back-work eyebrow no-underline text-muted text-[9px] inline-block min-h-8 [.case-heading>&]:text-muted [.case-heading>&]:text-[9px] [.case-pagination_&]:text-[9px] [.case-pagination_&]:text-muted [@media(max-width:700px)]:[.case-pagination_&]:text-[7px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase"
            >
                ← {{ t('p.backWork') }}
            </NuxtLinkLocale>
            <header class="case-heading mt-[45px] mb-[50px] [&_h1]:text-[clamp(36px,6.3vw,110px)] [&_h1]:leading-[1.3] [&_h1]:mt-4 [&_h1]:[overflow-wrap:anywhere] [&>p:last-child]:text-[12px] [&>p:last-child]:text-muted [&>p:last-child]:mt-[18px] [@media(max-width:700px)]:mt-[25px] [@media(max-width:700px)]:mb-[30px] [@media(max-width:700px)]:[&_h1]:text-[36px] [@media(max-width:700px)]:[&>p:last-child]:text-[10px]">
                <p class="eyebrow [.case-heading>&]:text-muted [.case-heading>&]:text-[9px] [.case-pagination_&]:text-[9px] [.case-pagination_&]:text-muted [@media(max-width:700px)]:[.case-pagination_&]:text-[7px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                    {{ project.about.startsWith('[PIXISTUDIO]') ? 'Pixistudio / ' : '' }}{{ project.year }}
                </p><h1
                    class="display [.case-heading_h1&.long-title]:text-[clamp(30px,4.7vw,80px)] font-display font-normal tracking-[.015em] leading-[1.15]"
                    :class="{ 'long-title': project.name.length > 15 }"
                >
                    {{ project.name }}
                </h1><p>{{ project.roles.map(role => t(role.name)).join(' / ') }}</p>
            </header>
            <img
                class="case-cover w-full h-auto max-h-[75svh] [object-fit:contain] rounded-[10px_90px_10px_10px] bg-surface [@media(max-width:700px)]:rounded-[7px_45px_7px_7px]"
                :src="project.cover"
                :alt="project.name"
                width="1440"
                height="900"
                fetchpriority="high"
            >
            <section class="case-overview grid [grid-template-columns:1fr_2.05fr] gap-[7vw] [padding:80px_0_95px] [&_h2]:text-[9px] [&_h2]:text-muted [&_h2]:mb-[23px] [&_aside_ul]:text-[12px] [&_aside_ul]:leading-[2.1] [&_aside_ul]:mb-8 [@media(max-width:700px)]:[grid-template-columns:1fr] [@media(max-width:700px)]:gap-[22px] [@media(max-width:700px)]:[padding:40px_0_50px] [@media(max-width:700px)]:[&_aside]:grid [@media(max-width:700px)]:[&_aside]:[grid-template-columns:1fr_1fr] [@media(max-width:700px)]:[&_aside]:gap-[0_25px] [@media(max-width:700px)]:[&_aside_h2]:[grid-row:1] [@media(max-width:700px)]:[&_aside_ul]:text-[10px]">
                <aside>
                    <h2 class="eyebrow [.case-heading>&]:text-muted [.case-heading>&]:text-[9px] [.case-pagination_&]:text-[9px] [.case-pagination_&]:text-muted [@media(max-width:700px)]:[.case-pagination_&]:text-[7px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                        {{ t('p.contribution') }}
                    </h2><ul>
                        <li
                            v-for="role in project.roles"
                            :key="role.id"
                        >
                            {{ t(role.name) }}
                        </li>
                    </ul><h2 class="eyebrow [.case-heading>&]:text-muted [.case-heading>&]:text-[9px] [.case-pagination_&]:text-[9px] [.case-pagination_&]:text-muted [@media(max-width:700px)]:[.case-pagination_&]:text-[7px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                        {{ t('p.tools') }}
                    </h2><ul>
                        <li
                            v-for="tool in project.tools"
                            :key="tool.id"
                        >
                            {{ t(tool.name) }}
                        </li>
                    </ul>
                </aside><div class="case-description [&>p]:text-[16px] [&>p]:leading-[1.95] [&>p]:text-ink [&>p]:mb-[22px] [@media(max-width:700px)]:[&>p]:text-[13px]">
                    <h2 class="eyebrow [.case-heading>&]:text-muted [.case-heading>&]:text-[9px] [.case-pagination_&]:text-[9px] [.case-pagination_&]:text-muted [@media(max-width:700px)]:[.case-pagination_&]:text-[7px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                        {{ t('p.overview') }}
                    </h2><p
                        v-for="(paragraph, i) in paragraphs"
                        :key="i"
                    >
                        {{ paragraph }}
                    </p><div
                        v-if="project.link?.length"
                        class="case-links flex flex-wrap gap-7 mt-8 [&_a]:flex [&_a]:items-center [&_a]:justify-between [&_a]:gap-[35px] [&_a]:[padding:12px_0] [&_a]:[border-bottom:1px_solid_var(--line)] [&_a]:text-[12px] [&_a]:no-underline [&_a:hover]:[border-color:var(--profile-color)] [&_svg]:w-[15px] [&_svg]:h-[15px]"
                    >
                        <a
                            v-for="link in project.link"
                            :key="link.url"
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                        >{{ link.label }} <SiteIcon name="arrow" /></a>
                    </div>
                </div>
            </section>
            <section
                v-if="assets.length"
                class="case-gallery grid gap-[35px] [&_figure]:m-0 [&_figure]:bg-surface [&_figure]:rounded-[8px] [&_figure]:overflow-hidden [&_img]:w-full [&_img]:h-auto [&_img]:max-h-[90svh] [&_img]:[object-fit:contain] [&_video]:w-full [&_video]:h-auto [&_video]:max-h-[90svh] [&_video]:[object-fit:contain] [@media(max-width:700px)]:gap-[18px]"
                :aria-label="t('p.gallery')"
            >
                <figure
                    v-for="(asset, i) in assets"
                    :key="asset.src"
                >
                    <video
                        v-if="asset.type === 'video'"
                        :src="asset.src"
                        controls
                        playsinline
                        preload="none"
                        :aria-label="`${project.name} — ${t('p.projectVideo')} ${i + 1}`"
                    /><img
                        v-else
                        :src="asset.src"
                        :alt="`${project.name} — ${t('p.projectImage')} ${i + 1}`"
                        loading="lazy"
                    >
                </figure>
            </section>
            <nav
                class="case-pagination mt-[90px] pt-[35px] [border-top:1px_solid_var(--line)] grid [grid-template-columns:1fr_1fr] gap-[35px] [&_a]:no-underline [&_a]:flex [&_a]:flex-col [&_a]:gap-[18px] [&_a:last-child]:text-right [&_a:last-child]:[align-items:flex-end] [&_strong]:text-[26px] [&_strong]:font-medium [&_strong]:tracking-[-.04em] [&_a:hover_strong]:text-profile [@media(max-width:700px)]:mt-[50px] [@media(max-width:700px)]:gap-[25px] [@media(max-width:700px)]:[&_strong]:text-[19px]"
                :aria-label="t('p.navigation')"
            >
                <NuxtLinkLocale :to="previous.path">
                    <span class="eyebrow [.case-heading>&]:text-muted [.case-heading>&]:text-[9px] [.case-pagination_&]:text-[9px] [.case-pagination_&]:text-muted [@media(max-width:700px)]:[.case-pagination_&]:text-[7px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">← {{ t('p.previousProject') }}</span><strong>{{ previous.name }}</strong>
                </NuxtLinkLocale><NuxtLinkLocale :to="next.path">
                    <span class="eyebrow [.case-heading>&]:text-muted [.case-heading>&]:text-[9px] [.case-pagination_&]:text-[9px] [.case-pagination_&]:text-muted [@media(max-width:700px)]:[.case-pagination_&]:text-[7px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">{{ t('p.nextProject') }} ↗</span><strong>{{ next.name }}</strong>
                </NuxtLinkLocale>
            </nav>
        </main>
        <SiteFooter />
    </div>
</template>
