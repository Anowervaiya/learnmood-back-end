import { Query } from 'mongoose';
import { excludeField } from '../constant/constant';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): this {
    const filter: Record<string, any> = { ...this.query };

    // 1️⃣ Remove excluded fields
    for (const field of excludeField) {
      delete filter[field];
    }

    // 2️⃣ Remove empty or undefined/null values
    Object.keys(filter).forEach(key => {
      if (
        filter[key] === '' ||
        filter[key] === undefined ||
        filter[key] === null
      ) {
        delete filter[key];
      }
    });

    // 3️⃣ Handle minAge (convert to dob filter)
    if (filter.minAge) {
      const today = new Date();
      const cutoffDate = new Date(
        today.getFullYear() - Number(filter.minAge),
        today.getMonth(),
        today.getDate()
      );
      filter.dob = { $lte: cutoffDate }; // only users older than minAge
      delete filter.minAge; // remove to avoid conflicts
    }

    // 4️⃣ Apply the filter to the query
    this.modelQuery = this.modelQuery.find(filter);

    return this;
  }

  search(searchableField: string[]): this {
    const searchTerm = this.query.searchTerm || '';
    const searchQuery = {
      $or: searchableField.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    };
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find(searchQuery);
    }
    return this;
  }

  sort(): this {
    const sort = this.query.sort || '-createdAt';

    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }
  fields(): this {
    const fields = this.query.fields?.split(',').join(' ') || '';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
  populate(path: string, select?: string): this {
    this.modelQuery = this.modelQuery.populate(path, select);
    return this;
  }
  build() {
    return this.modelQuery;
  }

  async getMeta() {
    const totalDocuments = await this.modelQuery.model.countDocuments(
      (this.modelQuery as any)._conditions
    );

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;

    const totalPage = Math.ceil(totalDocuments / limit);

    return { page, limit, total: totalDocuments, totalPage };
  }
}
