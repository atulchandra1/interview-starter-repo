import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { User } from "../../_shared/models/user";
import { UsersActions } from "./users-store";
import { switchMap, map, delay, catchError, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UsersService } from "@app/_shared/services/users.service";

@Injectable()
export class UsersEffects {
  actions$ = inject(Actions);

  constructor(private http: HttpClient, private usersService: UsersService) {}

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.getUsers),
      switchMap(() => {
        return this.usersService.getUsers();
      }),
      map((response) => {
        return response.users.map((user) => {
          return {
            ...user,
          };
        });
      }),
      map((users) => {
        return UsersActions.initializeUsers({ users });
      }),
      catchError((error) => {
        return of(error);
      })
    );
  });

  saveUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.beginUpdate),
      delay(3000),
      map((action) => {
        return UsersActions.completeUpdate({
          user: action.user,
        });
      })
    );
  });
}
