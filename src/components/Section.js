export default class Section {
  constructor({ renderer }, container) {
    this._render = renderer;
    this._container = container;
  }

  renderItems(items) {
    items.forEach((item) => {
      return this._render(item);
      // this.addItem(renderedItem);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
