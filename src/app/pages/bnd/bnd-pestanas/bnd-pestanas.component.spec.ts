import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndPestanasComponent } from './bnd-pestanas.component';

describe('BndPestanasComponent', () => {
  let component: BndPestanasComponent;
  let fixture: ComponentFixture<BndPestanasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndPestanasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndPestanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
