import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AleartMessageComponent } from '../aleart-message/aleart-message.component';
import { universalService } from '../Services/universal.service';
import { StudyManagementComponent } from '../study-management/study-management.component';

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
    private dialogRef: MatDialogRef<UpdateManagementComponent, AleartMessageComponent>,
    private universalService : universalService,
    private StudyManagementComponent:StudyManagementComponent,
    private dialog: MatDialog,
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
  msg: string = "Do you want to update this record.?"

  onDoneClick(): void {
    let dialogRef = this.dialog.open(AleartMessageComponent, {
      width: '25%',
      height: '20%',
      data: this.msg
    });
    dialogRef.afterClosed().subscribe(result => {
      result ={ result1: [this.studyId, this.studyInstanceId, this.studyName, this.studyDescription, this.modalities,
        this.studySequence, this.studyDate, this.studyComments, this.studySeries, this.studyInstances], result2:"Yes"};
      if (result.result2 == "Yes") {
        this.universalService.updateDetails(result.result1);
        this.StudyManagementComponent.getRestItems();
      } else {
        return;
      }
    });
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
