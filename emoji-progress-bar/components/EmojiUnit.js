class EmojiUnit extends HTMLElement {
  // An array of all of the attributes whose augmentations to observe
  static get observedAttributes() {
    return ['state'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Properties
    this.states = ['🥚', '🐣', '🐥', '🐔', '🍗'];
    this.currState = this.states[0];
    this.connected = false;

    // Render the state in markup
    this.renderedState = document.createElement('span');
    this.render();

    // Create some styles for our rendered state
    const styles = document.createElement('style');
    styles.innerHTML = `
      span {
        box-sizing: border-box;
        display: inline-block;
      }
    `;

    // Attach the markup & styles to the shadow root
    this.shadowRoot.append(styles, this.renderedState);
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

  // Re-render the element if the percent has changed
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue == newValue || !this.connected) return;
    this.currState = this.states[Number(newValue) % this.states.length];
    this.render();
  }

  render() {
    this.renderedState.innerHTML = this.currState;
  }
}

customElements.define('emoji-unit', EmojiUnit);
