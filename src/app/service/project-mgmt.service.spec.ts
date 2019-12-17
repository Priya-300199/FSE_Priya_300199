import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { ProjectMGMTService } from './project-mgmt.service';

describe('ProjectMGMTService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports:[HttpClientTestingModule]}));

  it('should be created', () => {
    const service: ProjectMGMTService = TestBed.get(ProjectMGMTService);
    expect(service).toBeTruthy();
  });
});
