import React from "react";
import { motion } from "motion/react";

// Timings for drawing/fill-in sequence
const drawDur = 1.1; // seconds for stroke
const fillDur = 0.6; // seconds for fill fade

const Logo = ({
  width = 90,
  height = 90,
  ariaLabel = "Company Logo",
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 244.8 273.1"
    aria-label={ariaLabel}
    role="img"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
    className="block"
  >
    <title>{ariaLabel}</title>
    <defs>
      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="207.126" y1="258.7377" x2="244.3468" y2="194.2693">
        <stop offset="0" stopColor="#A52348" />
        <stop offset="0.02161416" stopColor="#A32147" />
        <stop offset="0.1998" stopColor="#94173C" />
        <stop offset="0.3412" stopColor="#891135" />
        <stop offset="0.4274" stopColor="#840E32" />
        <stop offset="0.4851" stopColor="#9D1033" />
        <stop offset="0.5615" stopColor="#BB0F31" />
        <stop offset="0.6328" stopColor="#D10B2C" />
        <stop offset="0.6964" stopColor="#DF0729" />
        <stop offset="0.7458" stopColor="#E30527" />
      </linearGradient>
      <linearGradient id="SVGID_line1" gradientUnits="userSpaceOnUse" x1="162.8351" y1="46.4672" x2="162.8317" y2="46.4579">
        <stop offset="0.05586592" stopColor="#831D17" />
        <stop offset="0.07238929" stopColor="#901D1A" />
        <stop offset="0.1062" stopColor="#A91C1F" />
        <stop offset="0.1452" stopColor="#BE1822" />
        <stop offset="0.1906" stopColor="#CE1325" />
        <stop offset="0.2468" stopColor="#DA0C26" />
        <stop offset="0.3257" stopColor="#E10627" />
        <stop offset="0.5447" stopColor="#E30527" />
        <stop offset="0.6449" stopColor="#E6322D" />
        <stop offset="0.7846" stopColor="#E95034" />
        <stop offset="0.9077" stopColor="#EC6139" />
        <stop offset="1" stopColor="#EC663B" />
      </linearGradient>
      <linearGradient id="SVGID_line2" gradientUnits="userSpaceOnUse" x1="205.1494" y1="243.4307" x2="205.1529" y2="243.4369">
        <stop offset="0.1899" stopColor="#4D2640" />
        <stop offset="0.205" stopColor="#52243F" />
        <stop offset="0.2699" stopColor="#671F3B" />
        <stop offset="0.3358" stopColor="#741937" />
        <stop offset="0.402" stopColor="#7C1535" />
        <stop offset="0.4684" stopColor="#811133" />
        <stop offset="0.5352" stopColor="#830F32" />
        <stop offset="0.6034" stopColor="#840E32" />
        <stop offset="0.9358" stopColor="#E30527" />
      </linearGradient>
      <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="130.0666" y1="12.0368" x2="32.7632" y2="180.5712">
        <stop offset="0" stopColor="#A52348" />
        <stop offset="0.02161416" stopColor="#A32147" />
        <stop offset="0.1998" stopColor="#94173C" />
        <stop offset="0.3412" stopColor="#891135" />
        <stop offset="0.4274" stopColor="#840E32" />
        <stop offset="0.4851" stopColor="#9D1033" />
        <stop offset="0.5615" stopColor="#BB0F31" />
        <stop offset="0.6328" stopColor="#D10B2C" />
        <stop offset="0.6964" stopColor="#DF0729" />
        <stop offset="0.7458" stopColor="#E30527" />
      </linearGradient>
      <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="110.4789" y1="136.5534" x2="215.6935" y2="136.5534">
        <stop offset="0.1369" stopColor="#840E32" />
        <stop offset="0.221" stopColor="#9D1033" />
        <stop offset="0.3322" stopColor="#BB0F31" />
        <stop offset="0.436" stopColor="#D10B2C" />
        <stop offset="0.5286" stopColor="#DF0729" />
        <stop offset="0.6006" stopColor="#E30527" />
        <stop offset="0.7983" stopColor="#B81F40" />
        <stop offset="0.9078" stopColor="#A52348" />
      </linearGradient>
      <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="47.3984" y1="201.3317" x2="2.0754" y2="122.83">
        <stop offset="0" stopColor="#A52348" />
        <stop offset="0.02161416" stopColor="#A32147" />
        <stop offset="0.1998" stopColor="#94173C" />
        <stop offset="0.3412" stopColor="#891135" />
        <stop offset="0.4274" stopColor="#840E32" />
        <stop offset="0.4851" stopColor="#9D1033" />
        <stop offset="0.5615" stopColor="#BB0F31" />
        <stop offset="0.6328" stopColor="#D10B2C" />
        <stop offset="0.6964" stopColor="#DF0729" />
        <stop offset="0.7458" stopColor="#E30527" />
      </linearGradient>
    </defs>
    <g>
      {/* 1. Path: Top right segment */}
      <motion.path
        d="M205.4,245.2c3.5-4.3,7-9.2,10.3-14.8c10.4-17.9,13.4-34.6,14.4-44.2c0-0.3,0-0.3,0-0.3h-0.2
          c1.5,3.2,2.7,6.5,3.7,10c2.2,7.7,2.4,13.9,2.5,18.4c0.1,3.6,0.2,10.4-1.4,19.1c-1.8,10-4.7,26.1-14.8,29.5
          c-1.7,0.6-3.3,0.7-4.2,0.7c-0.9-0.5-2.3-1.3-3.5-2.7c-1-1.2-1.6-2.2-2.1-3.1c-0.7-1.3-0.7-1.6-1.9-4.7c-0.8-2.1-0.9-2.2-1.5-3.5
          C206.2,247.9,205.7,246.4,205.4,245.2z"
        fill="url(#SVGID_1_)"
        stroke="url(#SVGID_1_)"
        strokeWidth={2}
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: drawDur, ease: "easeInOut", delay: 0 },
          fillOpacity: { duration: fillDur, delay: drawDur + 0.2 },
        }}
      />
      {/* 2. Main logo shape */}
      <motion.path
        d="M124.6,9.1c0,0-0.1,0-0.1,0
          c-2.1,0-24.8,0.1-27.3,0.1c0,0-0.1,0-0.1,0c-0.5,0.1-1.2,0.3-1.5,1c-0.1,0.3-0.2,0.5-0.3,0.7c-1.2,3.6-57.1,165.9-57.1,165.9
          c0,0,0,0,0,0c1.2,1.5,2.8,3.3,4.6,5.3c1.1,1.2,2.7,2.9,4.9,5c2.6,2.5,4.7,4.2,7.7,6.6c0.1,0.1,0.2,0.1,0.3,0.2
          c2.1,1.7,5.2,0.8,6.1-1.7l0.1-0.2c0,0,3.2-9.4,3.2-9.4c0-0.1,5.8-16.9,5.9-17.1c13.2-38.5,26.5-77,39.7-115.5c0,0,6.9-20,12.7-37
          c0,0,0.5-1.3,0.5-1.3c0,0,0.4-1,0.4-1c0.1-0.2,0.1-0.4,0.2-0.6c0,0,0.1-0.3,0.2-0.5c0-0.1,0.1-0.1,0.2-0.2c0.1-0.1,0.2,0,0.2,0
          c0,0-0.1,0-0.1,0C124.8,9.1,124.7,9.1,124.6,9.1z"
        fill="url(#SVGID_2_)"
        stroke="url(#SVGID_2_)"
        strokeWidth={2}
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: drawDur + 0.2, ease: "easeInOut", delay: 0.3 },
          fillOpacity: { duration: fillDur + 0.1, delay: drawDur + 0.7 },
        }}
      />
      {/* 3. Left path */}
      <motion.path
        d="M183.6,259.9c0.5,0.7,1.4,1.8,2.7,2.6
          c1.3,0.7,2.5,1,4.7,1.3c2.8,0.3,5,0.3,6.6,0.3c4.4-0.1,6.2-0.2,9.9-0.3c2.3,0,4.1,0,5.2,0v0c1,0,1.9,0,2.9,0.1
          c-1.2-0.7-3-1.8-4.4-3.8c-0.8-1.1-1.2-2-1.5-2.7c-2.6-6.2-3.4-8.4-3.4-8.4c-1.3-4.1-2.5-7.8-3.6-11.2C177,161.4,151,85.4,125.1,9.3
          c-0.1-0.3-0.5-0.3-0.5,0c-2.4,6.6-4.8,13.9-7.2,20.3c-2.5,6.9-4.2,13.8-6.9,20.4c0,0,0,0.1,0,0.1c36.6,106.8,63.3,184.7,65.6,191.5
          c0.6,1.8,2.2,6.2,4.6,11.9C181.9,256.3,182.9,258.5,183.6,259.9z"
        fill="url(#SVGID_3_)"
        stroke="url(#SVGID_3_)"
        strokeWidth={2}
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: drawDur + 0.4, ease: "easeInOut", delay: 0.6 },
          fillOpacity: { duration: fillDur + 0.1, delay: drawDur + 1 },
        }}
      />
      {/* 4. Bottom left path */}
      <motion.path
        d="M14.9,115.4c0.1,0,0,0.2,0,0.3
          c-0.1,1.1,0.8,14.2,14.4,44.2c2.5,5.4,5.1,10.8,9.1,16.5c2.5,3.4,4.8,6,5.5,6.7c2.1,2.3,3.8,3.9,6.6,6.4c1.6,1.5,2,1.8,2.3,2
          c2.7,1.8,5.5,2.4,7.5,2.5c-0.1,0.1-0.4,0.2-0.6,0.4c-1.5,0.7-2.8,0.9-3.6,1c-12.5,1.2-22.9-1-22.9-1c-0.5-0.1-0.9-0.2-1.2-0.3
          c-0.2-0.1-0.5-0.2-0.9-0.3c-11.3-4.6-15.3-18.4-18.7-28c-1.3-3.8-3.7-11.8-3.8-22c0-3.6,0-10.4,2.5-18.4
          C12.3,121.6,14.6,115.3,14.9,115.4z"
        fill="url(#SVGID_4_)"
        stroke="url(#SVGID_4_)"
        strokeWidth={2}
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: drawDur + 0.5, ease: "easeInOut", delay: 0.9 },
          fillOpacity: { duration: fillDur + 0.09, delay: drawDur + 1.2 },
        }}
      />
    </g>
  </svg>
);

export default Logo;
