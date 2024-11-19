class MouseTracker extends HTMLElement {
  private mouseX: number = 0;
  private mouseY: number = 0;
  private rafId: number | null = null;
  private boundUpdateMousePosition: (e: MouseEvent) => void;
  private boundHandleTouchMove: (e: TouchEvent) => void;

  constructor() {
    super();

    this.boundUpdateMousePosition = this.updateMousePosition.bind(this);
    this.boundHandleTouchMove = this.handleTouchMove.bind(this);
  }

  connectedCallback(): void {
    document.addEventListener("mousemove", this.boundUpdateMousePosition);
    document.addEventListener("touchmove", this.boundHandleTouchMove, {
      passive: false,
    });
    window.addEventListener("resize", () => this.requestUpdate());

    this.requestUpdate();
  }

  disconnectedCallback(): void {
    document.removeEventListener("mousemove", this.boundUpdateMousePosition);
    document.removeEventListener("touchmove", this.boundHandleTouchMove);
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private updateMousePosition(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.requestUpdate();
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    const touch = e.touches[0];
    this.updateMousePosition(
      new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      })
    );
  }

  private requestUpdate(): void {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => this.updateCSSVariables());
    }
  }

  private updateCSSVariables(): void {
    const rect = this.getBoundingClientRect();
    const mouseXPercent = (this.mouseX - rect.left) / rect.width;
    const mouseYPercent = (this.mouseY - rect.top) / rect.height;

    this.style.setProperty("--mouse-x", `${mouseXPercent.toFixed(2)}`);
    this.style.setProperty("--mouse-y", `${mouseYPercent.toFixed(2)}`);

    this.style.setProperty("--mouse-exact-x", `${this.mouseX}px`);
    this.style.setProperty("--mouse-exact-y", `${this.mouseY}px`);

    this.rafId = null;
  }
}

customElements.define("mouse-tracker", MouseTracker);
