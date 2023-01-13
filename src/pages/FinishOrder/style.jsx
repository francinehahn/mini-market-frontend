import styled from "styled-components"


export const Container = styled.section `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5vh;
    height: 70vh;

    button {
        background-color: var(--darkgreen);
        border: none;
        border-radius: 3px;
        color: white;
        padding: 1.4vh 1vw;
        font-size: 16px;
        :hover {
            opacity: .8;
            cursor: pointer;
        }
    }
`