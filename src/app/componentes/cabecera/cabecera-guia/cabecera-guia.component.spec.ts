import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraGuiaComponent } from './cabecera-guia.component';

describe('CabeceraGuiaComponent', () => {
  let component: CabeceraGuiaComponent;
  let fixture: ComponentFixture<CabeceraGuiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabeceraGuiaComponent]
    });
    fixture = TestBed.createComponent(CabeceraGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
