import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpEntryScreenComponent } from './gp-entry-screen.component';

describe('GpEntryScreenComponent', () => {
  let component: GpEntryScreenComponent;
  let fixture: ComponentFixture<GpEntryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpEntryScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GpEntryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
