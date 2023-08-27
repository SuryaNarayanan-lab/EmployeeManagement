import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class Apiservice {
  private baseUrl: string = 'http://localhost:3000/employeeform'
constructor(private http: HttpClient) { }

postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
}

getRegisteredUser() {
    return this.http.get<User[]>(`${this.baseUrl}`)
}

updateRegisteredUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)
}

deleteRegistered(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
}

getRegisteredUserId(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
}

}