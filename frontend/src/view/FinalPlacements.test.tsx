import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FinalPlacements from './FinalPlacements';
import { isValidPlacements } from '../utils/helper';
import { IRace } from '../type/Type';

jest.mock('../utils/helper', () => ({
  isValidPlacements: jest.fn(),
}));

describe('FinalPlacements Component', () => {
  const mockSetIsRecorded = jest.fn();
  const setSelectedRace = jest.fn();
  const mockSetRaces = jest.fn();
  const mockRaces: IRace[] = [
    {
      id: 'test',
      name: 'Race 1',
      participants: [
        { name: 'John', lane: '1', rank: '' },
        { name: 'Doe', lane: '2', rank: '' },
      ],
    },
  ];

  it('renders the component correctly', () => {
    render(
      <FinalPlacements
        selectedRace={0}
        setSelectedRace={setSelectedRace}
        races={mockRaces}
        setIsRecorded={mockSetIsRecorded}
        setRaces={mockSetRaces}
      />
    );

    expect(screen.getByText(/Final Places/i)).toBeInTheDocument();
    expect(screen.getByText(/Race Name:/i)).toBeInTheDocument();
    expect(screen.getByText('Race 1')).toBeInTheDocument();
    expect(screen.getByText('Lane 1 :')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Lane 2 :')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
  });

  it('should not render the component', () => {
    render(
      <FinalPlacements
        selectedRace={undefined}
        setSelectedRace={setSelectedRace}
        races={mockRaces}
        setIsRecorded={mockSetIsRecorded}
        setRaces={mockSetRaces}
      />
    );

    expect(screen.getByText(/Final Places/i)).toBeInTheDocument();
    expect(screen.getByText(/Race Name:/i)).toBeInTheDocument();
    expect(screen.queryByText('Race 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Lane 1 :')).not.toBeInTheDocument();
  });

  it('updates participant rank on input change', () => {
    (isValidPlacements as jest.Mock).mockReturnValue(true);

    render(
      <FinalPlacements
        selectedRace={0}
        setSelectedRace={setSelectedRace}
        races={mockRaces}
        setIsRecorded={mockSetIsRecorded}
        setRaces={mockSetRaces}
      />
    );

    const input1 = screen.getByTestId('add-placement-input-John');
    const input2 = screen.getByTestId('add-placement-input-Doe');

    fireEvent.change(input1, { target: { value: '1' } });
    fireEvent.change(input2, { target: { value: '1' } });

    const confirmBtn = screen.getByTestId(/confirm-results-btn/i);
    confirmBtn.click();

    act(() => {
      expect(mockRaces).toEqual([
        {
          id: 'test',
          name: 'Race 1',
          participants: [
            { lane: '1', name: 'John', rank: '1' },
            { lane: '2', name: 'Doe', rank: '1' },
          ],
        },
      ]);
    });
  });

  test('prevents filling invalid placement', () => {
    (isValidPlacements as jest.Mock).mockReturnValue(true);
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <FinalPlacements
        selectedRace={0}
        setSelectedRace={setSelectedRace}
        races={mockRaces}
        setIsRecorded={mockSetIsRecorded}
        setRaces={mockSetRaces}
      />
    );

    const input1 = screen.getByTestId('add-placement-input-John');

    fireEvent.change(input1, { target: { value: '3' } });

    expect(window.alert).toHaveBeenCalledWith('Invalid input!');
  });

  it('validates placements and updates state on confirm', () => {
    (isValidPlacements as jest.Mock).mockReturnValue(true);

    render(
      <FinalPlacements
        selectedRace={0}
        setSelectedRace={setSelectedRace}
        races={mockRaces}
        setIsRecorded={mockSetIsRecorded}
        setRaces={mockSetRaces}
      />
    );

    const confirmButton = screen.getByText(/Confirm/i);
    fireEvent.click(confirmButton);
    act(() => {
      expect(isValidPlacements).toHaveBeenCalled();
      expect(mockSetIsRecorded).toHaveBeenCalledWith(true);
      expect(mockSetRaces).toHaveBeenCalled();
    });
  });

  it('shows alert when placements are invalid', () => {
    (isValidPlacements as jest.Mock).mockReturnValue(false);
    window.alert = jest.fn();

    render(
      <FinalPlacements
        selectedRace={0}
        setSelectedRace={setSelectedRace}
        races={mockRaces}
        setIsRecorded={mockSetIsRecorded}
        setRaces={mockSetRaces}
      />
    );

    const confirmButton = screen.getByText(/Confirm/i);
    fireEvent.click(confirmButton);
    act(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid final places!');
    });
  });

  it('should not make any change in the page', () => {
    render(
      <FinalPlacements
        selectedRace={undefined}
        setSelectedRace={setSelectedRace}
        races={mockRaces}
        setIsRecorded={mockSetIsRecorded}
        setRaces={mockSetRaces}
      />
    );

    const confirmButton = screen.getByText(/Confirm/i);
    fireEvent.click(confirmButton);
    act(() => {
      expect(screen.queryByText('Race 1')).not.toBeInTheDocument();
    });
  });
});
