import html from "./utils/html";
import listen from "./utils/listen";
import WatchedValue from "./utils/w-v";

class Hello {
  constructor(element) {
    this.element = element;

    this.markup = html`
      <h1>HELLO WORLD</h1>
    `;
  }

  mount() {
    this.element.appendChild(this.markup);
  }

  unmount() {
    this.markup.remove();
  }
}

class Counter {
  constructor(element, value = WatchedValue(0)) {
    this.element = element;
    this.counter = value;

    this.markup = html`
      <div>
        <h1>Counter example</h1>

        <div>
          Value:

          <span class="js-val">${this.counter.value}</span>
        </div>

        <div>
          <button class="js-inc">increment</button>
        </div>

        <div>
          <button class="js-dec">decrement</button>
        </div>
      </div>
    `;

    this.valElement = this.markup.querySelector(".js-val");
    this.increment = this.markup.querySelector(".js-inc");
    this.decrement = this.markup.querySelector(".js-dec");
  }

  mount() {
    this.element.appendChild(this.markup);

    this.subscriptions = [
      this.counter.subscribe(value => (this.valElement.textContent = value)),
      listen(this.increment, "click", () => (this.counter.value += 1)),
      listen(this.decrement, "click", () => (this.counter.value -= 1))
    ];
  }

  unmount() {
    this.markup.remove();
    this.subscriptions.forEach(unsub => unsub());
    this.subscriptions = [];
  }
}

class Tabs {
  constructor(element, tabs) {
    this.$element = element;
    this.activeTabIndex = WatchedValue(0);

    this.$markup = html`
      <div>
        <ul class="js-tabs">
          ${tabs.map(
            ([text], index) =>
              `<li><button data-index=${index}>${text}</button></li>`
          )}
        </ul>

        <div class="js-content"></div>
      </div>
    `;

    this.$container = this.$markup.querySelector(".js-content");
    this.$tabs = this.$markup.querySelector(".js-tabs");

    this.tabs = tabs.map(([_, ctr]) => ctr(this.$container));
    this.activeTab = this.tabs[0];
  }

  mount() {
    this.activeTab.mount();
    this.$element.appendChild(this.$markup);

    this.subscriptions = [
      this.activeTabIndex.subscribe(index => {
        this.activeTab.unmount();
        this.activeTab = this.tabs[index];
        this.activeTab.mount();
      }),

      listen(this.$tabs, "click", e => {
        if (e.target.dataset && "index" in e.target.dataset) {
          this.activeTabIndex.value = Number.parseInt(e.target.dataset.index);
        }
      })
    ];
  }

  unmount() {
    this.activeTab.unmount();
    this.$markup.remove();
  }
}

let root = document.querySelector("#root");
let gl = WatchedValue(10);

let tabs = new Tabs(root, [
  ["Hello World", element => new Hello(element)],
  ["Counter", element => new Counter(element)],
  ["Global Counter", element => new Counter(element, gl)]
]);

tabs.mount();
