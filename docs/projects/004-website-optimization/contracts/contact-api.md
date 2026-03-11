# Contact API Contract

**Endpoint**: `POST /api/contact`  
**Purpose**: Submit contact form data; send email via Resend to business; send confirmation to user.

---

## Request

**Content-Type**: `application/json`

### Body Schema (Zod)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | yes | min 1, max 100 |
| email | string | yes | valid email format |
| phone | string | no | - |
| childAge | string | no | - |
| message | string | yes | min 10, max 1000 |

### Example

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "604-555-1234",
  "childAge": "3",
  "message": "I would like to schedule a tour for my daughter."
}
```

---

## Response

### Success (200)

```json
{
  "success": true,
  "message": "Message sent successfully! We'll get back to you within 24 hours.",
  "emailId": "resend-email-id-if-available"
}
```

### Validation Error (400)

```json
{
  "success": false,
  "message": "Please check your form data and try again.",
  "errors": [
    {
      "path": ["email"],
      "message": "Invalid email address"
    }
  ]
}
```

### Service Unavailable (503)

When `RESEND_API_KEY` is not configured:

```json
{
  "success": false,
  "message": "Email service is not configured. Please contact us directly at friendship.care@live.ca or call 604.945.8504."
}
```

### Server Error (500)

```json
{
  "success": false,
  "message": "There was an issue sending your message. Please try again or call us directly at 604.945.8504."
}
```

---

## Environment

| Variable | Required | Description |
|---------|----------|-------------|
| RESEND_API_KEY | yes | Resend API key for sending email |
| RESEND_FROM_EMAIL | no | From address (default: noreply@friendshipdaycare.com) |

---

## Side Effects

1. Email sent to `friendship.care@live.ca` with submission details.
2. Confirmation email sent to user's `email` address.
