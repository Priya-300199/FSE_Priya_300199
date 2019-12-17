import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { FormsModule} from '@angular/forms';
import { ModalComponent} from '../_components/modal.componenet';
import { HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let mcomponent: ModalComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let mfixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports:[FormsModule,HttpClientTestingModule],
      declarations: [ ProjectComponent,ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    mfixture= TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    mcomponent=mfixture.componentInstance;
    fixture.detectChanges();
    mfixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mcomponent).toBeTruthy();
  });  
});
