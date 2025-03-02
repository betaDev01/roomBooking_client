import { lazy } from 'react';

export const routes = [
  {
    name: 'Dashboard',
    route: '/',
    component: lazy(() => import('../containers/home'))
  },
  {
    name: 'Profile',
    route: '/profile',
    component: lazy(() => import('../containers/profile'))
  }
]

export const API_ROUTES = {
  hotelList: { path: '/list', method: 'GET' },
  modifyBooking: { path: '/modify', method: 'POST' },
  deleteBooking: { path: '/delete', method: 'DELETE' },
  getBookingDetais: { path: '/booking-list', method: 'GET' }
}