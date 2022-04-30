export enum Provider {
  GOOGLE = 'GOOGLE'
}

export interface UserResponse {
  username: string
  provider: Provider
  first_name: string
  last_name: string
}

export interface User {
  username: string
  provider: Provider
  firstName: string
  lastName: string
}
