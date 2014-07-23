# MultiRegion
This class extends the standard `Marionette.Region` class to add in functionality to allow multiple views to be contained in a single region. This class was created to work with Marionette 1.0.4. I cannot guarantee it will work with anything newer than that. When it's convenient, I will get around to testing this against other versions and, if applicable, update it.

## Showing and Closing
For the most part, you only need to use 2 methods: `show` and `close`, which both act similarly to their counterparts on the standart `Region`.

When you call `show` on a `MultiRegion`, instead of swapping out the old view and just showing the new one, `MultiRegion` appends the new view to the end of the region's DOM element. You may specify 0, 1, or more views to show:

```js
region = new MultiRegion({el:'#el'});

// with 0 arguments, the region will simply re-render all of the views contained in the region
region.show();

// with 1 view argument, the region will render and "show" that view after all of the views contained in the region
region.show(view0);

// with an array of views, the region will loop through them all and render, append, and "show" them all.
region.show([view1, view2, view 3]);

// After all these calls view0, view1, view2, and view3 should all be displaying in that order within the region.
```

The `close` method is very similar. You can specify 0, 1, or more views that you'd like to close. The views that are passed in will have their `close` or `remove` method called on them, and then removed from the region. If no views are specified, all of the views will be closed.

```js
// ... continuing from `show` examples

// with 1 view argument, the region will close that view
region.close(view1); // view0, view2, and view3 remain, in that order

// with an array of views, the region will loop through them all and close them all.
region.close([view0, view2]); // view3 remains

// with 0 arguments, the region will close all of the views contained in the region
region.close(); // no views remain, no matter how many were in there

// After all these calls, no views should be displaying in the region.
```