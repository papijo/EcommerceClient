import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@mui/icons-material"
import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection:"column"})}
`

const Left = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1``

const Desc = styled.p`
    margin: 20px 0px;
    justify-content: center;
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`


const Center = styled.div`
    flex:1;
    padding: 20px;
    ${mobile({display:"none"})}
`

const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const Right = styled.div`
    flex:1;
    padding: 20px;
    ${mobile({backgroundColor:"#fff8f8"})}
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 100%;
`


const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>ECOM SHOP</Logo>
                <Desc>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum sit eveniet, iusto voluptas sunt esse impedit iste, architecto praesentium dignissimos, enim distinctio unde quidem molestias temporibus possimus eius quae eaque!</Desc>
                <SocialContainer>
                    <SocialIcon color='3B5999'>
                        <Facebook />
                    </SocialIcon>

                    <SocialIcon color='E4405F'>
                        <Twitter />
                    </SocialIcon>

                    <SocialIcon color='55ACEE'>
                        <Instagram />
                    </SocialIcon>

                    <SocialIcon color='E60023'>
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>


            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                   <Room style = {{marginRight: "10px"}} /> No 1, Shinco Road, Behind New Government House
                </ContactItem>
                <ContactItem>
                   <Phone style = {{marginRight: "10px"}}/> +234 806 000 1111
                </ContactItem>
                <ContactItem>
                   <MailOutline style = {{marginRight: "10px"}}/> email@email.com
                </ContactItem>
                <Payment src = 'https://i.ibb.co/Qfvn4z6/payment.png' />
            </Right>
        </Container>
    )
}

export default Footer
