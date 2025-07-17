"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative text-white overflow-hidden min-h-screen flex flex-col justify-start"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/street_food.jpeg"
          alt="Food background"
          fill
          className="object-cover"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="pt-24 pb-12 text-center px-4"
      >
        <h2 className="text-3xl lg:text-5xl font-bold tracking-widest text-white">
          O U R &nbsp; S T O R Y
        </h2>
      </motion.div>

      {/* Story content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="px-4 sm:px-6 lg:px-8 pb-4"
      >
        <div className="space-y-6 max-w-3xl mx-auto text-center sm:text-left">
          <p className="text-lg lg:text-xl text-gray-300">
            SONNA SUBLOK LOVINGLY KNOWN AS ‘SONNA AUNTY’ HAS BEEN BAKING SINCE SHE WAS YOUNG.
          </p>
          <p className="text-lg lg:text-xl text-gray-300">
            WHAT STARTED WITH A FRIEND’S REQUEST TURNED INTO YEARS OF MAKING BIRTHDAYS, ANNIVERSARIES, AND SPECIAL OCCASIONS SWEETER.
          </p>
          <p className="text-lg lg:text-xl text-gray-300">
            ALSO SHARING HER KNOWLEDGE BY CONDUCTING COOKING AND BAKING CLASSES.
          </p>
          <p className="text-lg lg:text-xl text-gray-300">
            THIS CAFÉ IS HER HOME, AND WE INVITE YOU TO ENJOY SOUL-FILLING FOOD AND HER HEARTFELT CAKES.
          </p>
          <p className="text-lg lg:text-xl text-red-400 font-semibold">
            YOU ARE OUR FAMILY.
          </p>
          <p className="text-lg lg:text-xl text-orange-400 font-semibold italic mb-0">
            LOVE, team Sonna’s
          </p>
        </div>
      </motion.div>
    </section>
  );
}
