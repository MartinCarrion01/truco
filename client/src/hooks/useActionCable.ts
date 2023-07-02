import { createConsumer } from "@rails/actioncable";
import { useEffect, useMemo } from "react";

const useActionCable = (url: string) => {
  const actionCable = useMemo(() => createConsumer(url), [url]);

  useEffect(() => {
    return () => {
      console.log("Desconectar web socket");
      actionCable.disconnect();
    };
  }, [actionCable]);

  return { actionCable };
};

export default useActionCable;
