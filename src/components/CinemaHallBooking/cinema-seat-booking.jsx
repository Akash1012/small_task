import { useSeatsManager } from "./Hooks/useSeatManager";
import "./styles.css";

function SeatSVG({ color }) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%">
      <rect x="8" y="10" rx="8" ry="8" width="48" height="28" fill={color} />
      <rect x="12" y="38" rx="6" ry="6" width="16" height="14" fill={color} />
      <rect x="36" y="38" rx="6" ry="6" width="16" height="14" fill={color} />
    </svg>
  );
}

function Legend({ color, label }) {
  return (
    <div className="legend-item">
      <div className="legend-box" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}

export default function CinemaSeatBooking(props) {
  const {
    layout = { rows: 8, seatsPerRow: 12, aislePosition: 6 },
    seatTypes,
    bookedSeats = [],
    currency = "₹",
  } = props;

  const {
    seats,
    selectedSeats,
    totalAmount,
    toggleSeat,
    finalBookSeat,
    getSeatState,
    getSeatColor,
    getSeatClassName,
  } = useSeatsManager({ layout, seatTypes, bookedSeats });

  const handlePay = () => {
    const booked = finalBookSeat();
    debugger;
    alert(`Your ${booked.join(", ")} is Booked`);
  };

  return (
    <div className="cinema">
      <h1 className="title">Cinema Hall Booking</h1>

      <div className="screen-wrapper">
        <div className="screen">SCREEN</div>
      </div>

      <div className="seat-map">
        {seats.map((row, rowIndex) => {
          const rowLabel = String.fromCharCode(65 + rowIndex);

          return (
            <div key={rowLabel} className="seat-row">
              <span className="row-label">{rowLabel}</span>

              {row.map((seat) => {
                const seatState = getSeatState(seat.id);
                const colorSeat = getSeatColor(seatState, seat.name);

                return (
                  <div key={seat.id}>
                    {rowIndex === layout.aislePosition && (
                      <div className="aisle" />
                    )}

                    <div
                      className={`tooltip-container ${getSeatClassName(
                        seatState,
                      )}`}
                      onClick={() => toggleSeat(seat)}
                    >
                      <div
                        className="tooltip-text"
                        style={{
                          backgroundColor: colorSeat,
                        }}
                      >
                        {seatState}
                      </div>

                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: colorSeat,
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="legend">
        {Object.values(seatTypes).map((t) => (
          <Legend key={t.name} color={t.color} label={t.name} />
        ))}
        <Legend color="#adb5bd" label="Booked" />
        <Legend color="#28a745" label="Selected" />
      </div>

      <div className="summary">
        <p>
          <strong>Seats:</strong>{" "}
          {selectedSeats.length ? selectedSeats.join(", ") : "-"}
        </p>
        <p>
          <strong>Total:</strong> {currency} {totalAmount}
        </p>
        <button disabled={!selectedSeats.length} onClick={handlePay}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
