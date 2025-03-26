import React, { ChangeEvent, useState } from 'react';
import { IParticipant, IRace } from '../type/Type';
import { isValidPlacements } from '../utils/helper';

const FinalPlacements = ({
  selectedRace,
  races,
  setIsRecorded,
  setRaces,
}: {
  selectedRace: number;
  races: IRace[];
  setIsRecorded: React.Dispatch<React.SetStateAction<boolean>>;
  setRaces: React.Dispatch<React.SetStateAction<IRace[]>>;
}) => {
  const [records, setRecords] = useState<IParticipant[]>(
    races[selectedRace].participants
  );

  const addRecord = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const updatedParticipant = {
      ...records[index],
      rank: e.target.value,
    };

    records[index] = updatedParticipant;
    setRecords([...records]);
  };

  const confirmResults = () => {
    const placements = records.map((record) => Number(record.rank));

    const isValid = isValidPlacements(placements);

    if (!isValid) alert('Invalid final places!');
    else {
      setIsRecorded(true);
      const updatedRace = { ...races[selectedRace], participants: records };
      races[selectedRace] = updatedRace;
      setRaces(races);
    }
  };

  return (
    <div className="final-place-container">
      <h3>Final Places</h3>
      <p>
        <strong>Race Name: </strong>
        {races[selectedRace].name}
      </p>
      <div className="final-place-panel">
        <p>Please fill in the final place for each participant:</p>
        {records?.map((record, index) => (
          <div className="final-places" key={record.name + record.lane}>
            <strong>Lane {record.lane} : </strong>
            <p>{record.name}</p>
            <input
              className="paricipant-input"
              value={record.rank}
              onChange={addRecord(index)}
            />
            <input value={record.rank} onChange={addRecord(index)} />
          </div>
        ))}
        <button onClick={confirmResults}>Confirm</button>
      </div>
    </div>
  );
};

export default FinalPlacements;
