"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Loader2, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      // FormSubmit's hidden submission - no redirect
      const response = await fetch("https://formsubmit.co/ajax/Mariarudra04@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus("success")
        // Clear the form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setFormStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="contact" className="py-20" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Have a question or want to work together? Send me a message!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="flex flex-col">
            <div className="bg-card border border-border rounded-lg p-8 shadow-md flex-grow">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-primary mr-3" />
                  <a 
                    href="mailto:Mariarudra04@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Mariarudra82@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-primary mr-3" />
                  <span className="text-muted-foreground">+91 9888484923</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  <span className="text-muted-foreground">Chandigarh, India</span>
                </div>

                <div className="pt-6">
                  <h4 className="text-lg font-medium mb-3">Connect on social media</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/RudraCodeUp" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-muted p-3 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/rudra-maria-327713233/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-muted p-3 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Feel free to reach out via social media as well</p>
            </div>
          </motion.div>

          {/* Right side: Contact form */}
          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-lg p-8 shadow-md"
          >
            {formStatus === "success" ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">Message Sent Successfully!</h3>
                <p className="text-green-700 dark:text-green-400 mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setFormStatus(null)} 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border border-input bg-background px-3 py-2"
                  ></Textarea>
                </div>

                {formStatus === "error" && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-md">
                    There was an error sending your message. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

