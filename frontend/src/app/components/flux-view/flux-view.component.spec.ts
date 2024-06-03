import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxViewComponent } from './flux-view.component';

describe('FluxViewComponent', () => {
  let component: FluxViewComponent;
  let fixture: ComponentFixture<FluxViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FluxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
