import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewRace from './NewRace';
import { IRace } from '../type/Type';

describe('NewRace Component', () => {
  let races: IRace[];
  let setRaces: jest.Mock;

  beforeEach(() => {
    races = [];
    setRaces = jest.fn();
  });

  test('renders the component', () => {
    render(<NewRace races={races} setRaces={setRaces} />);
    expect(screen.getByText(/Add New Race/i)).toBeInTheDocument();
  });

  test('adds a participant', () => {
    render(<NewRace races={races} setRaces={setRaces} />);
    const participantInput = screen.getByTestId('add-participant-input');
    const addButton = screen.getByTestId(/add-participant-btn/i);

    fireEvent.change(participantInput, { target: { value: 'Alice' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('prevents adding duplicate participants', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<NewRace races={races} setRaces={setRaces} />);
    const participantInput = screen.getByTestId('add-participant-input');
    const addButton = screen.getByTestId(/add-participant-btn/i);

    fireEvent.change(participantInput, { target: { value: 'Bob' } });
    fireEvent.click(addButton);

    fireEvent.change(participantInput, { target: { value: 'Bob' } });
    fireEvent.click(addButton);

    expect(window.alert).toBeCalled();
  });

  test('assigns lanes correctly', () => {
    render(<NewRace races={races} setRaces={setRaces} />);
    const participantInput = screen.getByTestId('add-participant-input');
    const addButton = screen.getByTestId(/add-participant-btn/i);

    fireEvent.change(participantInput, { target: { value: 'Charlie' } });
    fireEvent.click(addButton);

    const laneInput = screen.getByTestId(/add-lane-input/i);
    fireEvent.change(laneInput, { target: { value: '1' } });

    expect(laneInput).toHaveValue('1');
  });

  test('prevents assigning the same lane to multiple participants', () => {
    render(<NewRace races={races} setRaces={setRaces} />);
    const participantInput = screen.getByTestId('add-participant-input');
    const addButton = screen.getByTestId(/add-participant-btn/i);

    fireEvent.change(participantInput, { target: { value: 'David' } });
    fireEvent.click(addButton);

    fireEvent.change(participantInput, { target: { value: 'Eve' } });
    fireEvent.click(addButton);

    const davidLaneInput = screen.getByTestId('add-lane-input-David');
    const eveLaneInput = screen.getByTestId('add-lane-input-Eve');

    fireEvent.change(davidLaneInput, { target: { value: '1' } });
    fireEvent.change(eveLaneInput, { target: { value: '1' } });

    expect(window.alert).toHaveBeenCalledWith('This lane has been taken!');
  });

  test('confirms lane assignment', () => {
    render(<NewRace races={races} setRaces={setRaces} />);
    const participantInput = screen.getByTestId('add-participant-input');
    const addButton = screen.getByTestId(/add-participant-btn/i);

    fireEvent.change(participantInput, { target: { value: 'David' } });
    fireEvent.click(addButton);

    fireEvent.change(participantInput, { target: { value: 'Eve' } });
    fireEvent.click(addButton);

    const davidLaneInput = screen.getByTestId('add-lane-input-David');
    const eveLaneInput = screen.getByTestId('add-lane-input-Eve');

    fireEvent.change(davidLaneInput, { target: { value: '1' } });
    fireEvent.change(eveLaneInput, { target: { value: '2' } });

    const confirmButton = screen.getByTestId(/confirm-lanes-btn/i);
    fireEvent.click(confirmButton);

    expect(confirmButton).not.toBeInTheDocument();
  });

  test('creates a new race with valid participants', () => {
    render(<NewRace races={races} setRaces={setRaces} />);
    const participantInput = screen.getByTestId('add-participant-input');
    const addButton = screen.getByTestId(/add-participant-btn/i);
    const raceNameInput = screen.getByPlaceholderText('Race Name');

    fireEvent.change(raceNameInput, { target: { value: '100m Sprint' } });

    fireEvent.change(participantInput, { target: { value: 'David' } });
    fireEvent.click(addButton);

    fireEvent.change(participantInput, { target: { value: 'Eve' } });
    fireEvent.click(addButton);

    const davidLaneInput = screen.getByTestId('add-lane-input-David');
    const eveLaneInput = screen.getByTestId('add-lane-input-Eve');

    fireEvent.change(davidLaneInput, { target: { value: '1' } });
    fireEvent.change(eveLaneInput, { target: { value: '2' } });

    const confirmButton = screen.getByTestId(/confirm-lanes-btn/i);
    fireEvent.click(confirmButton);

    const createRaceButton = screen.getByText(/Create New Race/i);
    fireEvent.click(createRaceButton);

    expect(setRaces).toHaveBeenCalledTimes(1);
  });

  test('show error when fill in invalid lane', () => {
    render(<NewRace races={races} setRaces={setRaces} />);
    const participantInput = screen.getByTestId('add-participant-input');
    const addButton = screen.getByTestId(/add-participant-btn/i);
    const raceNameInput = screen.getByPlaceholderText('Race Name');

    fireEvent.change(raceNameInput, { target: { value: '100m Sprint' } });

    fireEvent.change(participantInput, { target: { value: 'David' } });
    fireEvent.click(addButton);

    fireEvent.change(participantInput, { target: { value: 'Eve' } });
    fireEvent.click(addButton);

    const davidLaneInput = screen.getByTestId('add-lane-input-David');
    const eveLaneInput = screen.getByTestId('add-lane-input-Eve');

    fireEvent.change(davidLaneInput, { target: { value: '1' } });
    fireEvent.change(eveLaneInput, { target: { value: '3' } });

    const confirmButton = screen.getByTestId(/confirm-lanes-btn/i);
    fireEvent.click(confirmButton);

    expect(window.alert).toBeCalled();
  });

  test('prevents creating a race with less than 2 participants', () => {
    render(<NewRace races={races} setRaces={setRaces} />);
    const participantInput = screen.getByTestId('add-participant-input');
    const addButton = screen.getByTestId(/add-participant-btn/i);
    const raceNameInput = screen.getByPlaceholderText('Race Name');

    fireEvent.change(raceNameInput, { target: { value: '100m Sprint' } });

    fireEvent.change(participantInput, { target: { value: 'David' } });
    fireEvent.click(addButton);

    const davidLaneInput = screen.getByTestId('add-lane-input-David');

    fireEvent.change(davidLaneInput, { target: { value: '1' } });

    const confirmButton = screen.getByTestId(/confirm-lanes-btn/i);
    fireEvent.click(confirmButton);

    const createRaceButton = screen.getByText(/Create New Race/i);
    fireEvent.click(createRaceButton);

    expect(window.alert).toBeCalled();
  });
});
