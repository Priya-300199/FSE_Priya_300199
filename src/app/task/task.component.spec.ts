import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { FormsModule} from '@angular/forms';
import { ModalComponent } from '../_components/modal.componenet';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule} from '@angular/router/testing';


describe('TaskComponent', () => {
  let component: TaskComponent;
  let mcomponent: ModalComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let mfixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports:[FormsModule,HttpClientTestingModule,RouterTestingModule],
      declarations: [ TaskComponent,ModalComponent ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    mfixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    mcomponent = mfixture.componentInstance;
    fixture.detectChanges();
    mfixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mcomponent).toBeTruthy();
  });
});
