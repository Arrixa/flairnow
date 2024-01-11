import { FC, ReactNode } from 'react';
import { Button } from './ui/button';

interface GoogleLoginBtn {
  children: ReactNode;
}
const GoogleLoginBtn: FC<GoogleLoginBtn> = ({ children }) => {
  const loginWithGoogle = () => console.log('Login with google');

  return (
    <Button onClick={loginWithGoogle} className='w-full'>
      {children}
    </Button>
  );
};

export default GoogleLoginBtn;
