export enum UserRole {
  CLIENT = 'CLIENT',
  PSYCHOLOGIST = 'PSYCHOLOGIST'
}

export interface UserResponse {
  id: string
  username: string
  first_name: string
  last_name: string,
  relation: string,
  roles: UserRole[]
}

export interface UserListResponse {
  users: UserResponse[]
}

export interface UserFilter {
  filter?: string
}

export interface UserInfo {
  userId: string;
  clientFullName: string;
}

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
}

export interface SessionUser {
  id: string
  username: string
  firstName: string
  lastName: string,
  roles: UserRole[]
}
