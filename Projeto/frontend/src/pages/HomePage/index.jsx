import React from 'react'
import FollowVoting from './FollowVoting'
import MyVotings from './MyVotings'
import './styles.scss'

const HomePage = () => {

  return (
    <div className="homepage__container">
      <FollowVoting/>
      <MyVotings/>
    </div>
  )

}

export default HomePage