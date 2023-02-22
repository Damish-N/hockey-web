class StudentPlayers {
  _email: string;
  _name: string;
  _age: number;
  _faculty: string;
  _number: number;
  _position: string;
  _status: string;

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value;
  }

  get faculty() {
    return this._faculty;
  }

  set faculty(value) {
    this._faculty = value;
  }

  get position(): string {
    return this._position;
  }

  set position(value: string) {
    this._position = value;
  }

  get number() {
    return this._number;
  }

  set number(value) {
    this._number = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  constructor(
    email: string,
    name: string,
    age: number,
    faculty: string,
    number: number,
    position: string
  ) {
    this._email = email;
    this._name = name;
    this._age = age;
    this._faculty = faculty;
    this._number = number;
    this._position = position;
  }
}
