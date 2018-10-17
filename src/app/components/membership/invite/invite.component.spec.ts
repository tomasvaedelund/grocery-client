import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipInviteComponent } from './invite.component';

describe('InviteComponent', () => {
  let component: MembershipInviteComponent;
  let fixture: ComponentFixture<MembershipInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
