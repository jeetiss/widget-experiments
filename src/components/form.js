import isUrl from "is-url";

import html from "../utils/html";
import listen from "../utils/listen";
import WatchedValue from "../utils/w-v";

let validate = value => (isUrl(value) ? "" : "it's not URL 👀");

class UrlForm {
  constructor(options, element) {
    this.error = WatchedValue("");
    this.url = WatchedValue("");

    this.$element = element;
    this.$markup = this.render();

    this.$form = this.$markup.querySelector("form");
    this.$input = this.$markup.querySelector("input");
    this.$button = this.$markup.querySelector("button");
    this.$error = this.$markup.querySelector("form > div");
  }

  render() {
    return html`
      <div>
        <h1>Files from the Web</h1>

        <form>
          <input type="text" />

          <button>Upload</button>

          <div>${this.error.value()}</div>
        </form>
      </div>
    `;
  }

  mount() {
    this.$element.appendChild(this.$markup);

    this.subscribtions = [
      listen(this.$form, "submit", e => {
        e.preventDefault();
        let value = this.url.value();

        if (!this.validated) {
          this.error.value(validate(value));
        }

        if (!this.error.value()) {
          console.log(value);
        }
      }),

      listen(this.$input, "change", e => {
        this.inputToched = true;
        this.url.value(e.target.value);
      }),

      listen(this.$input, "input", e => {
        if (this.inputToched) {
          this.url.value(e.target.value);
        }
      }),

      this.url.subscribe(value => {
        this.validated = true;
        this.error.value(validate(value));
      }),

      this.error.subscribe(error => {
        this.$error.textContent = error;
        this.$button.disabled = !!error;
      })
    ];
  }

  unmount() {
    this.$markup.remove();
  }
}

export { UrlForm };
