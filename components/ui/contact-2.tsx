"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"

interface Contact2Props {
  title?: string
  description?: string
  phone?: string
  email?: string
  web?: { label: string; url: string }
  prefilledSubject?: string
  prefilledName?: string
  prefilledEmail?: string
}

export const Contact2 = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "(555) 123-4567", // Updated phone
  email = "info@sonnas.com", // Updated email
  web = { label: "sonnasrestaurant.com", url: "#" }, // Updated web
  prefilledSubject,
  prefilledName,
  prefilledEmail,
}: Contact2Props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  // Update form data when props change
  useEffect(() => {
    if (prefilledName) {
      const nameParts = prefilledName.split(' ')
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(' ') || "",
      }))
    }
    if (prefilledEmail) {
      setFormData(prev => ({ ...prev, email: prefilledEmail }))
    }
    if (prefilledSubject) {
      setFormData(prev => ({ ...prev, subject: prefilledSubject }))
    }
  }, [prefilledSubject, prefilledName, prefilledEmail])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    })
  }
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">Contact Details</h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="underline" rel="noreferrer">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10 bg-gray-800 border-gray-700">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
