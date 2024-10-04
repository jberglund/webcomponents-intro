# Web Component basics!

Är web components redo?


## Vad är en web component?
Web components är egenligen ett paraply med  APIer som tillsammans låter en skapa nya HTML-tags.

- Custom Elements
- Shadow DOM
- HTML Templates
- Och en del speciella CSS-ting

- Basic structure
- Lifecycle callbacks
  - connectedCallback
  - disconnectedCallback
  - attributeChangedCallback
  - ... och adoptedCallback

## Olika WCs
 Man kan göra WCs med eller utan shadow DOM. Om det är utan så kallar man det gärna Light DOM. Då kommer stylingen från utanför WCn, och det enda den gör då är JS. 

## CSS
 - :host och ::host()
 - ::part()
 - ::slotted()

## Låt oss bygga något
 Vad kan vi bygga? Här är några förslag:
 - Podcast player
 - Nya profilen fjes generator
 - Synth?

 Personligen så gillar jag att göra små, små komponenter som gör en sak bra med så lite Shadow DOM som möjligt (pga FOUC)

