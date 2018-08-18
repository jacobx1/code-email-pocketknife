export const b64decode = (data: string) => {
  const buffer = new Buffer(data, 'base64');
  return buffer.toString('utf8');
};

export const b64encode = (text: string) => {
  const buffer = new Buffer(text);
  return buffer.toString('base64');
};
