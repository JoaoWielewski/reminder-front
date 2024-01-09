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
  
}


