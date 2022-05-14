import styled from "styled-components";

export const Container = styled.div`

    width: 35vw;
    border-radius: 5px;
    
    h2 {
        height: 10%;
        margin: 0;
        padding: 0;
    }
    

    .optionCode {
        margin-bottom: 4px;
        border: 2px solid blue;
        
        cursor: pointer;
    }

    .suggestionContainer {
        padding-top: 10px;
        height: 90%;
        border: 2px solid purple;
        border-radius: 10px;
        overflow-y: scroll;
    }

`;