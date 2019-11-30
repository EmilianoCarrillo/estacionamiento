import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdoscuentaUsuarioComponent } from './edoscuenta-usuario.component';

describe('EdoscuentaUsuarioComponent', () => {
  let component: EdoscuentaUsuarioComponent;
  let fixture: ComponentFixture<EdoscuentaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdoscuentaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdoscuentaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
