import React from 'react';

const NotificationsMenu = ({ onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 animate-scaleIn origin-top-right">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">You've reached a new milestone: <span className="font-semibold">7-day streak!</span></p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Just now</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 dark:text-green-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">New workout program available: <span className="font-semibold">HIIT Challenge</span></p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500 dark:text-purple-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Reminder: <span className="font-semibold">Drink water!</span> Stay hydrated.</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 text-center rounded-b-lg">
        <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline" onClick={onClose}>
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsMenu;
