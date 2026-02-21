/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

// None

/* ============================================================= */

class EventManager {

  constructor(params) {

    // -------- PARAMETERS -------- //

    var _params = params !== undefined ? params : {};

    this.events = [];

    this.debug = _params.debug !== undefined ? _params.debug : false;

  }

  // -------- METHODS -------- //

  bind(eventName, action) {

    // Invalid name
    if (!eventName || eventName === '') {
      this.debug ? console.error(new Error('Invalid name for event.')) : null;
      return;
    }

    // Invalid action
    if (!action || typeof action !== 'function') {
      this.debug ? console.error(new Error('Invalid action for event.')) : null;
      return;
    }

    // Get event
    var _event = this.events.find(e => e.name === eventName);

    // Event doesn't exist
    if (_event === undefined) {

      // Create event
      _event = {
        name: eventName,
        actions: [],
      };

      // Push event
      this.events.push(_event);

    }

    // Add action
    _event.actions.push(action);

  }

  unbind(eventName, action) {

    // Invalid name
    if (!eventName || eventName === '') {
      this.debug ? console.error(new Error('Invalid name for event.')) : null;
      return;
    }

    // Invalid action
    if (!action || typeof action !== 'function') {
      this.debug ? console.error(new Error('Invalid action for event.')) : null;
      return;
    }

    // Get event
    var _event = this.events.find(e => e.name === eventName);

    // Non existing event
    if (!_event) {
      this.debug ? console.error(new Error('No existing event with the name : ' + eventName)) : null;
      return;
    }

    // Remove action
    _event.actions.splice(_event.actions.indexOf(action), 1);

    // Remove event if empty
    if (_event.actions.length === 0) {
      this.events.splice(this.events.indexOf(_event), 1);
    }

  }

  call(eventName, payload) {

    // Invalid name
    if (!eventName || eventName === '') {
      this.debug ? console.error(new Error('Invalid name for event.')) : null;
      return;
    }

    // Get event
    var _event = this.events.find(e => e.name === eventName);

    // Non existing event
    if (!_event) {
      this.debug ? console.error(new Error('No existing event with the name : ' + eventName)) : null;
      return;
    }

    // Empty payload
    if (!payload) {
      payload = {};
    }

    // Call all actions
    _event.actions.forEach(e => {
        e(payload);
    });

  }

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
  EventManager,
}