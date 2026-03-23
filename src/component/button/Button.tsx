import React from "react";
import style from "./Button.module.scss";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconButton } from "@component/icon-button/IconButton";

type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "link"
  | "default";
type Size = "xl" | "lg" | "md" | "sm";

export type ButtonType = {
  variant?: Variant;
  size?: Size;
  destructive?: boolean;
} & React.ComponentProps<"button">;

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  destructive = false,
  ...props
}: ButtonType) => {
  const innerHTML = props.children?.toString().split(",") || [];

  return (
    <button
      className={`flex flex-row justify-center items-center text-center ${style[`btn-${variant}`]} ${style[`${size}`]}  ${
        style.btn
      } ${className ?? ""} min-w-max`}
      data-destructive={destructive}
      type={type}
      data-testid={
        props.name ||
        props.id ||
        `${variant}-${innerHTML?.length > 2 ? innerHTML[1] : innerHTML[0]}-btn`
      }
      {...props}
    />
  );
};

type IActionButton = {
  onClickEdit?: () => void;
  onClickDelete?: () => void;
};
export const ActionButton = ({ onClickDelete, onClickEdit }: IActionButton) => (
  <div className="flex flex-row gap-2 items-center justify-center">
    {onClickEdit ? (
      <IconButton className="bg-primary-500" onClick={onClickEdit}>
        <FiEdit />
      </IconButton>
    ) : null}
    {onClickDelete ? (
      <IconButton className="bg-destructive-400" onClick={onClickDelete}>
        <RiDeleteBin6Line />
      </IconButton>
    ) : null}
  </div>
);
