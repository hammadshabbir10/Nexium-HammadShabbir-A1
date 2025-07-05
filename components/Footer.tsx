export default function Footer() {
  return (
    <footer className="bg-gradient-navbar backdrop-blur-xl py-8 border-t border-primary-sage/30 shadow-professional">
      <div className="container-professional">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-sage to-primary-beige rounded-full"></div>
            <span className="text-xl font-bold text-white">Nexium</span>
          </div>
          <p className="text-primary-sage text-sm max-w-md font-medium">
            © {new Date().getFullYear()} Hammad Shabbir. All rights reserved. 
            <br />
            Inspiring quotes for every moment of your journey.
          </p>
          <div className="flex space-x-6 text-primary-sage text-sm">
            <a href="#" className="hover:text-primary-beige transition-colors duration-300 font-medium">Terms</a>
            <a href="#" className="hover:text-primary-beige transition-colors duration-300 font-medium">Privacy</a>
            <a href="#" className="hover:text-primary-beige transition-colors duration-300 font-medium">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}