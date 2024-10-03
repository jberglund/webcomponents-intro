import {
  animate,
  stagger,
  spring,
  type AnimationControls,
  inView,
} from 'motion';

class FaceGen extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M93 56.5714C93 56.5714 84 87.5 48.9997 87.5C13.9994 87.5 7 55 7 55" stroke="black" stroke-width="10" stroke-linecap="round"/>

        <line x1="28" y1="23" x2="28" y2="70" stroke="black" stroke-width="10" stroke-linecap="round"/>

        <line x1="74" y1="23" x2="74" y2="70" stroke="black" stroke-width="10" stroke-linecap="round"/>

        <path d="M49 32.5V50.5C49 51.6046 49.8954 52.5 51 52.5H60.5" stroke="black" stroke-width="10" stroke-linecap="round"/>
</svg>

    `;
    shadow.adoptedStyleSheets = [styles];
  }

  disconnectedCallback() {}

  connectedCallback() {}
}

customElements.define('face-gen', FaceGen);
