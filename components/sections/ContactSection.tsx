"use client"

import { Contact2 } from "@/components/ui/contact-2"
import { motion } from "framer-motion"

interface ContactSectionProps {
  prefilledSubject?: string
  prefilledName?: string
  prefilledEmail?: string
}

export default function ContactSection({ prefilledSubject, prefilledName, prefilledEmail }: ContactSectionProps) {
  return (
    <section id="contact-form" className="py-20 backdrop-blur-sm text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Contact2
          title="Get In Touch"
          description="We'd love to hear from you! Send us a message and we'll respond as soon as possible."
          phone="+91 "
          email="info@sonnas.com"
          web={{ label: "sonnasrestaurant.com", url: "#" }}
          prefilledSubject={prefilledSubject}
          prefilledName={prefilledName}
          prefilledEmail={prefilledEmail}
        />
      </motion.div>
    </section>
  )
}
