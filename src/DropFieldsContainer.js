import { useEffect, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { Card } from "./Card.js";
export const DropFieldsContainer = ({ item }) => {
	console.log("DropFieldsContainer oo ***", item);
	const [list, setList] = useState(item);
	useEffect(() => {
		setList(item);
	}, [item]);

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: "fields",
		drop: () => ({ name: "drop-fields" }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}));
	const isActive = canDrop && isOver;
	let backgroundColor = "#222";
	if (isActive) {
		backgroundColor = "darkgreen";
	} else if (canDrop) {
		backgroundColor = "darkkhaki";
	}
	const moveCard = useCallback((dragIndex, hoverIndex) => {
		setList((prevCards) =>
			update(prevCards, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevCards[dragIndex]]
				]
			})
		);
	}, []);
	const renderCard = useCallback((card, index) => {
		console.log("card *** ", card);
		return <Card key={card?.id} index={index} id={card?.id} field={card?.field} text={card?.field?.label} moveCard={moveCard} />;
	}, []);
	return (
		<div ref={drop} className="droppable-container" style={{ backgroundColor }}>
			{isActive ? <p>Release to drop </p> : <p>From Builder container here</p>}

			<div>{list.map((card, i) => renderCard(card, i))}</div>
		</div>
	);
};
