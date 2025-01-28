import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from './http-service.service';


describe('HttpService', () => {
  let httpService: HttpService;

  beforeEach(() => {
    
    
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
 
    });
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(httpService).toBeTruthy();
  });

  it('should have httpOptions', () => { 
    expect(httpService.httpOptions).toBeTruthy();
  });

  it('should have getServiceData', () => {
    expect(httpService.getServiceData).toBeTruthy();
  });
});
