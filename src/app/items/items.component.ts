import { Component, OnInit } from '@angular/core';
import {ItemsService} from './items.service';
import {SearchPipe} from './items.filterItem.pipe';
declare var jQuery:any;


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  
})
export class ItemsComponent implements OnInit {


	items = [];
	$item = {id: '', data: {}};

  panelshow: string = 'DE' ;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: ItemsService) {

  }

  ngOnInit() {
  		this.service.getItems()
  			.subscribe(http_items => this.items = http_items);

      this.$item.data = 
        {
          pic:'', 
          name:{
            it:{main: '', spec:''},
            de:{main: '', spec:''},
            pl:{main: '', spec:''},
          }
        }


  }

  selectId(id: string){
  	this.$item.id = id;
  	this.service.getItem(id)
  	.subscribe(http_item => this.$item.data = http_item);
    return this.$item;
  }


  updateItem(){
    this.service.updateItem(this.$item.data)
    .subscribe(
      $item => {
        this.successMessage = 'Item updated';
        console.log('item updated');
        this.service.getItems()
        .subscribe(http_items => this.items = http_items);
        jQuery("#editModal").modal("hide");
      },
      err => {
        this.errorMessage = err;
        console.log(err);
      }

      );

  }

  addItem(){

    let item = {
          pic:'', 
          name:{
            it:{main: '', spec:''},
            de:{main: '', spec:''},
            pl:{main: '', spec:''},
          }
        }


    this.service.createItem(item)
    .subscribe(
      $item => {
        this.successMessage = "Item added"; 
        console.log('item created');
        this.service.getItems()
        .subscribe(http_items => this.items = http_items);
      },
      err => {
        this.errorMessage = err; 
        console.log(err);
      }
      );
    
  }

  deleteItem(){
    this.service.deleteItem(this.$item.data)
    .subscribe(
      $item => {
        console.log('item deleted'); 
        this.successMessage = 'Item deleted';
        this.service.getItems()
        .subscribe(http_items => this.items = http_items); 
        jQuery("#deleteModal").modal("hide");
        
      },
      err => {console.log(err); this.errorMessage = err;}
      );
    
  }

  private setPanel(name){ return this.panelshow = name;}






}
