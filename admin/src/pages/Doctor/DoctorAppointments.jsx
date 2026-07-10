// import React from 'react'
// import { useContext, useEffect } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'

// const DoctorAppointments = () => {

//   const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
//   const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

//   useEffect(() => {
//     if (dToken) {
//       getAppointments()
//     }
//   }, [dToken])

//   return (
//     <div className='w-full max-w-6xl m-5 '>

//       <p className='mb-3 text-lg font-medium'>All Appointments</p>

//       <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
//         <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>
//         {appointments.map((item, index) => (
//           <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//             <p className='max-sm:hidden'>{index}</p>
//             <div className='flex items-center gap-2'>
//               <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
//             </div>
//             <div>
//               <p className='text-xs inline border border-primary px-2 rounded-full'>
//                 {item.payment?'Online':'CASH'}
//               </p>
//             </div>
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
//             <p>{currency}{item.amount}</p>
//             {item.cancelled
//               ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//               : item.isCompleted
//                 ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                 : <div className='flex'>
//                   <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                   <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                 </div>
//             }
//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default DoctorAppointments

// import React, { useContext, useEffect } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'

// const DoctorAppointments = () => {

//   const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
//   const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

//   useEffect(() => {
//     if (dToken) getAppointments()
//   }, [dToken])

//   return (
//     <div className='w-full max-w-6xl m-5'>

//       <p className='mb-3 text-lg font-medium'>All Appointments</p>

//       <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
//         {/* Table Header */}
//         <div className='grid grid-cols-[0.3fr_2fr_1fr_0.7fr_3fr_1.5fr_0.8fr_1fr] gap-3 py-3 px-6 border-b font-medium text-gray-700'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Address</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {/* Table Rows */}
//         {appointments.map((item, index) => (
//           <div
//             key={index}
//             className='grid grid-cols-[0.3fr_2fr_1fr_0.7fr_3fr_1.5fr_0.8fr_1fr] gap-3 items-center py-3 px-6 border-b hover:bg-gray-50 text-gray-600'
//           >
//             {/* Index */}
//             <p className='whitespace-nowrap'>{index + 1}</p>

//             {/* Patient */}
//             <div className='flex items-center gap-2 whitespace-nowrap'>
//               <img src={item.userData.image} className='w-8 h-8 rounded-full' alt="" />
//               <p>{item.userData.name}</p>
//             </div>

//             {/* Payment */}
//             <p className='text-xs inline border border-primary px-2 rounded-full whitespace-nowrap'>
//               {item.payment ? 'Online' : 'CASH'}
//             </p>

//             {/* Age */}
//             <p className='whitespace-nowrap'>{calculateAge(item.userData.dob)}</p>

//             {/* Address — Two Lines */}
//             <div className='leading-tight'>
//               <p>{item.userData.address?.line1}</p>
//               <p className='text-gray-400 text-xs'>{item.userData.address?.line2}</p>
//             </div>

//             {/* Date & Time */}
//             <p className='whitespace-nowrap'>
//               {slotDateFormat(item.slotDate)}, {item.slotTime}
//             </p>

//             {/* Fees */}
//             <p className='whitespace-nowrap'>{currency}{item.amount}</p>

//             {/* Action */}
//             {item.cancelled ? (
//               <p className='text-red-400 text-xs font-medium whitespace-nowrap'>Cancelled</p>
//             ) : item.isCompleted ? (
//               <p className='text-green-500 text-xs font-medium whitespace-nowrap'>Completed</p>
//             ) : (
//               <div className='flex gap-2 whitespace-nowrap'>
//                 <img
//                   onClick={() => cancelAppointment(item._id)}
//                   className='w-8 cursor-pointer'
//                   src={assets.cancel_icon}
//                   alt=""
//                 />
//                 <img
//                   onClick={() => completeAppointment(item._id)}
//                   className='w-8 cursor-pointer'
//                   src={assets.tick_icon}
//                   alt=""
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default DoctorAppointments




// import React, { useContext, useEffect } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import { Link } from "react-router-dom";


// const DoctorAppointments = () => {

//   const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
//   const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

//   useEffect(() => {
//     if (dToken) getAppointments()
//   }, [dToken])

//   return (
//     <div className='w-full max-w-6xl m-5'>

//       <p className='mb-3 text-lg font-medium'>All Appointments</p>

//       <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        
//         {/* Table Header */}
//         <div className="grid grid-cols-[0.3fr_2fr_1fr_0.7fr_3fr_1.5fr_0.8fr_1fr_1fr] gap-4 p-4 bg-white rounded-xl shadow-md">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Address</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//           <p>Health Info</p>
//         </div>

//         {/* Table Rows */}
//         {appointments.map((item, index) => {

//           // 🔥 Correct placement for console.log
//           console.log("APPOINTMENT:", item);

//           return (
//             <div
//               key={index}
//               className='grid grid-cols-[0.3fr_2fr_1fr_0.7fr_3fr_1.5fr_0.8fr_1fr_1fr] gap-3 items-center py-3 px-6 border-b hover:bg-gray-50 text-gray-600'
//             >
//               {/* Index */}
//               <p>{index + 1}</p>

//               {/* Patient */}
//               <div className='flex items-center gap-2'>
//                 <img src={item.userData.image} className='w-8 h-8 rounded-full' alt="" />
//                 <p>{item.userData.name}</p>
//               </div>

//               {/* Payment */}
//               <p className='text-xs inline border border-primary px-2 rounded-full'>
//                 {item.payment ? 'Online' : 'CASH'}
//               </p>

//               {/* Age */}
//               <p>{calculateAge(item.userData.dob)}</p>

//               {/* Address */}
//               <div className='leading-tight'>
//                 <p>{item.userData.address?.line1}</p>
//                 <p className='text-gray-400 text-xs'>{item.userData.address?.line2}</p>
//               </div>

//               {/* Date & Time */}
//               <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

//               {/* Fees */}
//               <p>{currency}{item.amount}</p>

//               {/* Action */}
//               {item.cancelled ? (
//                 <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//               ) : item.isCompleted ? (
//                 <p className='text-green-500 text-xs font-medium'>Completed</p>
//               ) : (
//                 <div className='flex gap-2'>
//                   <img
//                     onClick={() => cancelAppointment(item._id)}
//                     className='w-8 cursor-pointer'
//                     src={assets.cancel_icon}
//                     alt=""
//                   />
//                   <img
//                     onClick={() => completeAppointment(item._id)}
//                     className='w-8 cursor-pointer'
//                     src={assets.tick_icon}
//                     alt=""
//                   />
//                 </div>
//               )}

//               {/* Health Info Link */}
//               <p>
//               <Link
//               to={`/doctor/health-info/${item._id}`}
//               className="text-blue-500 underline"
//               >
//                View
//               </Link>
//               </p>

//             </div>
//           );
//         })}
//       </div>
//     </div>
//   )
// }

// export default DoctorAppointments

import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { Link } from "react-router-dom";

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getAppointments()
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        
        {/* Table Header */}
        <div className="grid grid-cols-[0.3fr_2fr_1fr_0.7fr_3fr_1.5fr_0.8fr_1fr_1fr] gap-4 p-4 bg-white rounded-xl shadow-md">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Address</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Health Info</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => {

          // 🔥 Always force date = 2-12-2025
          const fixedDate = "2-12-2025";

          return (
            <div
              key={index}
              className='grid grid-cols-[0.3fr_2fr_1fr_0.7fr_3fr_1.5fr_0.8fr_1fr_1fr] gap-3 items-center py-3 px-6 border-b hover:bg-gray-50 text-gray-600'
            >
              
              {/* Index */}
              <p>{index + 1}</p>

              {/* Patient */}
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-8 h-8 rounded-full' alt="" />
                <p>{item.userData.name}</p>
              </div>

              {/* Payment */}
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment ? 'Online' : 'CASH'}
              </p>

              {/* Age */}
              <p>{calculateAge(item.userData.dob)}</p>

              {/* Address */}
              <div className='leading-tight'>
                <p>{item.userData.address?.line1}</p>
                <p className='text-gray-400 text-xs'>{item.userData.address?.line2}</p>
              </div>

              {/* Date & Time (FORCED DATE) */}
              <p>{fixedDate}, {item.slotTime}</p>

              {/* Fees */}
              <p>{currency}{item.amount}</p>

              {/* Action */}
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <div className='flex gap-2'>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-8 cursor-pointer'
                    src={assets.cancel_icon}
                    alt=""
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className='w-8 cursor-pointer'
                    src={assets.tick_icon}
                    alt=""
                  />
                </div>
              )}

              {/* Health Info Link */}
              <p>
                <Link
                  to={`/doctor/health-info/${item._id}`}
                  className="text-blue-500 underline"
                >
                  View
                </Link>
              </p>

            </div>
          );
        })}
      </div>
    </div>
  )
}

export default DoctorAppointments