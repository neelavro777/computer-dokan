import React from 'react'
import { useParams } from 'react-router-dom'

const PaymentSuccessPage = () => {

    const { transactionId } = useParams();
  return (
    <div>
      PaymentSuccessPage
        <h1>Payment Success</h1>
        <p>Transaction ID: {transactionId}</p>
    </div>
  )
}

export default PaymentSuccessPage