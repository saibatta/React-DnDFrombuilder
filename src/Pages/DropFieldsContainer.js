import { useEffect, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { Card } from "../Components/Card.js";
import { useSelector } from "react-redux";

export const DropFieldsContainer = () => {
	const allFields = useSelector((state) => state.field.allFields);
	const [list, setList] = useState(allFields);
	useEffect(() => {
		setList(allFields)
	}, [allFields])
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: "fields",
		drop: () => ({ name: "drop-fields" }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}));
	const isActive = canDrop && isOver;
	let backgroundColor = "darkslategrey";
	if (isActive) {
		backgroundColor = "#5f8888";
	} else if (canDrop) {
		backgroundColor = "#7f8d8d";
	}
	const moveCardUpdate = (dragIndex, hoverIndex) => {
		setList((prevCards) =>
			update(prevCards, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevCards[dragIndex]]
				]
			}));
	};
	const renderCard = useCallback((card, index) => {
		return <Card key={card?.id} index={index} id={card?.id} fieldContent={card} text={card?.field?.label} moveCard={moveCardUpdate} />;
	}, []);
	return (
		<div ref={drop} className="droppable-container" style={{ backgroundColor }}>
			{isActive ? <p className="form-builder-title">Release to drop </p> : <p className="form-builder-title">Form Builder Container </p>}
			<div>{list?.map((card, i) => renderCard(card, i))}</div>
		</div>
	);
};
