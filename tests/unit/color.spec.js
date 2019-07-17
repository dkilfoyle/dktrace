import { Color } from "@/Color";

expect.extend({
  shallowEpsilonEquals: (expected, other) => {
    let expectedValue;
    let otherValue;
    let errorKey;
    const pass = Object.keys(other).every(key => {
      errorKey = key;
      expectedValue = expected[key].toFixed(14);
      otherValue = other[key].toFixed(14);
      return Math.abs(otherValue - expectedValue) < Number.EPSILON;
    });
    if (pass) {
      return {
        message: () =>
          `expected ${expectedValue} NOT to be close to ${otherValue} for [${errorKey}]`,
        pass: true
      };
    }
    return {
      message: () =>
        `expected ${expectedValue} to be close to ${otherValue} for [${errorKey}]`,
      pass: false
    };
  }
});

describe("Color", () => {
  test("Colors constructor has r g b", () => {
    const a = new Color(-0.5, 0.4, 1.7);
    expect(a.r).toEqual(-0.5);
    expect(a.g).toEqual(0.4);
    expect(a.b).toEqual(1.7);
  });
  test("Adding colors", () => {
    const c1 = new Color(0.9, 0.6, 0.75);
    const c2 = new Color(0.7, 0.1, 0.25);
    expect(c1.add(c2)).toEqual(new Color(1.6, 0.7, 1.0));
  });
  test("Subtracting colors", () => {
    const c1 = new Color(0.9, 0.6, 0.75);
    const c2 = new Color(0.7, 0.1, 0.25);
    expect(c1.subtract(c2)).shallowEpsilonEquals(new Color(0.2, 0.5, 0.5));
  });
  test("Multiplying a color by scalar", () => {
    const c1 = new Color(0.2, 0.3, 0.4);
    expect(c1.multiply(2)).shallowEpsilonEquals(new Color(0.4, 0.6, 0.8));
  });
  test("toPPMString", () => {
    const c1 = new Color(-0.5, 0.3, 1.4);
    expect(c1.toPPMString()).toEqual("0 77 255");
  });
});
