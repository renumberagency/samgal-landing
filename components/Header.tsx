import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-30 pt-5 sm:pt-6 pb-0 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex justify-center">
        <Link
          href="/"
          aria-label="סמגל מטבחים - דף הבית"
          className="inline-block group"
        >
          <div
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden
              shadow-card group-hover:shadow-card-hover transition-shadow
              ring-1 ring-black/5"
          >
            <Image
              src="/samgal-square.jpg"
              alt="סמגל מטבחים"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 112px, 128px"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
