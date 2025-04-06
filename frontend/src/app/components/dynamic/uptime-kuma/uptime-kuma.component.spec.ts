import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UptimeKumaComponent } from './uptime-kuma.component';

describe('UptimeKumaComponent', () => {
  let component: UptimeKumaComponent;
  let fixture: ComponentFixture<UptimeKumaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UptimeKumaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UptimeKumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
