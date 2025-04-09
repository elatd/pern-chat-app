const Modal = ({
  children,
  onClose,
  open,
}: {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close modal on backdrop click
    >
      <div
        className="z-10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
