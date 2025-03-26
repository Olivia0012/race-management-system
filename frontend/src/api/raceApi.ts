import { IRace } from '../type/Type';

const fetchRaces = async () => {
  const url = '/api/races';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};

const createNewRace = async (newRace: IRace) => {
  const url = '/api/race';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(newRace),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return true;
  } catch (error: any) {
    console.error(error.message);
  }
};

const updatePlacements = async (race: IRace) => {
  const url = '/api/race/' + race.id;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(race),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return true;
  } catch (error: any) {
    console.error(error.message);
  }
};

export { fetchRaces, createNewRace, updatePlacements };
