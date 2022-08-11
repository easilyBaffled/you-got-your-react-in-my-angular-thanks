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
### Redux (Toolkit)
### Connections
### Portals
## TODOs
