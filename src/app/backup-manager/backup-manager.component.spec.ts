import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupManagerComponent } from './backup-manager.component';

describe('BackupManagerComponent', () => {
  let component: BackupManagerComponent;
  let fixture: ComponentFixture<BackupManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackupManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackupManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
