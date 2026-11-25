import { useWorkspaceBypass } from '@/auth/sign-in-up/hooks/useWorkspaceBypass';
import { styled } from '@linaria/react';
import { Trans } from '@lingui/react/macro';
import { themeCssVariables } from 'twenty-ui/theme';
import {
  JODAER_PRIVACY_URL,
  JODAER_SOURCE_URL,
  JODAER_TERMS_URL,
} from '~/config/jodaer';

const StyledLinksContainer = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  flex-wrap: wrap;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[4]};
  justify-content: center;
  max-width: 100%;
  text-align: center;

  & > a,
  & > button {
    background: none;
    border: none;
    color: ${themeCssVariables.font.color.tertiary};
    cursor: pointer;
    font: inherit;
    padding: 0;
    text-decoration: underline;
  }
`;

export const FooterNote = () => {
  const { shouldOfferBypass, shouldUseBypass, enableBypass } =
    useWorkspaceBypass();

  return (
    <StyledLinksContainer>
      {shouldOfferBypass && !shouldUseBypass && (
        <button type="button" onClick={enableBypass}>
          <Trans>Bypass SSO</Trans>
        </button>
      )}
      {JODAER_PRIVACY_URL && (
        <a href={JODAER_PRIVACY_URL} target="_blank" rel="noopener noreferrer">
          <Trans>Privacy Policy</Trans>
        </a>
      )}
      {JODAER_TERMS_URL && (
        <a href={JODAER_TERMS_URL} target="_blank" rel="noopener noreferrer">
          <Trans>Terms of Service</Trans>
        </a>
      )}
      <a href={JODAER_SOURCE_URL} target="_blank" rel="noopener noreferrer">
        <Trans>Source code</Trans>
      </a>
    </StyledLinksContainer>
  );
};
