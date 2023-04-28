  import React, { useEffect } from 'react'
import Profile from '../Components/OthersProfile'
import Post from '../Components/Post'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

  const ProfileOthers = ({ BackendUrl }) => {
    const {UserId} =useParams()
    const {UserData} =useSelector((state) => state.Users)
    const navigate=useNavigate()
    console.log(UserData.data.name)
    const echeckUser=() => {
        if (UserId == UserData.data.name) {
          console.log("Nav hm")
          navigate("/me")
        }
    }
    useEffect(() => {
      echeckUser()
    },[])
    return (
      <div>
        <Profile BackendUrl={BackendUrl}/>
      </div>
    )
  }
  
  export default ProfileOthers