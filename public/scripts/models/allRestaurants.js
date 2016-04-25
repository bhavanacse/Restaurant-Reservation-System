// var whilApp = app || {};

//whilApp.restaurantsCollection = Backbone.Collection.extend({
RestaurantsCollection = Backbone.Collection.extend({

	// model : whilApp.singleRestaurant,
	model : SingleRestaurant,

	url : "/restaurants",

	parse : function(data) {
		console.log("parsing. Raw response: " + data);
		data.forEach(function(d) {
			console.log("parsing: " + d["restaurantName"]);
		});
		return data;
	}
});

