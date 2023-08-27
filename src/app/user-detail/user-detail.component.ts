import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public userId!: number;
  userDetails!: User;
  constructor(private activatedRoute: ActivatedRoute, private api: Apiservice) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    })
  }

  fetchUserDetails(userId: number) {
    this.api.getRegisteredUserId(userId)
      .subscribe(res => {
          this.userDetails = res;
          console.log(this.userDetails);
        })
      }
  }
