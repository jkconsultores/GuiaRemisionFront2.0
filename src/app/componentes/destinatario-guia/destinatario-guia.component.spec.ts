import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinatarioGuiaComponent } from './destinatario-guia.component';

describe('DestinatarioGuiaComponent', () => {
  let component: DestinatarioGuiaComponent;
  let fixture: ComponentFixture<DestinatarioGuiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinatarioGuiaComponent]
    });
    fixture = TestBed.createComponent(DestinatarioGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
