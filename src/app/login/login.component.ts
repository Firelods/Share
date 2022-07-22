import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router,private loginService: LoginService) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password);
    this.router.navigate(['/home']);
  }
}
