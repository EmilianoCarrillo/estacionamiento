import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaPasadaComponent } from './tarjeta-pasada.component';

describe('TarjetaPasadaComponent', () => {
  let component: TarjetaPasadaComponent;
  let fixture: ComponentFixture<TarjetaPasadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaPasadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaPasadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
