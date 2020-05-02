import { Component, OnInit } from '@angular/core';
import * as news from '../../../assets/news.json';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:  any  = (news  as  any).default;


  constructor() { }

  ngOnInit(): void {
  }

}
