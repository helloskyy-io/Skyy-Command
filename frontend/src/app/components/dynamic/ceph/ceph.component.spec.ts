import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CephComponent } from './ceph.component';

describe('CephComponent', () => {
  let component: CephComponent;
  let fixture: ComponentFixture<CephComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CephComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CephComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
