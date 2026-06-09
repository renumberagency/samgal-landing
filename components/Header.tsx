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
            className="bg-samgal rounded-full w-28 h-28 sm:w-32 sm:h-32
              flex flex-col items-center justify-center
              shadow-card group-hover:shadow-card-hover transition-shadow"
          >
            <Image
              src="/samgal-logo.png"
              alt="Samgal"
              width={793}
              height={473}
              priority
              className="w-16 sm:w-20 h-auto"
            />
            <div className="text-white text-[10px] sm:text-xs tracking-wider font-light -mt-1">
              סמגל מטבחים
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
