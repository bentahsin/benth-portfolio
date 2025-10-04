import Image from 'next/image';

export default function MynerithBlockText() {
  return (
    <Image
      src="/assets/blocktexts/mynerithblock.png"
      alt="Mynerith Block Text"
      width={350}
      height={55}
      style={{ objectFit: 'contain' }}
    />
  );
}