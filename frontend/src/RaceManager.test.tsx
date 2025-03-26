import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RaceManager from './RaceManager';
import { fetchRaces } from './api/raceApi';

jest.mock('./api/raceApi');

describe('RaceManager Component', () => {
  it('renders correctly', () => {
    render(<RaceManager />);

    act(() => {
      expect(screen.getByText(/Race Management System/i)).toBeInTheDocument();
      expect(screen.getByText('Add New Race')).toBeInTheDocument();
      expect(screen.getByText('All races')).toBeInTheDocument();
    });
  });

  test('fetches races on mount', () => {
    const mockRaces = [
      { id: 1, name: 'Race 1' },
      { id: 2, name: 'Race 2' },
    ];
    (fetchRaces as jest.Mock).mockResolvedValue(mockRaces);

    render(<RaceManager />);

    act(() => {
      expect(fetchRaces).toHaveBeenCalledTimes(1);
    });
  });

  it('renders FinalPlacements when a race is selected', () => {
    render(<RaceManager />);

    const raceNameInput = screen.getByTestId('race-name-input');
    fireEvent.change(raceNameInput, { target: { value: 'Race 1' } });

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

    const createRaceButton = screen.getByText(/Create New Race/i);
    fireEvent.click(createRaceButton);

    const recordButton = screen.getByTestId('record-result-btn');
    fireEvent.click(recordButton);
    act(() => {
      expect(
        screen.getByText('Please fill in the final place for each participant:')
      ).toBeInTheDocument();
    });
  });
});
