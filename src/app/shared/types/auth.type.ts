export type GoogleAuthBase = gapi.auth2.GoogleAuthBase;

export type GoogleUser = gapi.auth2.GoogleUser;

export type AuthResponse = gapi.auth2.AuthResponse;

export type User = {
  email: string;
  familyName: string;
  givenName: string;
  image: string;
  name: string;
  authData: AuthResponse;
};

export type AuthStateModel = {
  user: User | null;
};
