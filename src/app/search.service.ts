import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class SearchService {
  apiRoot: string = "https://restcountries.eu/rest/v2";
  selectedCountry : string;
  constructor(private http: HttpClient) {}

  getAllCountries(){
    return this.http.get(this.apiRoot);
  }

  getCountryDetailsByName(name : string){
    
    const url = `${this.apiRoot}/name/${name}`;
    return this.http.get(url);
    }


  isCountrySelected(){
    return this.selectedCountry != null ? true : false;
  }

  updateSelectedCountry(name : string){
    this.selectedCountry = name;
  }

  getSelectedCountry(){

    return this.selectedCountry;
  }
}