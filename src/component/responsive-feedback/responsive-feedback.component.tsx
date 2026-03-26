import { isValidElement, type ReactNode, useEffect, useState } from "react";
import {
  toast,
  ToastContainer,
  type ToastItem,
  type TypeOptions,
} from "react-toastify";
import { useWindowResize } from "@hooks/useWindowResize";
import styles from "./responsive-feedback.module.scss";

type MobileFeedback = {
  id: string | number;
  message: string;
  type?: TypeOptions;
};

const fallbackMessageByType: Record<string, string> = {
  success: "Action completed successfully.",
  error: "Something went wrong.",
  info: "Here is an update.",
  warning: "Please double-check that action.",
  default: "Something changed.",
};

const extractMessage = (content: unknown): string => {
  if (typeof content === "string" || typeof content === "number") {
    return String(content);
  }

  if (typeof content === "function" || content === null) {
    return "";
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => extractMessage(item))
      .filter(Boolean)
      .join(" ")
      .trim();
  }

  if (isValidElement<{ children?: ReactNode }>(content)) {
    return extractMessage(content.props.children);
  }

  return "";
};

const ResponsiveFeedback = () => {
  const { isMobile } = useWindowResize();
  const [mobileFeedback, setMobileFeedback] = useState<MobileFeedback | null>(
    null,
  );

  useEffect(() => {
    if (!isMobile) {
      setMobileFeedback(null);
      return;
    }

    return toast.onChange((item: ToastItem) => {
      if (item.status !== "added" && item.status !== "updated") {
        return;
      }

      const message =
        extractMessage(item.content) ||
        fallbackMessageByType[item.type ?? "default"] ||
        fallbackMessageByType.default;

      setMobileFeedback({
        id: item.id ?? Date.now(),
        message,
        type: item.type,
      });

      if (item.id !== undefined) {
        toast.dismiss(item.id);
      }
    });
  }, [isMobile]);

  if (!isMobile) {
    return <ToastContainer />;
  }

  if (!mobileFeedback) {
    return null;
  }

  const modalToneClass =
    mobileFeedback.type === "success"
      ? styles.success
      : mobileFeedback.type === "error"
        ? styles.error
        : styles.info;

  const title =
    mobileFeedback.type === "success"
      ? "Success"
      : mobileFeedback.type === "error"
        ? "Something went wrong"
        : "Notice";

  return (
    <div
      className={styles.modalBackdrop}
      onClick={() => setMobileFeedback(null)}
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <div className={`${styles.statusAccent} ${modalToneClass}`} />
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.body}>
          <p className={styles.message}>{mobileFeedback.message}</p>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.dismissBtn}
            type="button"
            onClick={() => setMobileFeedback(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveFeedback;
