import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndCobroDirectoComponent } from './bnd-cobro-directo.component';

describe('BndCobroDirectoComponent', () => {
  let component: BndCobroDirectoComponent;
  let fixture: ComponentFixture<BndCobroDirectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndCobroDirectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndCobroDirectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
