export interface UserResponse {
  id: string
  username: string
  first_name: string
  last_name: string,
  relation: string
}

export interface UserListResponse {
  users: UserResponse[]
}

export interface UserFilter {
  filter?: string
}

export interface UserInfo {
  clientId: string;
  clientFullName: string;
}

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
}

export interface Contact extends User{
  relation: string
}
