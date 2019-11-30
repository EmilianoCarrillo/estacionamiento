import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionesAdminComponent } from './reservaciones-admin.component';

describe('ReservacionesAdminComponent', () => {
  let component: ReservacionesAdminComponent;
  let fixture: ComponentFixture<ReservacionesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservacionesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservacionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
