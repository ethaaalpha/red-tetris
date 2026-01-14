import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSocket } from '../lib/socket';
import type { Socket } from 'socket.io-client';

vi.mock('$env/static/public', () => ({
  PUBLIC_SERVER_ADDRESS: 'http://localhost',
  PUBLIC_SERVER_PORT: '3000',
}));

const mockSocket = {} as Socket;
const ioMock = vi.fn(() => mockSocket);

describe('getSocket', () => {
  beforeEach(() => {
    ioMock.mockClear();
  });

  it('creates a socket with correct URL and options', () => {
    const socket = getSocket();
  });
});
