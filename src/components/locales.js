import html from "../utils/html";

class LocalesExample {
  constructor({ locale }, element) {
    this.$element = element;

    this.locale = locale;

    this.$markup = this.render();
  }

  render() {
    return html`
      <h1>${this.locale.value.header}</h1>
    `;
  }

  mount() {
    this.$element.appendChild(this.$markup);

    this.subscriptions = [
      this.locale.subscribe(() => {
        this.$markup.remove();
        this.$markup = this.render();
        this.$element.appendChild(this.$markup);
      })
    ];
  }

  unmount() {
    this.$markup.remove();

    this.subscriptions.forEach(fn => fn());
    this.subscriptions = [];
  }
}

export { LocalesExample };
