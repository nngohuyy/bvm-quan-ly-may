import Image from "next/image";
import { SignInForm } from "@/components/page/signin-form"

export default function SignInPage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center md:justify-center px-6 py-20 md:p-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/backgrounds/bvm-bg-1.jpg')] bg-cover bg-no-repeat bg-center blur-lg"></div>
      <div className="absolute inset-0 bg-white/75"></div>
      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
        <Image
          className="mx-auto dark:invert"
          src="/bvm.svg"
          alt="Next.js logo"
          width={162}
          height={137.4}
          priority
        />
        <div className="flex flex-col items-center text-center">
          <p className="text-xl font-bold">HỆ THỐNG QUẢN LÝ MÁY</p>
          <p className="leading-snug mt-1">Khoa Chẩn đoán hình ảnh<br/>và Thăm dò chức năng nhãn khoa</p>
          {/* <p>Bệnh viện Mắt TP.HCM</p> */}
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
