import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaAutoComponent } from './tarjeta-auto.component';

describe('TarjetaAutoComponent', () => {
  let component: TarjetaAutoComponent;
  let fixture: ComponentFixture<TarjetaAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
