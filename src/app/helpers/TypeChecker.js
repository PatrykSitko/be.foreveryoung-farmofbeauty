export default class TypeChecker {
  static ErrorProducer = class ErrorProducer {
    constructor(subject) {
      this.subjectType = typeof subject;
    }
    get isString() {
      return is.bind(this)("string");
    }
    throwNonString(message) {
      throwNon.bind(this)("string", message);
    }
    get isBoolean() {
      return is.bind(this)("boolean");
    }
    throwNonBoolean(message) {
      throwNon.bind(this)("boolean", message);
    }
    get isObject() {
      return is.bind(this)("object");
    }
    throwNonObject(message) {
      throwNon.bind(this)("object", message);
    }
  };
  static check(subject) {
    return new TypeChecker.ErrorProducer(subject);
  }
}
function is(type) {
  return this.subjectType === type;
}
function throwNon(type, message) {
  if (!is.bind(this)(type))
    throw new TypeError(
      `(Type found:${this.subjectType})${
        message ? `, message: ${message}\n` : "\n"
      }`
    );
}
