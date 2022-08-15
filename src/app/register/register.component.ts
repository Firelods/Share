import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { RegisterService } from '../register.service';

@Component({
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.5s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.5s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup;
  errorLogin: boolean = false;
  constructor(private router: Router,private registerService: RegisterService,private loginService: LoginService) { 
    this.registerForm = new UntypedFormGroup({
      username: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
      email:new UntypedFormControl('')
    });
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (!this.registerForm.valid){
      return;
      this.errorLogin = true;
    }

    var result=this.registerService.register(this.registerForm.value.username,this.registerForm.value.password,this.registerForm.value.email).subscribe(Auth => {
      console.log(Auth);
      if(Auth){
        var LoginResult= this.loginService.login(this.registerForm.value.username,this.registerForm.value.password).subscribe(LoginResult=>{
          console.log(LoginResult);
          if(LoginResult){
            this.router.navigate(['/home']);
          }
          else{
            this.errorLogin=true;
          }
        });
      }else{
        this.errorLogin = true;
      }
      
      });

  };

}
