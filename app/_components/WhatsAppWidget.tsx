import Link from 'next/link'

export default function WhatsAppWidget() {
  return (
    <Link
      href="https://wa.me/17473167596"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-200"
    >
      {/* Pulse ring */}
      <span className="absolute inline-flex w-full h-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
      {/* WhatsApp SVG */}
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white relative z-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.74.72 5.45 2.1 7.83L.5 31.5l7.9-2.07A15.44 15.44 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5Zm0 28.3a13.7 13.7 0 0 1-6.98-1.92l-.5-.3-5.17 1.36 1.38-5.05-.33-.52A13.73 13.73 0 1 1 16 28.8Zm7.52-10.27c-.41-.21-2.44-1.2-2.82-1.34-.38-.14-.65-.21-.93.21-.27.41-1.07 1.34-1.31 1.62-.24.27-.48.3-.9.1-.41-.21-1.74-.64-3.32-2.04-1.23-1.09-2.06-2.44-2.3-2.85-.24-.41-.03-.63.18-.84.19-.18.41-.48.62-.72.2-.24.27-.41.41-.69.14-.27.07-.52-.03-.72-.1-.21-.93-2.24-1.27-3.07-.34-.8-.68-.69-.93-.7h-.79c-.27 0-.72.1-1.1.52-.38.41-1.44 1.41-1.44 3.44 0 2.03 1.48 3.99 1.69 4.27.2.27 2.9 4.43 7.04 6.21.98.43 1.75.68 2.34.87.99.31 1.88.27 2.59.16.79-.12 2.44-.99 2.79-1.96.34-.96.34-1.79.24-1.96-.1-.17-.38-.27-.79-.48Z" />
      </svg>
    </Link>
  )
}
