import html from "../utils/html";
import listen from "../utils/listen";
import WatchedValue from "../utils/w-v";

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

export { Counter };
