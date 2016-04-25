
// var whilApp = app || {};

//whilApp.singleRestaurant = Backbone.Model.extend({});
SingleRestaurant = Backbone.Model.extend({

	defaults: {
		ID: "",
		restaurantName : "",
		link : "",
		url : "",
		//vacancy : ""
		vacancy : {},
		totalCapacity : 0,
		lastBookingDateNTime: ""
  	},

  	idAttribute: "ID",

  	initialize: function() {
  		console.log("I am here in initialize() of Single Restaurant ");
  	}
});

