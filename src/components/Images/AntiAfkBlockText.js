import Image from 'next/image';

export default function AntiAfkBlockText() {
  return (
    <Image src={"/assets/blocktexts/antiafkblock.png"} alt='AntiAFK'width={275} height={55} style={{ objectFit: 'contain' }} />    
  );
}