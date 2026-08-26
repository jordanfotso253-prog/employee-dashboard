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
        <h3>Supprimer l&apos;employé</h3>
        <p>
          Êtes-vous sûr de vouloir supprimer <strong>{name}</strong> ?<br />
          Cette action est irréversible.
        </p>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onCancel}>
            Annuler
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
