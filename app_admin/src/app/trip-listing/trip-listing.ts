import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { Authentication } from '../services/authentication';

import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})

export class TripListing implements OnInit {

  trips!: Trip[]
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authenticationService: Authentication
    ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  //Delete one trip and reload the trip list
  public deleteTrip(tripCode: string): void {
     // Ask user to confirm before deleting
     const confirmed = window.confirm('Are you sure you want to delete this trip?');

     if (!confirmed) {
      return;
     }

     this.tripData.deleteTrip(tripCode).subscribe({
      next: () => {
        // Load trips again after delete
        this.getStuff();
      },
      error: (error: any) => {
        console.log('Delete error: ' + error);
      }
     });
  }

  public getStuff(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: any) => {
        this.trips = value;
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } 
        else {
          this.message = 'There were no trips retrieved from the database.';
        }
        console.log(this.message);

        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
}

ngOnInit(): void {
  console.log('ngOnInit');
  this.getStuff();
}

public isLoggedIn() 
{ 
return this.authenticationService.isLoggedIn(); 
} 

}
