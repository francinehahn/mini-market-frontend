import styled from "styled-components"


export const Container = styled.form `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .5vw;
    margin: 2vh 0 4vh 0;
    
    section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5vw;
        width: 99vw;
        border: 4px solid var(--darkgreen);
        padding: 2vh 0;
        
        label {
            font-size: 16px;
        }

        input {
            width: 25vw;
            font-size: 16px;
            padding: .8vh .5vw;
            :focus {
                outline: none;
            }
        }

        button {
            background-color: var(--darkgreen);
            border: none;
            border-radius: 3px;
            color: white;
            font-size: 16px;
            padding: 1.2vh 1.4vw;
            :hover {
                opacity: .8;
                cursor: pointer;
            }
        }
    }

    span {
        font-size: 14px;
        color: red;
    }

    h3 {
        font-size: 24px;
        margin: 3vh 0;
    }
`