import { columns, Equipment } from "./columns"
import { DataTable } from "./data-table"

export default function HomePage() {
  const mockEquipments: Equipment[] = [
    {
      id: "b118e3aa-0728-414b-b9a0-8d8328d93d0a",
      user_id: "3ea08c07-88e5-43ea-93c8-530486cd2462",
      name: "Centrifuge 3000",
      model: "CF-3000X",
      place_of_origin: "Germany",
      manufacture_year: 2018,
      function: "Separates substances of different densities",
      delivery_date: new Date("2019-03-15"),
      location: "Lab A - Room 102",
      status: "in_use",
    },
    {
      id: "e8fb6302-ca5a-4484-97e3-3a987006d142",
      user_id: "2291e347-b2c9-4713-ade6-b649a070c025",
      name: "3D Printer",
      model: "Prusa i3 MK3S",
      place_of_origin: "Czech Republic",
      manufacture_year: 2021,
      function: "Prototyping and creating 3D parts",
      delivery_date: new Date("2021-08-20"),
      location: "Workshop - Room 201",
      status: "available",
    },
    {
      id: "8e0ffbd0-4cfb-43fb-b86f-e19d0f3da113",
      user_id: "13a6a6a6-4414-40ce-91ee-f9c3a9d9a77d",
      name: "Microscope",
      model: "Nikon Eclipse E200",
      place_of_origin: "Japan",
      manufacture_year: 2016,
      function: "Magnifying biological samples",
      delivery_date: new Date("2017-01-05"),
      location: "Lab B - Room 110",
      status: "in_use",
    },
    {
      id: "58c7453d-0d9c-494e-b56d-62f18d0ea4e1",
      user_id: "4fb6971a-b4df-4bae-8b57-cfbaf197624d",
      name: "Spectrophotometer",
      model: "UV-2600",
      place_of_origin: "USA",
      manufacture_year: 2019,
      function: "Measuring light absorbance of samples",
      delivery_date: new Date("2019-12-12"),
      location: "Lab C - Room 305",
      status: "unavailable",
    },
    {
      id: "b7c2652e-e573-4096-8d77-451c8d62ad99",
      user_id: "dd99ebe9-5749-490b-9cca-3f0b05ddcae0",
      name: "Air Purifier",
      model: "AirBK Pro",
      place_of_origin: "Vietnam",
      manufacture_year: 2023,
      function: "Air filtration and CO₂ to O₂ conversion",
      delivery_date: new Date("2023-11-10"),
      location: "Office - Room 402",
      status: "available",
    },
  ];

  return (
    <div className="max-w-9/10 mx-auto py-10">
      <DataTable columns={columns} data={mockEquipments} />
    </div>
  )
}
