import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { ShoppingCartItemsComponent } from './shopping-cart-items/shopping-cart-items.component';
import { TextDropComponent } from './text-drop/text-drop.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TextDropComponent,
        ShoppingCartItemsComponent,
      ],
      imports: [MatCardModule, MatTableModule, MatButtonModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gpc-shopping-cart'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gpc-shopping-cart');
  });
});
