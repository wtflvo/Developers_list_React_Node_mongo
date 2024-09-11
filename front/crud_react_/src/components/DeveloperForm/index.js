import { useState } from "react";
import http from "../../helpers/http";
import "./index.css";

export const DeveloperForm = ({ fetchData }) => {
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [department, setDepartment] = useState("");
	const [validFrom, setValidFrom] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [validTo, setValidTo] = useState("2024-12-31");

	const [errors, setErrors] = useState({});

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};

		if (!name) newErrors.name = "Name is required";

		if (!title) newErrors.title = "Title is required";
		if (!department) newErrors.department = "Department is required";
		const validFromDate = new Date(validFrom);
		const validToDate = new Date(validTo);

		if (validFromDate > validToDate) {
			newErrors.validFrom = "'Valid From' should not be later than 'Valid To'";
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			try {
				const response = await http.post({
					name,
					title,
					department,
					validFrom,
					validTo,
				});
				if (response._id) {
					setName("");
					setTitle("");
					setDepartment("");
					setValidFrom(new Date().toISOString().split("T")[0]);
					setValidTo("2024-12-31");
					await fetchData();
				}
			} catch (error) {
				console.error("Error adding developer:", error);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="dev-form">
				<h2>Add Developer</h2>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					{errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
				</div>

				<div>
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					{errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
				</div>

				<div>
					<label htmlFor="department">Department:</label>
					<input
						type="text"
						id="department"
						value={department}
						onChange={(event) => setDepartment(event.target.value)}
					/>
					{errors.department && (
						<div style={{ color: "red" }}>{errors.department}</div>
					)}
				</div>

				<div>
					<label htmlFor="validFrom">Valid From:</label>
					<input
						type="date"
						id="validFrom"
						value={validFrom}
						onChange={(event) => setValidFrom(event.target.value)}
					/>
					{errors.validFrom && (
						<div style={{ color: "red" }}>{errors.validFrom}</div>
					)}
				</div>

				<div>
					<label htmlFor="validTo">Valid To:</label>
					<input
						type="date"
						id="validTo"
						value={validTo}
						onChange={(event) => setValidTo(event.target.value)}
					/>
				</div>

				<button type="submit">Submit</button>
			</div>
		</form>
	);
};
