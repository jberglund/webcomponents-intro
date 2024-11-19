const fjesStyles = `
  * { box-sizing: border-box; }
  :host {
    min-width: 100px;
    min-height: 100px;
    width: 100%;
    height: 100%;
    color: black;
    background: #eaeaea;
    --stroke-width: 6px;

    display: grid;
    justify-items: center;
    place-items: center;

    outline: 10px solid hsla(46, 100%, 59%, 1);
    border-radius: 1rem;
    container-type: inline-size;
  }

  :host > * {
    grid-column: 1;
    grid-row: 1;
  }

  .eyes-container{
    display: flex;
    justify-content: center;
    max-width: 100cqmin;
    gap: calc(var(--eye-gap-modifier) * calc(100cqmin - (var(--stroke-width) * 2))); 
  }

  .eye-svg {
    border-radius: 2rem;
    overflow: clip;
  }

  .eyes-container:hover .eye-svg {
    animation: 1000ms blink;
  }
 
  .eyes-container, .mouth-svg, .nose-svg{
    transform: translateX( 
      calc( 
        (var(--mouse-exact-x) - var(--element-center-x)) / var(--modifier,100)
      ) 
    ) translateY( 
      calc( 
        (var(--mouse-exact-y) - var(--element-center-y)) / var(--modifier,100)
      ) 
    );
    transition: transform 1500ms cubic-bezier(0.02, 0.94, 1, 1);

  }

  .mouth-svg{
    --modifier: 200;
    position: relative;
    top: calc(var(--mouth-position) * 1px);
  }

  .nose-svg{
    --modifier: 120;
    align-self: center;
    justify-self: center;
    position: relative;
  }

  @keyframes blink {
    0%, 100% { transform: translateY(-50%)}
    50% { transform: translateY(50%)}
  }

  .mouth-svg{
    align-self: end;
  }

  .mouth, .eye-line, .nose-line {
    stroke: black;
    stroke-width: calc(var(--stroke-width));
    stroke-linecap: round;
    fill: transparent;
    stroke-dasharray: 1;
    stroke-linejoin: round;
  }

  .mouth {
    stroke-dashoffset: clamp(-1, var(--mouth, 1), 0.99);
  }

  .eye-line {
    stroke-dashoffset: clamp(-1, var(--eyes, 1), 0.99);
  }

  @keyframes blink {
    0% { clip-path: ellipse(100% 90%); }
    50% { clip-path: ellipse(40% 0%); }
    100% { clip-path: ellipse(100% 90%); }
  }
  
`;
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(fjesStyles);

class FjesElement extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const height = 50;
    const mouthWidth = 80;
    const mouthCornerY = 20;
    const mouthMiddleY = 50;
    const mouthModifier = 0.1;

    shadow.innerHTML = `
      <div class="eyes-container">

          <svg class="eye-svg" width="8" height="20" >
            <line class="eye-line" pathLength="1" x1="4" y1="0" x2="4" y2="20" />
          </svg>


          <svg class="eye-svg" width="8" height="20" >
            <line class="eye-line" pathLength="1" x1="4" y1="0" x2="4" y2="20" />
          </svg>

      </div>
      <svg class="nose-svg" width="20" height="20" >
        <line class="nose-line" pathLength="1" x1="10" y1="5" x2="10" y2="15" />
        <line class="nose-line" pathLength="1" x1="10" y1="15" x2="14" y2="15" />
      </svg>
      <svg class="mouth-svg" width="${mouthWidth}" height="${height}"  >
        <path class="mouth" pathLength="1" d="M ${
          mouthWidth * mouthModifier
        } ${mouthCornerY} Q ${mouthWidth / 2} ${mouthMiddleY} ${
      mouthWidth * (1 - mouthModifier)
    } ${mouthCornerY} " /> 


      </svg>

        `;
    shadow.adoptedStyleSheets = [stylesheet];
  }
}

customElements.define("fjes-element", FjesElement);
