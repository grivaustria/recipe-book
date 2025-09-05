import { useEffect, useState } from "react";

const Message = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  }, [isLoading]);

  return (
    <span className="text-lg font-bold">
      {isLoading ? "Hello, Gab!" : "Loading..."}
    </span>
  );
};

export default Message;