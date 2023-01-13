import styled from "styled-components"


export const LoadingSection = styled.div `
    border-radius: 50%;
    border: 4px solid white;
    border-bottom: 4px solid var(--darkgreen);
    width: 20px;
    height: 20px;

    @keyframes rotate {
        from {transform: rotate(0)}
        to {transform: rotate(360deg)}
    }

    animation: rotate .8s infinite;
`