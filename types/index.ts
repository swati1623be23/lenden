export type CustomerFormValues = {
  name: string;
  phone?: string;
  address?: string;
};

export type CreditFormValues = {
  customerId: string;
  amount: number;
  note?: string;
  date: string;
};

export type PaymentFormValues = {
  customerId: string;
  amount: number;
  date: string;
};

export type CustomerListItem = {
  id: string;
  name: string;
};
