import React, { useState } from "react";
import { Day, Calendar } from "react-modern-calendar-datepicker";

import { useQuery, useMutation } from "react-query";
import axios from "axios";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

const CalendarMutation: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const mutation: any = useMutation((newTodo) =>
    axios.post("/carRentalEvent", newTodo)
  );

  const handleSubmit = () => {
    for (let index of selectedDays) {
      mutation.mutate({
        day: index.day,
        month: index.month,
        year: index.year,
      });
    }
  };
  console.log(selectedDays);

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          <Calendar
            value={selectedDays}
            onChange={setSelectedDays}
            shouldHighlightWeekends
          />
          {mutation.isError ? <div>An error occurred</div> : null}

          {mutation.isSuccess ? <div>Booked</div> : null}

          <button onClick={handleSubmit}>Book</button>
        </>
      )}
    </div>
  );
};

export default CalendarMutation;
