export default function Footer() {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Hammad Shabbir. All rights reserved.
          </p>
          <div className="flex space-x-4 text-gray-400 text-sm">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}