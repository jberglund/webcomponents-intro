import {
  animate,
  stagger,
  spring,
  type AnimationControls,
  inView,
} from 'motion';

/**
 * If this component seems to be causing yankiness,,
 * it might be because it's lacking reveal-elements { display: contents; }
 */
class RevealElements extends HTMLElement {
  private animations: AnimationControls[] = [];
  private delay: number = 0;

  constructor() {
    super();
  }

  setupKeyframes() {
    if (this.children.length === 0) return;
    const animation = animate(
      this.querySelectorAll(':scope > *'),
      { opacity: [0, 1], y: [25, 0] },
      {
        delay: stagger(0.05, { start: this.delay }),
        autoplay: false,
        easing: spring({ stiffness: 100, damping: 20 }),
      }
    );

    return this.animations.push(animation);
  }

  setupInView() {
    inView(this, (e) => {
      animate(
        e.target,
        { opacity: [0, 1], y: [50, 0] },
        {
          delay: stagger(0.05, { start: this.delay }),
          easing: spring({ stiffness: 100, damping: 20 }),
        }
      );
    });
  }

  playAnimations() {
    this.animations.forEach((animation) => {
      animation.play();
    });
  }

  disconnectedCallback() {
    this.animations.forEach((animation) => {
      animation.stop();
    });
  }

  connectedCallback() {
    if (this.hasAttribute('delay')) {
      this.delay = parseFloat(this.getAttribute('delay') || '0');
    }
    this.setupKeyframes();
    this.playAnimations();
  }
}

customElements.define('reveal-elements', RevealElements);
