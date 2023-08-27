import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apiservice } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent implements OnInit {
  public salaryValue: string[] = ["1LPA-5LPA", "5LPA-10LPA", "10LPA and above"];
  public genders: string[] = ["Male", "Female"];
  public freshness: string[] = ["Fresher" , "Experienced"];
  public skills: string[] = ["HTML,CSS,JS" , "JAVA,NODEJS,PYTHON" , "AWS,JENKINS,GIT"];
  public desgination: string[] = ["FRONTEND DEV" , "BACKEND DEV" , "DEVOPS"];

  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private api: Apiservice, 
    private router: Router,
    private toastService: NgToastService){

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      companyEmail: [''],
      employeeCode: [''],
      dateOfJoining: [''],
      employeeStatus: [''],
      gender: [''],
      freshness: [''],
      salaryPackage: [''],
      skills: [''],
      role: [''],
      mobile: ['']
    });

    this.activatedRoute.params.subscribe(val=>{
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate)
      .subscribe(res=>{
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      })
    })
  }
  submit(){
    this.api.postRegistration(this.registerForm.value)
    .subscribe(res=>{
      this.toastService.success({detail:"SUCCESS", summary:"Details added", duration:3000});
      this.registerForm.reset();
    }
  )
}

update(){
  this.api.updateRegisteredUser(this.registerForm.value, this.userIdToUpdate)
    .subscribe(res=>{
      this.toastService.success({detail:"SUCCESS", summary:"Details Updated", duration:3000});
      this.registerForm.reset();
      this.router.navigate(['list']);

    }
  )
}

fillFormToUpdate(user: User){
  this.registerForm.setValue({
    firstName: user.firstName,
    lastName: user.lastName,
    companyEmail: user.companyEmail,
    employeeCode: user.employeeCode,
    dateOfJoining: user.dateOfJoining,
    employeeStatus: user.employeeStatus,
    gender: user.gender,
    freshness: user.freshness,
    salaryPackage: user.salaryPackage,
    skills: user.skills,
    role: user.role,
    mobile: user.mobile
  })

}
}
