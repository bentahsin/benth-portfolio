import Image from 'next/image';

export default function BenthFarmingBlockText() {
  return (
    <Image src={"/assets/blocktexts/benthfarmingblock.png"} alt='BenthFarming' width={450} height={55} style={{ objectFit: 'contain' }}/>    
  );
}