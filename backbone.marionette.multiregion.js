Backbone.Marionette.MultiRegion = Backbone.Marionette.Region.extend({
	currentView: [],

	open: function(view) {
		this.ensureEl();
		this.$el.append(view.el);
	},

	/**
	 * Close the specified views and remove them from the Region. You can pass in a single `View`
	 * object, or pass in an array of them. All views passed in will be closed and removed from the
	 * Region. If no views are specified, all views in the region will be closed and removed.
	 *
	 * @param  {View|Array} views The views you want to close
	 * @return {MultiRegion}      The MultiRegion object. Enables chaining.
	 */
	close: function(views){
		if (typeof views === "object") {
			views = [views];
		}
		else if ( !views || !_.isArray(views)) {
			views = this.currentView;
		}

		_.each(views, this._closeView, this);

		this._removeViews(views);
		Marionette.triggerMethod.call(this, "close", views);

		return this;
	},

	/**
	 * Render additional views within the region. If a single `View` object is passed in, it will
	 * be rendered and "shown". You may also pass in an array of `View` objects, and each one will
	 * be rendered and "shown". If no views are passed in, all views currently within the region
	 * be re-rendered.
	 *
	 * @param  {View|Array} views The views you want to show
	 * @return {MultiRegion}      The MultiRegion object. Enables chaining.
	 */
	show: function(views) {
		if (typeof views === "object") {
			views = [views];
		}
		else if ( !views || !_.isArray(views)) {
			this.renderAll();
			return this;
		}

		_.each(views, this._showView, this);

		this._addViews(views);
		Marionette.triggerMethod.call(this, "show", views);

		return this;
	},

	_closeView: function(view) {
		if (view.close) {
			view.close();
		}
		else {
			// If it doesn't have a `close` method, at least remove it from the DOM with Backbone.View's `remove`
			view.remove();
		}

		Marionette.triggerMethod.call(this, "close", view);
	},

	_showView: function(view) {
		view.render();
		this.open(view);

		Marionette.triggerMethod.call(view, "show");
		Marionette.triggerMethod.call(this, "show", view);
	},

	_removeViews: function(views) {
		this.currentView = _.difference(this.currentView, views);
	},

	_addViews: function(views) {
		_.union(this.currentView, views);
	},

	/**
	 * If you have a view that is already rendered, but not attached to the DOM, this allows you to
	 * attach it to the DOM within this region without re-rendering or "showing" it. This method
	 * only takes individual views: no arrays.
	 *
	 * @param  {View} 		 view The view we want to add to the region
	 * @return {MultiRegion}      The MultiRegion object. Enables chaining.
	 */
	attachView: function(view) {
		this.open(view);
		this.currentView.push(view);

		return this;
	},

	/**
	 * Loop through each view currently within the region and re-render it.
	 *
	 * @return {MultiRegion} The MultiRegion object. Enables chaining.
	 */
	renderAll: function() {
		_.each(this.currentView, function(view){
			view.render();
		});

		return this;
	}
});