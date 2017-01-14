import { Component, OnInit } from '@angular/core';
import {ItemsService} from './items.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
  
})
export class ItemsComponent implements OnInit {

	items = [];
	$item = {id: '', data:{} };
  panelshow: string = '' ;

  constructor(private service: ItemsService) {}

  ngOnInit() {
  		this.service.getItems()
  			.subscribe(http_items => this.items = http_items);  		
  }

  selectId(id: string){
  	this.$item.id = id;
  	this.service.getItem(id)
  	.subscribe(http_item => this.$item.data = http_item);
  	return this.$item;

  }



  updateItem(){
    this.service.updateItem(this.$item.data)
  }

  private setPanel(name){
    
    return this.panelshow = name;

  }



}
