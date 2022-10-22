import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificablesComponent } from './certificables.component';

describe('CertificablesComponent', () => {
  let component: CertificablesComponent;
  let fixture: ComponentFixture<CertificablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
