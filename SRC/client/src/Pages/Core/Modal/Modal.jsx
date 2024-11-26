import "./Modal.css";
import PropTypes from "prop-types";

function Modal({ children, open, onClose, zIndex = 1000 }) {
  if (!open) return null; // If the modal is not open, return null

  return (
    <div className="modal-overlay" style={{ zIndex }} onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is passed and is a valid React node
  open: PropTypes.bool.isRequired, // Ensures open is passed and is a valid boolean
  onClose: PropTypes.func.isRequired, // Ensures onClose is passed and is a valid function
  zIndex: PropTypes.number, // Ensures zIndex is passed and is a valid number
};

export default Modal;
