class EmojiUnit extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Properties
    this.states = ['🥚', '🐣', '🐥', '🐔', '🍗'];
    this.currState = states[0];
    this.connected = false;

    // Render the state in markup
    const renderedState = document.createElement('span');
    renderedState.innerHTML = this.currState;

    // Create some styles for our rendered state
    const styles = document.createElement('style');
    styles.innerHTML = `
      span {
        box-sizing: border-box;
        display: inline-block;
      }
    `;

    // Attach the markup & styles to the shadow root
    this.shadowRoot.append(styles, renderedState);
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

  render() {
    // this.
  }
}

customElements.define('emoji-unit', EmojiUnit);