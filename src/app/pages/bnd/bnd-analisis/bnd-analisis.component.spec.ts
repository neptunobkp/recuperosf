import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndAnalisisComponent } from './bnd-analisis.component';

describe('BndAnalisisComponent', () => {
  let component: BndAnalisisComponent;
  let fixture: ComponentFixture<BndAnalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndAnalisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
