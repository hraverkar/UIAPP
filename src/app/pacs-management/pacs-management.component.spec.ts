import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsManagementComponent } from './pacs-management.component';

describe('PacsManagementComponent', () => {
  let component: PacsManagementComponent;
  let fixture: ComponentFixture<PacsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
