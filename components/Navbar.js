import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const navItems = [
    { path: '/', label: 'Gallery', icon: '🖼️' },
    { path: '/upload', label: 'Upload', icon: '📤' },
    { path: '/status', label: 'Status', icon: '📊' },
    { path: '/setup', label: 'Setup', icon: '⚙️' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎬</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Media Gallery</h1>
                <p className="text-xs text-gray-500">Images & Videos</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  router.pathname === item.path
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;