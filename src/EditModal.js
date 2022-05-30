import { Modal, Button } from "react-bootstrap";
import Form from "react-jsonschema-form";
const EditModal = (props) => {
	console.log("props**** ", props);
	const submit = (data) => {
		console.log("EditModal Submitted data *** ", data);
	};
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{console.log(props.editSchema)}
				{/* <Form schema={props.editSchema} onSubmit={(data) => props.onSubmit(data)}> */}
				<Form schema={props.editSchema} onChange={(data) => props.onSubmit(data)} onSubmit={(data) => submit(data)}>
					<button variant="outline-primary">Submit</button>
				</Form>
				{/* <h4>Centered Modal</h4>
				<p>
					Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
				</p> */}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default EditModal;
