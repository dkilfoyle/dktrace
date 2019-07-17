import { Matrix } from "@/Matrix";
import { Tuple } from "@/Tuple";

describe("Matrix", () => {
  describe("Creation", () => {
    test("Construct a 4x4 matrix", () => {
      const m = new Matrix(4, 4, [
        1,
        2,
        3,
        4,
        5.5,
        6.5,
        7.5,
        8.5,
        9,
        10,
        11,
        12,
        13.5,
        14.5,
        15.5,
        16.5
      ]);
      expect(m.at(0, 0)).toEqual(1);
      expect(m.at(0, 3)).toEqual(4);
      expect(m.at(1, 0)).toEqual(5.5);
      expect(m.at(1, 2)).toEqual(7.5);
      expect(m.at(2, 2)).toEqual(11);
      expect(m.at(3, 0)).toEqual(13.5);
      expect(m.at(3, 2)).toEqual(15.5);
    });
    test("2x2 matrix", () => {
      const m = new Matrix(2, 2, [-3, 5, 1, 2]);
      expect(m.at(0, 0)).toEqual(-3);
      expect(m.at(1, 0)).toEqual(1);
    });
    test("Equality test", () => {
      const m1 = new Matrix(2, 2, [1, 2, 3, 4]);
      const m2 = new Matrix(2, 2, [1, 2, 3, 4]);
      expect(m1.equals(m2)).toBeTruthy();
    });
    test("InEquality test", () => {
      const m1 = new Matrix(2, 2, [1, 2, 3, 4]);
      const m2 = new Matrix(2, 2, [10, 2, 3, 4]);
      expect(m1.equals(m2)).not.toBeTruthy();
    });
  });
  describe("Operations", () => {
    test("Multiplication by matrix", () => {
      const m1 = new Matrix(4, 4, [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2
      ]);
      const m2 = new Matrix(4, 4, [
        -2,
        1,
        2,
        3,
        3,
        2,
        1,
        -1,
        4,
        3,
        6,
        5,
        1,
        2,
        7,
        8
      ]);
      const m3 = new Matrix(4, 4, [
        20,
        22,
        50,
        48,
        44,
        54,
        114,
        108,
        40,
        58,
        110,
        102,
        16,
        26,
        46,
        42
      ]);
      expect(m1.multiply(m2).equals(m3)).toBeTruthy();
    });
    test("Multiplication by Tuple", () => {
      const m = new Matrix(4, 4, [
        1,
        2,
        3,
        4,
        2,
        4,
        4,
        2,
        8,
        6,
        4,
        1,
        0,
        0,
        0,
        1
      ]);
      const t = new Tuple(1, 2, 3, 1);
      const t2 = new Tuple(18, 24, 33, 1);
      expect(m.multiply(t).equals(t2)).toBeTruthy();
    });
    test("Transposition", () => {
      const m1 = new Matrix(4, 4, [
        0,
        9,
        3,
        0,
        9,
        8,
        0,
        8,
        1,
        8,
        5,
        3,
        0,
        0,
        5,
        8
      ]);
      const m2 = new Matrix(4, 4, [
        0,
        9,
        1,
        0,
        9,
        8,
        8,
        0,
        3,
        0,
        5,
        5,
        0,
        8,
        3,
        8
      ]);
      expect(m1.transpose().equals(m2)).toBeTruthy();
    });
  });
  describe("Inversion", () => {
    test("Determinant of 2x2", () => {
      const m1 = new Matrix(2, 2, [1, 5, -3, 2]);
      expect(m1.determinant()).toBeCloseTo(17);
    });
    test("Submatrix of 3x3 is 2x2", () => {
      const m1 = new Matrix(3, 3, [1, 5, 0, -3, 2, 7, 0, 6, -3]);
      const m2 = new Matrix(2, 2, [-3, 2, 0, 6]);
      expect(m1.submatrix(0, 2).equals(m2)).toBeTruthy();
    });
    test("Submatix of 4x4 is 3.3", () => {
      const m1 = new Matrix(4, 4, [
        -6,
        1,
        1,
        6,
        -8,
        5,
        8,
        6,
        -1,
        0,
        8,
        2,
        -7,
        1,
        -1,
        1
      ]);
      const m2 = new Matrix(3, 3, [-6, 1, 6, -8, 8, 6, -7, -1, 1]);
      expect(m1.submatrix(2, 1).equals(m2)).toBeTruthy();
    });
    test("Minor of a 3x3", () => {
      const a = new Matrix(3, 3, [3, 5, 0, 2, -1, -7, 6, -1, 5]);
      const b = a.submatrix(1, 0);
      expect(b.determinant()).toBeCloseTo(25);
      expect(a.minor(1, 0)).toBeCloseTo(25);
    });
    test("Cofactor of a 3x3", () => {
      const a = new Matrix(3, 3, [3, 5, 0, 2, -1, -7, 6, -1, 5]);
      expect(a.minor(0, 0)).toBeCloseTo(-12);
      expect(a.cofactor(0, 0)).toBeCloseTo(-12);
      expect(a.minor(1, 0)).toBeCloseTo(25);
      expect(a.cofactor(1, 0)).toBeCloseTo(-25);
    });
    test("Determinant of a 3x3", () => {
      const m = new Matrix(3, 3, [1, 2, 6, -5, 8, -4, 2, 6, 4]);
      expect(m.cofactor(0, 0)).toBeCloseTo(56);
      expect(m.cofactor(0, 1)).toBeCloseTo(12);
      expect(m.cofactor(0, 2)).toBeCloseTo(-46);
      expect(m.determinant()).toBeCloseTo(-196);
    });
    test("Determinant of a 4x4", () => {
      const m = new Matrix(4, 4, [
        -2,
        -8,
        3,
        5,
        -3,
        1,
        7,
        3,
        1,
        2,
        -9,
        6,
        -6,
        7,
        7,
        -9
      ]);
      expect(m.cofactor(0, 0)).toBeCloseTo(690);
      expect(m.cofactor(0, 1)).toBeCloseTo(447);
      expect(m.cofactor(0, 2)).toBeCloseTo(210);
      expect(m.cofactor(0, 3)).toBeCloseTo(51);
      expect(m.determinant()).toBeCloseTo(-4071);
    });
  });
});
