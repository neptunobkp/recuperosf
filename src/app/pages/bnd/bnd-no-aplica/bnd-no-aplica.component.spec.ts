import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndNoAplicaComponent } from './bnd-no-aplica.component';

describe('BndNoAplicaComponent', () => {
  let component: BndNoAplicaComponent;
  let fixture: ComponentFixture<BndNoAplicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndNoAplicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndNoAplicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
