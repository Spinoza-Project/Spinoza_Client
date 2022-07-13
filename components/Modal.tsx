import React, { FC, useCallback } from 'react';

interface PropsType {
  show: boolean;
  children?: React.ReactNode;
  onCloseModal: () => void;
  className?: string;
}
const Modal: FC<PropsType> = ({ show, children, onCloseModal, className }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  if (!show) {
    return null;
  }
  return (
    <>
      <div
        onClick={onCloseModal}
        className='fixed inset-0 z-[1000] text-center'
      ></div>
      <div onClick={stopPropagation} className={`${className} z-[1010]`}>
        <button
          onClick={onCloseModal}
          className='text-md absolute top-1 right-2 cursor-pointer bg-transparent'
        >
          &times;
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
