import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';

interface Modality {
  value: string;
  viewValue: string;
}

interface IData {
  studyId: string,
  studyInstanceId: string,
  studyName: string,
  studyDescription: string,
  modalities: string,
  studySequence: string,
  studyDate: string,
  studyComments: string,
  studySeries: string,
  studyInstances: string
}

@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrls: ['./study-management.component.css']
})

export class StudyManagementComponent implements OnInit {
  public value: number;
  public viewValue: string;
  public studyDes: string;
  public studyName: string;
  public picker: any;
  public selectValue: string;
  public selectDate: Date;
  public dataSource: any;
  public Data: any;

  displayedColumns: string[] = ['studyId', 'studyInstanceId', 'studyName', 'studyDescription',
    'modalities', 'studySequence', 'studyDate', 'studyComments', 'studySeries', 'studyInstances'];

  public jsonData: any;

  restItems: any;
  //restItemsUrl = 'http://10.242.76.17:8733/Design_Time_Addresses/ClassLibrary1/HelloService/JSON/GetDataJson/';
  restItemsUrl = 'assets/Test.json';


  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
  ) {

  }
  products: any = [];
  ngOnInit(): void {
    this.http.get("assets/Test.json").subscribe((data: IData[]) => {
      this.element = data;
      this.Data = this.element;
    });
  }

  /*getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe((data:any)=>{
        this.element =data;
        this.dataSource = this.element;
      });
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      //.pipe(map(data => data));
  }*/

  searchText() {
    try {
      this.studyDes = this.studyDes;
    } catch (error) {
      console.log(error + "Error on search");
    }
  }

  Modalities: Modality[] = [
    { value: "Public university", viewValue: "Public university" },
    { value: "Junior college", viewValue: "Junior college" },
    { value: "Corporate university", viewValue: 'Corporate university' },
    { value: "Technical college", viewValue: 'Technical college' },
    { value: "Graduate school", viewValue: 'Graduate school' },
    { value: "Middle school", viewValue: 'Middle school' },
    { value: "University-preparatory school", viewValue: 'University-preparatory school' },
    { value: "University college", viewValue: 'University college' },
    { value: "Gymnasium", viewValue: 'Gymnasium' },
    { value: "High school", viewValue: 'High school' },
    { value: "Public university", viewValue: 'Public university' }
  ];


  clearSearch() {
    try {
      this.studyDes = '';
      this.studyName = '';
      this.selectValue = '';
      this.selectDate = null;
      this.cd.detectChanges();
    } catch (error) {
      console.table(error, 'clearSearch error , searchComponent', 'clearing search input values');
    }
  }

  changeValue(value: any) {
    this.selectValue = value;
  }

  getDetails(searchParams:any) {
    const httpOptions = {
        headers: { 'Content-Type': 'application/json' },
        params: {'/?StudyDescription': searchParams }
    };
    return this.http.get(this.restItemsUrl+'/?StudyDescription='+searchParams);
}
  element: IData[];
  studySearch(enterPressed: boolean) {
    try {
      this.studyDes = this.studyDes.trim();
      let rest = this.getDetails(this.studyDes);
      console.log(rest);
       
      
      /*if (enterPressed && this.studyDes.length === 0) {
         return;
       } else if (/^[\W_]+$/.test(this.studyDes)) {
         console.table('Search pattern is incorrect.Please input proper pattern.');
         return;
       }
 
       let queryConditions = [];
       let query = '';
       if (this.studyDes.length > 0) {
         queryConditions.push('studydescription=' + this.studyDes);
       }
       if (this.studyName.length > 0) {
         queryConditions.push('name=' + this.studyName);
       }*/

      /** Dynamic query generation loop */
      /*  for (let i = 0; i < queryConditions.length; i++) {
          if (i === 0) {
            query = query + queryConditions[i];
          } else {
            query = query + '&' + queryConditions[i];
          }
        }*/
    } catch (error) {
      console.log(error, 'Search error , Study Component', 'searching using input values');
    }
  }

  changeEvent(event: any) {
    this.selectDate = event.value;
  }
}
