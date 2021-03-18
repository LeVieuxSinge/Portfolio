import * as Utils from '../Utils/Utils';

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

  add(eventName) {

    var event = this.events.find(e => e.name === eventName);

    if (event === undefined) {
      // Adds an event
      this.events.push({
        name: eventName,
        actions: [],
      });
    } else {
      if (this.debug) {
        console.error('An event with the same name was already declared.');
      }
    }
  }

  bind(eventName, action) {

    var event = this.events.find(e => e.name === eventName);

    if (event !== undefined) {
      if (typeof action === 'function') {
        event.actions.push(action);
      }
    } else {
      if (this.debug) {
        console.error('Cannot bind an action to an undefined event.');
      }
    }
  }

  call(eventName) {

    var event = this.events.find(e => e.name === eventName);

    if (event !== undefined) {
      event.actions.forEach(e => {
        e();
      });
    } else {
      if (this.debug) {
        console.error('Cannot call actions from an undefined event.');
      }
    }

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