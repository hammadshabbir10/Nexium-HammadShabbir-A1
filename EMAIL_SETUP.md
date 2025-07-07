# Email Setup Instructions

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# SMTP Configuration for Email Sending
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to Google Account settings
   - Navigate to Security > 2-Step Verification
   - Click on "App passwords"
   - Select "Mail" and generate a password
   - Use this generated password as `SMTP_PASS`

## Other Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

## How the Email System Works

1. **From Field**: The email will be sent from your authenticated SMTP account (`SMTP_USER`)
2. **Reply-To**: Set to the user's email address so replies go to them
3. **Display Name**: Shows "Feedback from [username]" where username is extracted from the user's email
4. **Email Content**: Includes the user's original email address in the body for reference

## Troubleshooting

- **Authentication Error**: Make sure you're using an App Password, not your regular password
- **Port Issues**: Try port 465 with `secure: true` for SSL
- **Host Issues**: Verify your email provider's SMTP settings 