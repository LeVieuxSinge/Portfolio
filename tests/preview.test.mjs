import assert from "node:assert/strict";
import { test } from "node:test";
import { previewFrame } from "../shared/utils/preview.ts";

test("previews align their left center to the cursor's right and can overflow the viewport", () => {
    const center = previewFrame(720, 600, 1440, 900, 1920, 1080);
    assert.equal(center.width, 440);
    assert.equal(center.x, 720 + 36);
    assert.equal(center.y + center.height / 2, 600);
    for (const [x, y] of [[0, 0], [1440, 0], [0, 900], [1440, 900]]) {
        const edge = previewFrame(x, y, 1440, 900, 1920, 1080);
        assert.equal(edge.width, center.width);
        assert.equal(edge.height, center.height);
        assert.equal(edge.x, x + 36);
        assert.equal(edge.y + edge.height / 2, y);
    }
    assert.ok(previewFrame(1440, 900, 1440, 900, 1920, 1080).x + center.width > 1440);
    const portrait = previewFrame(600, 400, 1280, 720, 1080, 1920);
    assert.equal(portrait.height, 300);
    assert.equal(portrait.width / portrait.height, 1080 / 1920);
    assert.equal(portrait.y + portrait.height / 2, 400);
});
