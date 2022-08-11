# You Got Your React in My Angular. ...Thanks
### Using React Components in an Angular app thanks to React Portals and Redux
---
⚠️ **Warning**: This documentation is very much under construction so it may be *a little* hard to read at times. 

## Purpose
> When you can't just start from scratch.

When working on a legacy project, if you're anything like me, every morning, you quietly contemplate to yourself how nice it would be if you could take all of this hard work that you and your co-workers have put in over the weeks, months, and years, and burn it to the ground and start over. Surely this time, you would get it perfect if only you had a clean slate. 
Sadly the real world rarely offers us that opportunity. It doesn't make a difference to the customer if you used tabs or spaces. 
For my team, it was the wish to start over with React instead of Angular. 
This project is a proof-of-concept showing how we are able to slowly transition from Angular to React without having to put the breaks on and without slowing down our forward progress. We are able to do this by using React components within the existing Angular project.

### Goals
> Reader and Customer friendly

 **No extra build or compilation steps**
 
This was only going to work if it was easy to use and easy to debug. I wanted it as JavaScript-y as possible. I set aside options like [Mitosis](https://github.com/BuilderIO/mitosis), [Stencil](https://stenciljs.com/docs/getting-started), or [Web Components](https://thalava.com/how-to-use-react-web-components-in-angular). If you have used Angular and React, then there should be very little else that you will need to learn. 

**Minimal Boilerplate**

The benefits of React alone wouldn't be enough if every new component required a day's worth of work to set up. Just look at the backlash Redux got because people thought that they *had* to use `switch`. Setup and integration had to be trivial if this was going to be a sustainable solution. And again, as JavaScript-y as possible, no magic compilation steps to hide the work.

**Unnotisable by the customer**

It was important that this was a seamless experience for the developers, but it was absolutely critical that this was unnoticeable by customers. UX bugs and performance hits were deemed unacceptable. The other goals were more subjective, but this was absolute.

**Components Integration, Not Separate Pages**

When most people heard what I was planning, their first thought was, "oh sure. When you open a new page, you could have React render the page inside a single Angular component; Job done". But no, my plans were far more ambitious. I wanted everything to work on an individual component level. Buttons, Inputs, Modals, everything should work on the smallest level. This was to be true integration. 

### Additional Opportunities
- Enforce Eslint rules
- Better use of Material Design 
- React Query-ish

## Architecture (As It Were)
### [React Portals](https://reactjs.org/docs/portals.html)
> Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-[React Official Docs](https://reactjs.org/docs/portals.html)

I have never used `React.createPortal` for its intended purpose. Which makes it funny that none of this would have worked without it. It boils down to this: You need to bind your React app to a DOM element with `ReactDOM.createRoot(someElem).render(<App />)` but within `App` you can bind individual components to other elements with `ReactDOM.createPortal( <Button />, someOtherElm)`.  Your `<Button>` will sit outside of the App's DOM tree but still benefit from the structure. So your App was wrapped in MUI's `<ThemeProvider theme={theme}>` `Button` would still be able to access `theme`.

For this project, the top-level React component `App`  holds all of the stand-alone portal-ed components and sets up all of the contexts they may need to share. And each of those portal-ed components (literally wrapped with a `<Portal>` component) will hook onto DOM nodes that are created by the Angular app. That way, the React component can render within the Angular component. 


### Redux (Toolkit)
I have already read [You Might Not Need Redux.](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367), and this project falls into that *might* category. You see, once I had React components rendering within Angular components, I needed them to communicate. There are a number of possible solutions for communication. I encountered a few of them back in my AOL days, which can get very ugly. 
I ruled out having the frameworks or components communicate directly with one another. It would have required a lot of extra wiring and shared context. All of that would make future refactoring a nightmare. And you should always be asking yourself, "how will this refactor?" when writing code.
Instead, I chose to go with what I knew, a global store that held all relevant state. Angular and React could communicate *just* to the global store and not have to care that there was another framework doing the same.
I chose to go with Redux because it was one of the few battle-tested frameworks-agnostic options. [Redux Toolkit](https://redux-toolkit.js.org/) (aka. the "right" way to write Redux) was incredibly easy to integrate and came with the benefit of [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for shared data fetching and caching.

## Example
 I will start with an example that is also the core of this project, Portals.

We start with an Angular dead-simple component:
```ts
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { store } from "@app/store";
import { activate, deactivate } from "@app/react/components/Portal";

@Component({
	selector: "portal-hook",
	template: `<div [attr.data-portal-hook]="selector"></div>`,
})
export class PortalHookComponent implements OnInit, OnDestroy {
	@Input("selector") selector = "";

	constructor() {}

	// might need to be ngAfterViewInit
	ngOnInit(): void {
		store.dispatch(activate(this.selector));
	}

	ngOnDestroy(): void {
		store.dispatch(deactivate(this.selector));
	}
}
``` 

You use it in your app like so `<portal-hook selector="portal-example">`. When it is rendered, an action is fired off to the Redux store `{ type: 'activate', payload: 'portal-example' }` Because this is Redux Toolkit, we have a slice of state called `portalRegistry` to handle this action 

```ts
import { createSlice } from '@reduxjs/toolkit'

type PortalRegistry = Record<string, boolean>;

const initialState: PortalRegistry = {}

export const portalRegistrySlice = createSlice({
	name: 'portalRegistry',
	initialState,
	reducers: {
		activate(state, action) {
			state[action.payload] = true
		},
		deactivate(state, action) {
			state[action.payload] = false;
		}
	},
})

export const { activate, deactivate } = portalRegistrySlice.actions
export const reducer =  portalRegistrySlice.reducer
```

The store updates setting `{ "portal-example": true }` in `state.portalRegistry`, and the store updates any and all subscribers that something has changed. One of those subscribers is the React app and, more specifically, our `<Portal selector="portal-example" />` component:

```jsx
export function _Portal({ isActive, selector, children }) {
	if (!isActive) return null;

	return createPortal(
		children,
		document.querySelector(`[data-portal-hook="${selector}"]`)
	);
}

function mapStateToProps(state, { selector }) {
	return { isActive: state.portalRegistry[selector] }
}

export const Portal =  connect(mapStateToProps)(_Portal)
```

Each `Portal` instance checks if *its* selector has been flipped to `true`. When that happens, the `createPortal` function renders the children to the `div` produced by `portal-hook`. 
Eventually, when the `portal-hook` unmounts, the whole loop runs again, setting `portal-example` to `false` in the store, causing `Portal` to go away as well. And that is the circle of life for our portals.

## TODOs
### Features
	- [ ] move from Routing to  `portalRegistry`
### Documentation 
	- [ ] Add links to files in ReadMe
	- [ ] Add an example for fetching data
### Infrastructure
	- [ ] plop files for `features`
	- [ ] plop files for `slices` (that add slice reducer to `store`)
	- [ ] linting
	- [ ] Cypress Component testing examples
	- [ ] Test Coverage
