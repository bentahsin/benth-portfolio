'use client';

import Image from 'next/image';

export default function BenthPinataBlockText() {
  return (
    <Image src={"/assets/blocktexts/benthpinata.png"} alt='BenthPinata'width={500} height={55} style={{ objectFit: 'contain' }} />
  );
}