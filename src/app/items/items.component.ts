import { Component, OnInit } from '@angular/core';
import {ItemsService} from './items.service';

@Component({
  selector: 'app-items',
  //templateUrl: './items.component.html',

  template: `


  	<div class="container">
  		<div class="row">
  			<div class="col-md-12">
				<div id="custom-search-input">
	                <div class="input-group col-md-12">
	                    <input type="text" class="  search-query form-control" placeholder="Search" />
	                    <span class="input-group-btn">
	                        <button class="btn btn-danger" type="button">
	                            <span class=" glyphicon glyphicon-search"></span>
	                        </button>
	                    </span>
	                </div>
	            </div>
  			</div>
  		</div>
  		<div class="row">
  			<div class="col-md-12" *ngIf="items">
  				<table class="table">
		  			<thead>
					      <tr>
					        <th></th>
					        <th>IT</th>
					        <th>DE</th>
					        <th>PL</th>
					        <th></th>
					      </tr>
					</thead>
						<tbody *ngFor ="let item of items">
							<tr>
								<td colspan="5">Id: <small>{{item?._id}}</small></td>
							</tr>
							<tr>
								<td rowspan="2"><img src="{{item.pic}}" class="pic"/></td>
								<td class="span3"><strong>{{item?.name?.it?.main}}</strong></td>
								<td class="span3"><strong>{{item?.name?.de?.main}}</strong></td>
								<td class="span3"><strong>{{item?.name?.pl?.main}}</strong></td>
								<td class="span3"><i class="fa fa-trash right" aria-hidden="true"></i> </td>
							</tr>
							<tr>
								<td><em>{{item?.name?.it?.spec}}</em></td>
								<td><em>{{item?.name?.de?.spec}}</em></td>
								<td><em>{{item?.name?.pl?.spec}}</em></td>
								<td><i class="fa fa-pencil right" aria-hidden="true"></i></td>
							</tr>
						</tbody>
				</table>	
  			</div>

  		</div>
  		<div >
  		
  		</div>

  	</div>

  `,
  //styleUrls: ['./items.component.css']
  styles: [
  `
  #custom-search-input {
        margin:0;
        margin-top: 10px;
        padding: 0;
    }
 
    #custom-search-input .search-query {
        padding-right: 3px;
        padding-right: 4px \9;
        padding-left: 3px;
        padding-left: 4px \9;
        /* IE7-8 doesn't have border-radius, so don't indent the padding */
 
        margin-bottom: 0;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
 
    #custom-search-input button {
        border: 0;
        background: none;
        /** belows styles are working good */
        padding: 2px 5px;
        margin-top: 2px;
        position: relative;
        left: -28px;
        /* IE7-8 doesn't have border-radius, so don't indent the padding */
        margin-bottom: 0;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        color:#D9230F;
    }
 
    .search-query:focus + button {
        z-index: 3;   
    }

    .pic {
	    width: 100px;
	    height: 100px;
	    max-width: 100px;
	    max-height: 100px;
	    -webkit-border-radius: 50%;
	    -moz-border-radius: 50%;
	    border-radius: 50%;
	    border: 5px solid rgba(255,255,255,0.5);
	}

  `


  ]
})
export class ItemsComponent implements OnInit {


/*	items = [
	{
		_id: '000',
		pic: 'http://www.989wolf.com/wp-content/uploads/2016/05/maxresdefault-1.jpg' ,
		name:{
			it:{
				main: 'main',
				spec: 'spec'
			},
			de:{
				main: 'de_main',
				spec: 'de_spec'
			},
			pl:{
				main: 'pl_main',
				spec: 'pl_spec'
			},

		}	
	},
	{
		_id: '000',
		pic: 'http://www.989wolf.com/wp-content/uploads/2016/05/maxresdefault-1.jpg' , 
		name:{
			it:{
				main: 'main',
				spec: 'spec'
			},
			de:{
				main: 'de_main',
				spec: 'de_spec'
			},
			pl:{
				main: 'pl_main',
				spec: 'pl_spec'
			},

		}	
	},
	{
		_id: '000', 
		pic: 'http://www.989wolf.com/wp-content/uploads/2016/05/maxresdefault-1.jpg' ,
		name:{
			it:{
				main: 'main',
				spec: 'spec'
			},
			de:{
				main: 'de_main',
				spec: 'de_spec'
			},
			pl:{
				main: 'pl_main',
				spec: 'pl_spec'
			},

		}	
	},
	];*/

	items = [];

  constructor(private service: ItemsService) {}

  ngOnInit() {
  		this.service.getItems()
  			.subscribe(http_items => this.items = http_items);

  			console.log(this.items);
  		
  }

}
