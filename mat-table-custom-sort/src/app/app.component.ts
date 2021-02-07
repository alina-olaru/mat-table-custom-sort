import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface Customer{
  firstName: string;
  lastName: string;
  address: string;
  hasVoucher: boolean;
  total: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{
  customers  = [
    {
      firstName: 'Joe',
      lastName: 'Backer',
      address: '',
      hasVoucher: true,
      total: 546.996
    },
    {
      firstName: 'joe',
      lastName: 'Backer',
      address: '',
      hasVoucher: true,
      total: 546.996
    },
    {
      firstName: 'Amanada',
      lastName: 'Cerkavosky',
      address: '',
      hasVoucher: true,
      total: 19764.23
    },
    {
      firstName: 'Joe',
      lastName: 'McFlafer',
      address: '',
      hasVoucher: true,
      total: 20.5
    },
    {
      firstName: 'Jonathan',
      lastName: 'Zamborksy',
      address: '',
      hasVoucher: false,
      total: 437453
    },
  ];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  dataSource: MatTableDataSource<Customer>;
  displayedColumns = [ 'firstName', 'lastName', 'total', 'hasVoucher'];
  constructor(){
    this.dataSource = new MatTableDataSource<Customer>(this.customers);
  }
  ngOnInit(){
    setTimeout(() => {
    this.dataSource.sort = this.sort;
    });
  }

  public sortData(): void {
    switch (this.sort.direction) {
      case 'asc':
        this.sort.direction = 'asc';
        break;
      case 'desc':
        this.sort.direction = 'desc';
        break;
      default:
        this.sort.direction = 'asc';
    }
  }
}
