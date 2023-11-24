export type DataJSONType = {
  o_id: number;
  client_name: string;
  diets: string[];
  tariff: string[];
  address: string;
  phone: string;
  dates: DateType[];
  discount: number;
  order_sum: number;
  order_payed: string;
  pay_status: string;
  courier_comment: string | null;
  inner_comment: string | null;
};

export type DateType = {
  start_date: string;
  end_date: string;
};

export type ComputedArrayType = {
  computedArray?: any[];
};

export type ProcessedData = DataJSONType & ComputedArrayType;
