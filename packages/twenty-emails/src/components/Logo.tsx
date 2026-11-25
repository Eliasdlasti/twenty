import { Img, Text } from 'react-email';

const logoStyle = {
  marginBottom: '40px',
};

export const Logo = () => {
  const serverUrl = process.env.SERVER_URL;
  const wordmarkPath = '/images/jodaer/wordmark.png';
  const wordmarkUrl =
    serverUrl && URL.canParse(wordmarkPath, serverUrl)
      ? new URL(wordmarkPath, serverUrl).href
      : undefined;

  return wordmarkUrl ? (
    <Img
      src={wordmarkUrl}
      alt="JODAER CRM"
      width="174"
      height="36"
      style={logoStyle}
    />
  ) : (
    <Text style={logoStyle}>JODAER CRM</Text>
  );
};
