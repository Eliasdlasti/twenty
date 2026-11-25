import { Container } from 'react-email';
import { ShadowText } from 'src/components/ShadowText';

const footerContainerStyle = {
  marginTop: '12px',
};

export const Footer = () => (
  <Container style={footerContainerStyle}>
    <ShadowText>JODAER</ShadowText>
  </Container>
);
