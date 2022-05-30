import { useState } from "react";
import { useDrag } from "react-dnd";
import { BsArrowsMove } from "react-icons/bs";
export const RightSideFieldBar = ({ field, itemAdded }) => {
	console.log("**field**", field);
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: "fields",
			item: { field },
			end: (item, monitor) => {
				const dropResult = monitor.getDropResult();
				if (item && dropResult) {
					console.log(`You dropped ${field.label} into ${dropResult.name}!`);
					itemAdded(item);
				}
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging()
			})
		}),
		[field]
	);
	const opacity = isDragging ? 0.4 : 1;
	return (
		<div ref={drag} className="side-navbar-list" style={{ opacity }}>
			<BsArrowsMove /> {field.label}
		</div>
	);
};
