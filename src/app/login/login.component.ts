import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { tap } from 'rxjs/operators'

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  errorLogin: boolean = false;
  constructor(private router: Router, private loginService: LoginService) {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl(''),
      password: new UntypedFormControl('')
    });

  }
  onClick(): void {
    this.errorLogin = !this.errorLogin;
  }
  ngOnInit(): void {
    
  }
  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    var result = this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(Auth => { 
      console.log(Auth);
      
      if (Auth) { this.router.navigate(['/home']); } else { this.errorLogin = true; } });
    console.log(result);

    /*
    if (result) {
      this.router.navigate(['/home']);
    }
    else {
      this.errorLogin = true;

    }*/
  }
}
