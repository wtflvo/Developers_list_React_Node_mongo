const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		validFrom: {
			type: Date,
			required: true,
			default: Date.now,
		},
		validTo: {
			type: Date,
			required: true,
			default: new Date("2024-12-31"),
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Developer", developerSchema);
