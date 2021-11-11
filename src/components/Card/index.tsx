import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../services/api'

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const CardContainer = styled.div`
    height: 180px;
    width: 150px;
    margin-top: 20px;
    border: 2px solid #2a75bb;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 0px 5px 4px 2px #3c5aa6;
    background-color: #d7d7d7;
`

const CardTitle = styled.div`
    display: flex;
    background-color: #ffcb05;
    justify-content: center;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0px 5px 4px #c7a008; 
    font-weight: 600;  
    font-size: 16px;
`

const CardBody = styled.div`
    display: flex;
    justify-content: center;
`

export const Card: React.FC = () => {

    const [listaPokemon, setListaPokemon] = useState<any[]>([])
    const [linkSprite, setLinkSprite] = useState<string>('')

    useEffect(() => {
        api
            .get('/pokemon?limit=10')
            .then((response) => { setListaPokemon(response.data.results); })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Container>

            {
                listaPokemon.map((current, index) => {
                    api
                        .get(current.url)
                        .then((response) => { console.log(response.data.sprites.front_default); })
                        .catch((error) => console.log(error));

                    return (
                        <>
                            <CardContainer key={index}>
                                <CardTitle>{current.name}</CardTitle>
                                <CardBody></CardBody>
                            </CardContainer>
                        </>
                    )
                })};
        </Container>
    );
}