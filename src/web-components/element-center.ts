class ElementCenter extends HTMLElement {
  private resizeObserver: ResizeObserver;
  private rafId: number | null = null;

  constructor() {
    super();
    this.resizeObserver = new ResizeObserver(() => this.updateCenter());
    this.resizeObserver.observe(this);
  }

  connectedCallback(): void {
    this.updateCenter();
  }

  disconnectedCallback(): void {
    this.resizeObserver.unobserve(this);
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private updateCenter(): void {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        const rect = this.getBoundingClientRect();

        const rootRect = document.documentElement.getBoundingClientRect();

        const centerX =
          rect.left - rootRect.left + rect.width / 2 + window.scrollX;
        const centerY =
          rect.top - rootRect.top + rect.height / 2 + window.scrollY;

        this.style.setProperty("--element-width", `${rect.width}px`);
        this.style.setProperty("--element-height", `${rect.height}px`);

        this.style.setProperty("--element-top", `${rect.top}px`);
        this.style.setProperty("--element-left", `${rect.left}px`);

        this.style.setProperty("--element-center-x", `${centerX}px`);
        this.style.setProperty("--element-center-y", `${centerY}px`);

        this.rafId = null;
      });
    }
  }
}

customElements.define("element-center", ElementCenter);
