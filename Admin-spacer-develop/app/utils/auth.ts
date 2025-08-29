import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;  // user id
  
organizationId: string
  exp: number;  // expiration time
  // Add other expected fields from your JWT payload
}

export function decodeToken(token: string | null): DecodedToken | null {
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

export function isTokenExpired(decodedToken: DecodedToken): boolean {
  if (!decodedToken.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}