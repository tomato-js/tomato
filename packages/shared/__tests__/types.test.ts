import * as shared from "../src";

describe("shared util", () => {
  describe("types", () => {
    test("FunctionKeys", () => {
      type MixedProps = { name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any };
      type Keys = shared.FunctionKeys<MixedProps>;
      const setName: Keys = "setName";
      const someFn: Keys = "someFn";
    });
    test("NonFunctionKeys", () => {
      type MixedProps = { name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any };
      type Keys = shared.NonFunctionKeys<MixedProps>;
      const name: Keys = "name";
    });
    test("RequiredKeys", () => {
      type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined };
      type Keys = shared.RequiredKeys<Props>;
      const req: Keys = "req";
      const reqUndef: Keys = "reqUndef";
    });
    test("OptionalKeys", () => {
      type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined };
      type Keys = shared.OptionalKeys<Props>;
      const opt: Keys = "opt";
      const optUndef: Keys = "optUndef";
    });
    test("Optional", () => {
      type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined };
      type Optional = shared.Optional<Props>;
      const opt: Optional = {
        req: 1,
        reqUndef: 1
      };
      type Optional2 = shared.Optional<Props, "req" | "reqUndef">;
      const opt2: Optional2 = {
        req: 1,
        reqUndef: 1
      };
    });
    test("Intersection", () => {
      type Props = { name: string; age: number; visible: boolean };
      type DefaultProps = { age: number };
      type newProps = shared.Intersection<Props, DefaultProps>;
      const opt: newProps = {
        age: 1
      };
    });
    test("Diff", () => {
      type Props = { name: string; age: number; visible: boolean };
      type DefaultProps = { age: number };
      type newProps = shared.Diff<Props, DefaultProps>;
      const opt: newProps = {
        name: "1",
        visible: true
      };
    });
    test("$Keys", () => {
      type Props = { name: string; age: number; visible: boolean };
      type newProps = shared.$Keys<Props>;
      const opt: newProps = "name";
      const opt2: newProps = "age";
      const opt3: newProps = "visible";
    });
    test("$Values", () => {
      type Props = { name: string; age: number; visible: boolean };
      type newProps = shared.$Values<Props>;
      const opt: newProps = "name";
      const opt2: newProps = 1;
      const opt3: newProps = false;
    });
  });
});
