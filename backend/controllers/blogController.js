import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const submitBlog = async (req, res) => {
  try {
    const { title, category, tags, content, readingTime } = req.body;

    const image = req.file?.filename;

    // Validation
    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Send Email
    const data = await resend.emails.send({
      from: "Blog Platform <onboarding@resend.dev>",

      // Admin Email
      to: [process.env.ADMIN_EMAIL],

      subject: "New Blog Submission",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">

          <h2>📝 New Blog Submitted</h2>

          <p>
            <strong>Title:</strong> ${title}
          </p>

          <p>
            <strong>Category:</strong> ${category}
          </p>

          <p>
            <strong>Tags:</strong> ${tags || "N/A"}
          </p>

          <p>
            <strong>Reading Time:</strong> ${readingTime || 0} min
          </p>

          ${
            image
              ? `
            <p>
              <strong>Featured Image:</strong> ${image}
            </p>
          `
              : ""
          }

          <hr />

          <h3>Content</h3>

          <div style="
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            line-height: 1.6;
          ">
            ${content}
          </div>

        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Blog submitted successfully",
      data,
    });
  } catch (err) {
    console.error("RESEND ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "Server error",
      message: err.message,
    });
  }
};