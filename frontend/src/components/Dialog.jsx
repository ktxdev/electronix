import Modal from "./Modal";
import Button from "./Button";

function Dialog({children, onClose, onConfirm, isConfirming = false}) {
  return (
    <Modal onClose={onClose}>
      <div className="bg-white w-30% rounded-md pt-10 pb-5 px-5">
        <h1 className="text-xl font-bold">Delete confirmation</h1>
        <div className="border-b border-b-gray-100" />
        {children}
        <div className="border-b border-b-gray-100 my-2" />
        <div className="flex justify-end gap-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button className="disabled:cursor-not-allowed" onClick={onConfirm} type="danger" disabled={isConfirming}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
}

export default Dialog;
