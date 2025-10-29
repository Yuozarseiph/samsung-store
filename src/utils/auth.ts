interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  address?: any
}

export const AuthService = {
  login: (email: string, password: string): User | null => {
    if (typeof window !== 'undefined') {
      const mockUser: User = {
        id: 'user-001',
        email: email,
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://i.pravatar.cc/150?u=john',
        phone: '+1 (555) 123-4567',
      }
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('isAuthenticated', 'true')
      return mockUser
    }
    return null
  },

  register: (userData: any): User | null => {
    if (typeof window !== 'undefined') {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: `https://i.pravatar.cc/150?u=${userData.email}`,
      }
      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('isAuthenticated', 'true')
      return newUser
    }
    return null
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  },

  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true'
    }
    return false
  },

  updateProfile: (userData: Partial<User>): User | null => {
    if (typeof window !== 'undefined') {
      const currentUser = AuthService.getCurrentUser()
      if (currentUser) {
        const updatedUser = { ...currentUser, ...userData }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        return updatedUser
      }
    }
    return null
  }
}
