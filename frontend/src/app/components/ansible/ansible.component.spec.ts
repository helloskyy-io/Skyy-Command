import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsibleComponent } from './ansible.component';

describe('AnsibleComponent', () => {
  let component: AnsibleComponent;
  let fixture: ComponentFixture<AnsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnsibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
