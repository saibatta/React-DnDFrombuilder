import { Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Form from "react-jsonschema-form";
import { BsArrowsMove, BsSubtract, BsPencil, BsTrash } from "react-icons/bs";
import EditModal from "./EditModal";
export const Card = ({ id, text, index, moveCard, field }) => {
	const { schema, uiSchema, editSchema, formData } = field;
	const [isFormEditActive, setFormEditFlag] = useState(false);
	const [isFormSubmitActive, setFormSubmitActiveFlag] = useState(false);
	const [modalShow, setModalShow] = React.useState(false);
	console.log(field, " :**** Name****", text);
	const ref = useRef(null);
	const [{ handlerId }, drop] = useDrop({
		accept: "drop-fields",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId()
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		}
	});
	const [{ isDragging }, drag] = useDrag({
		type: "drop-fields",
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	// Form
	const onFormSubmit = (data) => {
		console.log("***onFormSubmit**", data);
	};
	const handleOnChange = (data) => {
		console.log("***handleOnChange**", data);
		setFormSubmitActiveFlag(true);
	};
	const onEditSubmit = (data) => {
		// setModalShow(false);
		// setFormEditFlag(false);
		console.log("onEditSubmit", data);
		if (data && data.formData) {
			for (const [key, value] of Object.entries(data.formData)) {
				if (key in field.schema) {
					field.schema[key] = value;
				}
			}
			console.log(field.schema);
			field.formData = data?.formData?.description;
			//	setFormEditFlag(!isFormEditActive);
			console.log(field);
		}
	};
	const onCardOptionsSelection = (options) => {
		console.log(options);
		switch (options) {
			case "edit":
				setFormEditFlag(!isFormEditActive);
				setModalShow(true);
				break;
			case "delete":
				//	setFormEditFlag(!isFormEditActive);
				break;
			default:
				break;
		}
	};
	return (
		<React.Fragment>
			{isFormEditActive && (
				// <Form schema={editSchema} onSubmit={(data) => onEditSubmit(data)}>
				// 	<button variant="outline-primary">Submit</button>
				// </Form>
				<EditModal editSchema={editSchema} onSubmit={(data) => onEditSubmit(data)} show={modalShow} onHide={() => setModalShow(false)} />
			)}

			<div ref={ref} className="dropped-field-content" style={{ opacity }} data-handler-id={handlerId}>
				<span className="card-options">
					<p className="icon-poistion" onClick={() => onCardOptionsSelection("move")}>
						<BsArrowsMove />
					</p>
					<p className="icon-poistion" onClick={() => onCardOptionsSelection("copy")}>
						<BsSubtract />
					</p>
					<p className="icon-poistion" onClick={() => onCardOptionsSelection("edit")}>
						<BsPencil />
					</p>
					<p className="icon-poistion" onClick={() => onCardOptionsSelection("delete")}>
						<BsTrash />
					</p>
				</span>
				<Form schema={schema} uiSchema={uiSchema} formData={formData} onSubmit={onFormSubmit} onChange={handleOnChange}>
					<button type="submit" disabled={!isFormSubmitActive} className="btn btn-info pull-right">
						On Form Submit
					</button>
				</Form>
				{/* <button type="submit" className="btn btn-info pull-right" onClick={() => setFormEditFlag(!isFormEditActive)}>
					On Form Edit
				</button> */}
			</div>
		</React.Fragment>
	);
};
