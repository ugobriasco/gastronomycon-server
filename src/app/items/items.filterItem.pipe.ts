import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search',
	pure: false
})

export class SearchPipe implements PipeTransform {

	transform(items: any[], arg: string): any {
		let low_arg = arg.toLowerCase();
        if(!arg){
       	 return items; //return all if no entry
        } else {
        return items.filter(item => 
	       	item.name.it.main.toLowerCase().indexOf(low_arg) > -1 
	       	|| item.name.it.spec.toLowerCase().indexOf(low_arg) > -1 
	      	|| item.name.de.main.toLowerCase().indexOf(low_arg) > -1 
	       	|| item.name.de.spec.toLowerCase().indexOf(low_arg) > -1 
	       	|| item.name.pl.main.toLowerCase().indexOf(low_arg) > -1 
	       	|| item.name.pl.spec.toLowerCase().indexOf(low_arg) > -1  

	       	);

       }
    }	
}




