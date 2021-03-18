/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

// None

/* ============================================================= */

class ShowcaseReach {

  constructor({from, to, restDelta = 0.001}) {

    // -------- PARAMETERS -------- //

    var current = Object.assign({}, from);
    var keys = Object.keys(from);
    var raf = {
      current: null,
    };

    var _update = function (update, complete) {
      if (keys.length === 0) {
        cancelAnimationFrame(raf.current);
        raf.current = null;

        complete(current);
        return;
      }

      let cacheKeys = keys.slice();
      for (var i = keys.length, val, key; i >= 0; i--) {
        key = keys[i];
        val = current[key] + (to[key] - current[key]) * 0.1;
        if (Math.abs(to[key] - val) < restDelta) {
          current[key] = to[key];
          // Remove key
          keys.splice(i, 1);
          // Move i down by pne
          i--;
        } else {
          current[key] = val;
        }
      }

      update(current);
      raf.current = requestAnimationFrame(_update);
    };

    return {
      start: function ({
        update,
        complete
      }) {
        _update = _update.bind(null, update, complete);
        raf.current = requestAnimationFrame(_update);
        return {
          stop: function () {
            cancelAnimationFrame(raf.current);
            raf.current = null;
          }
        };
      }
    };

  }

  // -------- METHODS -------- //

  // None

  // -------- GETTERS -------- //

  // None

  // -------- SETTERS -------- //

  // None

}

/* ============================================================= */

/**
 * Exports
 */
export {
  ShowcaseReach,
}