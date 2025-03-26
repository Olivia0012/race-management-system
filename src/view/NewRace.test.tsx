// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import NewRace from './NewRace';
// import { IRace } from '../type/Type';

// describe('NewRace Component', () => {
//   let races;
//   let setRaces;

//   beforeEach(() => {});

//   test('renders the component', () => {
//     races = [];
//     setRaces = jest.fn();

//     render(<NewRace races={races} setRaces={setRaces} />);
//     expect(screen.getByText(/Add New Race/i)).toBeInTheDocument();
//   });

//   test('adds a participant', () => {
//     races = [];
//     setRaces = jest.fn();

//     render(<NewRace races={races} setRaces={setRaces} />);
//     const participantInput = screen.getByPlaceholderText('Participants:');
//     const addButton = screen.getByText(/Add/i);

//     fireEvent.change(participantInput, { target: { value: 'Alice' } });
//     fireEvent.click(addButton);

//     expect(screen.getByText('Alice')).toBeInTheDocument();
//   });

//   test('prevents adding duplicate participants', () => {
//     races = [];
//     setRaces = jest.fn();

//     render(<NewRace races={races} setRaces={setRaces} />);
//     const participantInput = screen.getByPlaceholderText('Participants:');
//     const addButton = screen.getByText(/Add/i);

//     fireEvent.change(participantInput, { target: { value: 'Bob' } });
//     fireEvent.click(addButton);

//     fireEvent.change(participantInput, { target: { value: 'Bob' } });
//     fireEvent.click(addButton);

//     expect(screen.getAllByText('Bob')).toHaveLength(1);
//   });

//   test('assigns lanes correctly', () => {
//     races = [];
//     setRaces = jest.fn();

//     render(<NewRace races={races} setRaces={setRaces} />);
//     const participantInput = screen.getByPlaceholderText('Participants:');
//     const addButton = screen.getByText(/Add/i);

//     fireEvent.change(participantInput, { target: { value: 'Charlie' } });
//     fireEvent.click(addButton);

//     const laneInput = screen.getByRole('textbox', { name: 'Charlie' });
//     fireEvent.change(laneInput, { target: { value: '1' } });

//     expect(laneInput).toHaveValue('1');
//   });

//   test('prevents assigning the same lane to multiple participants', () => {
//     races = [];
//     setRaces = jest.fn();

//     render(<NewRace races={races} setRaces={setRaces} />);
//     const participantInput = screen.getByPlaceholderText('Participants:');
//     const addButton = screen.getByText(/Add/i);

//     fireEvent.change(participantInput, { target: { value: 'David' } });
//     fireEvent.click(addButton);

//     fireEvent.change(participantInput, { target: { value: 'Eve' } });
//     fireEvent.click(addButton);

//     const davidLaneInput = screen.getByRole('textbox', { name: 'David' });
//     const eveLaneInput = screen.getByRole('textbox', { name: 'Eve' });

//     fireEvent.change(davidLaneInput, { target: { value: '1' } });
//     fireEvent.change(eveLaneInput, { target: { value: '1' } });

//     expect(window.alert).toHaveBeenCalledWith('This lane has been taken!');
//   });

//   test('confirms lane assignment', () => {
//     races = [];
//     setRaces = jest.fn();

//     render(<NewRace races={races} setRaces={setRaces} />);
//     const participantInput = screen.getByPlaceholderText('Participants:');
//     const addButton = screen.getByText(/Add/i);
//     const confirmButton = screen.getByText(/Confirm Lane/i);

//     fireEvent.change(participantInput, { target: { value: 'Frank' } });
//     fireEvent.click(addButton);

//     const laneInput = screen.getByRole('textbox', { name: 'Frank' });
//     fireEvent.change(laneInput, { target: { value: '1' } });

//     fireEvent.click(confirmButton);
//     expect(confirmButton).not.toBeInTheDocument();
//   });

//   test('creates a new race with valid participants', () => {
//     races = [];
//     setRaces = jest.fn();

//     render(<NewRace races={races} setRaces={setRaces} />);
//     const participantInput = screen.getByPlaceholderText('Participants:');
//     const addButton = screen.getByText(/Add/i);
//     const raceNameInput = screen.getByPlaceholderText('Race Name');
//     const createRaceButton = screen.getByText(/Create New Race/i);

//     fireEvent.change(raceNameInput, { target: { value: '100m Sprint' } });

//     fireEvent.change(participantInput, { target: { value: 'George' } });
//     fireEvent.click(addButton);

//     fireEvent.change(participantInput, { target: { value: 'Helen' } });
//     fireEvent.click(addButton);

//     fireEvent.click(createRaceButton);

//     expect(setRaces).toHaveBeenCalledTimes(1);
//   });

//   test('prevents creating a race with less than 2 participants', () => {
//     races = [];
//     setRaces = jest.fn();

//     render(<NewRace races={races} setRaces={setRaces} />);
//     const participantInput = screen.getByPlaceholderText('Participants:');
//     const addButton = screen.getByText(/Add/i);
//     const createRaceButton = screen.getByText(/Create New Race/i);

//     fireEvent.change(participantInput, { target: { value: 'Ivan' } });
//     fireEvent.click(addButton);

//     fireEvent.click(createRaceButton);

//     expect(window.alert).toHaveBeenCalledWith(
//       'At Least 2 Participants to start a new race!'
//     );
//   });
// });
