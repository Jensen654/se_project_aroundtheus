export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._render = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => {
      const renderedItem = this._render(item);
      // this.addItem(renderedItem);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
