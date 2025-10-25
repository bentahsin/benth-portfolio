'use client';

import Image from 'next/image';

export default function CustomBTimeBlockText() {
  return (
    <Image
      src={"/assets/blocktexts/Benthcustombtimeblock.png"}
      alt='CustomBTime'
      width={500}
      height={55}
      style={{ objectFit: 'contain' }}
    />
  );
}