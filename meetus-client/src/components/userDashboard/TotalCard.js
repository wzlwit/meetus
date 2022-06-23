import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export default function TotalCard({ item, total }) {
    const CardStyle = styled.div`
        .cardTitle{
            font-size: 2vw;
        }
        .cardBody{
            // border: 1px solid
            border-radius: 20px;
        }
        .cardSub{
            width: 100%;
            justify-content:center;   
        }
    `



    return <CardStyle>
        <Card className="cardBody text-center">
            <Card.Body className="align-self-center">
                <Card.Title className='eventTime cardTitle'>{item}</Card.Title>
                <h3>{total}</h3>
            </Card.Body>
        </Card>
    </CardStyle>

}