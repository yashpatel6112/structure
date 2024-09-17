import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  users: any[] = [];
  loading = false;


  constructor(private http: HttpClient) {
    this.getUsers();
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.http
      .get<{ data: any[] }>('http://localhost:8000/api/v1/auth/getAllUsers', {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.users = response.data;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
