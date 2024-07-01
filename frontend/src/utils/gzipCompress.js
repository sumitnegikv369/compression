import pako from "pako";
import { humanReadableSize } from "./helper";

export const compressPayload = (data) => {
  // strategies
  const Z_FILTERED = 1; // best so far
  const Z_HUFFMAN_ONLY = 2;
  const Z_RLE = 3;
  const Z_FIXED = 4;
  const Z_DEFAULT_STRATEGY = 0;
  try {
    const compressedData = pako.gzip(data, {
      level: 9,
      windowBits: 15,
      memLevel: 9,
      strategy: Z_FILTERED,
    });

    // Compression Level (level): This is an integer between 0 and 9 (default: 6). It determines the trade-off between compression ratio and speed. Higher levels (closer to 9) result in smaller compressed data but take longer to compress.

    // Window Size (windowBits): This is an integer between 8 and 15 (default: 15). It affects the size of the compression window used during the process. A larger window can improve compression for certain types of data but might use more memory.

    // Memory Usage (memLevel): This is an integer between 1 and 9 (default: 8). It controls the amount of memory allocated for internal compression buffers. Higher levels use more memory but might improve compression speed.

    // Strategy (strategy): This is an integer that defines the compression strategy used (default: Z_DEFAULT_STRATEGY). Different strategies can be more effective for specific types of data. Refer to the pako documentation for available strategies.

    console.log("Original data size:", humanReadableSize(data.byteLength));
    console.log("Compressed data size:", humanReadableSize(compressedData.byteLength));
    return compressedData;
  } catch (error) {
    console.error("Error compressing payload:", error);
    return null;
  }
};


// DOCS -> https://nodeca.github.io/pako/