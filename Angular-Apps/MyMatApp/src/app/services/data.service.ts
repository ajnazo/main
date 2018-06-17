import { Injectable, } from '@angular/core';
import {PeriodicElement,} from '../table-pagination-example';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {ELEMENT_DATA} from '../dataJSON';

@Injectable()
export class DataService {

  dataSourceRef : BehaviorSubject<PeriodicElement[]> = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);
  containerArray : any[] = [];
  getData(): PeriodicElement[] { return this.dataSourceRef.value; }

  constructor() { 
    ELEMENT_DATA.forEach((elem)=>{
      this.containerArray.push(elem.position);
    })  
  }

  addToStart(element: PeriodicElement) {
    ELEMENT_DATA.unshift(element);
    this.containerArray.push(element.position);
    this.dataSourceRef.next(ELEMENT_DATA);
  }

  removeAnyElement(element : PeriodicElement) {
    ELEMENT_DATA.splice(ELEMENT_DATA.indexOf(element),1);
    this.containerArray.splice(this.containerArray.indexOf(element.position),1);
    this.dataSourceRef.next(ELEMENT_DATA);
  }

  getContainerArray(){
    return this.containerArray;
  }

}
