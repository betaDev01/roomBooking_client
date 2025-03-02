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
  hotelList: { path: '/booking/list', method: 'GET' },
  modifyBooking: { path: '/booking/modify', method: 'POST' },
  deleteBooking: { path: '/booking/delete', method: 'DELETE' },
  getBookingDetais: { path: '/booking/booking-list', method: 'GET' }
}