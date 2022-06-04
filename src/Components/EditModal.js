import { useState } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { useDispatch } from "react-redux";
import { updateFormData } from "../Store/ToolkitSlicer/fieldSlice";

const EditModal = (props) => {
	const [submitEnabled, setSubmitEnabled] = useState(false);
	const dispatch = useDispatch();

	const onSubmitClick = (data) => {
		props.onSubmitData(data)
	}
	const formOnChange = (data) => {
		dispatch(updateFormData({ id: props.id, formData: data.formData }))
		setSubmitEnabled(true);
	}
	let formData = {}
	if (typeof props?.formData === "string") {
		formData = {
			description: props?.formData,
			title: props?.schema?.title,
		}
	}
	if (typeof props.formData == 'object' && !!Object.keys(props.formData).length) {
		formData = {
			...props?.formData,
			title: props?.schema?.title,
		}
	}
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Field Edit</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form schema={props.editSchema} formData={formData} onSubmit={onSubmitClick} onChange={formOnChange} >
					<button disabled={!submitEnabled} className={submitEnabled ? 'edit-modal-button' : 'edit-modal-button button-disabled'} variant="outline-primary">Submit</button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
export default EditModal;
