import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferGuiaComponent } from './chofer-guia.component';

describe('ChoferGuiaComponent', () => {
  let component: ChoferGuiaComponent;
  let fixture: ComponentFixture<ChoferGuiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoferGuiaComponent]
    });
    fixture = TestBed.createComponent(ChoferGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
