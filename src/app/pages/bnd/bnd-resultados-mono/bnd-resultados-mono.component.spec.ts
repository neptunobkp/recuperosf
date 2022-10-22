import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndResultadosMonoComponent } from './bnd-resultados-mono.component';

describe('BndResultadosMonoComponent', () => {
  let component: BndResultadosMonoComponent;
  let fixture: ComponentFixture<BndResultadosMonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndResultadosMonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndResultadosMonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
