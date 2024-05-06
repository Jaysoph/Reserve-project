import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import { Box, Button, SelectChangeEvent, Typography } from "@mui/material";
import Selectcustom from "./components/Selectcustom";
import { useLocation } from "react-router-dom";
import Timetable from "react-timetable-events";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Events } from "react-timetable-events/dist/types";
import ModalCustom from "./components/ModalCustom";
import { saveBooking } from "./api/booking";
import { ISaveBookingData } from "./interface/booking";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getRoombyNumber } from "./api/roombynumber";
import { getTimeTablebyRoomId } from "./api/roomId";
import { IgetRoombyNumber, IRoomDetailData } from "./interface/detail";

const times = [
  {
    value: "08:00",
    label: "08.00 - 10.00",
  },
  {
    value: "10:30",
    label: "10.30 - 12.30",
  },
  {
    value: "13:00",
    label: "13.00 - 15.00",
  },
  {
    value: "15:30",
    label: "15.30 - 17.00",
  },
];

function Booking() {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [roombynumber, setRoombynumber] = useState<IRoomDetailData>();
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [timeData, setTimeData] = useState<IgetRoombyNumber[]>([]);
  const [open, setOpen] = useState(false);
  const [weeked, setWeeked] = useState<Dayjs[]>([]);
  const [stdNumber, setStdNumber] = useState<string>("");

  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const id = search.get("id");
  const Myswal = withReactContent(Swal);

  const getRole = localStorage.getItem("role");
  const isAdmin = getRole === "ADMIN";

  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("week")
  );

  function disableWeekends(date: Dayjs) {
    return date.day() === 0 || date.day() === 6;
  }

  const onSaveBooking = () => {
    // prepare header data
    if (roombynumber && selectedTime && stdNumber) {
      const data: ISaveBookingData = {
        startTime: dayjs(selectedTime).format("HH:mm").toString(),
        endTime: dayjs(selectedTime).add(2, "hour").format("HH:mm").toString(),
        roomNumber: roombynumber?.roomNumber,
        studentNumber: stdNumber,
        date: dayjs(date).format("DD-MM-YYYY").toString(),
      };
      // POST with data
      saveBooking(data)
        .then((resp) => {
          Myswal.fire({
            html: `<i>${resp.msg}</i>`,
            icon: "success",
          });
          fetchTimeTable();
        })
        .catch((err) => {
          Myswal.fire({
            html: `<i>${err.response.data.message}</i>`,
            icon: "error",
          });
        });
    } else {
      Myswal.fire({
        html: `<i>กรุณาตรวจสอบข้อมูลให้ครบถ้วน</i>`,
        icon: "error",
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStdNumber(event.target.value);
  };

  const handleChangeTime = (event: SelectChangeEvent) => {
    setSelectedTime(
      dayjs(`${date?.format("YYYY-MM-DD")} ${event.target.value}`)
        .format()
        .toString()
    );
  };

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    getRoombyNumber(Number(id))
      .then((response) => setRoombynumber(response))
      .catch((error) => console.error(error));
    //always check if id changed
  }, [id]);

  const fetchTimeTable = useCallback(() => {
    getTimeTablebyRoomId(Number(id))
      .then((response) => setTimeData(response))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    fetchTimeTable();
    //always check if id changed
  }, [fetchTimeTable]);

  const generateDateArray = (startDate: Dayjs) => {
    const endDate = startDate.endOf("week");

    const datesArray = [];
    let currentDate = startDate;

    while (
      // check if before or same
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, "day")
    ) {
      datesArray.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    setWeeked(datesArray);
  };

  useEffect(() => {
    generateDateArray(currentWeekStart);
  }, [currentWeekStart]);

  const goToPreviousWeek = () => {
    setCurrentWeekStart(currentWeekStart.subtract(1, "week"));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(currentWeekStart.add(1, "week"));
  };

  const events = useMemo(() => {
    const tempEvent: Events = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    };

    // prepare data format to lib
    if (timeData) {
      timeData.forEach((_data) => {
        const reFormatDate = dayjs(_data.date, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );
        console.log("reFormatDate", reFormatDate);
        const reFormatTime = dayjs(_data.startTime, "HH:mm").format("HH:mm");
        console.log("reFormatTime", reFormatTime);

        const dateTime = dayjs(`${reFormatDate} ${reFormatTime}`);
        console.log("dateTime", dateTime);

        // check if after sunday of before saturday
        if (dateTime.isAfter(weeked[0]) && dateTime.isBefore(weeked[6])) {
          const dayOfWeek = dateTime.toDate().getDay();

          const dayArray = [

            //0
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            //6
            "saturday",
          ];

          const dayKey = dayArray[dayOfWeek];

          // convert to type Events (from Lib)
          tempEvent[dayKey]?.push({
            id: _data.rooms.roomNumber,
            name: _data.students.name,
            type: "custom",
            startTime: dayjs(_data.startTime, "HH:mm").toDate(),
            endTime: dayjs(_data.endTime, "HH:mm").toDate(),
          });
        }
      });
    }

    // return data
    return tempEvent;
    // fetch if timeData and weeked changed
  }, [timeData, weeked]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
          }}
        >
          <h1>อาคาร 24 </h1>
          <div
            style={{
              width: "100%",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
          >
            <div
              style={{
                padding: "10px",
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
                width: "100%",
              }}
            >
              {isAdmin && (
                <div
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: "10px",
                    display: "flex",
                  }}
                >
                  <Input
                    className="input-box"
                    label={"รหัสนักศึกษา : "}
                    type={"text"}
                    name={"username"}
                    value={stdNumber}
                    onChange={handleChange}
                    bgInputColor="#ffffff"
                  />
                </div>
              )}

              {isAdmin && (
                <DatePicker
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  format="DD MMM YYYY"
                  disablePast
                  shouldDisableDate={disableWeekends}
                />
              )}

              {isAdmin && (
                <Selectcustom
                  label={"กรุณาเลือกเวลา"}
                  value={dayjs(selectedTime).format("HH:mm").toString()}
                  onChange={handleChangeTime}
                  data={times}
                  bgColor="#ffffff"
                />
              )}

              <div className="timetable">
                <h1 className="10">
                  ห้องที่ {`${roombynumber?.roomNumber}`}{" "}
                  {`( จำนวนที่นั่ง : ${roombynumber?.capacity} )`}
                </h1>
                <div
                  className="10"
                  style={{
                    display: "flex",
                    marginTop: 10,
                    marginBottom: 10,
                    columnGap: 10,
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={goToPreviousWeek}
                    variant="contained"
                    size="small"
                    color="warning"
                  >
                    Previous Week
                  </Button>
                  <span style={{ fontSize: "20px" }}>
                    {`${dayjs(weeked[1]).format("DD MMMM YYYY")} - ${dayjs(
                      weeked[5]
                    ).format("DD MMMM YYYY")}`}
                  </span>
                  <Button
                    onClick={goToNextWeek}
                    variant="contained"
                    size="small"
                    color="success"
                  >
                    Next Week
                  </Button>
                </div>

                {events && timeData.length > 0 ? (
                  <Timetable
                    events={events}
                    style={{ height: "500px", width: "100%" }}
                    hoursInterval={{ from: 7, to: 18 }}
                    renderDayHeader={({ day, ...defaultAttributes }) => {
                      // get day to display
                      const getDay = weeked
                        .find(
                          (_val) => _val.format("dddd").toLowerCase() === day
                        )
                        ?.format("DD MMM YY");

                      return (
                        <div
                          style={{
                            height: "50px !important",
                            backgroundColor:
                              // check if current day is green
                              getDay === dayjs().format("DD MMM YY")
                                ? "green"
                                : defaultAttributes.style?.backgroundColor,
                            minHeight: 35,
                            fontSize: 14,
                          }}
                          {...defaultAttributes}
                        >
                          {`${day} (${getDay})`}
                        </div>
                      );
                    }}
                    renderEvent={({ event, defaultAttributes, classNames }) => {
                      return (
                        <div
                          {...defaultAttributes}
                          title={event.name}
                          key={event.id}
                          style={{
                            ...defaultAttributes.style,
                            backgroundColor: "red",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          <span className={classNames.event_info}>
                            ชื่อผู้จอง : {event.name}
                          </span>
                          <span className={classNames.event_info}>
                            {dayjs(event.startTime).format("HH:mm")} -{" "}
                            {dayjs(event.endTime).format("HH:mm")}
                          </span>
                        </div>
                      );
                    }}
                  />
                ) : (
                  <>No data</>
                )}
              </div>

              {isAdmin && (
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#2e3191",

                    "&:hover": {
                      backgroundColor: "green",
                      boxShadow: "none",
                    },
                  }}
                  onClick={handleOpen}
                >
                  ยืนยัน
                </Button>
              )}
            </div>
          </div>
        </div>
        <ModalCustom
          open={open}
          setOpen={setOpen}
          children={
            <>
              <Box
                sx={{
                  position: "absolute" as const,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                <Typography id="room" variant="h6" component="h2">
                  รหัสนักศึกษา : {stdNumber}
                </Typography>
                <Typography id="room" variant="h6" component="h2">
                  ห้องที่จอง: {roombynumber?.roomNumber}
                </Typography>
                <Typography id="date" variant="h6" component="h2">
                  วันที่: {dayjs(selectedTime).format("DD/MM/YYYY")}
                </Typography>
                <Typography id="time" variant="h6" component="h2">
                  เวลา:
                  {` ${dayjs(selectedTime).format("HH:mm")} - ${dayjs(
                    selectedTime
                  )
                    .add(2, "hours")
                    .format("HH:mm")} น.`}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                    width: "100%",
                    borderTop: "1px solid #a6a6a6",
                    paddingTop: 20,
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#2e3191",
                      "&:hover": {
                        backgroundColor: "green",
                        boxShadow: "none",
                      },
                    }}
                
                    onClick={() => {
                      onSaveBooking();
                      setOpen(false);
                    }}
                  >
                    ยืนยัน
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#ca4c47",
                      "&:hover": {
                        backgroundColor: "green",
                        boxShadow: "none",
                      },
                    }}
                    onClick={() => setOpen(false)}
                  >
                    ยกเลิก
                  </Button>
                </div>
              </Box>
            </>
          }
        />
      </div>
    </LocalizationProvider>
  );
}

export default Booking;
