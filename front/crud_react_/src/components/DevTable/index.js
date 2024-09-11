import { formatDate } from "../../helpers/date";

import { useState, useEffect } from "react";

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import "./index.css";
import http from "../../helpers/http";

const TableCell = ({ getValue, row, column, table }) => {
	const initialValue = getValue();
	const columnMeta = column.columnDef.meta;
	const tableMeta = table.options.meta;
	const [value, setValue] = useState(initialValue);
	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);
	const onBlur = () => {
		tableMeta?.updateData(row.index, column.id, value);
	};

	if (columnMeta?.type === "date") {
		if (tableMeta?.editedRows[row.id]) {
			return (
				<input
					type="date"
					value={value.split("T")[0]}
					onChange={(e) => setValue(e.target.value)}
					onBlur={onBlur}
				/>
			);
		}
		return <span>{formatDate(value)}</span>;
	}

	if (tableMeta?.editedRows[row.id]) {
		return (
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={onBlur}
				type={columnMeta?.type || "text"}
			/>
		);
	}
	return <span>{value}</span>;
};
const EditCell = ({ row, table }) => {
	const meta = table.options.meta;
	const setEditedRows = (e) => {
		const elName = e.currentTarget.name;
		if (elName === "cancel") {
			meta?.revertData();
		}
		meta?.changeEditedRow(row.id);
	};

	return (
		<div className="edit-cell-container">
			{meta?.editedRows[row.id] ? (
				<div className="edit-cell">
					<button onClick={setEditedRows} name="cancel">
						X
					</button>
					<button
						onClick={(e) => {
							setEditedRows(e);
							meta?.sendData(row.id);
						}}
						name="done"
					>
						✔
					</button>
				</div>
			) : (
				<button onClick={setEditedRows} name="edit">
					✐
				</button>
			)}
		</div>
	);
};

const DeleteCell = ({ row, table }) => {
	const meta = table.options.meta;

	return (
		<div className="delete-cell-container">
			<button onClick={() => meta?.deleteData(row.id)} name="delete">
				🗑️
			</button>
		</div>
	);
};

const columnHelper = createColumnHelper();
const columns = [
	columnHelper.accessor("name", {
		header: "Name",
		cell: TableCell,
		meta: {
			type: "text",
		},
	}),
	columnHelper.accessor("title", {
		header: "Title",
		cell: TableCell,
		meta: {
			type: "text",
		},
	}),
	columnHelper.accessor("department", {
		header: "Department",
		cell: TableCell,
		meta: {
			type: "text",
		},
	}),
	columnHelper.accessor("validFrom", {
		header: "Valid From",
		cell: TableCell,
		meta: {
			type: "date",
		},
	}),
	columnHelper.accessor("validTo", {
		header: "Valid To",
		cell: TableCell,
		meta: {
			type: "date",
		},
	}),
	columnHelper.display({
		id: "edit",
		cell: EditCell,
	}),
	columnHelper.display({
		id: "delete",
		cell: DeleteCell,
	}),
];
export const DevTable = ({ devs, fetchData }) => {
	const [newData, setNewData] = useState(devs);
	const [originalData, setOriginalData] = useState(devs);
	const [editedRows, setEditedRows] = useState({});

	useEffect(() => {
		setNewData(devs);
		setOriginalData(devs);
	}, [devs]);

	const table = useReactTable({
		data: newData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			editedRows,

			changeEditedRow: (newRowId) => {
				setEditedRows((prev) => {
					const updated = {};
					if (newRowId in prev) {
						if (Object.keys(prev).length === 1) {
							return {};
						}
						return updated;
					} else {
						updated[newRowId] = true;
						return updated;
					}
				});
			},
			revertData: () => {
				setNewData([...originalData]);
			},
			updateData: (rowIndex, columnId, value) => {
				setNewData((old) =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex],
								[columnId]: value,
							};
						}
						return row;
					})
				);
			},
			sendData: async (rowId) => {
				const rowData = newData[parseInt(rowId)];

				try {
					const response = await http.put(`${rowData._id}`, rowData);
					if (response._id) {
						await fetchData();
						setEditedRows({});
					}

					console.log("Update successful", response);
				} catch (error) {
					setNewData([...originalData]);
					console.error("Update failed", error);
				}
			},

			deleteData: async (rowId) => {
				const rowData = newData[parseInt(rowId)];
				try {
					const response = await http.delete(rowData._id);

					if (response._id) {
						await fetchData();
						setEditedRows({});
					}
					console.log("Delete successful", response);
				} catch (error) {
					setNewData([...originalData]);
					console.error("Delete failed", error);
				}
			},
		},
	});
	return (
		<div className="table-wrapper">
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
