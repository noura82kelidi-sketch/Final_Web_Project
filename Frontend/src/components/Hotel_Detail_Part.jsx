import { useEffect, useState } from "react";
import { get, BASE_URL, post, del } from "../utils/httpClient";
import { useContext } from "react";
import { AuthContext } from "../App";

function Hotel_Detail_Part({ id }) {
  const [hotel, setHotel] = useState(null);
  const [hotelDes, setHotelDes] = useState(null);
  const [hotelAme, setHotelAme] = useState(null);
  const [roomsAme, setRoomsAme] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const { user } = useContext(AuthContext);
  const publicAme = [
    "پارکینگ",
    "استخر",
    "خدمات برای معلولین",
    "جکوزی",
    "وسایل بدنسازی",
    "ترانسفر رفت با هزینه",
    "ترانسفر برگشت با هزینه",
    "ماساژ",
    "آسانسور",
    "سیستم اعلام حریق",
    "سرویس اتاق",
    "خدمات خانه داری",
    "خشکشویی",
    "خدمات باربری",
    "صبحانه",
    "سرویس بهداشتی فرنگی در طبقات",
    "سرویس بهداشتی فرنگی در لابی",
    "مینی بار با هزینه",
    "خودپرداز",
    "سرویس بهداشتی ایرانی در طبقات",
    "سرویس بهداشتی ایرانی در لابی",
    "سیستم تهویه مطبوع",
    "تلفن در لابی",
    "شبکه پخش فیلم",
    "پذیرش 24 ساعته",
    "کافی شاپ",
    "اینترنت در لابی",
    "فضای سبز",
    "کافی نت",
    "تلویزیون در لابی",
    "نمازخانه",
    "پله های اضطراری",
  ];

  const roomAme = [
    "سیستم گرمایش و سرمایش",
    "یخچال",
    "دمپایی",
    "سرویس بهداشتی فرنگی",
    "اینترنت",
    "امکانات آشپزی",
    "گاوصندوق",
    "تلویزیون",
    "امکانات شارژ وسایل الکترونیکی",
    "مبلمان",
    "دراور",
    "میز تحریر",
    "سیستم تهویه مطبوع",
    "کمد لباس",
    "رخت‌آویز",
    "پاورسوئیچ",
    "سرویس بیدارباش",
    "سیستم اطفاء حریق",
    "زنگ هشدار",
    "آباژور",
    "تلفن",
    "لوازم بهداشتی",
    "حمام",
    "چای ساز",
    "سرویس بهداشتی ایرانی",
    "آب رایگان",
    "IPTV",
  ];

  const loadHotel = async () => {
    const hotel = await get(`/Hotels/${id}`);
    setHotel(hotel);
  };

  const loadHotelDes = async () => {
    const hotelDes = await get(`/Hotel_Description/${id}`);
    setHotelDes(hotelDes);
  };

  const loadHotelAme = async () => {
    const hotelAme = await get(`/Hotel_Amenities/${id}`);
    setHotelAme(hotelAme);
  };

  const loadRoomsAme = async () => {
    const roomsAme = await get(`/Rooms_Amenities/${id}`);
    setRoomsAme(roomsAme);
  };

  const checkFavorite = async () => {
    const data = await get(
      `/Favorites/check?user_id=${user.id}&hotel_id=${id}`
    );

    setFavorite(data.isFavorite);
  };

  const handleFavorite = async () => {
    if (!user) {
      alert("At First Login to your Account");
      return;
    }

    const data = await get(
      `/Favorites/check?user_id=${user.id}&hotel_id=${id}`
    );

    if (data.isFavorite) {
      await del(`/Favorites/${user.id}/${id}`);
      setFavorite(false);
    } else {
      await post("/Favorites", {
        user_id: user.id,
        hotel_id: id,
      });

      setFavorite(true);
    }
  };
  useEffect(() => {
    loadHotel(), loadHotelDes(), loadHotelAme(), loadRoomsAme();
  }, [id]);
  useEffect(() => {
    if (user) {
      checkFavorite();
    }
  }, [user]);

  if (!hotel || !hotelDes || !hotelAme || !roomsAme) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div className="flex flex-row justify-between w-6xl m-auto">
        <div className="flex flex-col w-1/2 mr-5 ml-5">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mt-5">
              <h2 className="text-2xl font-bold text-gray-800  ">
                هتل {hotel.name}
              </h2>
              <button onClick={handleFavorite}>
                <i
                  className={
                    favorite
                      ? "fa-solid fa-bookmark text-[25px] text-sky-500"
                      : "fa-regular fa-bookmark text-[25px]"
                  }
                ></i>
              </button>
            </div>
            <p className="mt-5 flex flex-row">
              {Array.from({ length: hotel.stars }).map((_, index) => (
                <i className="fa-solid fa-star text-yellow-500"></i>
              ))}
            </p>
            <p className="mt-5 text-gray-500">{hotel.address}</p>
          </div>
          <div className=" h-80 w-full mt-5">
            <img
              src={`${BASE_URL}${hotel.image}`}
              alt={hotel.name}
              className="h-full w-150 object-cover rounded-md "
            />
          </div>
          <div className="flex flex-col text-right w-full">
            <h2 className="text-xl font-bold text-gray-800 mt-5 ">
              درباره هتل {hotel.name}
            </h2>

            <div className="flex flex-row justify-around w-full mt-5 mb-5 rtl">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <i class="fa-solid fa-arrow-right-to-bracket text-[18px] mt-1 "></i>
                  <p className=" font-bold mr-2 text-[12px]">ساعت ورود</p>
                </div>
                <p className="text-center text-[16px] mt-1">
                  {hotelDes.arrival_time}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <i class="fa-solid fa-arrow-right-from-bracket text-[18px] mt-1 "></i>
                  <p className=" font-bold mr-2 text-[12px]">ساعت خروج</p>
                </div>
                <p className="text-center text-[16px] mt-1">
                  {hotelDes.departure_time}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <i class="fa-solid fa-door-closed text-[18px] mt-1 "></i>
                  <p className=" font-bold mr-2 text-[12px]">تعداد اتاق ها</p>
                </div>
                <p className="text-center text-[16px] mt-1">{hotelDes.rooms}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <i class="fa-solid fa-hotel text-[18px] mt-1 "></i>
                  <p className=" font-bold mr-2 text-[12px]">تعداد طبقات</p>
                </div>
                <p className="text-center text-[16px] mt-1">
                  {hotelDes.floors}
                </p>
              </div>
            </div>

            <p className="text-[14px] w-full">{hotelDes.more_description}</p>

            <div className="flex flex-row justify-around w-full mt-5 mb-5 rtl">
              <div className="flex flex-col">
                <p className=" font-bold mr-2 text-[12px]">ظرفیت لابی</p>
                <p className="text-center text-[16px] mt-1">
                  {hotelDes.Lobby_capacity}
                </p>
              </div>
              <div className="flex flex-col">
                <p className=" font-bold mr-2 text-[12px]">تاریخ ساخت</p>
                <p className="text-center text-[16px] mt-1">
                  {hotelDes.manufacture_date}
                </p>
              </div>
              <div className="flex flex-col">
                <p className=" font-bold mr-2 text-[12px]">وضعیت ترافیک</p>
                <p className="text-center text-[16px] mt-1">
                  {hotelDes.Traffic_conditions}
                </p>
              </div>
              <div className="flex flex-col">
                <p className=" font-bold mr-2 text-[12px]">وضعیت دید هتل</p>
                <p className="text-center text-[16px] mt-1">
                  {hotelDes.hotel_view}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row mr-4 ml-4 mt-22 w-1/2 ">
          <div className="w-1/2 p-5 border h-fit">
            <p className="font-bold">امکانات عمومی</p>
            <div className="flex flex-col p-5 text-[16px]">
              {Object.values(hotelAme)
                .slice(1)
                .map((value, index) => {
                  if (value) {
                    return <li key={index}>{publicAme[index]}</li>;
                  }
                  return null;
                })}
            </div>
          </div>
          <div className="w-1/2 mr-5 p-5 border h-fit">
            <p className="font-bold">امکانات اتاق ها</p>
            <div className="flex flex-col p-5 text-[16px]">
              {Object.values(roomsAme)
                .slice(1)
                .map((value, index) => {
                  if (value) {
                    return <li key={index}>{roomAme[index]}</li>;
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hotel_Detail_Part;

// بخش مربوط به امکانات عمومی و اتاق ها با هوش مصنوعی نوشته شده 
