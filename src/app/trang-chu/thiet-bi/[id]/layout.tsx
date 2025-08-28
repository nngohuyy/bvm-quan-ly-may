export default function EquipmentDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Chi tiết thiết bị</h1>
        {/* <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Chào mừng bạn đến với hệ thống quản lý máy</p> */}
      </div>
      {children}
    </div>
  )
}