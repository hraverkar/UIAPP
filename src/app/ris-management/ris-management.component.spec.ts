import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RisManagementComponent } from './ris-management.component';

describe('RisManagementComponent', () => {
  let component: RisManagementComponent;
  let fixture: ComponentFixture<RisManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RisManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RisManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
