import { Component, EventEmitter, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { IncomeformService } from 'src/app/service/incomeform.service';
import { UserformService } from 'src/app/service/userform.service';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { user } from '../userform/userform.model';
import { Observable, fromEvent, merge, of as observableOf } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { MatSort } from '@angular/material/sort';
import { query } from '@angular/animations';
import { Express } from 'express';
import { FormControl } from '@angular/forms';
// import { ResponseMessage } from 'src/app/service/data.service';

@Component({
  selector: 'app-datapage',
  templateUrl: './datapage.component.html',
  styleUrls: ['./datapage.component.scss']
})
export class DatapageComponent implements OnInit {

  displayedColumns: string[] = ["userId", "userName", "finacialYear", "age", "earn", "incomeId", "incomeValue", "interestValue", "otherSourceValue", "Tax", "NetSalary", "edit", "delete"];
  getdata: any = [];
  //dataSource: any = [];
  typevalue: any;
  excel: any;
  userdetails: any;
  incomedetails: any;
  searchTerm : string = '';
  finacialyear: any;
  earns: any;
  selectyearRange: any;
  data: any;
  tempuser: any = [];

  dataSource = new MatTableDataSource<any>();
  @Output() row = new EventEmitter<any>();
  myDate: Date = new Date();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  alternative = " ";
  selectoption = false;
  select = "";
  popup = false;
  selectedEarn = "";
  showselect: boolean = false;
  selectedYear: Date[] | undefined;
  refreshtemp: any;
  noData: boolean = false;
  totalData: number = 0;
  serverData: any = [];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  // getData !: MatTableDataSource<any>;
  pageIndex: number = 0;
  pageSize: number = 0;
  length: number = 0;
  totalPages: number = 0;
  page: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private dataservice: DataService,
    private userservice: UserformService, private incomeservice: IncomeformService,
    private toastr: ToastrService, private datepipe: DatePipe, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    //this.getdatapage();
    //this.applySearch();
    this.getserverpages(this.page,this.pageSize,this.searchTerm);
  }

  getserverpages(page: number, pageSize: number, searchTerm: string) {
    console.log("Hey i'm in get server page"+searchTerm);
    return this.dataservice.getserverpage(page, pageSize, searchTerm);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          const pageSize = Math.max(this.paginator.pageSize, 1);
          console.log(this.searchTerm);
          return this.getserverpages(
            this.paginator.pageIndex,
            pageSize,
            this.searchTerm,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((empData) => {
          if (empData == null) return [];
          this.totalData = empData.totalElements;
          console.log(this.totalData);
          return empData.content;
        }),
      )
      .subscribe((empData) => {
        this.getdata = empData;
        this.refreshtemp = empData;
        this.tempuser = empData;
        this.dataSource = new MatTableDataSource(empData);
        this.finacialyear = [...new Set(this.getdata.map((item: any) => item.finacialYear))]
        this.earns = [...new Set(this.getdata.map((item: any) => item.earn))]
      });
  }

  applySearch() {
    console.log('inside apply search event');
    this.paginator?.firstPage();
    // const pageSize = Math.max(this.paginator.pageSize, 1);
    // this.dataservice.getserverpage(this.page, pageSize, this.searchTerm)
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          const pageSize = Math.max(this.paginator.pageSize, 1);
          console.log(this.searchTerm);
          return this.getserverpages(
            this.paginator.pageIndex,
            pageSize,
            this.searchTerm,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((empData) => {
          if (empData == null) return [];
          this.totalData = empData.totalElements;
          console.log(this.totalData);
          return empData.content;
        }),
      )
    .subscribe((data)=>{
      console.log(data);
      this.getdata = data;
        this.refreshtemp = data;
        this.tempuser = data;
        this.dataSource = new MatTableDataSource(data);
    })
  }


  getdatapage(): void {
    this.dataservice.getdata().subscribe((data: any) => {
      console.log(data);
      this.tempuser = data;
      this.getdata = data;
      this.refreshtemp = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      //setTimeout(() => this.dataSource.paginator = this.paginator);
      this.finacialyear = [...new Set(this.getdata.map((item: any) => item.finacialYear))]
      this.earns = [...new Set(this.getdata.map((item: any) => item.earn))]
    })
  }

  getdownload() {
    this.dataservice.download(this.excel);
  }

  deletebyid(id: any) {
    if (confirm("Are you sure want to delete this row"))
      this.dataservice.delete(id).subscribe(data => {
        console.log(data);
        //this.getdatapage();
        this.getserverpages(this.page, this.pageSize,this.searchTerm);
        this.toastr.success('Deleted Successfully');
      })
  }

  edit(data: any) {
    this.userservice.setuserdetails(data);
    this.incomeservice.setincomedetails(data);
    this.router.navigate(['/userform'], { queryParams: { updatable: true } });
  }

  getrowById(id: any) {
    return this.data.find((row: { id: any; }) => row.id === id);
  }

  transferById(data: any) {
    const rowData = this.getrowById(data.userId);
    this.row.emit(rowData);
    console.log(data.userId);
    this.router.navigate(['/data'], { queryParams: { userId: data.userId } });
  }

  back() {
    this.router.navigate(['/incomeform']);
  }

  search(search: any) {
    if (search == " ") {
      this.getdata = this.tempuser;
      this.refreshtemp = this.getdata;
      return;
    }
    this.searchTerm = search;
    this.getdata = this.tempuser.filter((item: any) => (item.userName.toLowerCase().trim().includes(search.toLowerCase())) ||
      (item.earn.toLowerCase().trim().includes(search.toLowerCase())));
    console.log(this.getdata);
    this.dataSource = new MatTableDataSource(this.getdata);
    this.dataSource.paginator = this.paginator;
  }

  // financialYear() {
  //   if (this.selectedYear == "") {
  //     this.earns = [...new Set(this.tempuser.map(item => item.earn))]
  //     return;
  //   }
  //   console.log(this.selectedYear);
  //   const temp = this.tempuser.filter(item => item.finacialYear == this.selectedYear)
  //   this.finacialyear = [...new Set(temp.map(item => item.earn))]
  // }

  // earnType() {
  //   if (this.selectedEarn == "") {
  //     this.finacialyear = [...new Set(this.tempuser.map(item => item.finacialYear))]
  //     return
  //   }
  //   console.log(this.selectedEarn);
  //   const temp = this.tempuser.filter(item => item.earn == this.selectedEarn)
  //   this.earns = [...new Set(temp.map(item => item.finacialYear))]
  // }

  controlFilter() {
    if (this.selectedEarn == "" && this.selectedYear?.length == 0) {
      this.getdata = this.tempuser
    }
    else if (this.selectedYear?.length == 0) {
      this.getdata = this.tempuser.filter((item: any) => (item.earn == this.selectedEarn))
    }
    else if (this.selectedEarn == "") {
      this.getdata = this.tempuser.filter((item: any) => (item.finacialYear == this.selectedYear))
    }
    else {
      this.getdata = this.tempuser.filter((item: any) => (item.earn == this.selectedEarn && item.finacialYear == this.selectedYear))
    }
    // this.finacialyear = [...new Set(this.tempuser.map(item=>item.finacialYear))]
    // this.earns = [...new Set(this.tempuser.map(item=>item.earn))]
    this.showselect = false
    this.popup = false;
  }

  cancelFilter() {
    this.getdata = this.tempuser;
    this.getdata = this.refreshtemp;
    this.finacialyear = [...new Set(this.tempuser.map((item: any) => item.finacialYear))]
    this.earns = [...new Set(this.tempuser.map((item: any) => item.earn))]
    this.dataSource = new MatTableDataSource(this.getdata);
    this.dataSource.paginator = this.paginator;
    this.showselect = false;
    this.popup = false;
  }

  typeselect(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    console.log(selected);
    if (selected == " ") {
      this.getdata = this.tempuser;
      this.refreshtemp = this.getdata;
      return;
    }
    this.getdata = this.tempuser.filter((item: any) => (item.earn == selected));
    console.log(selected);
    this.dataSource = new MatTableDataSource(this.getdata);
    this.dataSource.paginator = this.paginator;
    return this.selectedEarn && this.selectedYear;
  }

  typeselectyear() {
    if (this.selectedYear && this.selectedYear.length === 2) {
      const startYear = this.selectedYear[0].getFullYear();
      const endYear = this.selectedYear[1].getFullYear();
      this.tempuser = this.getdata.filter((item: any) => {
        const year = item.finacialYear;
        console.log(this.tempuser);
        console.log(year);
        console.log(startYear + ' - ' + endYear);
        const FY = startYear + ' - ' + endYear;
        this.getdata = this.tempuser.filter((item: any) => (item.finacialYear == FY));
        this.dataSource = new MatTableDataSource(this.getdata);
        this.dataSource.paginator = this.paginator;
        return year >= startYear && year <= endYear;
      });
      console.log(this.selectedYear);
    } else {
      this.tempuser = this.getdata;
      this.refreshtemp = this.getdata;
    }
    this.popup = false;
    return this.selectedEarn && this.selectedYear;
  }

  filterpopup() {
    this.popup = true;
  }

  refresh() {
    this.getdatapage();
    this.getserverpages(this.page, this.pageSize, this.searchTerm);
  }

  // getDataServerPagination() {
  //   const page = this.paginator?.pageIndex + 1 || 0;
  //   const pageSize = this.paginator?.pageSize || 4;
  //   this.dataservice.getserverpage(page, pageSize).subscribe((data: any) => {
  //     console.log(data);
  //     this.serverData = data;
  //     this.getdata = data;
  //     this.dataSource = new MatTableDataSource(data);
  //     this.dataSource.sort = this.sort;
  //     //this.dataSource.paginator = this.paginator;
  //     this.totalData = this.serverData.length;
  //     this.pageSize = pageSize;
  //     this.pageIndex = page;
  //     this.hasNextPage = true;
  //     this.hasPreviousPage = true;
  //   });
  //   if (length == 0 || pageSize == 0) {
  //     return `0 of ${length}`;
  //   }
  //   length = Math.max(length, 0);
  //   const startIndex = page * pageSize;
  //   const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
  //   return `${startIndex + 1} - ${endIndex} of ${length}`;
  // }
}




