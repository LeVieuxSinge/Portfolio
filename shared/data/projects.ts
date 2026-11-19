import type { Project, ProjectRecord } from "../types/portfolio.ts";
import { deriveProfiles } from "../utils/catalog.ts";
import { localizedPath } from "../utils/navigation.ts";
import { siteLocales, navigationItems } from "./site.ts";
import amb from "./projects/amb.ts";
import amie from "./projects/amie.ts";
import bromont from "./projects/bromont.ts";
import cloner from "./projects/cloner.ts";
import cyberblade from "./projects/cyberblade.ts";
import ecd from "./projects/ecd.ts";
import feltkutur from "./projects/feltkutur.ts";
import grownshrink from "./projects/grownshrink.ts";
import identity from "./projects/identity.ts";
import livingTypo from "./projects/living-typo.ts";
import monologue from "./projects/monologue.ts";
import ryker from "./projects/ryker.ts";
import schluter from "./projects/schluter.ts";
import simona from "./projects/simona.ts";
import tileMapGenerator from "./projects/tile-map-generator.ts";
import unstable from "./projects/unstable.ts";

/** Source records contain authored facts; canonical profiles are derived once here. */
const projectRecords: readonly ProjectRecord[] = [
    amb, amie, bromont, cloner, cyberblade, ecd, feltkutur, grownshrink, identity, livingTypo, monologue, ryker, schluter, simona, tileMapGenerator, unstable,
];

export const projects: readonly Project[] = projectRecords.map(project => ({ ...project, profiles: deriveProfiles(project.contributions) }));

export const selectedProjects = projects.filter(project => project.featuredOrder !== undefined).sort((a, b) => a.featuredOrder! - b.featuredOrder!);

export const contentRoutes = siteLocales.flatMap(({ code }) => [
    ...navigationItems.map(item => localizedPath(item.path, code)),
    ...projects.map(project => localizedPath("/project/" + project.slug, code)),
]);
