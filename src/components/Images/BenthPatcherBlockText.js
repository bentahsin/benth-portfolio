'use client';

import Image from 'next/image';

export default function BenthPatcherBlockText() {
  return (
    <Image
      src={"/assets/blocktexts/benthpatcherblock.png"}
      alt='BenthPatcher'
      width={500}
      height={55}
      style={{ objectFit: 'contain' }}
    />
  );
}