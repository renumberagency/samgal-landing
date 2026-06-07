import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-30 pt-5 sm:pt-6 pb-2 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex justify-center sm:justify-start">
        <Link
          href="/"
          aria-label="סמגל מטבחים - דף הבית"
          className="inline-block group"
        >
          <div
            className="bg-samgal px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl
              shadow-card group-hover:shadow-card-hover transition-shadow"
          >
            <Image
              src="/samgal-logo.png"
              alt="Samgal"
              width={793}
              height={473}
              priority
              className="h-9 sm:h-11 w-auto block"
            />
            <div className="text-white text-[10px] sm:text-xs text-center tracking-wider font-light -mt-0.5">
              סמגל מטבחים
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
