import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../models/employee.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employeesUrl = '../../assets/employees.json';

  constructor(private http: HttpClient) {
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        map(employees => employees.find(employee => employee.id === id))
      );
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl);
  }
}
