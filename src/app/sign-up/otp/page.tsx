
import React from 'react'

import { InputOTPForm } from '@/components/otp-input';
function Page() {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='border border-[hsl(240 3.7% 15.9%)] rounded-xl px-5 py-5'>
        <InputOTPForm/>
        </div>
    </div>
    </>
  );
}

export default Page;