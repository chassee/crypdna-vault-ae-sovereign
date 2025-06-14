
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Dashboard />;
};

export default Index;
