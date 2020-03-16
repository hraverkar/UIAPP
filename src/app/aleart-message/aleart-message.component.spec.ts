import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AleartMessageComponent } from './aleart-message.component';

describe('AleartMessageComponent', () => {
  let component: AleartMessageComponent;
  let fixture: ComponentFixture<AleartMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AleartMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AleartMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
