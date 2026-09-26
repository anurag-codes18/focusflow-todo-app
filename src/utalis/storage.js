export const storageKey = (email) => {
    return `focusflow-tasks-${email}`;
};

export const readTasks = (email) => {
  try { 
    return JSON.parse(localStorage.getItem(storageKey(email))) || []; 
  }
  catch { 
    return [];
  }
};
 