import { Transform } from "@/Transform";
import { Matrix } from "@/Matrix";
import { Tuple } from "@/Tuple";

describe("Transform", () => {
  describe("Translation", () => {
    test("Multiplying a translation matrix by a point", () => {
      const t = Transform.translation(5, -3, 2);
      const p = Tuple.point(-3, 4, 5);
      expect(t.multiply(p).equals(Tuple.point(2, 1, 7))).toBeTruthy();
    });
    test("Multiplying by the inverse of a translation matrix", () => {
      const t = Transform.translation(5, -3, 2);
      const im = t.inverse();
      const p = Tuple.point(-3, 4, 5);
      expect(im.multiply(p).equals(Tuple.point(-8, 7, 3)));
    });
    test("Translation does not affect vectors", () => {
      const t = Transform.translation(5, -3, 2);
      const v = Tuple.vector(-3, 4, 5);
      expect(t.multiply(v).equals(v)).toBeTruthy();
    });
  });
  describe("Scaling", () => {
    test("Multiplying a scaling matrix by a point", () => {
      const s = Transform.scale(2, 3, 4);
      const p = Tuple.point(-4, 6, 8);
      expect(s.multiply(p).equals(Tuple.point(-8, 18, 32))).toBeTruthy();
    });
    test("Multiplying by the inverse of a scale matrix", () => {
      const s = Transform.scale(2, 3, 4);
      const im = s.inverse();
      const v = Tuple.vector(-4, 6, 8);
      expect(im.multiply(v).equals(Tuple.vector(-2, 2, 3)));
    });
    test("Scaling does affect vectors", () => {
      const s = Transform.scale(2, 3, 4);
      const v = Tuple.vector(-4, 6, 8);
      expect(s.multiply(v).equals(Tuple.vector(-8, 18, 32))).toBeTruthy();
    });
    test("Reflection is scaling by negative", () => {
      const s = Transform.scale(-1, 1, 1);
      const p = Tuple.point(2, 3, 4);
      expect(s.multiply(p).equals(Tuple.point(-2, 3, 4))).toBeTruthy();
    });
  });
  describe("Rotation", () => {
    test("Rotating a point around the x axis", () => {
      const p = Tuple.point(0, 1, 0);
      const half_quarter = Transform.rotation_x(Math.PI / 4);
      const full_quarter = Transform.rotation_x(Math.PI / 2);
      expect(
        half_quarter
          .multiply(p)
          .equals(Tuple.point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2))
      );
      expect(full_quarter.multiply(p).equals(Tuple.point(0, 0, 1)));
    });
    test("Inverse of an x rotation rotates in the opposite direction", () => {
      const p = Tuple.point(0, 1, 0);
      const half_quarter = Transform.rotation_x(Math.PI / 4).inverse();
      expect(
        half_quarter
          .multiply(p)
          .equals(Tuple.point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2))
      );
    });
    test("Rotating a point around the y axis", () => {
      const p = Tuple.point(0, 1, 0);
      const half_quarter = Transform.rotation_y(Math.PI / 4);
      const full_quarter = Transform.rotation_y(Math.PI / 2);
      expect(
        half_quarter
          .multiply(p)
          .equals(Tuple.point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2))
      );
      expect(full_quarter.multiply(p).equals(Tuple.point(1, 0, 0)));
    });
    test("Rotating a point around the z axis", () => {
      const p = Tuple.point(0, 1, 0);
      const half_quarter = Transform.rotation_z(Math.PI / 4);
      const full_quarter = Transform.rotation_z(Math.PI / 2);
      expect(
        half_quarter
          .multiply(p)
          .equals(Tuple.point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0))
      );
      expect(full_quarter.multiply(p).equals(Tuple.point(-1, 0, 0)));
    });
  });
  describe("Multiple transformations", () => {
    test("Individual transformations applied in sequence", () => {
      const p = Tuple.point(1, 0, 1);
      const a = Transform.rotation_x(Math.PI / 2);
      const b = Transform.scale(5, 5, 5);
      const c = Transform.translation(10, 5, 7);
      const p2 = a.multiply(p);
      const p3 = b.multiply(p2);
      const p4 = c.multiply(p3);
      expect(p2.equals(Tuple.point(1, -1, 0)));
      expect(p3.equals(Tuple.point(5, -5, 0)));
      expect(p4.equals(Tuple.point(15, 0, 7)));
    });
    test("Chained transformations", () => {
      const p = Tuple.point(1, 0, 1);
      const a = Transform.rotation_x(Math.PI / 2);
      const b = Transform.scale(5, 5, 5);
      const c = Transform.translation(10, 5, 7);
      const t = c.multiply(b.multiply(a));
      expect(t.multiply(p).equals(Tuple.point(15, 0, 7)));
    });
  });
});
