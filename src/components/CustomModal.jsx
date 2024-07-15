import Modal from "react-modal";
import PropTypes from "prop-types";
import "../assets/styles/modalDefault.styles.css";

const MyModal = ({
  isOpen,
  onRequestClose,
  children,
  className,
  overlayClassName,
  modalContentClassName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={className}
      overlayClassName={overlayClassName}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={true}
    >
      <div className={modalContentClassName}>{children}</div>
    </Modal>
  );
};

MyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  overlayClassName: PropTypes.string.isRequired,
  modalContentClassName: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
};

export default MyModal;
