import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-aleart-message',
  templateUrl: './aleart-message.component.html',
  styleUrls: ['./aleart-message.component.css']
})
export class AleartMessageComponent implements OnInit {

  public message: any;
  constructor(
    private dialogRef: MatDialogRef<AleartMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data;
  }

  ngOnInit(): void {
  }

  onYesClick() {
    this.dialogRef.close("Yes");
  }

  onNoClick() {
    this.dialogRef.close("No");
  }
}
