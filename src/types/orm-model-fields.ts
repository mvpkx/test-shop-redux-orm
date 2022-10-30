export interface OrderFields {
  id?: number;
  ordered_at?: string;
  delivery_date?: string;
  delivery_time?: string;
  customer_name?: string;
  customer_phone?: number;
  customer_address?: string;
  is_ordered?: boolean;
}

export interface CartVariationFields {
  id?: number;
  order_id: number;
  variation_id: number;
  quantity?: number;
}

export interface FilterProductFields {
  category_id: number;
}

export interface ProductFields {
  id: number;
  name: string;
  category_id: number;
  description: string;
  images: string[];
  categories: CategoryFields[];
  minPrice: number;
  // TODO fix any
  variations: any;
}

export interface CategoryFields {
  id: number;
  name: string;
}

export interface ImageFields {
  id: number;
  image_name: string;
  product_id: number;
  image_url: string;
}

export interface VariationFields {
  id: number;
  product_id: number;
  price: number;
  stock: number;
}

export interface VariationPropertyFields {
  id: number;
  name: string;
  type: 0 | 1 | 2;
}

export interface VariationPropertyValueFields {
  id: number;
  product_variation_id: number;
  product_variation_property_id: number;
  value_string: string;
  value_int: number;
  value_float: number;
  product_variation_property_list_value_id: number;
}

export interface VariationPropertyListValueFields {
  id: number;
  product_variation_property_id: number;
  title: string;
  value: string;
}
