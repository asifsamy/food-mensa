class User {
  name: string;
  city: string;
  postalCode: string;
  street: string;

  constructor(name: string, city: string, postalCode: string, street: string) {
    this.name = name;
    this.city = city;
    this.postalCode = postalCode;
    this.street = street;
  }
}

export default User;
