import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { DemoMaterialModule } from "@app/material.module";
import { Store, select } from "@ngrx/store";
import {
  UsersActions,
  getUsers,
  getLoadingStatus,
} from "@app/_state/users/users-store";
import { User, UsersState } from "../../_shared/models/user";
import { Subscription } from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule, DemoMaterialModule, FormsModule],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class UsersComponent implements OnInit {
  dataSource: User[] = [];
  columnsToDisplay = [
    "id",
    "firstName",
    "lastName",
    "maidenName",
    "age",
    "gender",
    "email",
    "birthDate",
    "height",
    "weight",
    "eyeColor",
  ];
  users: User[] = [];
  subscription: Subscription = new Subscription();
  isLoading = false;
  currentUser: any = {};
  expandedUser = null;

  constructor(private store: Store<UsersState>) {}

  ngOnInit() {
    const usersObs$ = this.store.pipe(select(getUsers));

    this.subscription = usersObs$.subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = this.users;
      this.currentUser = {};
    });

    this.store
      .select(getLoadingStatus)
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.getUsers();
  }

  getUsers() {
    this.store.dispatch(UsersActions.getUsers());
  }

  saveUser(user: User) {
    if (Object.keys(this.currentUser).length > 0) {
      this.store.dispatch(
        UsersActions.beginUpdate({
          user: this.currentUser,
        })
      );
    }
  }

  cancelEditing() {
    this.expandedUser = null;
  }

  assignCurrentUser() {
    if (this.expandedUser) {
      this.currentUser = JSON.parse(JSON.stringify(this.expandedUser));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
