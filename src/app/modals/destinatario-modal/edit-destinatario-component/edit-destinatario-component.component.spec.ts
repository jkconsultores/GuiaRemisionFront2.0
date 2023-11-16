import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinatarioComponentComponent } from './edit-destinatario-component.component';

describe('EditDestinatarioComponentComponent', () => {
  let component: EditDestinatarioComponentComponent;
  let fixture: ComponentFixture<EditDestinatarioComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDestinatarioComponentComponent]
    });
    fixture = TestBed.createComponent(EditDestinatarioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
