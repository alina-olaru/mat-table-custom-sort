import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Customer {
  [key: string]: any;
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
export class AppComponent implements OnInit {
  customers = [
    {
      firstName: 'Joe',
      lastName: 'Backer',
      address: '',
      hasVoucher: true,
      total: 546.996,
    },
    {
      firstName: 'joe',
      lastName: 'Backer',
      address: '',
      hasVoucher: true,
      total: 546.996,
    },
    {
      firstName: 'Amanada',
      lastName: 'Cerkavosky',
      address: '',
      hasVoucher: true,
      total: 19764.23,
    },
    {
      firstName: 'Joe',
      lastName: 'McFlafer',
      address: '',
      hasVoucher: true,
      total: 20.5,
    },
    {
      firstName: 'Jonathan',
      lastName: 'Zamborksy',
      address: '',
      hasVoucher: false,
      total: 437453,
    },
  ];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  dataSource: MatTableDataSource<Customer>;
  displayedColumns = ['firstName', 'lastName', 'total', 'hasVoucher'];
  constructor() {
    this.dataSource = new MatTableDataSource<Customer>(this.customers);
  }
  ngOnInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        return item[property].toLocaleLowerCase();
      };

      this.dataSource.sortData = (data: Customer[], sort: MatSort) => {
        const active = sort.active;
        const direction = sort.direction;
        return data.sort((a: Customer, b: Customer) => {
          // Sorting logic here
          const valueA = this.dataSource.sortingDataAccessor(a, active);
          const valueB = this.dataSource.sortingDataAccessor(b, active);
          let comparatorResult = this.compareFunction(valueA, valueB);
          // if they are equals
          if (comparatorResult == 0)
          // we'll sort them using the field lastName
          {
            const valueALastName = this.dataSource.sortingDataAccessor(
              a,
              'lastName'
            );
            const valueBLastName = this.dataSource.sortingDataAccessor(
              b,
              'lastName'
            );
            // we get the comparator result
            comparatorResult = this.compareFunction(
              valueALastName,
              valueBLastName
            );
          }
          return comparatorResult * (direction == 'asc' ? 1 : -1);
        });
      };

    });
  }

  private compareFunction(a: any, b: any): number {
    let comparatorResult = 0;
    if (a != null && b != null) {
      // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
      if (a > b) {
        comparatorResult = 1;
      } else if (a < b) {
        comparatorResult = -1;
      }
    } else if (a != null) {
      comparatorResult = 1;
    } else if (b != null) {
      comparatorResult = -1;
    }
    return comparatorResult;
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
