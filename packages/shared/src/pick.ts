import { ObjectType } from "./types";
import { forEach } from "./for-each";
import { asReg } from "./regexp";

const hasOwnProperty = Object.prototype.hasOwnProperty;

interface ReplaceValueOptions<T> {
  handler?: (k: string, v: T) => any;
}
function parseX<T>(object: ObjectType<T>, keys: string[] = [], options: ReplaceValueOptions<T>) {
  const result: ObjectType<T> = {};
  const { handler } = options;
  forEach(keys, (index, key) => {
    let aliasKey = key;
    let objectValue: any;
    const asMatched = key.match(asReg);
    // handle 'a as c'
    if (asMatched) {
      key = RegExp.$1; //a
      aliasKey = RegExp.$2; //c
    }
    objectValue = deepGet(key, object);
    if (objectValue) {
      result[aliasKey] = handler ? handler.call(object, aliasKey, objectValue) : objectValue;
    }
  });
  return result;
}

function deepGet(path: string, object: ObjectType<any>): any {
  const index = path.indexOf(".");
  const k = path.slice(0, index);
  const rest = path.slice(index + 1);
  const firstObj = object[k];
  if (index === -1) {
    if (hasOwnProperty.call(object, path)) {
      return object[path];
    }
  } else {
    return deepGet(rest, firstObj);
  }
}

export function pick<T>(object: ObjectType<T>, keys: string[] = [], handler?: (k: string, v: T) => any) {
  if (object === null) {
    return {};
  }
  const result: ObjectType<T> = {};
  forEach(keys, (index, key) => {
    if (hasOwnProperty.call(object, key)) {
      result[key] = handler ? handler.call(object, key, object[key]) : object[key];
    }
  });
  return result;
}

export function pickX<T>(object: ObjectType<T>, keys: string[] = [], handler?: (k: string, v: T) => any) {
  if (object === null) {
    return {};
  }
  return parseX(object, keys, {
    handler
  });
}
