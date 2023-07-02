import { Consumer, Subscription } from "@rails/actioncable";
import { useCallback, useEffect, useRef, useState } from "react";

type Callbacks<T> = {
  received?: (_message: T) => void;
  initialized?: () => void;
  connected?: () => void;
  disconnected?: () => void;
};

export default function useChannel<ReceivedType>(actionCable: Consumer) {
  const [connected, setConnected] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const channelRef = useRef<Subscription<Consumer> | null>(null);

  const subscribe = (data: any, callbacks: Callbacks<ReceivedType>) => {
    const channel = actionCable.subscriptions.create(data, {
      received: (message: ReceivedType) => {
        if (callbacks.received) {
          callbacks.received(message);
        }
      },
      initialized: () => {
        setSubscribed(true);
        if (callbacks.initialized) {
          callbacks.initialized();
        }
      },
      connected: () => {
        setConnected(true);
        if (callbacks.connected) {
          callbacks.connected();
        }
      },
      disconnected: () => {
        setConnected(false);
        if (callbacks.disconnected) {
          callbacks.disconnected();
        }
      },
    });
    channelRef.current = channel;
  };

  const unsubscribe = useCallback(() => {
    setSubscribed(false);
    if (channelRef.current) {
      channelRef.current.unsubscribe();
      channelRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, [unsubscribe]);

  const send = (action: string, payload: {} | undefined) => {
    if (subscribed && !connected) {
      throw "ERROR: not connected";
    }

    if (!subscribed) {
      throw "ERROR: not subscribed";
    }

    try {
      channelRef?.current?.perform(action, payload);
    } catch (e) {
      throw "ERROR: " + e;
    }
  };

  return { subscribe, unsubscribe, send };
}
