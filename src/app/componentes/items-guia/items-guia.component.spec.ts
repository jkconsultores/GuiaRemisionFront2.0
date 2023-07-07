import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsGuiaComponent } from './items-guia.component';

describe('ItemsGuiaComponent', () => {
  let component: ItemsGuiaComponent;
  let fixture: ComponentFixture<ItemsGuiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsGuiaComponent]
    });
    fixture = TestBed.createComponent(ItemsGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
