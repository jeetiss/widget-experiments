import html from "../utils/html";
import listen from "../utils/listen";
import WatchedValue from "../utils/w-v";

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

export { Tabs };
