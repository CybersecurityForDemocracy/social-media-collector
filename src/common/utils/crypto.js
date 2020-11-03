const decodeJson = encoded => {
  try {
    if (typeof Buffer !== 'undefined') {
      return JSON.parse(Buffer.from(encoded, 'base64').toString());
    } else if (typeof atob !== 'undefined') {
      return JSON.parse(atob(encoded, 'base64'));
    } else {
      console.error('base64 function not found. Throwing error.');
      throw new Error('base64 function not found. Throwing error.');
    }
  } catch (err) {
    return encoded;
  }
};

export const encode = unencoded => {
  if (typeof Buffer !== 'undefined') {
    return unencoded !== undefined
      ? Buffer.from(JSON.stringify(unencoded)).toString('base64')
      : undefined;
  } else if (typeof btoa !== 'undefined') {
    return unencoded !== undefined ? btoa(JSON.stringify(unencoded)) : undefined;
  } else {
    console.error('base64 function not found. Throwing error.');
    throw new Error('base64 function not found. Throwing error.');
  }
};

export const decode = encoded => (typeof encoded === 'string' ? decodeJson(encoded) : encoded);

/**
 * An implementation of the cyrb53 hash algorithm.
 * Adapted from https://stackoverflow.com/a/52171480/917187
 *
 * Integer constants were lifted from
 * P. L'Ecuyer: A table of Linear Congruential Generators of
 * different sizes and good lattice structure, April 30 1997.
 *
 *  @param str — The string to hash.
 *  @param seed — An optional seed number.
 *  @returns 16 character hexidecimal hash.
 */
export const hash = (str, seed = 0) => {
  const KNUTH = 2654435761; // Knuth's prime https://lowrey.me/exploring-knuths-multiplicative-hash-2
  const PARK_MILLER = 1597334677; // http://www.firstpr.com.au/dsp/rand31/p1192-park.pdf
  const MURMUR_UPPER = 2246822507; // https://en.wikipedia.org/wiki/MurmurHash
  const MURMUR_LOWER = 3266489909;

  let h1 = 0xdeadbeef ^ seed; // https://www.urbandictionary.com/define.php?term=0xDEADBEEF
  let h2 = 0xcafebabe ^ seed; // https://www.artima.com/insidejvm/whyCAFEBABE.html

  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, KNUTH);
    h2 = Math.imul(h2 ^ ch, PARK_MILLER);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), MURMUR_UPPER) ^ Math.imul(h2 ^ (h2 >>> 13), MURMUR_LOWER);
  h2 = Math.imul(h2 ^ (h2 >>> 16), MURMUR_UPPER) ^ Math.imul(h1 ^ (h1 >>> 13), MURMUR_LOWER);

  return (h2 >>> 0).toString(16).padStart(8, 0) + (h1 >>> 0).toString(16).padStart(8, 0);
};
