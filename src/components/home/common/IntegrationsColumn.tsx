"use client"
import { type IntegrationsType } from '@/components/home/sections/Integrations'
import React from 'react'
import Image from "next/image";
import { twMerge } from 'tailwind-merge';
import { motion } from "framer-motion"



function IntegrationsColumn(props: { integrations: IntegrationsType, className?: string, reverse?: boolean }) {
  const { integrations, className, reverse } = props
  return (
    <motion.div
      initial={{
        y: reverse ? "-50%" : 0
      }}
      animate={{
        y: reverse ? 0 : "-50%"
      }}
      transition={
        {
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }
      }
      className={twMerge("flex flex-col gap-4 pb-4", className)}>

      {Array.from({ length: 2 }).map(
        (_, index) => (

          <React.Fragment key={index}>

            {integrations.map(integration => (
              <div key={integration.name} className="bg-neutral-900 border-white/10  rounded-3xl p-6">
                <div className="flex justify-center">
                  <Image src={integration.icon} alt={integration.name} className="size-24" />

                </div>
                <h3 className="text-3xl text-center mt-6">{integration.name}</h3>
                <p className="text-center mt-2 text-white/50">{integration.description}</p>

              </div>
            ))}

          </React.Fragment>




        )
      )}

    </motion.div>
  )
}

export default IntegrationsColumn