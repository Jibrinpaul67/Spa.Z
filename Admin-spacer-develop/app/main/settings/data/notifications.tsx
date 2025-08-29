import { NotificationSetting } from "../types/notification"

export const defaultNotifications: NotificationSetting[] = [
  {
    id: "notification1",
    title: "Booking Notifications",
    description: "Alerts for new bookings, changes, or cancellations across all managed spaces.",
    enabled: false
  },
  {
    id: "notification2",
    title: "Payment and Subscription Alerts:",
    description: "Notifications for upcoming renewals, failed payments, or overdue invoices.",
    enabled: true
  },
  {
    id: "notification3",
    title: "Policy Violations:",
    description: "Alerts for actions or behaviors that breach platform or organization-specific policies.",
    enabled: true
  },
  {
    id: "notification4",
    title: "User Activity Updates:",
    description: "Notifications for significant user activities, such as account creation, role changes, or deactivations.",
    enabled: false
  },
  {
    id: "notification5",
    title: "System Maintenance and Updates:",
    description: "Alerts about scheduled downtime, feature releases, or important platform updates.",
    enabled: true
  }
]