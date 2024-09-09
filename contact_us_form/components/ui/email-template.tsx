import * as React from 'react';

import { FormValues } from '@/lib/schema';

export const EmailTemplate: React.FC<Readonly<FormValues>> = ({
  firstname,
  lastname,
  message,
  email,
}) => (
  <div>
    <h1>Hi {firstname} {lastname},</h1>
    <p>Here is a copy of your message:</p>
    <p>{message}</p>
    <p>Best regards,</p>
    <p>Adii</p>
  </div>
);
