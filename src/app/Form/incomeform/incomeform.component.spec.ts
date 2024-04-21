import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeformComponent } from './incomeform.component';

describe('IncomeformComponent', () => {
  let component: IncomeformComponent;
  let fixture: ComponentFixture<IncomeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
