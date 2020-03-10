import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrls: ['./study-management.component.css']
})

export class StudyManagementComponent implements OnInit {
  public studyDes: "";
  public studyName:"";
  public picker: any;
  public selectValue: string;
  public selectDate: Date;
  public dataSource: any;
  public Data: any;
  public jsonData: any;

  displayedColumns: string[] = ['studyId', 'studyInstanceId', 'studyName', 'studyDescription',
    'modalities', 'studySequence', 'studyDate', 'studyComments', 'studySeries', 'studyInstances'];

  restItemsUrl = 'http://10.242.76.17/Service/Service.svc/JSON/GetDataJson/';

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getRestItems();
  }

  sendGetRequest() {
    return this.http.get<any>(this.restItemsUrl);
  }

  getRestItems(): void {
    this.sendGetRequest().subscribe((data: any) => {
      let jsonData = JSON.parse(data);
      this.jsonData = jsonData;
      this.formateData();
    });
  }

  searchText() {
    try {
      this.studyDes = this.studyDes;
    } catch (error) {
      console.log(error + "Error on search");
    }
  }

  
  formateData() {
    let numbers = new Array();
    for (let i = 0; i < this.jsonData.length; i++) {
      
      numbers.push({
        studyId: this.jsonData[i]['Study Id'],
        studyInstanceId: this.jsonData[i]['Study Instance Id'],
        studyName: this.jsonData[i]['Study Name'],
        studyDescription: this.jsonData[i]['Study Description'],
        modalities: this.jsonData[i]['Modalities'],
        studySequence: this.jsonData[i]['Study Sequence'],
        studyDate: this.jsonData[i]['Study Date'],
        studyComments: this.jsonData[i]['Study Comments'],
        studySeries: this.jsonData[i]['Study Series'],
        studyInstances: this.jsonData[i]['Study Instances']
      });
    }
    this.Data = numbers;
    this.getModalities();
  }

  modal = new Array();
 
  getModalities() {
    for (let i = 0; i < this.jsonData.length; i++) {
      this.modal.push({
        value: this.jsonData[i]['Modalities'],
        viewValue: this.jsonData[i]['Modalities']
      });
    }
    this.modal = _.uniqBy(this.modal, 'value');
  }

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

  getDetails(des: string, name:string, selectVal:any) {
    console.log(this.restItemsUrl + '?StudyDescription=' + des +'&Modalities='+selectVal +'&StudyName='+ name + '&StudyDate=');
    return this.http.get<any>(this.restItemsUrl + '?StudyDescription=' + des +'&Modalities='+ selectVal +'&StudyName='+ name);
  }

  getItemByParams(des:any, name:any, selectVal:any): void {
    this.getDetails(des,name,selectVal).subscribe((data: any) => {
      let jsonData = JSON.parse(data);
      this.jsonData = jsonData;
      this.formateData();
    }); 
  }

  studySearch() {
    try {      
      if(this.studyDes === undefined){
        this.studyDes ="";
      }
      if(this.studyName === undefined){
        this.studyName ="";
      }
      if(this.selectValue === undefined){
        this.selectValue ="";
      }
      this.getItemByParams(this.studyDes,this.studyName,this.selectValue);
    } catch (error) {
      console.log(error, 'Search error , Study Component', 'searching using input values');
    }
  }

  changeEvent(event: any) {
    this.selectDate = event.value;
  }
}
