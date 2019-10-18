const data = Array(300000)
  .fill(null)
  .map((_, index) => ({ id: index, value: `value of ${index}` }));

export default data;
