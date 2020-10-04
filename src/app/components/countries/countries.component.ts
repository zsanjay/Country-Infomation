import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesTable } from 'src/app/country-table';
import { SearchService } from 'src/app/search.service';


@Component({
  selector: 'countries-root',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class HomeComponent implements OnInit {

@ViewChild(MatPaginator , {static : true}) paginator: MatPaginator;
@ViewChild(MatSort , {static : true}) sort: MatSort;
dataSource:any;
COLUMNS = ['name', 'view', 'compare'];
loading:boolean;
countySelected : boolean;
selectedCountryName : string;


  constructor(private searchService :SearchService,
    private router : Router , private route : ActivatedRoute){
    this.loading = true;
    this.countySelected = searchService.isCountrySelected();
    this.selectedCountryName = searchService.getSelectedCountry();
  }

ngOnInit() {
  this.searchService.getAllCountries().subscribe( (data:CountriesTable[]) => {
    this.dataSource = new MatTableDataSource<CountriesTable>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }, err => {
    console.log(err);
    this.loading = false;
  });
}

filterData(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

onCompare(name : string){
  this.router.navigate(['/detail/'+name +'/'+ true] , {relativeTo: this.route });
}

}





