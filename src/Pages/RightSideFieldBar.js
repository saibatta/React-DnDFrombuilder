import { useDrag } from "react-dnd";
import { BsArrowsMove } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getAllFields, getDroppedField } from "../Store/ToolkitSlicer/fieldSlice"

const RightSideFieldBar = ({ field }) => {
	const dispatch = useDispatch();
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: "fields",
			item: { field },
			end: (item, monitor) => {
				const dropResult = monitor.getDropResult();
				if (item && dropResult) {
					let droppedItem = { id: Date.now(), ...item };
					dispatch(getDroppedField(droppedItem))
					dispatch(getAllFields([{ ...droppedItem }]))
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

export default RightSideFieldBar;
