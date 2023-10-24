/**
 * Formats resposne data based in return type
 */
export const createResponse = <Data>(data: Data) => {
  if (typeof data === "string") {
    return { message: data };
  }
  if (Array.isArray(data)) {
    return {
      data: data,
      total: data.length,
    };
  }
  return {
    data: data,
  };
};
