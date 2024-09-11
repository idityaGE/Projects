import * as React from 'react';

import { FormValues } from '@/lib/schema';

export const EmailTemplate: React.FC<Readonly<FormValues>> = ({
  firstname,
  lastname,
  message,
  email
}) => (
  <div>
    <h2>Hi {firstname} {lastname}</h2>
    <p>
      You have sent the following message:
    </p>
    <p>
      {message}
    </p>
    <p>
      We will get back to you at {email}
    </p>
  </div>
);
