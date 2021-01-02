import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public username: string;
  public password: string;
  public errorMessage: string;

  constructor( private router: Router, private AuthService: AuthService) { }

  ngOnInit(): void {
  }

    login(form: NgForm){
      if (form.valid){
        this.AuthService.authenticate(this.username,this.password)
        .subscribe(Response=>{
          if (Response){
            this.router.navigateByUrl('/admin/main');
          }else{
          this.errorMessage = 'Hatalı username ya da parola..';
          console.log(this.errorMessage);}
        })
      }else{
        this.errorMessage ="bilgileri eksiksiz giriniz";
      }

    }
}
