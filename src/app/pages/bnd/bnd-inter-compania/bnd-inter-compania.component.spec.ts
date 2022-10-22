import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndInterCompaniaComponent } from './bnd-inter-compania.component';

describe('BndInterCompaniaComponent', () => {
  let component: BndInterCompaniaComponent;
  let fixture: ComponentFixture<BndInterCompaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndInterCompaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndInterCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
