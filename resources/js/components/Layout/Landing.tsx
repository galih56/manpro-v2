import { useNavigate } from 'react-router';

import logo from '@/assets/logo.svg';
import { Button } from "@tremor/react";
import { Head } from '@/components/Head';
import { useAuth } from '@/lib/authentication';

export const Landing = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleStart = () => {
    if (auth.authenticated) {
      navigate('/');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <>
      <Head description="Welcome to bulletproof react" />
      <div className="bg-white h-[100vh] flex items-center">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Bulletproof React</span>
          </h2>
          <img src={logo} alt="react" />
          <p>Showcasing Best Practices For Building React Applications</p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Button
                onClick={handleStart}
              >
                Get started
              </Button>
            </div>
            <div className="ml-3 inline-flex">
              <a
                href="https://github.com/alan2207/bulletproof-react"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="primary"
                >
                  Github Repo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
