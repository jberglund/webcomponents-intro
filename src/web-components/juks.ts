const template = document.createElement("template");

template.innerHTML = /*html*/ `
  <slot></slot>
`;

const styles = new CSSStyleSheet();
styles2.replaceSync(/* css */ `
  :host{
    background-color: red;
    color: tomato;
  }
`);

//styles.replaceSync(externalStyles);

class JuksExampleElement extends HTMLElement {
  static get observedAttributes() {
    return ["color"];
  }

  constructor() {
    super();
    /*
    const shadow = this.attachShadow({ mode: 'open' }); 
    shadow.innerHTML = `
      <slot></slot>
    `;
    shadow.adoptedStyleSheets = [styles]; */

    console.log("constructor", this);
  }

  connectedCallback() {
    console.log("connectedCallback");
  }
  disconnectedCallback() {
    console.log("disconnectedCallback");
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define("example-element", JuksExampleElement);
