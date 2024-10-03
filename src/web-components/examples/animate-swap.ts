// TODO: allow a timer to change it back to the original state

const styles = new CSSStyleSheet();

/*
 * To avoid having to use position: absolute,
 * we'll use grid and layer both swap-from and swap-to on top of each other.
 * If the element you're swapping to is bigger than the swapee, the element will be the size of the biggest element.
 */

styles.replaceSync(/* css */ `
  :host{
    display: inline-grid;
    place-items: center;
    --swap-offset: 2em;
  }

  .swap-to, .swap-from {
    grid-column: 1;
    grid-row: 1;
    transition: transform 500ms cubic-bezier(0, 0, 0, 1.03), opacity 700ms ease;
  }

  .swap-to {
    transform: translateY(var(--swap-offset));
    opacity: 0;
    transition-delay: 100ms;
  }

  .swap-from {
    transform: translateY(0%);
    opacity: 1;
  }

  :host([swapped="true"]) .swap-to {
    transform: translateY(0);
    opacity: 1;
  }
  
  :host([swapped="true"]) .swap-from{
    transform: translateY(calc(var(--swap-offset) * -1));
    opacity: 0;
  }
`);

class AnimateElementSwap extends HTMLElement {
  private _swapped = false;

  set swapped(state: boolean) {
    this._swapped = state;
    this.setAttribute('swapped', `${state}`);
  }

  get swapped() {
    return this._swapped;
  }

  static get observedAttributes() {
    return ['swapped'];
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    // if the attribute is changed outside of the web component, we'll want to update the internal state to be the same.
    if (name === 'swapped') {
      this._swapped = newValue === 'true' ? true : false;
    }
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <div class="swap-from">
        <slot></slot>
      </div>
      <div class="swap-to">
        <slot name="swap-to"></slot>
      </div>
    `;
    shadow.adoptedStyleSheets = [styles];
  }
}

customElements.define('animate-element-swap', AnimateElementSwap);

export default AnimateElementSwap;
