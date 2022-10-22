import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndSiniestroGeneralComponent } from './bnd-siniestro-general.component';

describe('BndSiniestroGeneralComponent', () => {
  let component: BndSiniestroGeneralComponent;
  let fixture: ComponentFixture<BndSiniestroGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndSiniestroGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndSiniestroGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
