import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndCartaIntercompaniaComponent } from './bnd-carta-intercompania.component';

describe('BndCartaIntercompaniaComponent', () => {
  let component: BndCartaIntercompaniaComponent;
  let fixture: ComponentFixture<BndCartaIntercompaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndCartaIntercompaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndCartaIntercompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
