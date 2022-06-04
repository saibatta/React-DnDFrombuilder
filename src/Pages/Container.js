import React from "react";
import RightSideFieldBar from "./RightSideFieldBar.js";
import { DropFieldsContainer } from "./DropFieldsContainer.js";
import { fieldList } from "../Config/FieldListConfig";
import "./global.scss";
import PreviewModal from "../Components/PreviewModal.js";
import { BsArrowRepeat } from "react-icons/bs"
// Don't use the decorator, embed the DnD context within the iframe
const Container = () => {
	const [previewModalShow, setPreviewModalShow] = React.useState(false);
	return (
		<div className="HomePage">
			<div className="grid-container">
				<div className="right-navbar">
					<p className="list-label validate-button" onClick={() => setPreviewModalShow(true)}><BsArrowRepeat /> <span className="validate-label">Validate</span></p>
					<p className="list-label">Form Components</p>
					{fieldList.map((field, index) => {
						return (
							<div key={index}>
								<RightSideFieldBar field={field} />
							</div>
						);
					})}
				</div>

				<div className=" droppable-container">
					<DropFieldsContainer />
				</div>
			</div>
			<PreviewModal
				show={previewModalShow}
				onHide={() => setPreviewModalShow(false)}
			/>
		</div>
	);
};
export default Container

