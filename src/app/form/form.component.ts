import { ComunnicationService } from './../services/comunnication.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  lanternNumber: string;

  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private comunnicationService: ComunnicationService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  ngOnInit() {
    this.lanternNumber = '';
    this.createForm();
    this.subscriptions.push(
      this.comunnicationService.focusedLantern$.subscribe(lantern => {
        if (lantern) {
          this.lanternNumber = lantern.geometry.coordinates[0];
        }
      })
    );
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      surname: [null, [Validators.required, Validators.minLength(3)]],
      contactNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      lanternNumber: [{ value: null, disabled: true }, [Validators.required]],
      validate: ''
    });
  }

  onSubmit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px'
    });
  }
}
