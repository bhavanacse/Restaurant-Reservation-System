// var whilApp = app || {};

//whilApp.allRestaurantsView = Backbone.View.extend({
AllRestaurantsView = Backbone.View.extend({

	el : '#restauranNames',

	initialize : function() {
		this.myCollection = new RestaurantsCollection();
		// this.listenTo(this.myCollection, 'all', this.render);
      	// this.listenTo(this.myCollection, 'set', this.addOne); Doesn't work
		
		this.myCollection.fetch({success: renderCollection});
		//this.collection.on('change', this.render, this);
		//this.listenTo(this.collection, "change", this.render());
	},

    /*
    addOne: function(myCollection) {
     	console.log("hello3");
		console.log("helloo: " + myCollection.length);
		console.log("helloo: " + myCollection.get("0"));
    },
    */

  	render : function() {
		this.myCollection.each(this.addRestaurant, this);	
		return this;
	},

	addRestaurant : function(restaurant) {
		var restaurantView = new SingleRestaurantNameView({ model : restaurant });
		this.$el.append(restaurantView.render().el);
	}
});

var allRestaurantsView = new AllRestaurantsView();

function renderCollection(returnedCollection, response, options) {
	allRestaurantsView.render();
}

