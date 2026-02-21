<script setup lang="ts">
import { mapRange } from "animejs";

const projects = useProjectsStore().getProjects();
</script>

<template>
    <LayoutGrid
        as="div"
        class="pt-20 pb-30 gap-y-6"
    >
        <div class="col-start-2 col-span-4 flex flex-col items-center gap-y-4 overflow-hidden">
            <div class="flex flex-col items-center gap-y-4 translate-y-20">
                <ConsoleOutput
                    size="sm"
                    color="subtext"
                >
                    I created a filter for you, hope it helps !
                </ConsoleOutput>
                <p class="font-display-lg">
                    all projects
                </p>
            </div>

            <ProjectsFilter class="z-1 w-full" />
        </div>

        <div class="col-span-full grid grid-cols-3 gap-6">
            <ProjectCard
                v-for="(project, i) in projects"
                :key="i"
                :project="project"
                :clickable="true"
                :style="{
                    transform: `rotate(${mapRange(Math.random(), 0, 1, -2, 2)}deg)`,
                }"
            />
        </div>
    </LayoutGrid>
</template>
