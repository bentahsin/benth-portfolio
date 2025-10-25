'use client';

import Image from 'next/image';

export default function BenthPapiMgrBlockText() {
  return (
    <Image
      src={"/assets/blocktexts/benthpapimanagerblocktext.png"}
      alt='BenthLicenseAPI'
      width={500}
      height={55}
      style={{ objectFit: 'contain' }}
    />
  );
}