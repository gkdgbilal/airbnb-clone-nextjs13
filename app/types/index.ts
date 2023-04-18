import { Listing, Reservation, User } from '@prisma/client'

export type SafeListing = Omit<Listing, 'createdAt'> & {
    createdAt: string
}

export type SafeReservation = Omit<Reservation, 'createdAt'> & {
    createdAt: string
    startDate: string
    endDate: string
    listing: SafeListing
}

export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}