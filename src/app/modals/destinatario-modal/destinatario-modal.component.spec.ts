import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinatarioModalComponent } from './destinatario-modal.component';

describe('DestinatarioModalComponent', () => {
  let component: DestinatarioModalComponent;
  let fixture: ComponentFixture<DestinatarioModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinatarioModalComponent]
    });
    fixture = TestBed.createComponent(DestinatarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
