class PasswordVisibility extends HTMLElement {
	#hasConnected = false;
	#inputSlotEventAdded = false;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	// Runs when element is inserted into the DOM
	connectedCallback() {
		// Make sure the Shadow DOM hasn't already been populated before
		if (this.#hasConnected) return;
		this.#hasConnected = true;

		// Create a <slot> for the <label> in the Light DOM
		let slotLabel = document.createElement('slot');
		slotLabel.setAttribute('name', 'label');

		// Wrapper element for the pw <input>
		let inputWrapper = document.createElement('div');
		inputWrapper.setAttribute('id', 'input-wrapper');
		inputWrapper.innerHTML = `
			<slot name="password"></slot>
			<button>
				<!-- Visible -->
				<svg
					id="visible"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 503.99 243.87"
					aria-labelledby="show-password-title"
					role="img"
				>
					<title id="show-password-title">Show password</title>
					<defs>
						<style>
							.cls-1 {
								fill-rule: evenodd;
							}
						</style>
					</defs>
					<g id="Layer_2" data-name="Layer 2">
						<g id="Layer_1-2" data-name="Layer 1">
							<path
								class="cls-1"
								d="M5.76,136.71a21.83,21.83,0,0,1,0-29.55,336.49,336.49,0,0,1,492.48,0,21.85,21.85,0,0,1,0,29.55A335.83,335.83,0,0,1,252,243.87,335.82,335.82,0,0,1,5.76,136.71ZM252,36.77a85.17,85.17,0,1,1-85.17,85.16A85.2,85.2,0,0,1,252,36.77Z"
							/>
							<path
								class="cls-1"
								d="M296.43,121.94A44.43,44.43,0,1,1,252,77.51a44.43,44.43,0,0,1,44.43,44.43"
							/>
						</g>
					</g>
				</svg>
				<!-- Invisible -->
				<svg
					id="invisible"
					class="hidden"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 504 384.93"
					aria-labelledby="hide-password-title"
					role="img"
				>
					<title id="hide-password-title">Hide password</title>
					<defs>
						<style>
							.cls-1 {
								fill-rule: evenodd;
							}
						</style>
					</defs>
					<g id="Layer_2" data-name="Layer 2">
						<g id="Layer_1-2" data-name="Layer 1">
							<path
								class="cls-1"
								d="M414.05,3.2a10.95,10.95,0,0,0-15.47,0L62.74,339a10.95,10.95,0,0,0,0,15.47L90,381.73a10.94,10.94,0,0,0,15.46,0L441.26,45.89a10.92,10.92,0,0,0,0-15.47L414.05,3.2Z"
							/>
							<path
								class="cls-1"
								d="M405.43,107.5a338.25,338.25,0,0,1,92.81,70.19,21.83,21.83,0,0,1,0,29.55A335.82,335.82,0,0,1,252,314.4a338,338,0,0,1-49.8-3.67l34.48-34.47a85.21,85.21,0,0,0,100.48-83.79,85,85,0,0,0-1.38-15.32l69.65-69.65ZM98.57,277.44a338.48,338.48,0,0,1-92.81-70.2,21.83,21.83,0,0,1,0-29.55A337,337,0,0,1,301.8,74.2l-34.48,34.47a85.22,85.22,0,0,0-99.11,99.11L98.57,277.43Z"
							/>
						</g>
					</g>
				</svg>
			</button>
		`;

		// Holds the CSS for the component
		let styles = document.createElement('style');
		styles.innerHTML = `
			:host {
				display: var(--pv-display, inline-grid);
			}

			::slotted(input) {
				border: none;
				box-sizing: border-box;
				font-family: var(--pv-input-font-family, monospace);
				font-size: var(--pv-input-font-size, initial);
				height: var(--pv-input-height, 25px);
				padding-inline: 0 0 0 5px;
				width: 100%;
			}

			::slotted(label) {
				font-family: var(--pv-label-font-family, sans-serif);
				font-size: var(--pv-label-font-size, initial);
				margin-bottom: 5px;
			}

			button {
				background-color: transparent;
				border: none;
				box-sizing: border-box;
				cursor: pointer;
				height: var(--pv-input-height, 25px);
				opacity: 0.6;
				padding: 0;
				width: var(--pv-button-width, 23px);
			}

			button:hover,
			button:focus {
				opacity: 1;
			}

			button > svg {
				height: 100%;
				width: 100%;
			}

			div {
				align-items: center;
				border: var(--pv-input-border, 1px solid rgb(118, 118, 118));
				border-radius: var(--pv-input-border-radius, 2px);
				column-gap: 5px;
				display: inline-grid;
				grid-template-columns: auto var(--pv-button-width, 23px);
				padding-right: 5px;
				width: var(--pv-input-width, auto);
			}

			.hidden {
				display: none;
			}
		`;

		// Wait for the input <slot> to be populated before attaching events
		let pwVisibility = this;
		let slotInput = inputWrapper.querySelector('slot[name="password"]');
		slotInput.addEventListener('slotchange', (e) => {
			// Prevent duplicate events from being added
			if (pwVisibility.#inputSlotEventAdded) return;
			if (slotInput.assignedNodes().length === 0) return;
			pwVisibility.#inputSlotEventAdded = true;
			// Query the needed elements
			let eye = inputWrapper.querySelector('button');
			let visible = inputWrapper.querySelector('#visible');
			let invisible = inputWrapper.querySelector('#invisible');
			// Add functionality to the eye button
			eye.addEventListener('click', () => {
				visible.classList.toggle('hidden');
				invisible.classList.toggle('hidden');
				let type = visible.classList.contains('hidden') ? 'text' : 'password';
				// Swap the type attribute of the <input> element
				slotInput.assignedNodes()[0].setAttribute('type', type);
			});
		});

		// Append to shadow DOM
		this.shadowRoot.append(styles, slotLabel, inputWrapper);
	}
}

customElements.define('password-visibility', PasswordVisibility);
