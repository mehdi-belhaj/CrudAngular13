import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCandidateComponent } from './import-candidate.component';

describe('ImportCandidateComponent', () => {
  let component: ImportCandidateComponent;
  let fixture: ComponentFixture<ImportCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
