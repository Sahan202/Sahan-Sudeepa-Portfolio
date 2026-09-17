# EmailJS contact delivery

The contact form delivers messages to `sahansudeepa589@gmail.com` through
EmailJS. The visitor's address is the email reply-to address.

1. Create an account at https://www.emailjs.com and connect Gmail under
   **Email Services**. Copy the resulting **Service ID**.
2. Create an email template. Set its recipient to `sahansudeepa589@gmail.com`.
   Its body should include these variables:

```text
From: {{from_name}}
Reply to: {{reply_to}}

{{message}}
```

Copy the **Template ID**. 3. In **Account**, copy the Public Key. In **Account > Security**, create a
Private Key. Keep the private key secret. 4. Copy `.env.example` to `.env.local` and fill in all four values:

```dotenv
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
```

5. Restart `yarn dev`, submit a test message, and check Gmail including Spam.
   Add the same four variables to the deployment host before redeploying.

The contact endpoint returns success only after EmailJS accepts the request.
The private key remains on the server and is never sent to a visitor's browser.

EmailJS reference: https://www.emailjs.com/docs/rest-api/send/

# Replacing the portrait

Replace `public/images/sahan-portrait.jpeg` with your new photo, or update
`profile.portrait` in `src/data/portfolio.ts`. The About section uses Next.js
image optimization, responsive sizing and a reduced-motion-aware reveal.
