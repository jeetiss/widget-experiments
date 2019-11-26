import html from "../utils/html";
import listen from "../utils/listen";
import WatchedValue, { computed } from "../utils/w-v";

import "./uploader.css";

let ticker = (cb, delay = 10) => {
  let id = setInterval(cb, delay);

  return () => clearInterval(id);
};

class Progress {
  constructor({ value = WatchedValue(50) }, element) {
    this.size = 30;
    this.r = this.size / 2 - 3;
    this.circ = 2 * Math.PI * this.r;
    this.value = value;
    this.progress = computed(
      value => this.circ * (1 - value / 100),
      this.value
    );

    this.$element = element;
    this.$markup = this.render();

    this.$progress = this.$markup.querySelector("circle:last-child");
  }

  render() {
    let { size, r, circ } = this;
    let progress = this.progress.value();

    return html`
      <svg
        width="${size}"
        height="${size}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="transform: rotate(-90deg)"
        ;
      >
        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${r}"
          stroke-width="${size / 2 - r}"
          stroke="#e6e6e6"
        />

        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${r}"
          stroke-width="${size / 2 - r}"
          stroke="#f77a52"
          stroke-linecap="round"
          stroke-dasharray="${circ}"
          stroke-dashoffset="${progress}"
        />
      </svg>
    `;
  }

  mount() {
    this.$element.appendChild(this.$markup);

    this.off = [
      ticker(() => this.value.value((this.value.value() + 1) % 100)),

      this.progress.subscribe(() => {
        console.log("aaa", this.progress.value());
        let progress = this.progress.value();

        this.$progress.setAttribute("stroke-dashoffset", progress);
      })
    ];
  }

  unmount() {
    this.$markup.remove();

    this.off.forEach(fn => fn());
  }
}

class Uploader {
  constructor(options, element) {
    this.file = WatchedValue(null);

    this.$element = element;
    this.$markup = this.render();

    this.$input = this.$markup.querySelector("input");
    this.$label = this.$markup.querySelector("label");

    this.progress = new Progress({}, this.$markup);
  }

  render() {
    return html`
      <div class="uploader">
        <label for="file">
          Upload file
        </label>

        <input id="file" type="file" class="visually-hidden" />
      </div>
    `;
  }

  mount() {
    this.progress.mount();
    this.$element.appendChild(this.$markup);

    this.off = [
      this.file.subscribe(file => console.log(file)),

      listen(this.$input, "change", e => {
        this.file.value(e.target.files[0]);
      }),

      this.file.subscribe(file => {
        if (file) {
          this.$label.parentNode.replaceChild(
            html`
              <div>${file.name}</div>
            `,
            this.$label
          );
        }
      })
    ];
  }

  unmount() {
    this.progress.unmount();
    this.$markup.remove();

    this.off.forEach(fn => fn());
  }
}

export { Uploader };
