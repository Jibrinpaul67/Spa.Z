export interface NotificationSetting {
    id: string
    title: string
    description: string
    enabled: boolean
  }
  
  export interface NotificationSettings {
    notifications: NotificationSetting[]
  }
  
  