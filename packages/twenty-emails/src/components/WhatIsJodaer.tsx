import { type I18n } from '@lingui/core';
import { MainText } from 'src/components/MainText';
import { SubTitle } from 'src/components/SubTitle';

type WhatIsJodaerProps = {
  i18n: I18n;
};

export const WhatIsJodaer = ({ i18n }: WhatIsJodaerProps) => {
  return (
    <>
      <SubTitle value={i18n._('What is JODAER CRM?')} />
      <MainText>
        {i18n._(
          "It's a CRM, a software to help businesses manage their customer data and relationships efficiently.",
        )}
      </MainText>
    </>
  );
};
