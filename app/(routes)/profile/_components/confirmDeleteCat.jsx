import { Button } from "@/components/ui/button";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "تأكيد",
  description = "هل أنت متأكد؟",
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay بدون onClick */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-lg text-black font-bold">{title}</h2>
        <p className="mb-6 font-semibold text-sm text-muted-foreground">
          {description}
        </p>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "جارٍ التنفيذ..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
