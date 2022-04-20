class Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  date: string;

  constructor(
    id: string,
    name: string,
    comment: string,
    rating: number,
    date: string
  ) {
    this.id = id;
    this.name = name;
    this.comment = comment;
    this.rating = rating;
    this.date = date;
  }
}

export default Review;
