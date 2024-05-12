"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Delivery } from "../utils/types";
import { getDatabase, onValue, ref } from "firebase/database";

export type DeliveryContextType = {
  deliveries: Delivery[];
};

type DeliveryContextProps = PropsWithChildren;

const Context = createContext<DeliveryContextType | null>(null);

const DeliveryContext = ({ children }: DeliveryContextProps) => {
  const [data, setData] = useState<Delivery[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const userDataRef = ref(db, "/deliveries");

    const subscription = onValue(userDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setData(Object.values(data));
      } else {
        setData([]);
      }
    });

    () => subscription();
  }, []);

  const value = {
    deliveries: data,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useDeliveryContext = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw Error("The DeliveryContext is missing or initial state is falsy");
  }

  return ctx;
};

export { DeliveryContext, useDeliveryContext };
