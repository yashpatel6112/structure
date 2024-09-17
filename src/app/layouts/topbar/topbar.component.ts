import { Router } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private authSubscription!: Subscription;
  private roleSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }
    );

    this.roleSubscription = this.authService.role$.subscribe((roleId) => {
      this.isAdmin = roleId === '66d9ab068a338412b1f38c7c';
    });
  }
  onLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout().subscribe((res) => {
        if (res.success) {
          this.authService.setLoggedIn(false);
          this.authService.isNotAuthenticated();
        } else {
          alert(res.message);
        }
      });
    }
  }
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  onUserClick() {
    this.router.navigate(['/user']);
  }
}
