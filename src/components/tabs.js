import html from "../utils/html";
import listen from "../utils/listen";
import WatchedValue from "../utils/w-v";

class Tabs {
  constructor({ tabs }, element) {
    this.$element = element;
    this.activeTabIndex = WatchedValue(0);
    this.tabNames = tabs.map(([text]) => text);

    this.$markup = this.render();

    this.$container = this.$markup.querySelector(".js-content");
    this.$tabs = this.$markup.querySelector(".js-tabs");

    this.tabs = tabs.map(([_, ctr]) => ctr(this.$container));
    this.activeTab = this.tabs[0];
  }

  render() {
    let { tabNames } = this;

    return html`
      <div>
        <ul class="js-tabs">
          ${tabNames.map(
            (text, index) =>
              `<li><button data-index=${index}>${text}</button></li>`
          )}
        </ul>

        <div class="js-content"></div>
      </div>
    `;
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
          this.activeTabIndex.value(Number.parseInt(e.target.dataset.index))
        }
      })
    ];
  }

  unmount() {
    this.activeTab.unmount();
    this.$markup.remove();
  }
}

export { Tabs };
