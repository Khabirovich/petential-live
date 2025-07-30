// Simple authentication for admin access
// In production, use a more secure authentication system

const ADMIN_PASSWORD = "petential-admin-2025" // Change this to your preferred password

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('admin-authenticated') === 'true'
}

export function authenticate(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('admin-authenticated', 'true')
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem('admin-authenticated')
}