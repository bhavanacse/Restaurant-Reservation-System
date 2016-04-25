BookingsCollection = Backbone.Collection.extend({

	model : SingleBooking,

	url : "/bookings",

	parse : function(data) {
		return data;
	}
});