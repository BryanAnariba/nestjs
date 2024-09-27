export class Product {

  public id: string;
  public name: string;
  public description: string;
  public price: number;

  constructor (id: string, name: string, description: string, price: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

}
