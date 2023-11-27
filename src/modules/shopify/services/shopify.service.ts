import { BaseService } from '@bases/base.service';
import { CategoryEntity } from '@modules/category/entities/category.entity';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopifyService extends BaseService {
  constructor(private readonly adminHttpService: HttpService) {
    super();
  }

  async getProducts(category?: CategoryEntity): Promise<unknown> {
    const data = await this.adminHttpService.axiosRef.get('2023-10/products.json', {
      params: {
        status: 'active',
      },
    });

    return data.data.products.map((product) => ({
      ...product,
      category,
    }));
  }

  async getProductById(id: string): Promise<unknown> {
    const data = await this.adminHttpService.axiosRef.get(`2023-10/products/${id}.json`);

    return this.normalizeObjectKeys(data.data.product);
  }
}
