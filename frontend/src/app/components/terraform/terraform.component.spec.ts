import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerraformComponent } from './terraform.component';

describe('TerraformComponent', () => {
  let component: TerraformComponent;
  let fixture: ComponentFixture<TerraformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerraformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerraformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
