import React from 'react';
import Container from './Container';
import { Button, Avatar } from 'antd';
import './Footer.css';

const Footer = (props) => (
    <div className='footer'>
        <Container>
            {props.numberOfItems !== undefined ?
                <Avatar 
                    style={{backgroundColor: '#f56a00', marginRight: '5px'}}
                    size='large'>{props.numberOfItems}</Avatar> : null
            }
            <Button onClick={() => props.handleAddItemClickEvent()} type='primary'>Add new Item +</Button>
        </Container>
    </div>
);

export default Footer;