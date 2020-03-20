import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComunnicationService } from '../services/comunnication.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  private focusedLantern: any;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, private snackBar: MatSnackBar,
              private communicationService: ComunnicationService) { }

  ngOnInit() {
    this.communicationService.focusedLantern$.subscribe(lantern => {
      this.focusedLantern = lantern;
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.communicationService.setLanternDamaged(this.focusedLantern);

    this.openSnackBar('Zgłoszenie zostało wysłane', null);
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
