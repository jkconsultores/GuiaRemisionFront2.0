import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigenModalComponent } from './origen-modal.component';

describe('OrigenModalComponent', () => {
  let component: OrigenModalComponent;
  let fixture: ComponentFixture<OrigenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrigenModalComponent]
    });
    fixture = TestBed.createComponent(OrigenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
