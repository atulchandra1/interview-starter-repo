import { EntityState } from "@ngrx/entity";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  birthDate: string;
  height: string;
  weight: string;
  eyeColor: string;
}

export interface UsersState extends EntityState<User> {
  users: User[];
  isLoading: boolean;
}