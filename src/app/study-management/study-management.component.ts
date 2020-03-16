import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { universalService } from '../Services/universal.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateManagementComponent } from '../update-management/update-management.component';
import { DataModel } from './DataModel';
import { AleartMessageComponent } from '../aleart-message/aleart-message.component';

@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrls: ['./study-management.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MatDialog]
})

export class StudyManagementComponent implements OnInit {
  [x: string]: any;
  public studyDes: "";
  public studyName: "";
  public picker: any;
  public selectValue: string;
  public selectDate: Date;
  public dataSource: any;
  public Data: any;
  public jsonData: any;
  public modal = new Array();
  selectedElement: DataModel;
  msg: string = "Do you want to delete this record.?"


  displayedColumns: string[] = ['selected', 'studyId', 'studyInstanceId', 'studyName', 'studyDescription',
    'modalities', 'studySequence', 'studyDate', 'studyComments', 'studySeries', 'studyInstances'];

  constructor(
    private cd: ChangeDetectorRef,
    private universalService: universalService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateManagementComponent, AleartMessageComponent>,
  ) { }

  ngOnInit(): void {
    this.getRestItems();
  }


  getRestItems(): void {
    this.universalService.getAll().subscribe((data: any) => {
      let jsonData = JSON.parse(data);
      if (jsonData.length === 0) {
        console.log("hello harshal");
      } else {
        this.jsonData = jsonData;
        this.formateData();
      }
    });
  }

  formateData() {
    let numbers = new Array<DataModel>();
    for (let i = 0; i < this.jsonData.length; i++) {
      var d = this.jsonData[i]["Study Date"].slice(6, 19);
      let date = new Date(parseInt(d)).toLocaleDateString()
      numbers.push({
        studyId: this.jsonData[i]['Study Id'],
        studyInstanceId: this.jsonData[i]['Study Instance Id'],
        studyName: this.jsonData[i]['Study Name'],
        studyDescription: this.jsonData[i]['Study Description'],
        modalities: this.jsonData[i]['Modalities'],
        studySequence: this.jsonData[i]['Study Sequence'],
        studyDate: date,
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
        console.table(jsonData);
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

  editBtn() {
    console.log("You have been clicked");
  }

  radiobuttonClick(t: any) {
    console.log("Hello Harhal Raverkar" + t);
  }

  openEditDialog(): void {
    let dialogRef = this.dialog.open(UpdateManagementComponent, {
      width: '60%',
      height: '60%',
      data: this.selectedElement
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dialogRef.close();
    });
  }

  onDeleteClick(): void {
    let dialogRef = this.dialog.open(AleartMessageComponent, {
      width: '25%',
      height: '20%',
      data: this.msg
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == "Yes") {
        let data = this.selectedElement.studyId;
        this.universalService.removeSelectData(data);
        this.getRestItems();
      } else {
        return;
      }
    });
  }
}
