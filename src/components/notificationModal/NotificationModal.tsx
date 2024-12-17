import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

type NotificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  message: string;
};

const NotificationModal = ({ isOpen, onClose, type, message }: NotificationModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-md bg-white rounded-lg shadow-lg p-6">
        <DialogTitle className="text-xl font-semibold text-center">
          {type === "success" ? "Success!" : "Error!"}
        </DialogTitle>
        <DialogDescription className="text-center text-sm mt-4">
          {message}
        </DialogDescription>
        <div className="mt-6 flex justify-center">
          <Button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
