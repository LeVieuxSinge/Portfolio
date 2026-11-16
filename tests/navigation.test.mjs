import assert from "node:assert/strict";
import { test } from "node:test";
import { isLocaleNavigation, needsCoveredNavigation, localizedPageKey, scrollDownTarget } from "../shared/utils/navigation.ts";

test("locale swaps identify only equivalent localized pages", () => {
    assert.equal(localizedPageKey("/fr/"), "/");
    for (const path of ["/", "/work", "/archive", "/about", "/project/ecd"]) {
        const french = path === "/" ? "/fr" : `/fr${path}`;
        assert.equal(isLocaleNavigation(french, path), true);
        assert.equal(isLocaleNavigation(path, french), true);
    }
    assert.equal(isLocaleNavigation("/fr/work", "/archive"), false);
    assert.equal(isLocaleNavigation("/project/ecd", "/project/amb"), false);
    assert.equal(isLocaleNavigation("/fr/work", "/fr/work"), false);
});

test("every page change uses the covered handoff while locale and query updates stay in place", () => {
    for (const from of ["/", "/work", "/archive", "/about", "/project/amb"]) {
        for (const to of ["/", "/work", "/archive", "/about", "/project/ecd"]) {
            assert.equal(needsCoveredNavigation(to, from), to !== from);
            const frenchFrom = `/fr${from === "/" ? "" : from}`;
            const frenchTo = `/fr${to === "/" ? "" : to}`;
            assert.equal(needsCoveredNavigation(frenchTo, frenchFrom), to !== from);
        }
    }
    assert.equal(needsCoveredNavigation("/fr/project/ecd", "/project/ecd"), false);
    assert.equal(needsCoveredNavigation("/fr/about", "/about"), false);
    assert.equal(needsCoveredNavigation("/archive", "/archive"), false);
});

test("the scroll-down destination also defines the header label threshold", () => {
    assert.equal(scrollDownTarget(900, 3000), 720);
    assert.equal(scrollDownTarget(780, 1100), 320);
    assert.equal(scrollDownTarget(900, 900), 0);
    assert.equal(scrollDownTarget(900, 700), 0);
});
