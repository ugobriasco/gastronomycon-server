import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search'
})

export class SearchPipe implements PipeTransform {

	transform(items: any[], args: string): any {

		let low_args = args.toLowerCase();
       if(!args){
       	return items; //return all if no entry
       } else {
       return items.filter(item => 
       	item.name.it.main.toLowerCase().indexOf(low_args[0]) !== -1 || 
       	item.name.it.spec.toLowerCase().indexOf(low_args[0]) !== -1 || 
       	item.name.de.main.toLowerCase().indexOf(low_args[0]) !== -1 || 
       	item.name.de.spec.toLowerCase().indexOf(low_args[0]) !== -1 || 
       	item.name.pl.main.toLowerCase().indexOf(low_args[0]) !== -1 || 
       	item.name.pl.spec.toLowerCase().indexOf(low_args[0]) !== -1  

       	);

       }
    }	
}

