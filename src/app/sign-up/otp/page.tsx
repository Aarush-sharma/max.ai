
import React from 'react'
// import {
//     InputOTP,
//     InputOTPGroup,
//     InputOTPSeparator,
//     InputOTPSlot,
//   } from "@/components/ui/input-otp";
import { InputOTPForm } from '@/components/otp-input';
function Page() {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <InputOTPForm/>
    </div>
    </>
  );
}

export default Page;
/**
 <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
 */