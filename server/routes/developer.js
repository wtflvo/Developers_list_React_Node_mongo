const router = require("express").Router();
const { NotFoundError } = require("../errorHandlers/error-types");
const Developer = require("../models/developer");
const dataValidator = require("../validators/fieldsValidator");

router.get("/", async (req, res, next) => {
	try {
		const developersList = await Developer.find().sort({ createdAt: -1 });
		res.status(200).send(developersList);
	} catch (error) {
		next(error);
	}
});

router.post("/", dataValidator.checkBody, async (req, res, next) => {
	try {
		const { name, title, department, validFrom, validTo } = req.body;

		const previousUser = await Developer.findOne().sort({ createdAt: -1 });

		const newUser = new Developer({
			name,
			title,
			department,
			validFrom,
			validTo,
		});
		await newUser.save();

		if (previousUser) {
			const newValidTo = new Date(validFrom);
			newValidTo.setDate(newValidTo.getDate() - 1);
			previousUser.validTo = newValidTo;
			await previousUser.save();
		}

		res.status(200).send(newUser);
	} catch (error) {
		next(error);
	}
});

router.put(
	"/:id",
	dataValidator.checkBody,
	dataValidator.checkId,
	async (req, res, next) => {
		try {
			const developer = await Developer.findById(req.params.id);
			developer.name = req.body.name;
			developer.title = req.body.title;
			developer.department = req.body.department;
			developer.validFrom = req.body.validFrom;
			developer.validTo = req.body.validTo;
			await developer.save();

			res.status(200).send(developer);
		} catch (error) {
			next(error);
		}
	}
);

router.delete("/:id", dataValidator.checkId, async (req, res, next) => {
	try {
		const id = req.params.id;
		const developer = await Developer.findByIdAndDelete(id);
		if (!developer) {
			throw new NotFoundError(`Developer with id not found`);
		}

		res.status(200).send(developer);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
