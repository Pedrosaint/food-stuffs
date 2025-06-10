import React from "react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-300 rounded-lg shadow-lg p-6 w-full max-w-[90%] md:max-w-lg">
        <h2 className="text-xl font-semibold text-gray-800">
          Confirm Logout
        </h2>
        <p className="text-gray-600 mb-2">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
