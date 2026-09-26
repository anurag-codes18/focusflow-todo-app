import {
  useEffect,
  useRef
} from "react";

import "./calendar.css";


export function Calendar({
  tasks = [],
  selectedDate,
  setSelectedDate
}) {

  const today = new Date();

  const scrollRef = useRef(null);


  // ==============================
  // CREATE DATES
  // 30 past + today + 30 future
  // ==============================

  const dates = [];

  for (let i = -30; i <= 30; i++) {

    const date = new Date(today);

    date.setDate(today.getDate() + i);

    dates.push(date);

  }


  // ==============================
  // FORMAT DATE
  // ==============================

  const formatDate = (date) => {

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  // ==============================
  // CHECK TODAY
  // ==============================

  const isToday = (date) => {

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );

  };


  // ==============================
  // CHECK SELECTED DATE
  // ==============================

  const isSelected = (date) => {

    if (!selectedDate) {
      return false;
    }

    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );

  };


  // ==============================
  // SELECTED DATE TASKS
  // ==============================

  const selectedDateString =
    selectedDate
      ? formatDate(selectedDate)
      : null;


  const selectedTasks = selectedDate
    ? tasks.filter(
        (task) =>
          task.dueDate === selectedDateString
      )
    : [];


  // ==============================
  // INITIAL SCROLL POSITION
  // ==============================

  useEffect(() => {

    if (!scrollRef.current) {
      return;
    }

    const container =
      scrollRef.current;

    const cards =
      container.querySelectorAll(
        ".date-card"
      );

    // 30 = today
    // Start from 3 days before today

    const startingCard =
      cards[27];

    if (startingCard) {

      container.scrollLeft =
        startingCard.offsetLeft -
        container.offsetLeft;

    }

  }, []);


  // ==============================
  // SCROLL LEFT
  // ==============================

  const scrollLeft = () => {

    scrollRef.current?.scrollBy({
      left: -400,
      behavior: "smooth"
    });

  };


  // ==============================
  // SCROLL RIGHT
  // ==============================

  const scrollRight = () => {

    scrollRef.current?.scrollBy({
      left: 400,
      behavior: "smooth"
    });

  };


  // ==============================
  // SELECT DATE
  // ==============================

  const handleDateClick = (date) => {



    if (typeof setSelectedDate !== "function") {
      return;
    }

    setSelectedDate(
      new Date(date)
    );

  };


  // ==============================
  // JSX
  // ==============================

  return (

    <section className="calendar-strip">


      {/* HEADER */}

      <div className="calendar-strip-header">

        <div>

          <p className="calendar-label">
            CALENDAR
          </p>

          <h2>

            {selectedDate
              ? selectedDate.toLocaleDateString(
                  undefined,
                  {
                    month: "long",
                    year: "numeric"
                  }
                )
              : "Select a date"}

          </h2>

        </div>


        <div className="calendar-navigation">

          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous dates"
          >
            ←
          </button>


          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next dates"
          >
            →
          </button>

        </div>

      </div>


      {/* DATE SCROLLER */}

      <div
        className="date-scroll"
        ref={scrollRef}
      >

        {dates.map((date) => {

          const dateString =
            formatDate(date);


          const dayTasks =
            tasks.filter(
              (task) =>
                task.dueDate === dateString
            );


          return (

            <button
              type="button"
              key={dateString}

              className={`
                date-card
                ${isToday(date) ? "today" : ""}
                ${isSelected(date) ? "selected" : ""}
              `}

              onClick={() =>
                handleDateClick(date)
              }
            >

              <span className="day-name">

                {date.toLocaleDateString(
                  undefined,
                  {
                    weekday: "short"
                  }
                )}

              </span>


              <strong className="date-number">

                {date.getDate()}

              </strong>


              {dayTasks.length > 0 && (

                <span className="date-task-count">

                  {dayTasks.length}

                </span>

              )}

            </button>

          );

        })}

      </div>


      {/* SELECTED DATE INFO */}

      <div className="selected-date-info">

        <span>

          {selectedDate && isToday(selectedDate)
            ? "Today"
            : selectedDate
              ? selectedDate.toLocaleDateString(
                  undefined,
                  {
                    weekday: "long",
                    month: "short",
                    day: "numeric"
                  }
                )
              : "No date selected"}

        </span>


        <small>

          {selectedTasks.length}

          {selectedTasks.length === 1
            ? " task"
            : " tasks"}

        </small>

      </div>


    </section>

  );

}