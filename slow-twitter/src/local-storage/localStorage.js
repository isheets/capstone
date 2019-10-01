export const loadState = () => {
    console.log("ATTEMPTING TO LOAD STATE");
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

  export const saveState = (state) => {
      console.log("ATTEMPTING TO SAVE STATE");
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
  };