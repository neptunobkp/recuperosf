import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndPrejudicialInternoComponent } from './bnd-prejudicial-interno.component';

describe('BndPrejudicialInternoComponent', () => {
  let component: BndPrejudicialInternoComponent;
  let fixture: ComponentFixture<BndPrejudicialInternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndPrejudicialInternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndPrejudicialInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
