import React from 'react';
import { IRace } from '../type/Type';

const AllRaces = ({
  races,
  isRecored,
  setSelectedRace,
}: {
  races: IRace[];
  isRecored: boolean;
  setSelectedRace: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const recordResult = (index: number) => {
    setSelectedRace(index);
  };

  return (
    <div className="races">
      <h3>All races</h3>
      <table>
        <thead>
          <tr>
            <th>Race Name</th>
            <th>Participants</th>
            <th>Lanes</th>
            <th>Final Places</th>
            <th>Record</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race, index) => (
            <tr key={race.id}>
              <td>{race.name}</td>
              <td>
                {race.participants.map((par) => (
                  <span key={par.name}>
                    {par.name}
                    <br />
                  </span>
                ))}
              </td>
              <td>
                {race.participants.map((par) => (
                  <span key={par.name}>
                    {par.lane}
                    <br />
                  </span>
                ))}
              </td>
              <td>
                {race.participants.map((par) => (
                  <span key={par.name}>
                    {par.rank}
                    <br />
                  </span>
                ))}
              </td>
              <td>
                <button
                  className="record-result-btn"
                  data-testid={`record-result-btn`}
                  onClick={() => recordResult(index)}
                >
                  Record
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRaces;
