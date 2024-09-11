import { basicUrl } from "../constants/path";

class HttpHelper {
	async get() {
		try {
			const response = await fetch(basicUrl);
			if (response.ok) {
				const userData = await response.json();
				return userData;
			}
		} catch (err) {
			console.log(err);
		}
	}

	async post(data) {
		try {
			const response = await fetch(basicUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				const userData = await response.json();
				console.log("Created user", userData);
				return userData;
			}
		} catch (err) {
			console.log(err);
		}
	}
	async put(id, data) {
		try {
			const response = await fetch(`${basicUrl}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				return response.json();
			}
		} catch (err) {
			console.log(err);
		}
	}
	async delete(id) {
		try {
			const response = await fetch(`${basicUrl}/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				return response.json();
			}
		} catch (err) {
			console.log(err);
		}
	}
}
const http = new HttpHelper();
export default http;
