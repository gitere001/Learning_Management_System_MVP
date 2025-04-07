export const isURL = (str) => {
	try {
	  return Boolean(new URL(str));
	} catch(e) {
	  return false;
	}
  };