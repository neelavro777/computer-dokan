import React from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

const PaymentSuccessPage = () => {
    const { transactionId } = useParams();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',backgroundColor:"rgb(64, 64, 64)" }} >
            <Card border='success' style={{ width: '30rem', textAlign: 'center',backgroundColor:'rgb(30,30,30)', color:'white' }}>
                <Card.Body>
                    <Card.Title>Payment Success</Card.Title>
                    <Card.Text>Transaction ID: {transactionId}</Card.Text>
                    <Card.Text>
                        Congratulations! Your payment was successful.
                    </Card.Text>
                    <Card.Link href="/">Redirect to Home Page</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default PaymentSuccessPage;
