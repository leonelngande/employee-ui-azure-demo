import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from './models/employee.model';
import {EmployeesService} from './services/employees.service';
import {MatTableDataSource} from '@angular/material/table';
import {take} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeDialogComponent} from './components/employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: Array<keyof Employee> = ['lastName', 'firstName', 'username', 'officeNumber', 'mobileNumber'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeesService: EmployeesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.employeesService.getEmployees()
      .pipe(
        take(1)
      )
      .subscribe(employees => this.setDataSource(employees));

  }

  /** Sets the data source for the mat-table  */
  private setDataSource(employees: Employee[]) {
    // Assign the employees to the data source for the table to render
    this.dataSource = new MatTableDataSource(employees);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showEmployee(data: Employee) {
    this.dialog.open(EmployeeDialogComponent, {
      // width: '250px',
      data
    });
  }
}
