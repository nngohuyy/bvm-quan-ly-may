import { SignUpForm } from "@/components/page/signup-form"

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/backgrounds/bvm-bg-1.jpg')] bg-cover bg-no-repeat bg-center blur-lg"></div>
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-xl font-bold">HỆ THỐNG QUẢN LÝ MÁY</p>
          <p>Khoa Xét nghiệm - Bệnh viện Mắt TP.HCM</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
