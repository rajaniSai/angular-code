import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  public async addUser(user: any): Promise<any> {
    console.log("user==>", user)

    const baseUrl = environment.baseURL;
    const token = "";
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    return new Promise((resolve, reject) => {
      console.log("base url==>", baseUrl + 'user');

      this.http.post(`${baseUrl}/user`, user, { headers })
        .toPromise()
        .then(response => {
          console.log("response", response);
          resolve(response);  // Properly resolve the outer promise
        })
        .catch(error => {
          console.error('An error occurred:', error);
          reject(error);  // Properly reject the outer promise
        });
    });

  }
}

