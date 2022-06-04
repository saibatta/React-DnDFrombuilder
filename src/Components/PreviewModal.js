import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const PreviewModal = (props) => {
    const formData = useSelector(state => state.field.formData);
    const fieldData = formData?.map(data => {
        return data.formData
    })
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            displayName='PreviewModal'
            className="preview-modal"
            dialogClassName="modal-90w"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Preview
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="preview-grid-container">
                    <div class="form-preview">
                        <div class="preview-box-label">Preview</div>
                        <div class="preview-box-content">
                            {(formData?.length) ?
                                <div>
                                    <pre>{JSON.stringify(fieldData, null, 2)}</pre>
                                </div> :
                                <pre>No preview data yet. Please create a form to view form data hare...... </pre>}
                        </div>
                    </div>
                    <div class="data-preview">
                        <div class="preview-box-label">Data</div>
                        <div class="preview-box-content">
                            {(formData?.length) ?
                                <div>
                                    <pre>{JSON.stringify(fieldData, null, 2)}</pre>
                                </div> :
                                <pre>No preview data yet. Please create a form to view form data hare...... </pre>}
                        </div>
                    </div>
                    <div class="data-preview">
                        <div class="preview-box-label">Errors</div>
                        <div class="preview-box-content"></div>
                    </div>
                    <div class="data-preview">
                        <div class="preview-box-label">Events</div>
                        <div class="preview-box-content"></div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default PreviewModal;