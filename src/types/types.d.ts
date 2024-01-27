export type ReminderType = {
  id: string
  doctorId: string
  pacientName: string
  pacientPhone: string
  periodType: string
  periodQuantity: string
  expectedReturnDate: Date
  status: string
  createdAt: Date
  updatedAt: Date
};

export type UserType = {
  id: string
  name: string
  phone: string
  specialty: string
  daysToSchedule: string
  email: string
  pronoun: string
  monthlyReminders: number
  remainingReminders: number
  isActive: boolean
  schedulePhone: string
  createdAt: string
}


