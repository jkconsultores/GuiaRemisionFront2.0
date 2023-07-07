import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaModalComponent } from './empresa-modal.component';

describe('EmpresaModalComponent', () => {
  let component: EmpresaModalComponent;
  let fixture: ComponentFixture<EmpresaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaModalComponent]
    });
    fixture = TestBed.createComponent(EmpresaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
