import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionItemsModalComponent } from './creacion-items-modal.component';

describe('CreacionItemsModalComponent', () => {
  let component: CreacionItemsModalComponent;
  let fixture: ComponentFixture<CreacionItemsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreacionItemsModalComponent]
    });
    fixture = TestBed.createComponent(CreacionItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
