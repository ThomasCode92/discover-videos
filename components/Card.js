import Image from 'next/image';

export default function Card({ imageUrl, size }) {
  return (
    <div>
      <Image src={imageUrl} alt="image" width={300} height={300} />
    </div>
  );
}
