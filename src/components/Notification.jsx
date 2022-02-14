import styled from "styled-components";

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin: 20px 0px;
`;

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <Error className="error">{message}</Error>;
};

export default Notification;
