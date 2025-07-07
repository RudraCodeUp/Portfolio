"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function sendContactForm(formData: z.infer<typeof formSchema>) {
  try {
    // Validate the form data
    const validatedData = formSchema.parse(formData);

    // Send the data to your backend API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending contact form:", error);
    throw error;
  }
}

