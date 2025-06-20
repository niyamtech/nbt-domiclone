import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type OrderItem = {
  pizza: string;
  size: string;
  crust: string;
  qty: number;
};

interface OrderContextType {
  order: OrderItem[];
  addToOrder: (item: OrderItem) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};

const ORDER_KEY = 'domiclone_order';

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<OrderItem[]>(() => {
    const stored = sessionStorage.getItem(ORDER_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
  }, [order]);

  const addToOrder = (item: OrderItem) => setOrder((prev) => [...prev, item]);
  const clearOrder = () => setOrder([]);

  return (
    <OrderContext.Provider value={{ order, addToOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
