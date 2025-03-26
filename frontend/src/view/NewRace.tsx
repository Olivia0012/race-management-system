import React, { ChangeEvent, useState } from 'react';
import { IParticipant, IRace } from '../type/Type';
import { getUniqueId } from '../utils/helper';
import { createNewRace } from '../api/raceApi';

const NewRace = ({
  races,
  setRaces,
}: {
  races: IRace[];
  setRaces: React.Dispatch<React.SetStateAction<IRace[]>>;
}) => {
  const [student, setStudent] = useState('');
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [newRace, setNewRace] = useState<IRace>({
    id: getUniqueId(),
    name: '',
    participants: [],
  });
  const [isValid, setIsValid] = useState(false);

  const addParticipant = () => {
    if (participants.find((participant) => participant.name === student)) {
      alert('This student has already been added!');
      return;
    }

    const newParticipant = { name: student, lane: '', rank: '' };
    const updatedParticipants = [...participants, newParticipant];

    setParticipants(updatedParticipants);
    setNewRace({
      ...newRace,
      participants: updatedParticipants,
    });
    setStudent('');
  };

  const assignLane = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const lane = e.target.value;

    if (
      participants.find(
        (participant: IParticipant) => participant.lane === lane
      )
    ) {
      alert('This lane has been taken!');
      return;
    }

    const assignedParticipant = {
      ...participants[index],
      lane,
    };

    participants[index] = assignedParticipant;
    setParticipants([...participants]);
  };

  const confirmLanes = () => {
    if (
      participants.find(
        (participant: IParticipant) =>
          Number(participant.lane) > participants.length ||
          Number(participant.lane) < 1
      )
    ) {
      alert('Input invalid lane!');
      return;
    }
    const addRace = {
      ...newRace,
      participants: [...participants],
    };
    setIsValid(true);
    setNewRace(addRace);
  };

  const addRace = async () => {
    const addedRace = { ...newRace, id: getUniqueId() } as IRace;
    if (participants.length > 1) {
      setRaces([...races, addedRace]);
      setNewRace({ id: '', name: '', participants: [] });
      setParticipants([]);
      setStudent('');
      setIsValid(false);
      await createNewRace(addedRace);
    } else {
      alert('At Least 2 Participants to start a new race!');
    }
  };

  return (
    <div className="new-race">
      <h3>Add New Race</h3>
      <div className="name-participant">
        <div className="race-name">
          <label htmlFor="usernameInput">Race Name:</label>
          <input
            placeholder="Race Name"
            data-testid="race-name-input"
            value={newRace.name}
            onChange={(e) => setNewRace({ ...newRace, name: e.target.value })}
          />
        </div>
        <div className="participants">
          <label htmlFor="participantsInput">Participants:</label>
          <input
            data-testid="add-participant-input"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
          <button onClick={addParticipant} data-testid="add-participant-btn">
            Add
          </button>
        </div>
      </div>
      {participants.length > 0 && (
        <div className="participants-container">
          <p>Please fill in the lane for each participant: </p>
          <div className="participants-box">
            {participants?.map((participant, index) => (
              <div key={participant.name + index}>
                <label className="paricipant-label">{participant.name}</label>
                <input
                  className="paricipant-input"
                  data-testid={`add-lane-input-${participant.name}`}
                  value={participant.lane}
                  onChange={assignLane(index)}
                />
              </div>
            ))}
          </div>
          {!isValid && (
            <button
              onClick={confirmLanes}
              className="assign-lane"
              data-testid="confirm-lanes-btn"
            >
              Confirm Lane
            </button>
          )}
        </div>
      )}
      {isValid && <button onClick={addRace}>Create New Race</button>}
    </div>
  );
};

export default NewRace;
