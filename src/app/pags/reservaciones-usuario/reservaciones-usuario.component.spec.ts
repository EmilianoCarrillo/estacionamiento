import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionesUsuarioComponent } from './reservaciones-usuario.component';

describe('ReservacionesUsuarioComponent', () => {
  let component: ReservacionesUsuarioComponent;
  let fixture: ComponentFixture<ReservacionesUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservacionesUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservacionesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
