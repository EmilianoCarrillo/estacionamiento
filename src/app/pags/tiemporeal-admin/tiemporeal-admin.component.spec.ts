import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiemporealAdminComponent } from './tiemporeal-admin.component';

describe('TiemporealAdminComponent', () => {
  let component: TiemporealAdminComponent;
  let fixture: ComponentFixture<TiemporealAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiemporealAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiemporealAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
