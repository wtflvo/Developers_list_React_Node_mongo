const mongoose = require("mongoose");
const { BadRequestError } = require("../errorHandlers/error-types");

class DataValidator {
	checkBody(req, res, next) {
		try {
			if (
				!req.body.name ||
				!req.body.title ||
				!req.body.department ||
				!req.body.validFrom ||
				!req.body.validTo
			) {
				throw new BadRequestError("All fields are required");
			}
			next();
		} catch (error) {
			next(error);
		}
	}

	checkId(req, res, next) {
		try {
			if (!req.params.id) {
				throw new BadRequestError("Id is required");
			}

			if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
				throw new BadRequestError("Id is not valid");
			}
			next();
		} catch (error) {
			next(error);
		}
	}
}

const dataValidator = new DataValidator();

module.exports = dataValidator;
