import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../_components/modal.componenet';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';


describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let mcomponent: ModalComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let mfixture: ComponentFixture<ModalComponent>;
  
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({imports:[FormsModule,HttpClientTestingModule],
      declarations: [ ViewTaskComponent,ModalComponent ],
      providers: [{provide:Router,useClass:class {navigate = jasmine.createSpy("navigate");}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
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
