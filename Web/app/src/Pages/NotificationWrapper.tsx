import React from 'react'

interface NotificationWrapperProps {
  children: React.ReactNode;
}

function NotificationWrapper({children}: NotificationWrapperProps) {
  return (
    <div className='fixed bottom-5 right-5'>
        {children}
    </div>
  )
}

export default NotificationWrapper