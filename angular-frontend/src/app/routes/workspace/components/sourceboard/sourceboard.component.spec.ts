import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceboardComponent } from './sourceboard.component';

describe('SourceboardComponent', () => {
  let component: SourceboardComponent;
  let fixture: ComponentFixture<SourceboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
