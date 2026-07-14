import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { get, del, put, post } from "../utils/httpClient";
function AdminHotels() {
  const { user } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [hotelData, setHotelData] = useState({
    name: "",
    city: "",
    address: "",
    stars: "",
    image: "",
    price: "",
  });
  const [hotelDes, setHotelDes] = useState({
    arrival_time: "",
    departure_time: "",
    rooms: "",
    floors: "",
    Lobby_capacity: "",
    Traffic_conditions: "",
    hotel_view: "",
    more_description: "",
    manufacture_date: "",
  });
  const [hotelAmenities, setHotelAmenities] = useState({
    Parking: false,
    SwimmingPool: false,
    DisabledFacilities: false,
    Jacuzzi: false,
    FitnessEquipment: false,
    ArrivalTransfer: false,
    DepartureTransfer: false,
    Massage: false,
    Elevator: false,
    FireAlarmSystem: false,
    RoomService: false,
    HousekeepingServices: false,
    Laundry: false,
    PorterService: false,
    Breakfast: false,
    WesternToiletsOnFloors: false,
    WesternToiletsInLobby: false,
    Minibar: false,
    ATM: false,
    IranianToiletsOnFloors: false,
    IranianToiletsInLobby: false,
    Air: false,
    TelephoneInLobby: false,
    VideoNetwork: false,
    reception24: false,
    CoffeeShop: false,
    InternetInLobby: false,
    GreenSpace: false,
    InternetCafe: false,
    TelevisionInLobby: false,
    Prayer: false,
    EmergencyStairs: false,
  });
  const publicAme = [
    { key: "Parking", label: "پارکینگ" },
    { key: "SwimmingPool", label: "استخر" },
    { key: "DisabledFacilities", label: "خدمات برای معلولین" },
    { key: "Jacuzzi", label: "جکوزی" },
    { key: "FitnessEquipment", label: "وسایل بدنسازی" },
    { key: "ArrivalTransfer", label: "ترانسفر رفت با هزینه" },
    { key: "DepartureTransfer", label: "ترانسفر برگشت با هزینه" },
    { key: "Massage", label: "ماساژ" },
    { key: "Elevator", label: "آسانسور" },
    { key: "FireAlarmSystem", label: "سیستم اعلام حریق" },
    { key: "RoomService", label: "سرویس اتاق" },
    { key: "HousekeepingServices", label: "خدمات خانه داری" },
    { key: "Laundry", label: "خشکشویی" },
    { key: "PorterService", label: "خدمات باربری" },
    { key: "Breakfast", label: "صبحانه" },
    { key: "WesternToiletsOnFloors", label: "سرویس بهداشتی فرنگی در طبقات" },
    { key: "WesternToiletsInLobby", label: "سرویس بهداشتی فرنگی در لابی" },
    { key: "Minibar", label: "مینی بار با هزینه" },
    { key: "ATM", label: "خودپرداز" },
    { key: "IranianToiletsOnFloors", label: "سرویس بهداشتی ایرانی در طبقات" },
    { key: "IranianToiletsInLobby", label: "سرویس بهداشتی ایرانی در لابی" },
    { key: "Air", label: "سیستم تهویه مطبوع" },
    { key: "TelephoneInLobby", label: "تلفن در لابی" },
    { key: "VideoNetwork", label: "شبکه پخش فیلم" },
    { key: "reception24", label: "پذیرش 24 ساعته" },
    { key: "CoffeeShop", label: "کافی شاپ" },
    { key: "InternetInLobby", label: "اینترنت در لابی" },
    { key: "GreenSpace", label: "فضای سبز" },
    { key: "InternetCafe", label: "کافی نت" },
    { key: "TelevisionInLobby", label: "تلویزیون در لابی" },
    { key: "Prayer", label: "نمازخانه" },
    { key: "EmergencyStairs", label: "پله های اضطراری" },
  ];

  const [hotelRoomsAmenities, setHotelRoomsAmenities] = useState({
    HeatingCoolingSystem:false,
    Refrigerator:false,
    Slippers:false,
    WesternToilet:false,
    internet:false,
    CookingFacilities:false,
    safe:false,
    TV:false,
    ElectronicFacilities:false,
    Furniture:false,
    drawers:false,
    WritingDesk:false,
    air:false,
    Wardrobe:false,
    ClothesRack:false,
    PowerKeyCardSwitch:false,
    WakeUpService:false,
    fire:false,
    Alarm:false,
    TableLamp:false,
    telephone:false,
    Toiletries:false,
    Bathroom:false,
    TeaMaker:false,
    IranianToilet:false,
    ComplimentaryWater:false,
    IPTV:false,
  });
  const roomsAme = [
    { key: "HeatingCoolingSystem", label: "سیستم گرمایش و سرمایش" },
    { key: "Refrigerator", label:     "یخچال" },
    { key: "Slippers", label:     "دمپایی"},
    { key: "WesternToilet", label:     "سرویس بهداشتی فرنگی" },
    { key: "internet", label:     "اینترنت" },
    { key: "CookingFacilities", label:     "امکانات آشپزی" },
    { key: "safe", label:     "گاوصندوق" },
    { key: "TV", label:    "تلویزیون" },
    { key: "ElectronicFacilities", label:     "امکانات شارژ وسایل الکترونیکی" },
    { key: "Furniture", label:     "مبلمان" },
    { key: "drawers", label:     "دراور" },
    { key: "WritingDesk", label:     "میز تحریر" },
    { key: "air", label:     "سیستم تهویه مطبوع" },
    { key: "Wardrobe", label:     "کمد لباس" },
    { key: "ClothesRack", label:     "رخت‌آویز" },
    { key: "PowerKeyCardSwitch", label:     "پاورسوئیچ" },
    { key: "WakeUpService", label:     "سرویس بیدارباش" },
    { key: "fire", label:     "سیستم اطفاء حریق" },
    { key: "Alarm", label:     "زنگ هشدار" },
    { key: "TableLamp", label:     "آباژور" },
    { key: "telephone", label:     "تلفن" },
    { key: "Toiletries", label:       "لوازم بهداشتی" },
    { key: "Bathroom", label:     "حمام" },
    { key: "TeaMaker", label:    "چای ساز" },
    { key: "IranianToilet", label:   "سرویس بهداشتی ایرانی"},
    { key: "ComplimentaryWater", label:  "آب رایگان" },
    { key: "IPTV", label: "IPTV" },
  ];

  const loadHotels = async () => {
    if (!user) return;
    const hotels = await get(`/Hotels`);
    setHotels(hotels);
  };

  useEffect(() => {
    loadHotels();
  }, [user]);

  const handleDelete = async (hotel_id) => {
    await del(`/Hotel_Amenities/${hotel_id}`);
    await del(`/Hotel_Description/${hotel_id}`);
    await del(`/Rooms_Amenities/${hotel_id}`);
    await del(`/Hotels/${hotel_id}`);
    loadHotels();
  };

  const handleUpdate = async (hotel) => {
    setIsEditing(true);

    const amenities = await get(`/Hotel_Amenities/${hotel.id}`);
    const des = await get(`/Hotel_Description/${hotel.id}`);
    const roomAmenities = await get(`/Rooms_Amenities/${hotel.id}`);
    setHotelAmenities(amenities);
    setHotelDes(des);
    setHotelRoomsAmenities(roomAmenities);
    setHotelData({
      ...hotel,
    });

    setImageFile(null);
    setShowModal(true);
  };
  const handleAdd = () => {
    setIsEditing(false);

    setHotelData({
      name: "",
      city: "",
      address: "",
      stars: "",
      image: "",
      price: "",
    });
    setHotelAmenities({
      Parking: false,
      SwimmingPool: false,
      DisabledFacilities: false,
      Jacuzzi: false,
      FitnessEquipment: false,
      ArrivalTransfer: false,
      DepartureTransfer: false,
      Massage: false,
      Elevator: false,
      FireAlarmSystem: false,
      RoomService: false,
      HousekeepingServices: false,
      Laundry: false,
      PorterService: false,
      Breakfast: false,
      WesternToiletsOnFloors: false,
      WesternToiletsInLobby: false,
      Minibar: false,
      ATM: false,
      IranianToiletsOnFloors: false,
      IranianToiletsInLobby: false,
      Air: false,
      TelephoneInLobby: false,
      VideoNetwork: false,
      reception24: false,
      CoffeeShop: false,
      InternetInLobby: false,
      GreenSpace: false,
      InternetCafe: false,
      TelevisionInLobby: false,
      Prayer: false,
      EmergencyStairs: false,
    });

    setHotelDes({
      arrival_time: "",
      departure_time: "",
      rooms: "",
      floors: "",
      Lobby_capacity: "",
      Traffic_conditions: "",
      hotel_view: "",
      more_description: "",
      manufacture_date: "",
    });

    setHotelRoomsAmenities({
      HeatingCoolingSystem:false,
      Refrigerator:false,
      Slippers:false,
      WesternToilet:false,
      internet:false,
      CookingFacilities:false,
      safe:false,
      TV:false,
      ElectronicFacilities:false,
      Furniture:false,
      drawers:false,
      WritingDesk:false,
      air:false,
      Wardrobe:false,
      ClothesRack:false,
      PowerKeyCardSwitch:false,
      WakeUpService:false,
      fire:false,
      Alarm:false,
      TableLamp:false,
      telephone:false,
      Toiletries:false,
      Bathroom:false,
      TeaMaker:false,
      IranianToilet:false,
      ComplimentaryWater:false,
      IPTV:false,
    });
    setShowModal(true);
  };
  const handleChange = (e) => {
    setHotelData({
      ...hotelData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDes = (e) => {
    setHotelDes({
      ...hotelDes,
      [e.target.name]: e.target.value,
    });
  };

  const createHotel = async () => {

    const formData = new FormData();

    formData.append("name", hotelData.name);
    formData.append("city", hotelData.city);
    formData.append("address", hotelData.address);
    formData.append("stars", hotelData.stars);
    formData.append("price", hotelData.price);

    formData.append("image", imageFile);


    const newHotel = await post("/Hotels", formData);


    await post("/Hotel_Amenities", {
        ...hotelAmenities,
        hotel_id: newHotel.id
    });

    await post("/Hotel_Description", {
        ...hotelDes,
        hotel_id: newHotel.id
    });

    await post("/Rooms_Amenities", {
      ...hotelRoomsAmenities,
      hotel_id: newHotel.id
  });


    setShowModal(false);

    loadHotels();
};
const saveChanges = async () => {

  const formData = new FormData();

  formData.append("name", hotelData.name);
  formData.append("city", hotelData.city);
  formData.append("address", hotelData.address);
  formData.append("stars", hotelData.stars);
  formData.append("price", hotelData.price);

  if (imageFile) {
      formData.append("image", imageFile);
  }


  await put(`/Hotels/${hotelData.id}`, formData);


  await put(`/Hotel_Amenities/${hotelData.id}`, hotelAmenities);

  await put(`/Hotel_Description/${hotelData.id}`, hotelDes);

  await put(`/Rooms_Amenities/${hotelData.id}`, hotelRoomsAmenities);
  setShowModal(false);

  loadHotels();
};
  const handleAmenityChange = (key) => {
    setHotelAmenities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRoomAmenityChange = (key) => {
    setHotelRoomsAmenities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <div className="flex flex-col w-full">
      <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mx-15 my-20">
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-[18px] text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" class="px-6 py-3 font-medium">
                نام هتل
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                شهر
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                ستاره
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                قیمت یک شب
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr class="text-[14px] bg-neutral-primary border-b border-default">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {hotel.name}
                </th>
                <td class="px-6 py-4">{hotel.city}</td>
                <td class="px-6 py-4">{hotel.stars}</td>
                <td class="px-6 py-4">{hotel.price} تومان</td>
                <button
                  onClick={() => handleUpdate(hotel)}
                  className={`px-3 py-1 rounded-md mt-3 ml-2 bg-green-300 text-gray-500 `}
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(hotel.id)}
                  className={`px-3 py-1 rounded-md mt-3 bg-red-300 text-gray-500 `}
                >
                  حذف
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="flex flex-col bg-white rounded-xl p-8 w-full h-f"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "ویرایش هتل" : "اضافه کردن هتل"}
              </h2>

              <div className="flex flex-row">
                <div className="flex flex-col ml-5">
                  <input
                    name="name"
                    value={hotelData.name}
                    onChange={handleChange}
                    placeholder="نام هتل"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <input
                    name="city"
                    value={hotelData.city}
                    onChange={handleChange}
                    placeholder="شهر"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <input
                    name="stars"
                    value={hotelData.stars}
                    onChange={handleChange}
                    placeholder="ستاره"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <input
                    name="price"
                    value={hotelData.price}
                    onChange={handleChange}
                    placeholder="قیمت"
                    className="border w-[180px] p-2 rounded mb-6"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="border w-full p-2 rounded mb-4"
                  />
                </div>
                <div className="flex flex-col ml-5">
                  <textarea
                    name="address"
                    value={hotelData.address}
                    rows={4}
                    onChange={handleChange}
                    placeholder="آدرس هتل"
                    className="text-[16px] border w-full p-2 rounded mb-4"
                  />

                  <input
                    name="arrival_time"
                    value={hotelDes.arrival_time}
                    onChange={handleChangeDes}
                    placeholder="ساعت ورود"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <input
                    name="departure_time"
                    value={hotelDes.departure_time}
                    onChange={handleChangeDes}
                    placeholder="ساعت خروج"
                    className="border w-[180px] p-2 rounded mb-4"
                  />
                  <input
                    name="rooms"
                    value={hotelDes.rooms}
                    onChange={handleChangeDes}
                    placeholder="تعداد اتاق"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <input
                    name="floors"
                    value={hotelDes.floors}
                    onChange={handleChangeDes}
                    placeholder="تعداد طبقات"
                    className="border w-[180px] p-2 rounded mb-6"
                  />
                </div>

                <div className="flex flex-col ml-5">
                  <textarea
                    name="more_description"
                    value={hotelDes.more_description}
                    rows={14}
                    onChange={handleChangeDes}
                    placeholder="توضیحات بیشتر"
                    className="text-[16px] border w-[200px] p-2 rounded mb-4"
                  />
                </div>
                <div className="flex flex-col ml-5">
                  <input
                    name="Lobby_capacity"
                    value={hotelDes.Lobby_capacity}
                    onChange={handleChangeDes}
                    placeholder="ظرفیت لابی"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <textarea
                    name="Traffic_conditions"
                    rows={2}
                    value={hotelDes.Traffic_conditions}
                    onChange={handleChangeDes}
                    placeholder="وضعیت ترافیک"
                    className="border w-[180px] p-2 rounded mb-4"
                  />
                  <textarea
                    name="hotel_view"
                    value={hotelDes.hotel_view}
                    rows={3}
                    onChange={handleChangeDes}
                    placeholder="دید هتل"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <input
                    name="manufacture_date"
                    value={hotelDes.manufacture_date}
                    onChange={handleChangeDes}
                    placeholder="سال ساخت"
                    className="border w-[180px] p-2 rounded mb-6"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-3 font-semibold">
                    امکانات هتل
                  </label>

                  <div className="grid grid-cols-2 gap-3 max-h-62 overflow-y-auto border rounded-lg p-3 text-[16px]">
                    {publicAme.map((item) => (
                      <label key={item.key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={hotelAmenities[item.key]}
                          onChange={() => handleAmenityChange(item.key)}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-h-62 overflow-y-auto border rounded-lg p-3 text-[16px]">
                    {roomsAme.map((item) => (
                      <label key={item.key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={hotelRoomsAmenities[item.key]}
                          onChange={() => handleRoomAmenityChange(item.key)}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  انصراف
                </button>

                <button
                  onClick={isEditing ? saveChanges : createHotel}
                  className="bg-sky-600 text-white px-4 py-2 rounded"
                >
                  {isEditing ? "ذخیره تغییرات" : "اضافه کردن"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row-reverse justify-evenly mt-30">
        <button
          onClick={handleAdd}
          className="bg-blue-700 text-white px-3 py-1 rounded-md"
        >
          اضافه کردن هتل
        </button>
      </div>
    </div>
  );
}

export default AdminHotels;

// تابع saveChange و createHotel با هوش مصنوعی نوشته شده.
