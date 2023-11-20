import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreReportesComponent } from './gre-reportes.component';

describe('GreReportesComponent', () => {
  let component: GreReportesComponent;
  let fixture: ComponentFixture<GreReportesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreReportesComponent]
    });
    fixture = TestBed.createComponent(GreReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
