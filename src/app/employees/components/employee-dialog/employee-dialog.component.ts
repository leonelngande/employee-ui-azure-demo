import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Employee} from '../../models/employee.model';

/** @see https://material.angular.io/components/dialog/examples */

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    /**
     * There's a template compile error (due to usage of keyvalue pipe) when I use Employee interface instead of the below record type.
     * It's a bug that shouldn't occur so I suspect a bug introduced in Angular 9, have to investigate more and maybe open an issue in
     * the Angular repository.
     */
    @Inject(MAT_DIALOG_DATA) public data: Record<keyof Employee, any>,
  ) {
    console.log(data);
  }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
