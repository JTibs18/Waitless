import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDietaryTagsComponent } from './confirm-dietary-tags.component';

describe('ConfirmDietaryTagsComponent', () => {
  let component: ConfirmDietaryTagsComponent;
  let fixture: ComponentFixture<ConfirmDietaryTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDietaryTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDietaryTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
