import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesTable } from 'src/app/country-table';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  name:string;
  compare = false;
  cards:any[];
  selCountry : string;
  constructor(private route : ActivatedRoute , private searchService : SearchService) {
    this.cards = [];
    this.name = this.route.snapshot.params["name"];
    this.compare = JSON.parse(this.route.snapshot.params["compare"]);
    this.selCountry = searchService.getSelectedCountry();
   }

  ngOnInit() {

   if(!this.compare)
   {
    this.searchService.getCountryDetailsByName(this.name).subscribe((countryData : CountriesTable[]) => {
      countryData.forEach( data => {
        if(data.name == this.name){
          this.cards.push(   { cols : 1 , rows : 2, name : data.name , flag: data.flag , capital : data.capital ,currencies: data.currencies, region : data.region, subregion: data.subregion, timezones: data.timezones , borders: data.borders});
        }
      })
    }, err => {
      console.log(err);
    });
    this.searchService.updateSelectedCountry(this.name);
  }
  else{
  this.cards = [];
  this.searchService.getAllCountries().subscribe(( countryData : CountriesTable[]) => {
    countryData.forEach( data => {
      if(data.name == this.name || data.name == this.selCountry){
        this.cards.push(   { cols : 1 , rows : 2, name : data.name , flag: data.flag , capital : data.capital ,currencies: data.currencies, region : data.region, subregion: data.subregion, timezones: data.timezones , borders: data.borders});
      }
    })
  },err =>{
    console.log(err);
  });

  this.searchService.updateSelectedCountry(this.selCountry);  
  }
    
    
  }



}
