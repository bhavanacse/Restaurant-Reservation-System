SingleBooking = Backbone.Model.extend({

	defaults : {

		bookingID : "",
		personName : "",
		restaurantID : 0,
		restaurantName : "",
		totalMembers : 0,
		bookingDateNTime : "",
		comments : "",
		url : ""
	},

	idAttribute : "bookingID",

	validation : {
		personName : {
			required : true,
			msg : "Please enter your name." 
		},
		totalMembers : {
			required : true,
			msg : "Please enter number of members."

		},
		bookingDateNTime : {
			required : true,
			range : [new Date(), new Date() + 7],
			msg : "Please enter date and time."
		},
		comments : {
			length : 40,
			msg : "Comments should not exceed 40 characters."
		}
	}
});