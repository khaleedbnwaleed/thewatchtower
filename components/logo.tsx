import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" aria-label="Home" className="flex items-center hover:opacity-80 transition-opacity">
      <Image
        src="/logo.png"
        alt="Watch Tower logo"
        width={56}
        height={56}
        className="w-30 h-16"
      />
    </Link>
  );
}
