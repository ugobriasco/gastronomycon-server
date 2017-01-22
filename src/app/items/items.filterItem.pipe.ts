import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search'
})

export class SearchPipe implements PipeTransform {

	transform(items: any[], args: string): any {
       if(!args){
       	return items; //return all if no entry
       } else {
       return items.filter(item => item.name.it.main.toLowerCase().indexOf(args[0]) !== -1);

       }
    }	
}

