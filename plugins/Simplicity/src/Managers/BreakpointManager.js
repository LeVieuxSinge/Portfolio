/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

var ScrollBarWidth = (function () {

  // SSR Gate
  if (typeof document === 'undefined') return 0;

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;

});

/* ============================================================= */

class BreakpointManager {

  constructor({
    thresholds = {
      xs: 600, // < 600
      sm: 600, // >= 600
      md: 960, // >= 960
      lg: 1264, // >= 1264
      xl: 1904, // >= 1904
      mobile: 960,
    },
    debug = false,
  }) {

    // -------- PARAMETERS -------- //

    // Thresholds
    this.thresholds = thresholds;

    // Breakpoints
    this.xs = false;
    this.sm = false;
    this.md = false;
    this.lg = false;
    this.xl = false;

    // Conditionals
    this.xsOnly = false;
    this.smAndDown = false;
    this.smAndUp = false;
    this.mdAndDown = false;
    this.mdAndUp = false;
    this.lgAndDown = false;
    this.lgAndUp = false;
    this.xlOnly = false;

    // true if screen width < mobileBreakpoint
    this.mobile = false;

    // Hover
    this.hover = false;

    // Current breakpoint name (e.g. 'md')
    this.name = '';

    // Dimensions
    this.height = 0;
    this.width = 0;

    // Scrollbar
    this.scrollBarWidth = ScrollBarWidth();

    this.resizeTimeout = 0;
    this.debug = debug;

    this.init();

  }

  // -------- METHODS -------- //

  init() {

    this.update();

    // SSR Gate
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    window.addEventListener('resize', this.onResize.bind(this), {
      passive: true
    });

  }

  update() {

    // SSR Gate
    if (typeof document === 'undefined' || typeof window === 'undefined') return;

    // Get height and width values
    this.height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    this.width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    // xs
    if (this.width < this.thresholds.sm) {
      this.xs = true;
      this.sm = false;
      this.md = false;
      this.lg = false;
      this.xl = false;

      this.xsOnly = true;
      this.smAndDown = true;
      this.smAndUp = false;
      this.mdAndDown = true;
      this.mdAndUp = false;
      this.lgAndDown = true;
      this.lgAndUp = false;
      this.xlOnly = false;

      this.name = 'xs';
    }

    // sm
    else if (this.width > this.thresholds.sm && this.width < this.thresholds.md) {
      this.xs = false;
      this.sm = true;
      this.md = false;
      this.lg = false;
      this.xl = false;

      this.xsOnly = false;
      this.smAndDown = true;
      this.smAndUp = true;
      this.mdAndDown = true;
      this.mdAndUp = false;
      this.lgAndDown = true;
      this.lgAndUp = false;
      this.xlOnly = false;

      this.name = 'sm';
    }

    // md
    else if (this.width > this.thresholds.md && this.width < this.thresholds.lg) {
      this.xs = false;
      this.sm = false;
      this.md = true;
      this.lg = false;
      this.xl = false;

      this.xsOnly = false;
      this.smAndDown = false;
      this.smAndUp = true;
      this.mdAndDown = true;
      this.mdAndUp = true;
      this.lgAndDown = true;
      this.lgAndUp = false;
      this.xlOnly = false;

      this.name = 'md';
    }

    // lg
    else if (this.width > this.thresholds.lg && this.width < this.thresholds.xl) {
      this.xs = false;
      this.sm = false;
      this.md = false;
      this.lg = true;
      this.xl = false;

      this.xsOnly = false;
      this.smAndDown = false;
      this.smAndUp = true;
      this.mdAndDown = false;
      this.mdAndUp = true;
      this.lgAndDown = true;
      this.lgAndUp = true;
      this.xlOnly = false;

      this.name = 'lg';
    }

    // xl
    else if (this.width > this.thresholds.xl) {
      this.xs = false;
      this.sm = false;
      this.md = false;
      this.lg = false;
      this.xl = true;

      this.xsOnly = false;
      this.smAndDown = false;
      this.smAndUp = true;
      this.mdAndDown = false;
      this.mdAndUp = true;
      this.lgAndDown = false;
      this.lgAndUp = true;
      this.xlOnly = true;

      this.name = 'lg';
    }

    // mobile
    if (this.width < this.thresholds.mobile) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }

    // hover
    this.hover = window.matchMedia('(hover: hover)').matches;

  }

  onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = window.setTimeout(this.update.bind(this), 100);
  }

  // -------- GETTERS -------- //

  get xs() {
    return this._xs;
  }

  get sm() {
    return this._sm;
  }

  get md() {
    return this._md;
  }

  get lg() {
    return this._lg;
  }

  get xl() {
    return this._xl;
  }

  get xsOnly() {
    return this._xsOnly;
  }

  get smAndDown() {
    return this._smAndDown;
  }

  get smAndUp() {
    return this._smAndUp;
  }

  get mdAndDown() {
    return this._mdAndDown;
  }

  get mdAndUp() {
    return this._mdAndUp;
  }

  get lgAndDown() {
    return this._lgAndDown;
  }

  get lgAndUp() {
    return this._lgAndUp;
  }

  get xlOnly() {
    return this._xlOnly;
  }

  get mobile() {
    return this._mobile;
  }

  get name() {
    return this._name;
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  get scrollBarWidth() {
    return this._scrollBarWidth;
  }

  // -------- SETTERS -------- //

  set xs(value) {
    this._xs = value;
  }

  set sm(value) {
    this._sm = value;
  }

  set md(value) {
    this._md = value;
  }

  set lg(value) {
    this._lg = value;
  }

  set xl(value) {
    this._xl = value;
  }

  set xsOnly(value) {
    this._xsOnly = value;
  }

  set smAndDown(value) {
    this._smAndDown = value;
  }

  set smAndUp(value) {
    this._smAndUp = value;
  }

  set mdAndDown(value) {
    this._mdAndDown = value;
  }

  set mdAndUp(value) {
    this._mdAndUp = value;
  }

  set lgAndDown(value) {
    this._lgAndDown = value;
  }

  set lgAndUp(value) {
    this._lgAndUp = value;
  }

  set xlOnly(value) {
    this._xlOnly = value;
  }

  set mobile(value) {
    this._mobile = value;
  }

  set name(value) {
    this._name = value;
  }

  set height(value) {
    this._height = value;
  }

  set width(value) {
    this._width = value;
  }

  set scrollBarWidth(value) {
    this._scrollBarWidth = value;
  }

}

/* ============================================================= */

/**
 * Exports
 */
export {
  BreakpointManager,
}