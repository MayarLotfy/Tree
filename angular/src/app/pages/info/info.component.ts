import { Component, OnInit } from '@angular/core';
import { APIService } from '../../app_services/api.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { APIData , TreeData } from '../../app_services/models/api.data.structure'

@Component({
  selector: 'app-login',
  styleUrls: ['./template/info.component.scss'],
  templateUrl: './template/info.component.html',
})

export class infoComponent implements OnInit {

  constructor(private _apiService: APIService ,private route: ActivatedRoute, private router: Router){}

  ngOnInit() {


      
  }

 
}




