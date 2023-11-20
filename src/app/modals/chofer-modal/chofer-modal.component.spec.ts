import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferModalComponent } from './chofer-modal.component';

describe('ChoferModalComponent', () => {
  let component: ChoferModalComponent;
  let fixture: ComponentFixture<ChoferModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoferModalComponent]
    });
    fixture = TestBed.createComponent(ChoferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
