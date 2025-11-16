import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudTableComponent } from './stud-table.component';

describe('StudTableComponent', () => {
  let component: StudTableComponent;
  let fixture: ComponentFixture<StudTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
