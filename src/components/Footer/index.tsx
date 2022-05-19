import React from 'react';
import { Container } from './styles';

export function Footer() {
    return (
        <Container>
            <p>
                Developed by
                {' '}
                <a href="https://www.linkedin.com/in/langton-favor-mudyiwa/">Langton Mudyiwa</a>
                .
                {' '}
                <br />
                All data were obtained from
                {' '}
                <a href="https://swapi.dev/">SWAPI</a>
                .
            </p>
        </Container>
    );
}
