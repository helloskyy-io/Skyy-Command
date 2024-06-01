import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxCoreComponent } from './flux-core.component';

describe('FluxCoreComponent', () => {
  let component: FluxCoreComponent;
  let fixture: ComponentFixture<FluxCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxCoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FluxCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
