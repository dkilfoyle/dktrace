import { Tuple } from "@/Tuple";

describe("Tuple", () => {
  test("A tuple with w=1.0 is a point", () => {
    const t = new Tuple(4.3, -4.2, 3.1, 1.0);
    expect(t.x).toEqual(4.3);
    expect(t.y).toEqual(-4.2);
    expect(t.z).toEqual(3.1);
    expect(t.w).toEqual(Tuple.Type.Point);
    expect(t.type).toBe(Tuple.Type.Point);
    expect(t.type).not.toBe(Tuple.Type.Vector);
  });
  test("A tuple 222with w=0.0 is a vector", () => {
    const t = new Tuple(4.3, -4.2, 3.1, 0.0);
    expect(t.w).toEqual(Tuple.Type.Vector);
    expect(t.type).toBe(Tuple.Type.Vector);
  });
  test("point() creates tuple with w=1", () => {
    const t = Tuple.point(4.3, -4.2, 3.1);
    expect(t.w).toEqual(1.0);
    expect(t.w).toEqual(Tuple.Type.Point);
    expect(t.type).toBe(Tuple.Type.Point);
  });
  test("vector() creates tuple with w=0.0", () => {
    const t = Tuple.vector(4.3, -4.2, 3.1);
    expect(t.w).toEqual(0.0);
    expect(t.w).toEqual(Tuple.Type.Vector);
    expect(t.type).toBe(Tuple.Type.Vector);
  });
  test("equality", () => {
    const p1 = new Tuple(4.3, -4.2, 3.1, Tuple.Type.Point);
    const p2 = new Tuple(4.3, -4.2, 3.1, Tuple.Type.Point);
    const p3 = new Tuple(4.2, -4.1, 3.0, Tuple.Type.Point);
    const p4 = new Tuple(4.3, -4.2, 3.1, Tuple.Type.Vector);
    expect(p1.equals(p2)).toBe(true);
    expect(p1.equals(p3)).toBe(false);
    expect(p1.equals(p4)).toBe(false);
  });
  test("Add 2 tuples", () => {
    const t1 = new Tuple(3, -2, 5, 1);
    const t2 = new Tuple(-2, 3, 1, 0);
    const t3 = new Tuple(1, 1, 6, 1);
    expect(t1.add(t2)).toEqual(t3);
  });
  test("Subtract 2 points gives a vector", () => {
    const t1 = Tuple.point(3, 2, 1);
    const t2 = Tuple.point(5, 6, 7);
    const t3 = Tuple.vector(-2, -4, -6);
    expect(t1.subtract(t2)).toEqual(t3);
  });
  test("Subtract a vector from a point gives a point", () => {
    const p = Tuple.point(3, 2, 1);
    const v = Tuple.vector(5, 6, 7);
    const p2 = Tuple.point(-2, -4, -6);
    expect(p.subtract(v)).toEqual(p2);
  });
  test("Subtract a vector from a vector gives a vector", () => {
    const v1 = Tuple.vector(3, 2, 1);
    const v2 = Tuple.vector(5, 6, 7);
    const v3 = Tuple.vector(-2, -4, -6);
    expect(v1.subtract(v2)).toEqual(v3);
  });
  test("Negating a tuple", () => {
    const a = new Tuple(1, -2, 3, -4);
    expect(a.negate()).toEqual(new Tuple(-1, 2, -3, 4));
  });
  test("Multiplying a tuple by a scalar", () => {
    const a = new Tuple(1, -2, 3, -4);
    expect(a.multiply(3.5)).toEqual(new Tuple(3.5, -7, 10.5, -14));
  });
  test("Dividing a tuple by a scalar", () => {
    const a = new Tuple(1, -2, 3, -4);
    expect(a.divide(2)).toEqual(new Tuple(0.5, -1, 1.5, -2));
  });
  test("Magnitude of unit vector is 1", () => {
    const a = Tuple.vector(1, 0, 0);
    expect(a.magnitude()).toEqual(1.0);
  });
  test("Normalization", () => {
    const a = Tuple.vector(1, 2, 3);
    const b = a.normalize();
    expect(b.x).toBeCloseTo(0.26726, 3);
    expect(b.y).toBeCloseTo(0.53452, 3);
    expect(b.z).toBeCloseTo(0.80178, 3);
    expect(b.w).toEqual(Tuple.Type.Vector);
  });
  test("Magnitude of a normalized vector is 1", () => {
    const a = Tuple.vector(1, 2, 3);
    const b = a.normalize();
    expect(b.magnitude()).toBeCloseTo(1.0);
  });
  test("dotproduct", () => {
    const a = Tuple.vector(1, 2, 3);
    const b = Tuple.vector(2, 3, 4);
    expect(a.dotProduct(b)).toEqual(20);
  });
  test("cross product", () => {
    const a = Tuple.vector(1, 2, 3);
    const b = Tuple.vector(2, 3, 4);
    expect(a.crossProduct(b)).toEqual(Tuple.vector(-1, 2, -1));
  });
});
