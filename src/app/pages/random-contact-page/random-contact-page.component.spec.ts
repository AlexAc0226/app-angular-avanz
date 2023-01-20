import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomContactPageComponent } from './random-contact-page.component';

describe('RandomContactPageComponent', () => {
  let component: RandomContactPageComponent;
  let fixture: ComponentFixture<RandomContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomContactPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
