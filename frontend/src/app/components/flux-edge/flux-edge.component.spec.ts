import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxEdgeComponent } from './flux-edge.component';

describe('FluxEdgeComponent', () => {
  let component: FluxEdgeComponent;
  let fixture: ComponentFixture<FluxEdgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxEdgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FluxEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
