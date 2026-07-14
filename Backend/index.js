const express = require("express");
const multer = require("multer");
const path = require("path");
const { neon } = require("@neondatabase/serverless");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "hotel_photos/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/hotel_photos", express.static("hotel_photos"));

app.use(function (_, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

DATABASE_URL =
  "postgresql://neondb_owner:npg_wNZnkdHTRJ57@ep-falling-paper-attq24oj-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(DATABASE_URL);

const port = 3000;

app.get("/Hotels", async (request, response) => {
  try {
    const city = request.query.city;
    let hotels;
    if (!city || city.trim() === "") {
      hotels = await sql`SELECT * FROM "Hotels"`;
    } else {
      hotels = await sql`SELECT * FROM "Hotels" WHERE city= ${city};`;
    }

    response.send(hotels);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.get("/Hotels/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const hotel = await sql`SELECT * FROM "Hotels" WHERE id= ${id};`;

    response.json(hotel[0]);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.get("/Hotel_Description/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const hotel = await sql`SELECT * FROM "Hotel_Description" WHERE id= ${id};`;

    response.json(hotel[0]);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.get("/Hotel_Amenities/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const hotel = await sql`SELECT * FROM "Hotel_Amenities" WHERE id= ${id};`;
    response.json(hotel[0]);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.get("/Rooms_Amenities/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const hotel = await sql`SELECT * FROM "Rooms_Amenities" WHERE id= ${id};`;
    response.json(hotel[0]);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.get("/Users/:email", async (request, response) => {
  try {
    const email = request.params.email;
    const User = await sql`SELECT * FROM "Users" WHERE email= ${email};`;
    response.json(User[0]);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.get("/AvailableRooms", async (req, res) => {
  const { id, arrival, departure } = req.query;

  const rooms = await sql`
      SELECT *
      FROM "Rooms"
      WHERE hotel_id = ${id}
      AND id NOT IN (
          SELECT room_id
          FROM "Bookings"
          WHERE
              ${arrival} < "checkOut"
              AND
              ${departure} > "checkIn"
      )
  `;

  res.json(rooms);
});

app.get("/Reviews/:hotelId", async (req, res) => {
  const { hotelId } = req.params;
  const reviews = await sql`
      SELECT
          r.*,
          u.name
      FROM "Reviews" r
      JOIN "Users" u
      ON r.user_id = u.id
      WHERE hotel_id = ${hotelId}
      ORDER BY "createdAt" DESC
  `;
  res.json(reviews);
});

app.get("/Bookings/:userId", async (req, res) => {
  const userId = req.params.userId;

  const bookings = await sql`
  SELECT
    b.id,

    TO_CHAR(b."checkIn", 'YYYY-MM-DD') AS "checkIn",
    TO_CHAR(b."checkOut", 'YYYY-MM-DD') AS "checkOut",

    b.total_price,

    r."roomName",

    h.name AS hotel_name,

    CASE
      WHEN CURRENT_DATE < b."checkIn"
        THEN 'Upcoming'

      WHEN CURRENT_DATE >= b."checkIn"
       AND CURRENT_DATE < b."checkOut"
        THEN 'Active'

      ELSE 'Completed'
    END AS status


  FROM "Bookings" b

  JOIN "Rooms" r
    ON b.room_id = r.id

  JOIN "Hotels" h
    ON r.hotel_id = h.id

  WHERE b.user_id = ${userId}

  ORDER BY b."checkIn" DESC
  `;

  res.json(bookings);
});

app.get("/Favorites/check", async (req, res) => {
  const { user_id, hotel_id } = req.query;

  const favorite = await sql`
    SELECT *
    FROM "Favorites"
    WHERE user_id = ${user_id}
    AND hotel_id = ${hotel_id}
  `;

  res.json({
    isFavorite: favorite.length > 0,
  });
});

app.get("/Favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  const favorites = await sql`

      SELECT
          f.id,
          h.id AS hotel_id,
          h.name,
          h.city,
          h.image

      FROM "Favorites" f

      JOIN "Hotels" h
      ON f.hotel_id = h.id

      WHERE f.user_id = ${userId}

  `;
  res.json(favorites);
});

app.get("/HotelsNumber", async (request, response) => {
  try {
    const hotels = await sql`SELECT * FROM "Hotels"`;
    response.send(hotels.length.toString());
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.get("/UsersNumber", async (request, response) => {
  try {
    const users = await sql`SELECT * FROM "Users"`;
    response.send(users.length.toString());
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.get("/BookingsNumber", async (request, response) => {
  try {
    const bookings = await sql`SELECT *
    FROM "Bookings"
    WHERE "checkIn" >= CURRENT_DATE
    ORDER BY "checkIn" DESC;`;
    response.send(bookings.length.toString());
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.get("/HotelsAndRooms", async (req, res) => {
  try {
    const hotels = await sql`
      SELECT * FROM "Hotels"
    `;

    const rooms = await sql`
      SELECT * FROM "Rooms"
    `;

    const result = hotels.map((hotel) => ({
      ...hotel,
      rooms: rooms.filter((room) => room.hotel_id === hotel.id),
    }));

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/Bookings", async (req, res) => {
  const bookings = await sql`
  SELECT
  b.id,
  TO_CHAR(b."checkIn", 'YYYY-MM-DD') AS "checkIn",
  TO_CHAR(b."checkOut", 'YYYY-MM-DD') AS "checkOut",
  b.total_price,
  b.status AS booking_status,

  r."roomName",

  h.name AS hotel_name,
  h.city,

  u.name AS user_name,

  CASE
      WHEN CURRENT_DATE < b."checkIn"
        THEN 'Upcoming'

      WHEN CURRENT_DATE >= b."checkIn"
       AND CURRENT_DATE < b."checkOut"
        THEN 'Active'

      ELSE 'Completed'
    END AS time_status

    FROM "Bookings" b

    JOIN "Rooms" r
      ON b.room_id = r.id

    JOIN "Hotels" h
      ON r.hotel_id = h.id

    JOIN "Users" u
      ON b.user_id = u.id

    ORDER BY b."checkIn" DESC
  `;
  res.json(bookings);
});

app.post("/Users", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await sql`
            INSERT INTO "Users"
            (name,email,password,role)
            VALUES
            (${fullName},${email},${password},true)
            RETURNING *
        `;

    res.json(user[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/Bookings", async (req, res) => {
  try {
    const { user_id, roomId, arrival, departure, finalPrice, status } =
      req.body;
    const booking = await sql`
              INSERT INTO "Bookings"
              (user_id,room_id,"checkIn","checkOut",total_price,status)
              VALUES
              (${user_id},${roomId},${arrival},${departure},${finalPrice},${status})
              RETURNING *
          `;

    res.json(booking[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/Reviews", async (req, res) => {
  const { hotel_id, user_id, comment, rating } = req.body;

  const review = await sql`
      INSERT INTO "Reviews"
      (hotel_id,user_id,comment,rating)
      VALUES
      (${hotel_id},${user_id},${comment},${rating})
      RETURNING *
  `;

  res.json(review[0]);
});

app.post("/Favorites", async (req, res) => {
  try {
    const { user_id, hotel_id } = req.body;

    const favorite = await sql`
      INSERT INTO "Favorites"
      (user_id, hotel_id)
      VALUES
      (${user_id}, ${hotel_id})
      RETURNING *
    `;

    res.json(favorite[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/Hotels", upload.single("image"), async (req, res) => {
  try {
    const { name, city, address, stars, price } = req.body;

    const image = `/hotel_photos/${req.file.filename}`;

    const hotel = await sql`
        INSERT INTO "Hotels"
        (name, city, address, stars, image, price)
        VALUES
        (${name}, ${city}, ${address}, ${stars}, ${image}, ${price})
        RETURNING *
    `;

    res.json(hotel[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/Hotel_Amenities", async (req, res) => {
  try {
    const {
      Parking,
      SwimmingPool,
      DisabledFacilities,
      Jacuzzi,
      FitnessEquipment,
      ArrivalTransfer,
      DepartureTransfer,
      Massage,
      Elevator,
      FireAlarmSystem,
      RoomService,
      HousekeepingServices,
      Laundry,
      PorterService,
      Breakfast,
      WesternToiletsOnFloors,
      WesternToiletsInLobby,
      Minibar,
      ATM,
      IranianToiletsOnFloors,
      IranianToiletsInLobby,
      Air,
      TelephoneInLobby,
      VideoNetwork,
      reception24,
      CoffeeShop,
      InternetInLobby,
      GreenSpace,
      InternetCafe,
      TelevisionInLobby,
      Prayer,
      EmergencyStairs,
    } = req.body;

    const hotel = await sql`
            INSERT INTO "Hotel_Amenities"
            ("Parking","SwimmingPool", "DisabledFacilities","Jacuzzi","FitnessEquipment",
              "ArrivalTransfer",
              "DepartureTransfer","Massage","Elevator","FireAlarmSystem","RoomService",
              "HousekeepingServices","Laundry","PorterService","Breakfast","WesternToiletsOnFloors",
              "WesternToiletsInLobby","Minibar","ATM","IranianToiletsOnFloors","IranianToiletsInLobby",
              "Air","TelephoneInLobby","VideoNetwork",reception24,"CoffeeShop","InternetInLobby",
              "GreenSpace","InternetCafe","TelevisionInLobby","Prayer","EmergencyStairs")
            VALUES
            (${Parking},${SwimmingPool},${DisabledFacilities},${Jacuzzi},${FitnessEquipment},${ArrivalTransfer},
             ${DepartureTransfer},${Massage},${Elevator},${FireAlarmSystem},${RoomService},
             ${HousekeepingServices},${Laundry},${PorterService},${Breakfast},${WesternToiletsOnFloors}
             ,${WesternToiletsInLobby},${Minibar},${ATM},${IranianToiletsOnFloors},${IranianToiletsInLobby},
             ${Air},${TelephoneInLobby},${VideoNetwork},${reception24},${CoffeeShop},
             ${InternetInLobby},${GreenSpace},${InternetCafe},${TelevisionInLobby},${Prayer},
             ${EmergencyStairs})
            RETURNING *
        `;

    res.json(hotel[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/Hotel_Description", async (req, res) => {
  try {
    const {
      arrival_time,
      departure_time,
      rooms,
      floors,
      Lobby_capacity,
      Traffic_conditions,
      hotel_view,
      more_description,
      manufacture_date,
    } = req.body;

    const hotel = await sql`
            INSERT INTO "Hotel_Description"
            (arrival_time,
              departure_time,
              rooms,
              floors,
              "Lobby_capacity",
              "Traffic_conditions",
              hotel_view,
              more_description,
              manufacture_date)
            VALUES
            (${arrival_time},${departure_time},${rooms},${floors},${Lobby_capacity},${Traffic_conditions}
              ,${hotel_view},${more_description},${manufacture_date})
            RETURNING *
        `;

    res.json(hotel[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/Rooms", async (req, res) => {
  try {
    const { hotel_id, roomName, RoomType, capacity, price, image } = req.body;
    const hotel = await sql`
            INSERT INTO "Rooms"
            (hotel_id,
            "roomName",
           "roomType",
            capacity,
            price,
            image)
            VALUES
            (${hotel_id},${roomName},${RoomType},${capacity},${price},${image})
            RETURNING *
        `;

    res.json(hotel[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/Rooms_Amenities", async (req, res) => {
  try {
    const {
      HeatingCoolingSystem,
      Refrigerator,
      Slippers,
      WesternToilet,
      internet,
      CookingFacilities,
      safe,
      TV,
      ElectronicFacilities,
      Furniture,
      drawers,
      WritingDesk,
      air,
      Wardrobe,
      ClothesRack,
      PowerKeyCardSwitch,
      WakeUpService,
      fire,
      Alarm,
      TableLamp,
      telephone,
      Toiletries,
      Bathroom,
      TeaMaker,
      IranianToilet,
      ComplimentaryWater,
      IPTV,
    } = req.body;

    const hotel = await sql`
            INSERT INTO "Rooms_Amenities"
            ("HeatingCoolingSystem",
              "Refrigerator",
              "Slippers",
              "WesternToilet",
              internet,
              "CookingFacilities",
              safe,
              "TV",
              "ElectronicFacilities",
              "Furniture",
              drawers,
              "WritingDesk",
              air,
              "Wardrobe",
              "ClothesRack",
              "PowerKeyCardSwitch",
              "WakeUpService",
              fire,
              "Alarm",
              "TableLamp",
              telephone,
              "Toiletries",
              "Bathroom",
              "TeaMaker",
              "IranianToilet",
              "ComplimentaryWater",
              "IPTV")
            VALUES
            (${HeatingCoolingSystem},${Refrigerator},${Slippers},${WesternToilet},${internet},${CookingFacilities},
             ${safe},${TV},${ElectronicFacilities},${Furniture},${drawers},
             ${WritingDesk},${air},${Wardrobe},${ClothesRack},${PowerKeyCardSwitch}
             ,${WakeUpService},${fire},${Alarm},${TableLamp},${telephone},
             ${Toiletries},${Bathroom},${TeaMaker},${IranianToilet},${ComplimentaryWater},
             ${IPTV})
            RETURNING *
        `;

    res.json(hotel[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});


app.put("/Users/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const { name, phone } = request.body;

    const user = await sql`
            UPDATE "Users"
            SET 
            name=${name},
            phone=${phone}
            WHERE id=${id}
            RETURNING *
        `;

    response.json(user[0]);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: "Server error",
    });
  }
});

app.put("/Hotels/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;

    const { name, city, address, stars, price } = req.body;

    let hotel;

    if (req.file) {
      const image = `/hotel_photos/${req.file.filename}`;

      hotel = await sql`
        UPDATE "Hotels"
        SET
        name=${name},
        city=${city},
        address=${address},
        stars=${stars},
        price=${price},
        image=${image}
        WHERE id=${id}
        RETURNING *
    `;
    } else {
      hotel = await sql`
        UPDATE "Hotels"
        SET
        name=${name},
        city=${city},
        address=${address},
        stars=${stars},
        price=${price}
        WHERE id=${id}
        RETURNING *
    `;
    }

    res.json(hotel[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
});

app.put("/Hotel_Amenities/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const {
      Parking,
      SwimmingPool,
      DisabledFacilities,
      Jacuzzi,
      FitnessEquipment,
      ArrivalTransfer,
      DepartureTransfer,
      Massage,
      Elevator,
      FireAlarmSystem,
      RoomService,
      HousekeepingServices,
      Laundry,
      PorterService,
      Breakfast,
      WesternToiletsOnFloors,
      WesternToiletsInLobby,
      Minibar,
      ATM,
      IranianToiletsOnFloors,
      IranianToiletsInLobby,
      Air,
      TelephoneInLobby,
      VideoNetwork,
      reception24,
      CoffeeShop,
      InternetInLobby,
      GreenSpace,
      InternetCafe,
      TelevisionInLobby,
      Prayer,
      EmergencyStairs,
    } = request.body;

    const hotel = await sql`
            UPDATE "Hotel_Amenities"
            SET 
            "Parking"=${Parking},
            "SwimmingPool"=${SwimmingPool},
            "DisabledFacilities"=${DisabledFacilities},
            "Jacuzzi"=${Jacuzzi},
            "FitnessEquipment"=${FitnessEquipment},
            "ArrivalTransfer"=${ArrivalTransfer},
            "DepartureTransfer"=${DepartureTransfer},
            "Massage"=${Massage},
            "Elevator"=${Elevator},
            "FireAlarmSystem"=${FireAlarmSystem},
            "RoomService"=${RoomService},
            "HousekeepingServices"=${HousekeepingServices},
            "Laundry"=${Laundry},
            "PorterService"=${PorterService},
            "Breakfast"=${Breakfast},
            "WesternToiletsOnFloors"=${WesternToiletsOnFloors},
            "WesternToiletsInLobby"=${WesternToiletsInLobby},
            "Minibar"=${Minibar},
            "ATM"=${ATM},
            "IranianToiletsOnFloors"=${IranianToiletsOnFloors},
            "IranianToiletsInLobby"=${IranianToiletsInLobby},
            "Air"=${Air},
            "TelephoneInLobby"=${TelephoneInLobby},
            "VideoNetwork"=${VideoNetwork},
            "reception24"=${reception24},
            "CoffeeShop"=${CoffeeShop},
            "InternetInLobby"=${InternetInLobby},
            "GreenSpace"=${GreenSpace},
            "InternetCafe"=${InternetCafe},
            "TelevisionInLobby"=${TelevisionInLobby},
            "Prayer"=${Prayer},
            "EmergencyStairs"=${EmergencyStairs}
            WHERE id=${id}
            RETURNING *;
        `;

    response.json(hotel[0]);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: "Server error",
    });
  }
});

app.put("/Hotel_Description/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const {
      arrival_time,
      departure_time,
      rooms,
      floors,
      Lobby_capacity,
      Traffic_conditions,
      hotel_view,
      more_description,
      manufacture_date,
    } = request.body;

    const hotel = await sql`
            UPDATE "Hotel_Description"
            SET 
            arrival_time=${arrival_time},
            departure_time=${departure_time},
            rooms=${rooms},
            floors=${floors},
            "Lobby_capacity"=${Lobby_capacity},
            "Traffic_conditions"=${Traffic_conditions},
            hotel_view=${hotel_view},
            more_description=${more_description},
            manufacture_date=${manufacture_date}
            WHERE id=${id}
            RETURNING *;
        `;

    response.json(hotel[0]);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: "Server error",
    });
  }
});

app.put("/Rooms/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const { hotel_id, roomName, RoomType, capacity, price, image } =
      request.body;

    const user = await sql`
            UPDATE "Rooms"
            SET 
            hotel_id=${hotel_id},
            "roomName"=${roomName},
            "roomType"=${RoomType},
            capacity=${capacity},
            price=${price},
            image=${image}
            WHERE id=${id}
            RETURNING *
        `;

    response.json(user[0]);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: "Server error",
    });
  }
});

app.put("/Bookings/:id/confirm", async (req, res) => {
  const id = req.params.id;

  await sql`
    UPDATE "Bookings"
    SET status = 'Confirmed'
    WHERE id = ${id}
  `;

  res.json({
    message: "Booking confirmed",
  });
});

app.put("/Bookings/:id/cancel", async (req, res) => {
  const id = req.params.id;

  await sql`
    UPDATE "Bookings"
    SET status = 'Cancelled'
    WHERE id = ${id}
  `;

  res.json({
    message: "Booking cancelled",
  });
});

app.put("/Rooms_Amenities/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const {
      HeatingCoolingSystem,
      Refrigerator,
      Slippers,
      WesternToilet,
      internet,
      CookingFacilities,
      safe,
      TV,
      ElectronicFacilities,
      Furniture,
      drawers,
      WritingDesk,
      air,
      Wardrobe,
      ClothesRack,
      PowerKeyCardSwitch,
      WakeUpService,
      fire,
      Alarm,
      TableLamp,
      telephone,
      Toiletries,
      Bathroom,
      TeaMaker,
      IranianToilet,
      ComplimentaryWater,
      IPTV,
    } = request.body;

    const hotel = await sql`
            UPDATE "Rooms_Amenities"
            SET 
            "HeatingCoolingSystem"=${HeatingCoolingSystem},
              "Refrigerator"=${Refrigerator},
              "Slippers"=${Slippers},
              "WesternToilet"=${WesternToilet},
              internet=${internet},
              "CookingFacilities"=${CookingFacilities},
              safe=${safe},
              "TV"=${TV},
              "ElectronicFacilities"=${ElectronicFacilities},
              "Furniture"=${Furniture},
              drawers=${drawers},
              "WritingDesk"=${WritingDesk},
              air=${air},
              "Wardrobe"=${Wardrobe},
              "ClothesRack"=${ClothesRack},
              "PowerKeyCardSwitch"=${PowerKeyCardSwitch},
              "WakeUpService"=${WakeUpService},
              fire=${fire},
              "Alarm"=${Alarm},
              "TableLamp"=${TableLamp},
              telephone=${telephone},
              "Toiletries"=${Toiletries},
              "Bathroom"=${Bathroom},
              "TeaMaker"=${TeaMaker},
              "IranianToilet"=${IranianToilet},
              "ComplimentaryWater"=${ComplimentaryWater},
              "IPTV"=${IPTV}
            WHERE id=${id}
            RETURNING *;
        `;

    response.json(hotel[0]);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: "Server error",
    });
  }
});

app.delete("/Users/:id", async (request, response) => {
  try {
    const id = request.params.id;

    await sql`
            DELETE FROM "Users"
            WHERE id=${id}
        `;

    response.json({
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({
      error: "Server error",
    });
  }
});

app.delete("/Bookings/:id", async (request, response) => {
  try {
    const id = request.params.id;

    await sql`
            DELETE FROM "Bookings"
            WHERE id=${id}
        `;

    response.json({
      message: "Booking deleted",
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({
      error: "Server error",
    });
  }
});

app.delete("/Favorites/:user_id/:hotel_id", async (req, res) => {
  const { user_id, hotel_id } = req.params;

  const result = await sql`
      DELETE FROM "Favorites"
      WHERE user_id = ${user_id}
      AND hotel_id = ${hotel_id}
      RETURNING *
  `;

  res.json({
    success: true,
    deleted: result,
  });
});

app.delete("/Hotels/:id", async (request, response) => {
  try {
    const id = request.params.id;

    await sql`
            DELETE FROM "Hotels"
            WHERE id=${id}
        `;

    response.json({
      message: "Hotel deleted",
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({
      error: "Server error",
    });
  }
});

app.delete("/Hotel_Description/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await sql`DELETE FROM "Hotel_Description" WHERE id= ${id};`;

    response.json({
      message: "Hotel_Description deleted",
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.delete("/Hotel_Amenities/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await sql`DELETE FROM "Hotel_Amenities" WHERE id= ${id};`;
    response.json({
      message: "Hotel_Amenities deleted",
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.delete("/Rooms/:id", async (request, response) => {
  try {
    const id = request.params.id;

    await sql`
            DELETE FROM "Rooms"
            WHERE id=${id}
        `;

    response.json({
      message: "Room deleted",
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({
      error: "Server error",
    });
  }
});

app.delete("/Reviews/:id", async (request, response) => {
  try {
    const id = request.params.id;

    await sql`
            DELETE FROM "Reviews"
            WHERE id=${id}
        `;

    response.json({
      message: "Review deleted",
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({
      error: "Server error",
    });
  }
});

app.delete("/Rooms_Amenities/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await sql`DELETE FROM "Rooms_Amenities" WHERE id= ${id};`;
    response.json({
      message: "Room_Amenities deleted",
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

app.listen(port, () =>
  console.log(` My App listening at http://localhost:${port}`)
);

//بخش گرفتن فایل عکس و ذخیره در دیتابیس با هوش مصنوعی نوشته شده است.