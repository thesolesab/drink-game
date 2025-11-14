import { useCallback, useState } from "react";

export default function useModal() {
  const [modal, setModal] = useState(null);

  const openModal = useCallback((type, config = {}) => {
    setModal({ type, ...config });
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return { modal, openModal, closeModal };
}