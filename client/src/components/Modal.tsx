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
      className="absolute inset-0 flex items-center justify-center w-full bg-black bg-opacity-70"
      onClick={onClose}
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
