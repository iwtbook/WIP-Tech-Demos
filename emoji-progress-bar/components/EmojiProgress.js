class EmojiProgress extends HTMLElement {
  // An array of all of the attributes whose augmentations to observe
  static get observedAttributes() {
    return ['percent'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.emojiUnits = [];
    for (let i = 0; i < 25; i++) {
      let emojiUnit = document.createElement('emoji-unit');
      emojiUnit.setAttribute('state', '0');
      this.emojiUnits.push(emojiUnit);
      this.shadowRoot.append(emojiUnit);
    }

    this.connected = false;
    // Make percent readonly so they must use the "percent" attribute to change it
    Object.defineProperty(this, 'percent', {
      configurable: true,
      value: null,
      writeable: false,
    });
  }

  // Re-render the element if the percent has changed
  attributeChangedCallback(name, oldValue, newValue) {
    if (name != 'percent' || (oldValue == newValue) | !this.connected) return;
    this.render();
  }

  // Renders the component when it's added to the DOM
  connectedCallback() {
    this.connected = true;
    this.render();
  }

  // Sets connected to false so the component does not try to re-render if
  // attributes are changed
  disconnectedCallback() {
    this.connected = false;
  }

  // Renders the component if it's moved to a new DOM
  adoptedCallback() {
    this.connected = true;
    this.render();
  }

  // Displays the correct <emoji-unit>s according to the element's percent
  render() {
    const percent = this.getAttribute('percent');

    // Check to make sure the new percent is within the bounds
    if (percent < 0 || percent > 100) {
      console.error(
        '<emoji-progress> Value Error: Expected "percent" ' +
          'attribute to be between 0 and 100 (inclusive of both 0 and 100), ' +
          'received value of ' +
          `${percent}`
      );
      return;
    }

    for (let i = 0; i < this.emojiUnits.length; i++) {
      this.emojiUnits[i].setAttribute('state', '0');
    }

    for (let i = 0; i < Math.floor(percent / 4); i++) {
      this.emojiUnits[i].setAttribute('state', '4');
    }

    if (percent < 100) {
      this.emojiUnits[Math.floor(percent / 4)].setAttribute(
        'state',
        `${percent % 4}`
      );
    }

    // Re-define percent with the new value, keep it readonly
    Object.defineProperty(this, 'percent', {
      configurable: true,
      value: percent,
      writeable: false,
    });
  }
}

customElements.define('emoji-progress', EmojiProgress);
