import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaComponentComponent } from './empresa-component.component';

describe('EmpresaComponentComponent', () => {
  let component: EmpresaComponentComponent;
  let fixture: ComponentFixture<EmpresaComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaComponentComponent]
    });
    fixture = TestBed.createComponent(EmpresaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
