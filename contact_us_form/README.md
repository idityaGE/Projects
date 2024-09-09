
# Contact Us Form

## Overview

This project is a simple yet effective **Contact Us** form, built using the latest tools and technologies to ensure a seamless user experience and efficient handling of form submissions.

### Tech Stack
- **Next.js**: A React framework that provides a server-side rendering and static site generation for fast performance.
- **Shadcn UI**: A highly customizable component library used for building the user interface with consistent design.
- **V0**: A robust tool that helps in simplifying the setup process of backend services and deployment.
- **Resend**: A service used to send transactional emails reliably, ensuring form submissions reach the intended recipient without hassle.

## Features

- **Responsive Design**: The form is built using **Shadcn UI**, ensuring a sleek and responsive layout across all devices.
- **Form Validation**: Integrated validation to ensure correct data entry from the user.
- **Email Integration**: Using **Resend**, the form submission sends an email directly to the provided email address.
- **Serverless Backend**: **Next.js API routes** handle the backend logic for form submissions.

## Project Structure

```
/components
    - ContactForm.tsx
/pages
    - api
        - sendEmail.ts
    - contact.tsx
```

1. **Contact-form.tsx**: This file contains the form UI, designed using Shadcn UI components.
2. **email.ts**: This API route handles the logic for processing the form data and sending the email using Resend.
3. **page.tsx**: This is the main page that renders the contact form and handles client-side logic.

## Setting Up the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/idityaGE/Projects.git
   cd contact-form
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up **Resend** by creating an account and getting your API key. Then, add your API key in a `.env` file:
   ```bash
   RESEND_API_KEY=your-resend-api-key
   ```

4. Run the project locally:
   ```bash
   npm run dev
   ```

## Future Improvements

- Add **reCAPTCHA** for spam prevention.
- Handle form submission status (e.g., success or failure messages) on the UI.
- Implement **loading states** during email submission.
- Add **testing** to ensure all functionalities work as expected.

## Conclusion

This project demonstrates how to build a functional and responsive contact form using **Next.js**, **Shadcn UI**, **V0**, and **Resend**. It can be easily expanded with additional features such as email validation, spam protection, and more.

You can update the code snippets and project structure as per your implementation details.