import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomadComponent } from './nomad.component';

describe('NomadComponent', () => {
  let component: NomadComponent;
  let fixture: ComponentFixture<NomadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NomadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
