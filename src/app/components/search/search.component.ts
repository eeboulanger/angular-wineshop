import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  constructor(private router:Router){

  }
  
  ngOnInit(): void {
    
  }

  doSearch(keyword:string){
    this.router.navigateByUrl(`/search/${keyword}`)
  }

}
