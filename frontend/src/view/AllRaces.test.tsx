import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AllRaces from './AllRaces';
import { IRace } from '../type/Type';

describe('AllRaces Component', () => {
  const mockSetSelectedRace = jest.fn();
  const mockRaces: IRace[] = [
    {
      id: '1',
      name: 'Race 1',
      participants: [
        { name: 'John', lane: '1', rank: '1' },
        { name: 'Doe', lane: '2', rank: '2' },
      ],
    },
    {
      id: '2',
      name: 'Race 2',
      participants: [
        { name: 'Alice', lane: '3', rank: '3' },
        { name: 'Bob', lane: '4', rank: '4' },
      ],
    },
  ];

  it('renders the component correctly', () => {
    render(
      <AllRaces
        races={mockRaces}
        isRecored={false}
        setSelectedRace={mockSetSelectedRace}
      />
    );

    expect(screen.getByText(/All races/i)).toBeInTheDocument();
    expect(screen.getByText('Race 1')).toBeInTheDocument();
    expect(screen.getByText('Race 2')).toBeInTheDocument();
  });

  it('displays participants and lanes correctly', () => {
    render(
      <AllRaces
        races={mockRaces}
        isRecored={false}
        setSelectedRace={mockSetSelectedRace}
      />
    );

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows final ranks when results are recorded', () => {
    render(
      <AllRaces
        races={mockRaces}
        isRecored={true}
        setSelectedRace={mockSetSelectedRace}
      />
    );

    expect(screen.getAllByText('1').length).toBe(2);
    expect(screen.getAllByText('2').length).toBe(2);
  });

  it('calls setSelectedRace when "Record" button is clicked', () => {
    render(
      <AllRaces
        races={mockRaces}
        isRecored={false}
        setSelectedRace={mockSetSelectedRace}
      />
    );

    const recordButtons = screen.getAllByTestId('record-result-btn');
    fireEvent.click(recordButtons[0]);

    expect(mockSetSelectedRace).toHaveBeenCalledWith(0);
  });
});
