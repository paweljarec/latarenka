import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ComunnicationService } from '../services/comunnication.service';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['x', 'y'];
  dataSource = new MatTableDataSource<LanternCord>([]);

  constructor(
    private communicationService: ComunnicationService,
    private changeDetectorRefs: ChangeDetectorRef
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

      this.changeDetectorRefs.detectChanges();
    });
  }
}
