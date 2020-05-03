import { Component, OnInit } from '@angular/core';
// import * as news from '../../../assets/news.json';    //used when fetching data from local json 
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

	public news: any;

 	constructor(private route: ActivatedRoute) {}
 	
	ngOnInit(): void {
		this.news = this.route.snapshot.data['news'];
  	}

}
