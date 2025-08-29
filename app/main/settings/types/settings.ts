export interface UserProfile {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  
  export interface BookingSettings {
    minimumNotice: number
    cancellationPolicy: string
    paymentMethods: {
      creditCard: boolean
      bankTransfer: boolean
      bankDetails?: {
        bankName: string
        accountNumber: string
      }
    }
  }
  
  export interface Settings {
    profile: UserProfile
    booking: BookingSettings
  }
  
  