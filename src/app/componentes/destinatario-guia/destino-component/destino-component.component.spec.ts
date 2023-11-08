import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoComponentComponent } from './destino-component.component';

describe('DestinoComponentComponent', () => {
  let component: DestinoComponentComponent;
  let fixture: ComponentFixture<DestinoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinoComponentComponent]
    });
    fixture = TestBed.createComponent(DestinoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
