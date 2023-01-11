export const shrinkAddress = (addr = '', size = 5) => {
  if (!size) return addr;
  return `${addr.substring(0, size)}...${addr.substring(addr.length - size)}`;
};
