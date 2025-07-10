
export function handleApiError(error: unknown): string {
  if (typeof error === 'string') return error;

  if (error instanceof Error) return error.message;
  
  if ((error as any).response?.data?.message) {
    return (error as any).response.data.message;
  }

  return 'Something went wrong. Please try again.';
}
