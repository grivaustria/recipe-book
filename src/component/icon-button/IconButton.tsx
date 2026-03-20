import style from "./IconButton.module.scss";

type IconButtonType = {} & React.ComponentProps<"button">;

export const IconButton = (props: IconButtonType) => {
  const { className, children, ...cleanProps } = props;

  return (
    <button className={`${style.button} ${className ?? ""}`} {...cleanProps}>
      {children}
    </button>
  );
};
