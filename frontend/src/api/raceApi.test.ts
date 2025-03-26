import { fetchRaces, createNewRace, updatePlacements } from './raceApi';
import { IRace } from '../type/Type';

global.fetch = jest.fn();

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock calls before each test
  });

  test('fetchRaces should return races on success', async () => {
    const mockRaces = [
      { id: 1, name: 'Race 1' },
      { id: 2, name: 'Race 2' },
    ];
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockRaces),
    });

    const races = await fetchRaces();
    expect(fetch).toHaveBeenCalledWith('/api/races');
    expect(races).toEqual(mockRaces);
  });

  test('fetchRaces should handle errors', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const races = await fetchRaces();
    expect(consoleSpy).toHaveBeenCalledWith('Response status: 500');
    expect(races).toBeUndefined();
    consoleSpy.mockRestore();
  });

  test('createNewRace should send POST request and return true on success', async () => {
    const newRace: IRace = { id: '3', name: 'Race 3', participants: [] };
    (fetch as jest.Mock).mockResolvedValue({ ok: true });

    const result = await createNewRace(newRace);
    expect(fetch).toHaveBeenCalledWith(
      '/api/race',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(newRace),
      })
    );
    expect(result).toBe(true);
  });

  test('createNewRace should handle errors', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 400 });
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await createNewRace({
      id: '3',
      name: 'Race 3',
      participants: [],
    });
    expect(consoleSpy).toHaveBeenCalledWith('Response status: 400');
    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });

  test('updatePlacements should send PUT request and return true on success', async () => {
    const updatedRace: IRace = {
      id: '1',
      name: 'Updated Race',
      participants: [],
    };
    (fetch as jest.Mock).mockResolvedValue({ ok: true });

    const result = await updatePlacements(updatedRace);
    expect(fetch).toHaveBeenCalledWith(
      `/api/race/1`,
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updatedRace),
      })
    );
    expect(result).toBe(true);
  });

  test('updatePlacements should handle errors', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 404 });
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await updatePlacements({
      id: '1',
      name: 'Updated Race',
      participants: [],
    });
    expect(consoleSpy).toHaveBeenCalledWith('Response status: 404');
    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });
});
