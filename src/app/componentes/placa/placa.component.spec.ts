import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacaComponent } from './placa.component';

describe('PlacaComponent', () => {
  let component: PlacaComponent;
  let fixture: ComponentFixture<PlacaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacaComponent]
    });
    fixture = TestBed.createComponent(PlacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
