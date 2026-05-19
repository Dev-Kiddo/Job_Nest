class JobQueryParser {
  query: any;
  reqQueryString: any;

  constructor(query: any, reqQueryString: any) {
    this.query = query;
    this.reqQueryString = reqQueryString;
  }

  filter() {
    // console.log("reqQueryString", this.reqQueryString);

    const queryObj = { ...this.reqQueryString };
    const excludeFields = ["search", "sort", "page", "limit", "fields"];

    excludeFields.forEach((field) => delete queryObj[field]);

    const queryStr = JSON.stringify(queryObj).replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  search() {
    if (this.reqQueryString.search) {
      this.query = this.query.find({
        title: { $regex: this.reqQueryString.search, $options: "i" },
      });
    }
    return this;
  }

  sort() {
    if (this.reqQueryString.sort) {
      const sortby = this.reqQueryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortby);

      return this;
    } else {
      this.query = this.query.sort("-createdAt");

      return this;
    }
  }

  fields() {
    if (this.reqQueryString.fields) {
      let reqFields = this.reqQueryString.fields;

      const fields = reqFields.split(",").join(" ");

      this.query = this.query.select(fields);
    }

    return this;
  }

  pagination() {
    const page = Number(this.reqQueryString.page) || 1;
    const limit = Number(this.reqQueryString.limit) || 12;

    // const skip = page * limit - limit;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default JobQueryParser;
