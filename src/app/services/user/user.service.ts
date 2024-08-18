import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public showUser: boolean = false;

  public toggleShowUser(): void {
    this.showUser = !this.showUser;
  }
}
