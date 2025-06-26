'use client';

import Image from 'next/image';

export function Footer() {

  return (
    <footer className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border-t-4 border-pink-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-3">
            <Image
              src="/images/friendship-corner-daycare-logo.png"
              alt="Friendship Corner Daycare"
              width={48}
              height={36}
              className="w-12 h-9 object-contain"
            />
            <span className="font-display font-bold text-xl rainbow-text">Friendship Corner Daycare</span>
          </div>
          <div className="space-y-2">
            <p className="text-purple-600 font-medium">📞 604.945.8504</p>
            <p className="text-muted-foreground text-sm">
              © 2024 Friendship Corner Daycare. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Montessori Excellence Since 2008 • Licensed Group Daycare
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

}
