import { useState } from "react";

export interface DialogProps<T> {
  data?: T;
  open?: boolean;
}

export function useDialog<T = undefined>(props?: DialogProps<T>) {
  const [open, setOpen] = useState<boolean>(props?.open ?? false);
  const [data, setData] = useState<T | undefined>(props?.data);

  const setAction = (open: boolean, data: T | undefined) => {
    setOpen(open);
    setData(data);
  };

  return {
    open,
    setOpen,
    data,
    setData,
    setAction,
  };
}
