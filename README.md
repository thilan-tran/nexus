# Nexus

This is **Nexus**, my personal website, live at [thilantran.com](thilantran.com).

Nexus is built with React, and uses Gatsby as a static site generator for easy hosting on Netlify.

To build:
```bash
$ yarn install
$ gatsby develop # or gatsby build to serve from public/ folder
```
## Showcases

Nexus is no ordinary, bland portfolio website.
The landing page of Nexus features a carousel of unique, eye-catching web development showcases that
users can switch between and customize with options.

Currently, these showcase are:

1. Conway's Game of Life coded in JS using `canvas` methods and `window.requestAnimationFrame` to draw performant animations.
  - Includes options to change colors, trace cell path and change trace lengths, as well as feeding in a 1D cellular automata as input into the 2D Game of Life automata.
2. A animation of a random 1D cellular automata from one of the 256 [Wolfram codes](https://plato.stanford.edu/entries/cellular-automata/supplement.html), also coded in JS using `canvas`.
  - Includes options to change colors or switch between all rules and only pretty rules.
3. A simulation of particles and collisions again using JS and `canvas`.
  - Includes color and gravity options.

I plan to add more showcases as I go along,
and Nexus is designed to be modular enough so that additional showcases can be loaded in with ease.

A JS showcase module has the following interface:
```js
import {
  init,
  draw,
  clearDraw,
  spawn,
  spawnPrompt
  reset,
  options,
  setOption,
  optionsInputAttributes
} from 'showcase.js';
```
To load a new showcase module, import it in `src/components/App.js`, and add it to the `showcases` array along with
any initial options for the `init` function in `showcaseInitOptions`.

Nexus will call the module's functions as follows:
- `init` is called to initialize the showcase, and configured options from `showcaseInitOptions` are passed in.
- `draw` is called whenever the showcase is focused in the carousel, and `clearDraw` is called whenever the showcase becomes inactive.
- `spawn` is called when the main action button on the landing page is clicked.
  - `spawnPrompt` is the action text on the button.
- `reset` is called when a user clicks on the reset button in options.
- `options` is an array of constants or enums representing the possible shwowcase options.
- `setOption(option, val)` will be called by Nexus to set `val` for one option from `options`.
- `optionsInputAttributes` is an array that is used to initialize the options menu for the showcase.

Example `optionsInputAttributes`:
```js
const optionInputAttributes = [
  {
    desc: 'Greyscale', // user-friendly description for option
    attr: { // attributes that are spread onto the option's input element
      type: 'radio',
      name: 'color',
      id: 'greyscale'
    },
    option: options.greyscale, // the specific option to set (enum or constant)
    init: false // the initial value ('checked' for radio / checkboxes, or 'value' otherwise)
  },
  ... // rest of options
]
```
## Implementation Background

Originally Nexus was written entirely in native JS, without any libraries,
but I decided to port it to React / Gatsby in order to make future development less of a hassle,
and to take advantage of bundlers like Webpack to make the distribution more compressed
(eg. using webpack image compression plugins at first, and `gatsby-image` later on).
I also took the opportunity to try out Gatsby and use it as a framework.

The original native JS implementation can still be accessed under `pure-js/`.

### Simulating Click Events on Mobile

When I transitioned from my native JS to my React implementation,
I ran into issues where buttons or elements with `onClick` events would require *two* presses on mobile to activate.
Note that my React code was essentially a direct port of my native JS implementation,
which did *not* have this double click issue.

I ended up writing a custom hook to use the `touchstart`, `touchend`, and `touchmove` events
to *simulate* a click event on mobile (if touch is supported), which avoids the double click issue.

`useResponsiveClick` hook:
```js
// abridged hook implementation:
const useResponsiveClick = ( onClick, delay = 300) => {
  const [touchDown, setTouchDown] = useState(null);
  const onTouchMove = () => setTouchDown(null);
  const onTouchStart = () => setTouchDown(new Date());
  const onTouchEnd = (evt) => {
    if (touchDown && new Date() - touchDown < delay) {
      onClick(evt);
      setTouchDown(null);
      evt.preventDefault(); // don't trigger redundant click event that can occcur
    }
  };
  return { onTouchMove, onTouchStart, onTouchEnd };
};

// hook usage:
import { useResponsiveClick } from './hooks';

const responsiveButton = (props) => {
  const buttonEvents = useResponsiveClick(props.onClick):
  return (
    <div className="button" {...buttonEvents}>
      {props.buttonText}
    </div>
  );
};
```
