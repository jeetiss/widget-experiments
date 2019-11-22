import html from "../utils/html";

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

export { Hello };
