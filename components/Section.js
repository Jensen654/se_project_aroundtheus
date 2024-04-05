export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._render = renderer;
    this._classSelector = classSelector;
  }

  renderItems() {
    this._items.forEach((item) => {
      const renderedItem = this._render(item);
      // this.addItem(renderedItem);
    });
  }

  addItem(element) {
    this._classSelector.prepend(element);
  }
}
