import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItemsComponent } from './shopping-cart-items.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

describe('ShoppingCartItemsComponent', () => {
  let component: ShoppingCartItemsComponent;
  let fixture: ComponentFixture<ShoppingCartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartItemsComponent],
      imports: [MatCardModule, MatTableModule, MatButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should track index', () => {
    const trackedItem = component.trackByIndex(1);
    expect(trackedItem).toEqual(1);
  });

  xit('should track ngOnChanges', () => {
    // Need to set up spies
    component.textToDisplay =
      '1 book at 12.49\n1 music CD at 14.99\n1 chocolate bar at 0.85';
    fixture.detectChanges();
    expect(component.resetCart).toHaveBeenCalled();
    expect(component.formatTextData).toHaveBeenCalled();
  });

  it('should execute empty cart function when called', () => {
    const dummyCartItem = {
      name: 'chocolate bar',
      price: 0.85,
      quantity: 1,
      salesTax: 0.0,
      importTax: 0.0,
      priceAfterTax: 0.85,
    };

    const dummyCartTotal = {
      salesTax: 0.0,
      total: 0.85,
    };

    component.itemsInCart = [dummyCartItem];
    component.totalsFromItems = [dummyCartTotal];
    component.resetCart();

    expect(component.itemsInCart).toEqual([]);
    expect(component.totalsFromItems).toEqual([{ salesTax: 0, total: 0 }]);
  });

  it('should add shopping cart items when text file uploaded', () => {
    component.totalsFromItems = [{ salesTax: 0, total: 0 }];
    const dummyCartText =
      '1 book at 12.49\n1 music CD at 14.99\n1 chocolate bar at 0.85';
    const shoppingCart = component.formatTextData(dummyCartText);
    expect(shoppingCart).toEqual([
      {
        name: 'book',
        price: 12.49,
        quantity: 1,
        salesTax: 0,
        importTax: 0,
        priceAfterTax: 12.49,
      },
      {
        name: 'music CD',
        price: 14.99,
        quantity: 1,
        salesTax: 1.5,
        importTax: 0,
        priceAfterTax: 16.49,
      },
      {
        name: 'chocolate bar',
        price: 0.85,
        quantity: 1,
        salesTax: 0,
        importTax: 0,
        priceAfterTax: 0.85,
      },
    ]);
    expect(component.totalsFromItems).toEqual([
      { salesTax: 1.5, total: 29.83 },
    ]);
  });
});
