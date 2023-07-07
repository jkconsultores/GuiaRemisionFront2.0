import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieModalComponent } from './serie-modal.component';

describe('SerieModalComponent', () => {
  let component: SerieModalComponent;
  let fixture: ComponentFixture<SerieModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerieModalComponent]
    });
    fixture = TestBed.createComponent(SerieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
