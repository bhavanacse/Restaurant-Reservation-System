// var whilApp = app || {};

//whilApp.singleRestaurantView = Backbone.View.extend({
SingleRestaurantNameView = Backbone.View.extend({

	//el : '#restaurantInfo',
	
	//tagName : "option",

	template : _.template($("#restaurantNamesTemplate").html()),

	
	events : {
		'click a' : 'getRestaurantInfo'
	},
	

	getRestaurantInfo : function(e) {

		e.preventDefault();
		
		var selectedRestaurantName = this.$('a').text().toLowerCase();

		globalRestaurantName = selectedRestaurantName;

		//$('p').html(selectedRestaurantName.toUpperCase() + ' Restaurant Information below.');
		var tempRestaurant = new SingleRestaurant();
		tempRestaurant.url = '/restaurants/' + selectedRestaurantName;
		tempRestaurant.fetch().done(function() {
			console.log(tempRestaurant.attributes);
			var singleRestaurantInfoView = new SingleRestaurantInfoView({ model : tempRestaurant });
			singleRestaurantInfoView.render();
		});
	},

	/*
	initialize : function() {
		this.listenTo(this.model, "change", this.render);
	},
	*/
	
	render: function() {
		console.log("I am in Render() of SingleRestaurantView.");
		console.log(this.model.toJSON());
		var restaurantTemplate = this.template(this.model.toJSON());
		this.$el.html(restaurantTemplate);
		return this;
	}

});

var globalRestaurantName;
var globalRestaurantID;

