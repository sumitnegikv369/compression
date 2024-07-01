export const humanReadableSize = (sizeInBytes) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'EB', 'PB'];
    let threshold = 1024;
    let i = 0;
  
    while (sizeInBytes >= threshold && i < units.length - 1) {
      sizeInBytes /= threshold;
      i++;
    }
  
    return `${sizeInBytes.toFixed(1)} ${units[i]}`;
  }