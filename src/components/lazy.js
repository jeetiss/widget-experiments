import html from "../utils/html";

class Lazy {
  constructor({ factory, options }, element) {
    this.$element = element;

    this.factory = factory;
    this.options = options;

    this.comp = null;

    this.$markup = this.render();

    window.requestIdleCallback(() => {
      factory().then(v => v);
    });
  }

  render() {
    const state = this.state;

    if (this.comp == null) {
      return html`
        <div>Loading...</div>
      `;
    } else {
      return this.comp.render();
    }
  }

  mount() {
    this.mounded = true;

    if (!this.comp) {
      this.$element.appendChild(this.$markup);
      this.loadAndCreate();
    } else {
      this.comp.mount();
    }
  }

  loadAndCreate() {
    if (this.comp) return;

    this.factory().then(Comp => {
      if (this.mounded) {
        this.$markup.remove();
        this.comp = new Comp.default(this.options, this.$element);

        this.comp.mount();
      }
    });
  }

  unmount() {
    this.mounded = false;
    this.$markup.remove();

    if (this.comp) {
      this.comp.unmount();
    }
  }
}

export { Lazy };
