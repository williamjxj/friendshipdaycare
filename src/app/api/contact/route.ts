import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { contactConfirmationEmail } from '@/lib/email/render-email-template';
import { businessFromAddress, getResendClient } from '@/lib/email/resend-client';

/**
 * Contact Form API Route
 * 
 * Email Configuration:
 * - Currently using Resend's default domain (no verification needed)
 * - To switch to custom domain: change currentConfig to emailConfig.customDomain
 * - Custom domain requires verification in Resend dashboard first
 */

// Validation schema for the contact form
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  childAge: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

export async function POST(request: NextRequest) {
  try {
    const client = getResendClient();
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email service is not configured. Please contact us directly at friendship.care@live.ca or call 604.945.8504.'
        },
        { status: 503 }
      );
    }

    const { resend, fromEmail } = client;

    const body = await request.json();

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);

    const { name, email, phone, childAge, message } = validatedData;

    const emailConfig = {
      businessFrom: businessFromAddress(fromEmail),
      customerFrom: businessFromAddress(fromEmail),
    };

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${childAge ? `<p><strong>Child's Age:</strong> ${childAge}</p>` : ''}
        </div>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px;">
          <h3 style="color: #1e40af; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>Next Steps:</strong> Please respond to this inquiry within 24 hours to maintain our excellent customer service standards.
          </p>
        </div>
      </div>
    `;

    const emailText = `
New Contact Form Submission

Contact Information:
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${childAge ? `Child's Age: ${childAge}` : ''}

Message:
${message}

Please respond to this inquiry within 24 hours.
    `;

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: emailConfig.businessFrom,
      to: ['friendship.care@live.ca'], // Your business email
      replyTo: email, // Allow replying directly to the customer
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
      text: emailText,
    });

    const confirmationEmailHtml = contactConfirmationEmail(name);

    await resend.emails.send({
      from: emailConfig.customerFrom,
      to: [email],
      replyTo: 'friendship.care@live.ca', // Customer replies go to your business email
      subject: 'Thank you for contacting Friendship Corner Daycare',
      html: confirmationEmailHtml,
      text: `Hi ${name},

Thank you for your interest in Friendship Corner Daycare! We've received your message and our team will get back to you within 24 hours.

What's Next?
- We'll review your inquiry and respond personally
- If you're interested in visiting, we'll schedule a tour
- We'll answer any questions about our programs

In the meantime, feel free to call us at 604.945.8504 if you have any urgent questions.

Best regards,
The Friendship Corner Daycare Team
2950 Dewdney Trunk Road, Coquitlam, BC
604.945.8504 | friendship.care@live.ca`,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
        emailId: emailResult.data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please check your form data and try again.',
          errors: error.issues
        },
        { status: 400 }
      );
    }

    // Handle Resend API errors
    if (error && typeof error === 'object' && 'message' in error) {
      return NextResponse.json(
        {
          success: false,
          message: 'There was an issue sending your message. Please try again or call us directly at 604.945.8504.'
        },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later or contact us directly.'
      },
      { status: 500 }
    );
  }
}
