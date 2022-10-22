import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndInterBciZenitComponent } from './bnd-inter-bci-zenit.component';

describe('BndInterBciZenitComponent', () => {
  let component: BndInterBciZenitComponent;
  let fixture: ComponentFixture<BndInterBciZenitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndInterBciZenitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndInterBciZenitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
