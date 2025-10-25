'use client';

import Image from 'next/image';

export default function LicenseLibBlockText() {
  return (
    <Image
      src={"/assets/blocktexts/BenthLicenseLibBlock.png"}
      alt='LicenseLib'
      width={350}
      height={55}
      style={{ objectFit: 'contain' }}
    />
  );
}