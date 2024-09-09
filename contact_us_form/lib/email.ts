"use server"

import { FormValues } from "./schema"
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/ui/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: FormValues) => {
  try {
    // TODO: "Add this emailFormData to your database with time stamp"
    const { error } = await resend.emails.send({
      from: `Acme <${process.env.RESEND_EMAIL}>`,
      to: [emailFormData.email],
      subject: 'Welcome',
      react: EmailTemplate({
        firstname: emailFormData.firstname,
        lastname: emailFormData.lastname,
        email: emailFormData.email,
        message: emailFormData.message,
      }),
    });
    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    throw error
  }
}