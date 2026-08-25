import { AlertTriangle } from 'lucide-react';

interface DeleteModalProps {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteModal({ name, onCancel, onConfirm }: DeleteModalProps) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <AlertTriangle size={26} />
        </div>
        <h3>Delete Employee</h3>
        <p>
          Are you sure you want to delete <strong>{name}</strong>?<br />
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
