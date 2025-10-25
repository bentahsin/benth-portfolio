'use client';

import Image from 'next/image';

export default function BenthDungeonsBlockText() {
  return (
    <Image src={"/assets/blocktexts/BenthDungeonsBlock.png"} alt='BenthDungeons' width={500} height={55} style={{ objectFit: 'contain' }}/>    
  );
}