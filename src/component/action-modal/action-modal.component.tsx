import * as React from "react";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { type TransitionProps } from "@mui/material/transitions";
import { MdOutlineClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { useToggle } from "@hooks/useToggle";
import { Button } from "@component/button/Button";

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="down" ref={ref} {...props} />,
);

type AlertDialogSlideType = Omit<DialogProps, "open"> & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean | undefined;
};

export const DialogSlide = (props: AlertDialogSlideType) => {
  const { children, open, setOpen, ...cleanProps } = props;

  return (
    <Dialog
      open={open || false}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
      {...cleanProps}
    >
      {children}
    </Dialog>
  );
};

type IModal = { title?: string; showCloseBtn?: boolean } & Omit<
  AlertDialogSlideType,
  "setOpen"
>;
export const ModalSlide = ({
  title,
  showCloseBtn = true,
  className,
  ...props
}: IModal) => {
  const { children, open, onClose, ...cleanProps } = props;

  return (
    <Dialog
      open={open || false}
      onClose={onClose}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      {...cleanProps}
    >
      <div
        className={twMerge(`relative p-10 px-12 flex flex-col ${className}`)}
      >
        {showCloseBtn && (
          <button
            type="button"
            className="w-max ml-auto"
            onClick={() => {
              if (props.onClose) props.onClose({}, "backdropClick");
            }}
          >
            <MdOutlineClose className="w-6 h-6" />
          </button>
        )}
        {title && <h1 className="text-3xl font-semibold mb-12">{title}</h1>}
        {children}
      </div>
    </Dialog>
  );
};

type IActionModal = IModal & {
  subTitle?: string;
  showConfirmBtn?: boolean;
  showCancelBtn?: boolean;
  confirmBtnTxt?: string;
  cancelBtnTxt?: string;
  disabledConfirmBtn?: boolean;
  disabledCancelBtn?: boolean;
  onConfirmBtn?: () => void;
  onCancelBtn?: () => void;
  disabledClose?: boolean;
  btnContainer?: string;
};
export const ActionModal = ({
  title,
  showCloseBtn = true,
  className,
  subTitle,
  showCancelBtn = true,
  showConfirmBtn = true,
  confirmBtnTxt = "Confirm",
  cancelBtnTxt = "Cancel",
  disabledCancelBtn,
  disabledConfirmBtn,
  onConfirmBtn,
  onCancelBtn,
  disabledClose,
  btnContainer,
  ...props
}: IActionModal) => {
  const { children, open, onClose, ...cleanProps } = props;
  const [isOpen, setIsOpen] = useToggle(open);

  return (
    <Dialog
      open={isOpen || false}
      onClose={(e, reason) => {
        if (disabledClose) return;
        setIsOpen();
        if (onClose) onClose(e, reason);
      }}
      keepMounted
      {...cleanProps}
    >
      <div className={twMerge(`relative flex flex-col mb-10 ${className}`)}>
        <div className="flex flex-row items-center justify-center rounded-b-lg bg-primary-600 text-white p-4">
          <h1 className="text-base md:text-xl font-semibold mx-auto">
            {title}
          </h1>
          {showCloseBtn && (
            <button
              type="button"
              onClick={() => {
                if (props.onClose) props.onClose({}, "backdropClick");
              }}
            >
              <MdOutlineClose className="text-xl" />
            </button>
          )}
        </div>
        {subTitle && (
          <h2 className="text-center font-bold text-primary-600 mt-5 text-sm md:text-base">
            {subTitle}
          </h2>
        )}
        <div className="px-10 mt-5">{children}</div>
        {(showCancelBtn || showConfirmBtn) && (
          <div
            className={twMerge(
              `flex flex-row items-center justify-center gap-4 mt-8 w-full px-10 ${btnContainer}`,
            )}
          >
            {showCancelBtn && (
              <Button
                variant="outline"
                className="w-1/2"
                onClick={onCancelBtn}
                disabled={disabledCancelBtn}
              >
                {cancelBtnTxt}
              </Button>
            )}
            {showConfirmBtn && (
              <Button
                className="w-1/2"
                onClick={onConfirmBtn}
                disabled={disabledConfirmBtn}
              >
                {confirmBtnTxt}
              </Button>
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
};
