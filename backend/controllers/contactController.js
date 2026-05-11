import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Send Email
    const data = await resend.emails.send({
      from: "Blog Contact <onboarding@resend.dev>",

      // Your admin email
      to: [process.env.ADMIN_EMAIL],

      // User email for replying directly
      replyTo: email,

      subject: `Contact Form: ${subject}`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Message</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Subject:</strong> ${subject}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div style="background:#f4f4f4;padding:15px;border-radius:8px;">
            ${message}
          </div>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      data,
    });
  } catch (error) {
    console.error("RESEND ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};