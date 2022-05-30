import { useState } from "react";
import { RightSideFieldBar } from "./RightSideFieldBar.js";
import { DropFieldsContainer } from "./DropFieldsContainer.js";
import { fieldList } from "./FieldListConfig";
import "./app.scss";

// Don't use the decorator, embed the DnD context within the iframe
export const Container = () => {
	const [newItem, setNewItem] = useState([]);
	const itemAdded = (item) => {
		setNewItem((prevState) => [...prevState, { id: Date.now(), ...item }]);
	};
	console.log(JSON.stringify(newItem));
	return (
		<div className="HomePage">
			<div className="grid-container">
				<div className="right-navbar">
					<p className="list-label">Form Components</p>
					{fieldList.map((field, index) => {
						return (
							<div key={index}>
								<RightSideFieldBar field={field} itemAdded={itemAdded} />
							</div>
						);
					})}
				</div>

				<div className=" droppable-container">
					<DropFieldsContainer item={newItem} />
				</div>
			</div>
		</div>
	);
};
