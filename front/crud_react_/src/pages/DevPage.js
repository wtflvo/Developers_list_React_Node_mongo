import { useEffect, useState } from "react";
import { DeveloperForm } from "../components/DeveloperForm";

import { DevTable } from "../components/DevTable";
import http from "../helpers/http";

export const DevPage = () => {
	const [devs, setDevs] = useState([]);

	const fetchData = async () => {
		try {
			const data = await http.get();
			setDevs([...data]);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<DeveloperForm fetchData={fetchData} />
			<DevTable devs={devs} fetchData={fetchData} />
		</>
	);
};
