import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinoComponentComponent } from './edit-destino-component.component';

describe('EditDestinoComponentComponent', () => {
  let component: EditDestinoComponentComponent;
  let fixture: ComponentFixture<EditDestinoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDestinoComponentComponent]
    });
    fixture = TestBed.createComponent(EditDestinoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
