import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {
  ShoppingCartItem,
  SalesTaxAndTotal,
} from './../Interfaces/shopping-cart.interface';

@Component({
  selector: 'app-shopping-cart-items',
  templateUrl: './shopping-cart-items.component.html',
  styleUrls: ['./shopping-cart-items.component.scss'],
})
export class ShoppingCartItemsComponent implements OnInit, OnChanges {
  @Input() textToDisplay: string;
  itemsInCart: ShoppingCartItem[] = [];
  totalsFromItems: SalesTaxAndTotal[] = [];
  displayedColumns: string[] = ['quantity', 'name', 'priceAfterTax'];
  displayedTotals: string[] = ['salesTax', 'total'];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    if (changes.textToDisplay && changes.textToDisplay.currentValue) {
      this.resetCart();
      this.itemsInCart = this.formatTextData(
        changes.textToDisplay.currentValue
      );
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  resetCart(): void {
    this.itemsInCart = [];
    this.totalsFromItems = [{ salesTax: 0, total: 0 }];
  }

  formatTextData(text: string): ShoppingCartItem[] {
    const shoppingList = text.split(/\r?\n/);
    const basicTaxExemptItems = ['book', 'chocolate', 'pills'];
    const shoppingItems = shoppingList.map((item) => {
      const itemBreakDown = item.split(' ');
      const quantity = Number(itemBreakDown[0]);
      const price = Number(itemBreakDown[itemBreakDown.length - 1]) * quantity;
      const importTaxTwoDecimals = (
        Math.ceil(
          (Math.round((price * 0.05 + Number.EPSILON) * 100) / 100) * 20
        ) / 20
      ).toFixed(2);
      const salesTaxTwoDecimals = (
        Math.ceil((Math.round(price * 0.1 * 100) / 100) * 20) / 20
      ).toFixed(2);
      const name = itemBreakDown
        .slice(1, itemBreakDown.length - 1)
        .join(' ')
        .replace(' at', '');
      const salesTax = Number(
        basicTaxExemptItems.some((i) => name.includes(i))
          ? 0
          : salesTaxTwoDecimals
      );
      const importTax = Number(
        name.includes('imported') ? importTaxTwoDecimals : 0
      );
      const priceAfterTax = Number((price + salesTax + importTax).toFixed(2));
      this.totalsFromItems = [
        {
          salesTax: this.totalsFromItems[0].salesTax += Number(
            salesTax + importTax
          ),
          total: Number(
            (this.totalsFromItems[0].total +=
              price + salesTax + importTax).toFixed(2)
          ),
        },
      ];
      return {
        name,
        price,
        quantity,
        salesTax,
        importTax,
        priceAfterTax,
      };
    });
    return shoppingItems;
  }
}
