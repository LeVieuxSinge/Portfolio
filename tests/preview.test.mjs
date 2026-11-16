import assert from "node:assert/strict";
import { test } from "node:test";
import { previewFrame } from "../shared/utils/preview.ts";

test("previews anchor above the cursor and retain their size at every window edge", () => {
    const center = previewFrame(720, 600, 1440, 900, 1920, 1080);
    assert.equal(center.width, 440);
    assert.equal(center.x + center.width / 2, 720);
    assert.equal(center.y + center.height, 600 - 44);
    for (const [x, y] of [[0, 0], [1440, 0], [0, 900], [1440, 900]]) {
        const edge = previewFrame(x, y, 1440, 900, 1920, 1080);
        assert.equal(edge.width, center.width);
        assert.equal(edge.height, center.height);
        assert.ok(edge.x >= 64 && edge.x + edge.width <= 1440 - 64);
        assert.ok(edge.y >= 64 && edge.y + edge.height <= 900 - 64);
    }
});
