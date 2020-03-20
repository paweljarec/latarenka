import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ComunnicationService } from '../services/comunnication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface LanternCord {
  x: number;
  y: number;
}

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  displayedColumns: string[] = ['x', 'y', 'actions'];
  dataSource = new MatTableDataSource<LanternCord>([]);

  constructor(
    private communicationService: ComunnicationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource.data = this.communicationService.lanterns.features
      .filter(lantern => lantern.properties.isDamaged)
      .map(lantern => ({
        x: lantern.geometry.coordinates[0],
        y: lantern.geometry.coordinates[1]
      }));

    this.communicationService.damagedLantern$.subscribe(lantern => {
      this.dataSource.data = [
        ...this.dataSource.data,
        {
          x: lantern.geometry.coordinates[0],
          y: lantern.geometry.coordinates[1]
        }
      ];
    });
  }

  public fixed(lantern: LanternCord) {
    this.communicationService.lanterns.features.filter(
      x => x.geometry.coordinates[0] === lantern.x
    )[0].properties.isDamaged = false;

    this.dataSource.data = [
      ...this.dataSource.data.filter(lanternn => lanternn.x !== lantern.x)
    ];

    this.openSnackBar('Zgłoszenie zostało naprawione', null);
  }

  public notDamaged(lantern: LanternCord) {
    // dodatkowa logika blokujaca użytkownika który zgłosił lampe
    this.communicationService.lanterns.features.filter(
      x => x.geometry.coordinates[0] === lantern.x
    )[0].properties.isDamaged = false;

    this.dataSource.data = [
      ...this.dataSource.data.filter(lanternn => lanternn.x !== lantern.x)
    ];

    this.openSnackBar('Użytkownik został zablokowany na 24h', null);
  }

  public zoomToPoint(lantern: LanternCord) {
    this.communicationService.setFlyToLocation(lantern);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
