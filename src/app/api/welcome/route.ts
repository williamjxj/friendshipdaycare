import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { businessFromAddress, getResendClient } from '@/lib/email/resend-client';

const tourTimePreferenceSchema = z.enum(['morning', 'afternoon']);

const welcomeFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  childName: z.string().min(1, 'Child name is required').max(100, 'Child name too long'),
  childBirthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid child birthday'),
  tourDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid tour date'),
  tourTimePreference: tourTimePreferenceSchema,
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
  source: z.string().max(64).optional(),
});

type TourTimePreference = z.infer<typeof tourTimePreferenceSchema>;

function formatSourceLabel(source?: string): string {
  if (source === 'flyer-0320') return 'Flyer (0320)';
  return 'Direct / unknown';
}

function tourTimeLabel(pref: TourTimePreference): string {
  const labels: Record<TourTimePreference, string> = {
    morning: 'Morning — 11:15 AM',
    afternoon: 'Afternoon — 5:15 PM',
  };
  return labels[pref];
}

export async function POST(request: NextRequest) {
  try {
    const client = getResendClient();
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Email service is not configured. Please contact us directly at friendship.care@live.ca or call 604.945.8504.',
        },
        { status: 503 },
      );
    }

    const { resend, fromEmail } = client;
    const from = businessFromAddress(fromEmail);

    const body = await request.json();
    const data = welcomeFormSchema.parse(body);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tourDateParsed = new Date(`${data.tourDate}T12:00:00`);
    if (Number.isNaN(tourDateParsed.getTime()) || tourDateParsed < today) {
      return NextResponse.json(
        { success: false, message: 'Please choose a tour date today or later.' },
        { status: 400 },
      );
    }

    const childBirthdayParsed = new Date(`${data.childBirthday}T12:00:00`);
    if (Number.isNaN(childBirthdayParsed.getTime()) || childBirthdayParsed > today) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid child birthday.' },
        { status: 400 },
      );
    }

    const sourceLabel = formatSourceLabel(data.source);
    const isFlyer = data.source === 'flyer-0320';
    const timeLabel = tourTimeLabel(data.tourTimePreference);
    const { name, email, childName, childBirthday, tourDate, message } = data;

    const staffSubject = isFlyer
      ? `Welcome / Tour request from ${name} (Flyer)`
      : `Welcome / Tour request from ${name}`;

    const staffHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          New Welcome / Tour Request
        </h2>
        <p style="font-size: 15px;"><strong>Source:</strong> ${sourceLabel}</p>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Child's name:</strong> ${childName}</p>
          <p><strong>Child's birthday:</strong> ${childBirthday}</p>
        </div>
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Tour Preference</h3>
          <p><strong>Preferred date:</strong> ${tourDate}</p>
          <p><strong>Preferred time:</strong> ${timeLabel}</p>
        </div>
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px;">
          <h3 style="color: #1e40af; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>Next Steps:</strong> Please respond within 24 hours to confirm the tour.
          </p>
        </div>
      </div>
    `;

    const staffText = `
New Welcome / Tour Request

Source: ${sourceLabel}

Contact Information:
Name: ${name}
Email: ${email}
Child's name: ${childName}
Child's birthday: ${childBirthday}

Tour Preference:
Preferred date: ${tourDate}
Preferred time: ${timeLabel}

Message:
${message}

Please respond within 24 hours to confirm the tour.
    `;

    const flyerNote = isFlyer
      ? '<p style="font-size: 16px; line-height: 1.6; color: #334155;">Thank you for scanning our flyer and requesting a tour. We received your details and will confirm your visit by phone or email.</p>'
      : '<p style="font-size: 16px; line-height: 1.6; color: #334155;">Thank you for your tour request. We received your details and will confirm your visit by phone or email within 24 hours.</p>';

    const confirmationEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 30px 20px; background-color: #1e40af; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            Your tour request is on its way
          </p>
        </div>
        <div style="padding: 30px 20px; background-color: #f8fafc; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; line-height: 1.6; color: #334155;">Hi ${name},</p>
          ${flyerNote}
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0; font-size: 18px;">Your tour preference</h3>
            <p style="color: #0369a1; margin: 0;"><strong>Date:</strong> ${tourDate}</p>
            <p style="color: #0369a1; margin: 8px 0 0;"><strong>Time:</strong> ${timeLabel}</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6; color: #334155;">
            If you need to reach us sooner, call <strong>604.945.8504</strong>.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 14px; color: #64748b; margin: 0;">
              Best regards,<br>
              <strong>The Friendship Corner Daycare Team</strong><br>
              2950 Dewdney Trunk Road, Coquitlam, BC<br>
              604.945.8504 | friendship.care@live.ca
            </p>
          </div>
        </div>
      </div>
    `;

    const confirmationText = `Hi ${name},

${isFlyer ? 'Thank you for scanning our flyer and requesting a tour.' : 'Thank you for your tour request.'} We received your details and will confirm your visit by phone or email within 24 hours.

Your tour preference:
Date: ${tourDate}
Time: ${timeLabel}

If you need to reach us sooner, call 604.945.8504.

Best regards,
The Friendship Corner Daycare Team
2950 Dewdney Trunk Road, Coquitlam, BC
604.945.8504 | friendship.care@live.ca`;

    const emailResult = await resend.emails.send({
      from,
      to: ['friendship.care@live.ca'],
      replyTo: email,
      subject: staffSubject,
      html: staffHtml,
      text: staffText,
    });

    await resend.emails.send({
      from,
      to: [email],
      replyTo: 'friendship.care@live.ca',
      subject: 'Thank you — Friendship Corner Daycare tour request',
      html: confirmationEmailHtml,
      text: confirmationText,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Request sent! We'll get back to you within 24 hours.",
        emailId: emailResult.data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Welcome form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please check your form data and try again.',
          errors: error.issues,
        },
        { status: 400 },
      );
    }

    if (error && typeof error === 'object' && 'message' in error) {
      return NextResponse.json(
        {
          success: false,
          message: 'There was an issue sending your request. Please try again or call us directly at 604.945.8504.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later or contact us directly.',
      },
      { status: 500 },
    );
  }
}
