// user.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: Store<{ user: User }>) {}

  setUser(user: User) {
    this.store.dispatch(setUser({ user }));
  }

  clearUser() {
    this.store.dispatch(clearUser());
  }
}
