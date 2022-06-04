import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Form from "react-jsonschema-form";
import { BsArrowsMove, BsSubtract, BsPencil, BsTrash } from "react-icons/bs";
import EditModal from "./EditModal";
import { useDispatch } from "react-redux";
import { deleteField, copyField, updateFormData } from "../Store/ToolkitSlicer/fieldSlice";

export const Card = ({ id, text, index, moveCard, fieldContent }) => {
	const [field, setFiled] = useState(fieldContent.field)

	const [modalShow, setModalShow] = React.useState(false);
	const dispatch = useDispatch()
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
	const handleOnChange = (data) => {
		let prevField = JSON.parse(JSON.stringify(field));
		if (typeof data.formData === "string") {
			prevField.formData = data.formData;
			dispatch(updateFormData({ id, formData: { title: data.schema.title, description: prevField.formData } }))
			setFiled(prevField);
		}
		if (typeof data.formData == 'object' && !!Object.keys(data.formData).length) {
			prevField.formData = data.formData;
			dispatch(updateFormData({ id, formData: prevField.formData }))
			setFiled(prevField);
		}
	};
	const onEditSubmit = (data) => {
		let prevField = JSON.parse(JSON.stringify(field));
		if (data && data?.formData) {
			for (const [key, value] of Object.entries(data.formData)) {
				if (key in prevField?.schema) {
					prevField.schema[key] = value;
				}
				if (prevField?.editSchema?.properties && key in prevField?.editSchema?.properties) {
					prevField.editSchema.properties[key] = { ...prevField.editSchema.properties[key], title: value };
				}
				if (prevField?.schema?.properties && key in prevField?.schema?.properties) {
					prevField.schema.properties[key] = { ...prevField.schema.properties[key], title: data?.formData[key + '_label'] };
				}
			}
			prevField.editSchema = data.schema
			let singleField = data?.formData?.description;
			prevField.formData = singleField ? singleField : data.formData;
			setModalShow(false);
		}
		setFiled(prevField);
	};
	const onCardOptionsSelection = (options) => {
		switch (options) {
			case "edit":
				setModalShow(true);
				break;
			case "delete":
				dispatch(deleteField(id))
				break;
			case "copy":
				let copyItem = { id: Date.now(), field };
				dispatch(copyField(copyItem))
				break;
			default:
				break;
		}
	};
	return (
		<React.Fragment>
			{modalShow && (
				<EditModal id={id} editSchema={field?.editSchema} schema={field?.schema} formData={field?.formData} onSubmitData={onEditSubmit} show={modalShow} onHide={() => setModalShow(false)} />
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
				<Form schema={field?.schema} uiSchema={field?.uiSchema} formData={field?.formData} onSubmit={onEditSubmit} onChange={handleOnChange}>
					<button className="hide-submit-button" type="submit" />
				</Form>
			</div>
		</React.Fragment>
	);
};
