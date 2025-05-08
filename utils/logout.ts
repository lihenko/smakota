export const logout = async (): Promise<void> => {
    await fetch('/api/logout');
    window.location.reload();
  };
  