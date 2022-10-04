import styled from "styled-components";

export const NavStyles = styled.nav `
    min-height: 15vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    a{
        font-size: 1.2rem;
    }
`

export const NavItems = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    div{
        margin-left: 3rem;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h3{
        font-size: 1rem;
        padding: 0.25rem;
    }
    svg{
        font-size: 1.5rem;
    }
    span{
        background: #ff2626;
        color: white;
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.75rem;
        border-radius: 50%;
        position: absolute;
        top: -20%;
        right: -10%;
        pointer-events: none;
    }
    img{
        border-radius: 50%;
        width: 25%;
    }
    h3{
        color: var(--secondary);
        font-size: .8rem;
    }
`