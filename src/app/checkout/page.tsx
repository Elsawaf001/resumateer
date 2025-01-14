import PaypalButton from '@/components/paypal/PaypalButton'
import React from 'react'

function Page() {
    const handleSuccess = (detail: any) => {
        alert(detail)
    }
  return (
    <div><PaypalButton amount={'1'} onSuccess={handleSuccess}/></div>
  )
}

export default Page