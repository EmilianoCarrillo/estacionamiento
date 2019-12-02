import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaEnCursoComponent } from './tarjeta-en-curso.component';

describe('TarjetaEnCursoComponent', () => {
  let component: TarjetaEnCursoComponent;
  let fixture: ComponentFixture<TarjetaEnCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaEnCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaEnCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
