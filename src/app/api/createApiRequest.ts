export async function createApiRequest<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (error) {
    return error;
  }
}
