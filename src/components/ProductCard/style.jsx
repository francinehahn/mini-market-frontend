import styled from "styled-components"


export const Container = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5vw;
    width: 75vw;
    padding: 1.5vh 0;
    background-color: #eeeeee;

    p {
        font-size: 16px;
    }

    div {
        display: flex;
        align-items: center;
        gap: .5vw;
        svg {
            height: 20px;
            width: 20px;
            color: var(--darkgreen);
            :hover {
                opacity: .7;
                cursor: pointer;
            }
        }
    }

    button {
        background-color: var(--darkgreen);
        border: none;
        border-radius: 3px;
        color: white;
        padding: 1vh 1vw;
        :hover {
            opacity: .8;
            cursor: pointer;
        }
    }
`