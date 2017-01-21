import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search',
	pure: false
})

export class SearchPipe implements PipeTransform {

	transform(items: any[], args: any[]): any {
       let filter = args[0].toLocaleLowerCase();
       return filter ? items.filter(item=> item.profile.name.it.main.toLocaleLowerCase().indexOf(filter) != -1) : items;
    }

	

	
	
}


