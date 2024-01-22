import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarTypesComponent } from './star-types.component';

describe('StarTypesComponent', () => {
  let component: StarTypesComponent;
  let fixture: ComponentFixture<StarTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
