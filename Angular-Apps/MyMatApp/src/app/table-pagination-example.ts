import {Component, OnInit, ViewChild,ViewChildren,ViewContainerRef,Input, ComponentFactory,ComponentFactoryResolver,ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatTableDataSource,MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataService} from './services/data.service';
import {ELEMENT_DATA} from './dataJSON';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-inline-message',
  template: 'Detail: {{ user }}',
  styles: [`
    :host {
      display: block;
      padding: 24px;
      color: red;
      background: rgba(0,0,0,0.1);
    }
  `]
})
export class InlineMessageComponent {
  @Input() user: string;
}


@Component({
  selector: 'table-pagination-example',
  styleUrls: ['table-pagination-example.css'],
  templateUrl: 'table-pagination-example.html',
})
export class TablePaginationExample implements OnInit {

  // ELEMENT_DATA: PeriodicElement[] = [
  //   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'}, 
  // ];

  displayedColumns = ['position', 'name', 'weight', 'symbol','expandableSection','delete'];
  
  
  //dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  dataSource = new ExampleDataSource(this.dataService);
  expandedRow: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChildren('cdkrow', { read: ViewContainerRef }) containers;

  constructor(private resolver: ComponentFactoryResolver,private changeDetectorRefs: ChangeDetectorRef,private dataService : DataService){

  }

  ngOnInit() {
  }

  // expandRow(index: number) {
  //   console.log(this.containers);
  //   console.log(index);
  //   // if (this.expandedRow != null) {
  //   //   // clear old message
  //   //   this.containers.toArray()[this.expandedRow].clear();
  //   // }
    
  //   if (this.expandedRow === index) {
  //     this.expandedRow = null;
  //   } else {
  //     const container = this.containers.toArray()[index];
  //     const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(InlineMessageComponent);
  //     const messageComponent = container.createComponent(factory);
      
  //     messageComponent.instance.user = ELEMENT_DATA[index].name;
  //     this.expandedRow = index;
  //   }
  // }

  showHideSection(element : PeriodicElement,$event) {
    console.log(this.containers.toArray());
    console.log(this.dataService.containerArray);
    console.log(ELEMENT_DATA.indexOf(element));    
    if($event.target.checked) {
      const container = this.containers.toArray()[this.dataService.containerArray.indexOf(element.position)];
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(InlineMessageComponent);
      const messageComponent = container.createComponent(factory);
      
      messageComponent.instance.user = element.name;
    } else {
      this.containers.toArray()[this.dataService.containerArray.indexOf(element.position)].clear();
    }
  }

  pushAtStart(){
    debugger;
    this.dataService.addToStart({position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'});
    
  }

  removeThisRow(element : PeriodicElement,$event){
    this.containers.toArray()[this.dataService.containerArray.indexOf(element.position)].clear();
    this.dataService.removeAnyElement(element);
   
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export class ExampleDataSource extends DataSource<PeriodicElement> {
  /** Stream of data that is provided to the table. */
  //data: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);

  constructor(private dataService : DataService){
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PeriodicElement[]> {
    return this.dataService.dataSourceRef;
  }

  disconnect() {}
}



// const   ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */