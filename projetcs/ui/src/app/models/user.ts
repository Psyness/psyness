export interface UserResponse {
  username: string
  first_name: string
  last_name: string
}

export interface UserListResponse {
  users: UserResponse[]
}

export interface User {
  username: string
  firstName: string
  lastName: string
}
