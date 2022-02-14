import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcement = () => {
    return (
        <Container>
            Super Deal! Free Shipping on Orders Over N50,000.00
        </Container>
    )
}

export default Announcement
