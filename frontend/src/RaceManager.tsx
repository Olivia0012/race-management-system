import React, { useEffect, useState } from 'react';
import './RaceManager.css';
import AllRaces from './view/AllRaces';
import { IRace } from './type/Type';
import NewRace from './view/NewRace';
import FinalPlacements from './view/FinalPlacements';
import { fetchRaces } from './api/raceApi';

const RaceManager = () => {
  const [races, setRaces] = useState<IRace[]>([]);
  const [selectedRace, setSelectedRace] = useState<number | undefined>();
  const [isRecored, setIsRecorded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const fetchedRaces = await fetchRaces();
      setRaces(fetchedRaces);
    })();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Race Management System</h1>
      <NewRace races={races} setRaces={setRaces} />

      {selectedRace !== undefined && (
        <FinalPlacements
          selectedRace={selectedRace}
          setSelectedRace={setSelectedRace}
          races={races}
          setIsRecorded={setIsRecorded}
          setRaces={setRaces}
        />
      )}
      <AllRaces
        races={races}
        isRecored={isRecored}
        setSelectedRace={setSelectedRace}
      />
    </div>
  );
};

export default RaceManager;
