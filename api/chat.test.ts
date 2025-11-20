import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import handler from './chat';

// Mock global fetch
global.fetch = vi.fn();

// Helper to mock response and request
const createMockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.setHeader = vi.fn();
  res.write = vi.fn();
  res.end = vi.fn();
  return res;
};

const createMockRequest = (body: any, method = 'POST') => ({
  method,
  body,
});

describe('API Chat Handler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.AI_PROVIDER = 'gemini';
    process.env.GEMINI_API_KEY = 'test-gemini-key';
  });

  afterEach(() => {
    delete process.env.AI_PROVIDER;
    delete process.env.GEMINI_API_KEY;
    delete process.env.NVIDIA_API_KEY;
  });

  it('should return 405 if method is not POST', async () => {
    const req = createMockRequest({}, 'GET');
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Method Not Allowed' }));
  });

  it('should return 400 if prompt is missing', async () => {
    const req = createMockRequest({});
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Invalid or missing 'prompt' field." }));
  });

  it('should return 500 if no API key is set', async () => {
     delete process.env.GEMINI_API_KEY;
     const req = createMockRequest({ prompt: 'Hello' });
     const res = createMockResponse();

     await handler(req, res);

     expect(res.status).toHaveBeenCalledWith(500);
     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Server misconfiguration' }));
  });
});
