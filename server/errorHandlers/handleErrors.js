const handleErrors = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode);

	res.json({
		status: "error",
		statusCode: statusCode,
		message: err.message || "Internal Server Error",
	});
};

module.exports = handleErrors;
