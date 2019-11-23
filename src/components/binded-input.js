import html from "../utils/html";
import WatchedValue from "../utils/w-v";
import { Input } from "./input";

class BindedInput {
  constructor({}, element) {
    this.value = WatchedValue("Binded input");

    this.$element = element;
    this.$markup = this.render();
    this.$bind = this.$markup.querySelector(".js-bind");

    this.input = new Input({ value: this.value }, this.$markup);
  }

  render() {
    return html`
      <div>
        <h1 class="js-bind">${this.value.value()}</h1>
      </div>
    `;
  }

  mount() {
    this.input.mount();
    this.$element.appendChild(this.$markup);

    this.subcriptions = [
      this.value.subscribe(value => (this.$bind.textContent = value))
    ];
  }

  unmount() {
    this.$markup.remove();

    this.subcriptions.forEach(fn => fn());
  }
}

export { BindedInput };
