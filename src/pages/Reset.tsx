// src/pages/Reset.tsx
import React from 'react';
import ResetPassword from '../components/ResetPassword';

export default function ResetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <ResetPassword />
      </div>
    </div>
  );
}
