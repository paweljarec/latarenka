import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ComunnicationService } from '../services/comunnication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface LanternData {
  x: number;
  y: number;
  notificatedBy: string;
  contactNumber: string;
}

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  displayedColumns: string[] = ['x', 'y', 'notificatedBy', 'contactNumber',  'actions'];
  dataSource = new MatTableDataSource<LanternData>([]);

  constructor(
    private communicationService: ComunnicationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource.data = this.communicationService.lanterns.features
      .filter(lantern => lantern.properties.isDamaged)
      .map(lantern => ({
        x: lantern.geometry.coordinates[0],
        y: lantern.geometry.coordinates[1],
        notificatedBy: lantern.properties.notificatedBy,
        contactNumber: lantern.properties.contactNumber
      }));

    this.communicationService.damagedLantern$.subscribe(lantern => {
      this.dataSource.data = [
        ...this.dataSource.data,
        {
          x: lantern.geometry.coordinates[0],
          y: lantern.geometry.coordinates[1],
          notificatedBy: lantern.properties.notificatedBy,
          contactNumber: lantern.properties.contactNumber
        }
      ];
    });
  }

  public fixed(lantern: LanternData) {
    this.communicationService.lanterns.features.filter(
      x => x.geometry.coordinates[0] === lantern.x
    )[0].properties.isDamaged = false;

    this.dataSource.data = [
      ...this.dataSource.data.filter(lanternn => lanternn.x !== lantern.x)
    ];

    this.openSnackBar('Zgłoszenie zostało naprawione', null);
  }

  public notDamaged(lantern: LanternData) {
    // dodatkowa logika blokujaca użytkownika który zgłosił lampe
    this.communicationService.lanterns.features.filter(
      x => x.geometry.coordinates[0] === lantern.x
    )[0].properties.isDamaged = false;

    this.dataSource.data = [
      ...this.dataSource.data.filter(lanternn => lanternn.x !== lantern.x)
    ];

    this.openSnackBar('Użytkownik został zablokowany na 24h', null);
  }

  public zoomToPoint(lantern: LanternData) {
    this.communicationService.setFlyToLocation(lantern);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
