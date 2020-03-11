import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { universalService } from '../Services/universal.service';

export interface DataModel{
  studyId :string , studyInstanceId :string, studyName:string, studyDescription:string,
    modalities:string, studySequence:string, studyDate:Date, studyComments:string, studySeries:string, studyInstances:string
}


@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrls: ['./study-management.component.css']
})

export class StudyManagementComponent implements OnInit {
  public studyDes: "";
  public studyName: "";
  public picker: any;
  public selectValue: string;
  public selectDate: Date;
  public dataSource: any;
  public Data: any;
  public jsonData: any;
  public modal = new Array();

  displayedColumns: string[] = ['studyId', 'studyInstanceId', 'studyName', 'studyDescription',
    'modalities', 'studySequence', 'studyDate', 'studyComments', 'studySeries', 'studyInstances'];

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private universalService: universalService,
  ) { }

  ngOnInit(): void {
    this.getRestItems();
  }


  getRestItems(): void {
    this.universalService.getAll().subscribe((data: any) => {
      let jsonData = JSON.parse(data);
      if (jsonData.length === 0) {
        
      } else {
        this.jsonData = jsonData;
        this.formateData();
      }
    });
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
      this.Data = null;
      this.cd.detectChanges();
    } catch (error) {
      console.table(error, 'clearSearch error , searchComponent', 'clearing search input values');
    }
  }

  changeDropDownValue(value: any) {
    this.selectValue = value;
  }

  changeDateEvent(event: any) {
    this.selectDate = event.value;
  }

  getItemByParams(des: any, name: any, selectVal: any): void {
    this.universalService.getDetails(des, name, selectVal).subscribe((data: any) => {
      let jsonData = JSON.parse(data);
      if (jsonData.length === 0) {

      } else {
        this.jsonData = jsonData;
        this.formateData();
      }
    });
  }

  studySearch() {
    try {
      if (this.studyDes === undefined && this.studyName === undefined && this.selectValue === undefined && this.selectDate === undefined) {
        this.studyDes = "";
        this.studyName = "";
        this.selectValue = "";
        this.selectDate = null;
        this.getItemByParams(this.studyDes, this.studyName, this.selectValue);
      }
      else {
        if (this.studyDes === undefined) {
          this.studyDes = "";
        }
        if (this.studyName === undefined) {
          this.studyName = "";
        }
        if (this.selectValue === undefined) {
          this.selectValue = "";
        }
        this.getItemByParams(this.studyDes, this.studyName, this.selectValue);
      }
    } catch (error) {
      console.log(error, 'Search error , Study Component', 'searching using input values');
    }
  }

  editBtn(){
    console.log("You have been clicked");
  }
}
