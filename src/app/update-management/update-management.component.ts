import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-management',
  templateUrl: './update-management.component.html',
  styleUrls: ['./update-management.component.css']
})
export class UpdateManagementComponent {
  title: "Hello Harhsal ";
  studyId: string;
  studyInstanceId: string;
  studyName: string;
  studyDescription: string;
  modalities: string;
  studySequence: string;
  studyDate: string;
  studyComments: string;
  studySeries: string;
  studyInstances: string;

  public message: any;
  constructor(
    private dialogRef: MatDialogRef<UpdateManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data;
    this.showData(this.message);
  }

  showData(message: any) {
    this.studyId = message.studyId;
    this.studyInstanceId = message.studyInstanceId;
    this.studyName = message.studyName;
    this.studyDescription = message.studyDescription;
    this.modalities = message.modalities;
    this.studySequence = message.studySequence;
    this.studyDate = message.studyDate;
    this.studyComments = message.studyComments;
    this.studySeries = message.studySeries;
    this.studyInstances = message.studyInstances;
  }

    onDoneClick(): void {
      this.dialogRef.close({});
    }

    onCancelClick():void{
      this.dialogRef.close();
    }
}
