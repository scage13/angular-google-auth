import { GoogleUser, User } from '../types/auth.type';

export function mapUserResponse(response: GoogleUser): User {
  const profile = response.getBasicProfile();
  const authData = response.getAuthResponse();

  return {
    authData,
    email: profile.getEmail(),
    familyName: profile.getFamilyName(),
    givenName: profile.getGivenName(),
    image: profile.getImageUrl(),
    name: profile.getName(),
  };
}
