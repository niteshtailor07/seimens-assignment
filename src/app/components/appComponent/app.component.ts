import { Component } from '@angular/core';
import {Items} from "./listdata";
import { items } from "./listdata";

interface PendingSelection {
	[ key: number ]: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'assignment';

	public pendingSelection: PendingSelection;
	public secondListItems: Items[];
	public firstListItems: Items[];

	constructor() {
		this.firstListItems = items
		this.secondListItems = [];
		this.pendingSelection = {};
	}

	public moveToFirstList( items?: Items ) {
		var selectedItems =  this.getSelectedItems( this.firstListItems );
		this.firstListItems = this.removeSelectedItems( this.firstListItems, selectedItems );
		this.secondListItems = selectedItems.concat( this.secondListItems );
    this.pendingSelection = {};
	}

	public moveToSecondList( items?: Items ) {
		var selectedItems = this.getSelectedItems( this.secondListItems );
		this.secondListItems = this.removeSelectedItems( this.secondListItems, selectedItems );
		this.firstListItems = selectedItems.concat( this.firstListItems );
    this.pendingSelection = {};
	}

	public onSelection( items: Items ) {
		this.pendingSelection[ items.id ] = ! this.pendingSelection[ items.id ];
	}

  private getSelectedItems(items: Items[]) {
    return items.filter((item) => {
      return (item.id in this.pendingSelection);
    });
  }

	private removeSelectedItems(itemsArr: Items[], itemsToRemove: Items[]) {
		return itemsArr.filter(( items ) => {
				return( ! itemsToRemove.includes( items ) );
		});
	}

  public deleteSelectedItems() {
    Object.keys(this.pendingSelection).forEach((key) => {
      const index = this.firstListItems.findIndex(item => item.id == parseInt(key));
      if(index >= 0) {
        this.firstListItems.splice(index, 1)
      }else{
        const index = this.secondListItems.findIndex(item => item.id == parseInt(key));
        this.secondListItems.splice(index, 1)
      }
      
    }); 
    this.pendingSelection = {};   
	}




}