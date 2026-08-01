import React from 'react'
import ProfileHero from './ProfileHero'
import ProfileInfo from './ProfileInfo'
import QuickActions from './QuickActions'
import RecentOrders from './RecentOrders'

function Profile() {
  return (
    <>
    <div className="bg-[#F8F4EC] min-h-screen">
    <ProfileHero/>
    <ProfileInfo/>
    <QuickActions/>
    <RecentOrders/>
    </div>
    </>
  )
}

export default Profile