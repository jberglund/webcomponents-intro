const styles2 = new CSSStyleSheet();
styles2.replaceSync(/* css */ `
  :host{
    background-color: red;
    color: tomato;
  }
  :host([gap="xl"]){
    gap: 2rem;
  }
`);

class ExampleElement extends HTMLElement {
  constructor() {
    super();
    console.log(this);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <h1>hej</h1>
      
      <button>hej</button>

    `;
    shadow.adoptedStyleSheets = [styles2];
  }
}

customElements.define("example-element", ExampleElement);
