export interface ShoppingCartItem {
  name: string;
  price: number;
  quantity: number;
  salesTax: number;
  importTax: number;
  priceAfterTax: number;
}

export interface SalesTaxAndTotal {
  salesTax: number;
  total: number;
}
