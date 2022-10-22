import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndSiniestroDocumentosComponent } from './bnd-siniestro-documentos.component';

describe('BndSiniestroDocumentosComponent', () => {
  let component: BndSiniestroDocumentosComponent;
  let fixture: ComponentFixture<BndSiniestroDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndSiniestroDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndSiniestroDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
