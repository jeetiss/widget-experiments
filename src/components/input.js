import html from "../utils/html";
import WatchedValue from "../utils/w-v";
import listen from "../utils/listen";

class Input {
  constructor({ value = WatchedValue("") }, element) {
    this.inp = value;

    this.$element = element;
    this.$input = this.render();
  }

  render() {
    return html`
      <input class="js-inp" value="${this.inp.value()}" />
    `;
  }

  mount() {
    this.$element.appendChild(this.$input);

    this.subscriptions = [
      this.inp.subscribe(value => (this.$input.value = value)),

      listen(this.$input, "input", e => {
        this.inp.value(e.target.value);
      })
    ];
  }

  unmount() {
    this.$markup.remove();

    this.subscriptions.forEach(fn => fn());
  }
}

export { Input };
