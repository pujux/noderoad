import axios from "axios";

class Noderoad {
  constructor(accessToken, config = {}) {
    this.accessToken = accessToken;
    this.basePath = config.basePath ?? "https://api.gumroad.com/v2";
  }

  buildError(message) { return new Error(message); }

  async request(endpoint = "", config = {}) {
    const url = this.basePath + endpoint;

    const { params, ...otherOptions } = config;

    const headers = { "Content-type": "application/json" };

    const axiosConfig = {
      params: {
        access_token: this.accessToken,
        ...params,
      },
      url,
      headers,
      ...otherOptions,
    };

    return new Promise((resolve, reject) => {
      axios(axiosConfig)
        .then((response) => {
          if (response.data && response.data.success && response.status === 200) {
            resolve(response.data);
          } else {
            reject(this.buildError(response.data.message));
          }
        })
        .catch((error) => reject(this.buildError(error)));
    });
  }

  //#region Products

  /* 
    Retrieve all of the existing products for the authenticated user.
    https://app.gumroad.com/api#get-/products
  */
  async getProducts(options = {}) {
    const url = "/products";

    return this.request(url, options)
      .then((data) => data.products);
  }

  /* 
    Retrieve the details of a product.
    https://app.gumroad.com/api#get-/products/:id
  */
  async getProduct(productId, options = {}) {
    const url = `/products/${productId}`;

    return this.request(url, options)
      .then((data) => data.product);
  }

  /* 
    Permanently delete a product.
    https://app.gumroad.com/api#delete-/products/:id
  */
  async deleteProduct(productId, options = {}) {
    const url = `/products/${productId}`;

    return this.request(url, {
      method: "DELETE",
      ...options
    })
      .then((data) => ({ message: data.message }));
  }

  /* 
    Enable an existing product.
    https://app.gumroad.com/api#put-/products/:id/enable
  */
  async enableProduct(productId, options = {}) {
    const url = `/products/${productId}/enable`;

    return this.request(url, {
      method: "PUT",
      ...options
    })
      .then((data) => data.product);
  }

  /* 
    Disable an existing product.
    https://app.gumroad.com/api#put-/products/:id/disable
  */
  async disableProduct(productId, options = {}) {
    const url = `/products/${productId}/disable`;

    return this.request(url, {
      method: "PUT",
      ...options
    })
      .then((data) => data.product);
  }

  //#endregion Products
  //#region Variant categories

  /* 
    Create a new variant category on a product.
    https://app.gumroad.com/api#post-/products/:product_id/variant_categories
  */
  async createVariantCategory(productId, params, options = {}) {
    const url = `/products/${productId}/variant_categories`;

    return this.request(url, {
      method: "POST",
      params,
      ...options
    })
      .then((data) => data.variant_category);
  }

  /* 
    Retrieve the details of a variant category of a product.
    https://app.gumroad.com/api#get-/products/:product_id/variant_categories/:id
  */
  async getVariantCategory(productId, variantCategoryId, options = {}) {
    const url = `/products/${productId}/variant_categories/${variantCategoryId}`;

    return this.request(url, options)
      .then((data) => data.variant_category);
  }

  /* 
    Edit a variant category of an existing product.
    https://app.gumroad.com/api#put-/products/:product_id/variant_categories/:id
  */
  async updateVariantCategory(productId, variantCategoryId, params, options = {}) {
    const url = `/products/${productId}/variant_categories/${variantCategoryId}`;

    return this.request(url, {
      method: "PUT",
      params,
      ...options
    })
      .then((data) => data.variant_category);
  }

  /* 
    Permanently delete a variant category of a product.
    https://app.gumroad.com/api#delete-/products/:product_id/variant_categories/:id
  */
  async deleteVariantCategory(productId, variantCategoryId, options = {}) {
    const url = `/products/${productId}/variant_categories/${variantCategoryId}`;

    return this.request(url, {
      method: "DELETE",
      ...options
    })
      .then((data) => ({ message: data.message }));
  }

  /* 
    Retrieve all of the existing variant categories of a product.
    https://app.gumroad.com/api#get-/products/:product_id/variant_categories
  */
  async getVariantCategories(productId, options = {}) {
    const url = `/products/${productId}/variant_categories`;

    return this.request(url, options)
      .then((data) => data.variant_categories);
  }

  /* 
    Create a new variant of a product.
    https://app.gumroad.com/api#post-/products/:product_id/variant_categories/:variant_category_id/variants
  */
  async createVariant(productId, variantCategoryId, params, options = {}) {
    const url = `/products/${productId}/variant_categories/${variantCategoryId}/variants`;

    return this.request(url, {
      method: "POST",
      params,
      ...options
    })
      .then((data) => data.variant);
  }

  /* 
    Retrieve the details of a variant of a product.
    https://app.gumroad.com/api#get-/products/:product_id/variant_categories/:variant_category_id/variants/:id
  */
  async getVariant(productId, variantCategoryId, variantId, options = {}) {
    const url = `/products/${productId}/variant_categories/${variantCategoryId}/variants/${variantId}`;

    return this.request(url, options)
      .then((data) => data.variant);
  }

  /* 
    Edit a variant of an existing product.
    https://app.gumroad.com/api#put-/products/:product_id/variant_categories/:variant_category_id/variants/:id
  */
  async updateVariant(productId, variantCategoryId, variantId, params, options = {}) {
    const url = `/products/${productId}/variant_categories/${variantCategoryId}/variants/${variantId}`;

    return this.request(url, {
      method: "PUT",
      params,
      ...options
    })
      .then((data) => data.variant);
  }

  /* 
    Permanently delete a variant of a product.
    https://app.gumroad.com/api#delete-/products/:product_id/variant_categories/:variant_category_id/variants/:id
  */
  async deleteVariant(productId, variantCategoryId, variantId, options = {}) {
    const url = `/products/${productId}/variant_categories/${variantCategoryId}/variants/${variantId}`;

    return this.request(url, {
      method: "DELETE",
      ...options
    })
      .then((data) => ({ message: data.message }));
  }

  /* 
    Retrieve all of the existing variants in a variant category.
    https://app.gumroad.com/api#get-/products/:product_id/variant_categories/:variant_category_id/variants
  */
  async getVariants(productId, variantCategoryId, options = {}) {
    const url = `/products/${productId}/variant_categories/${variantCategoryId}/variants`;

    return this.request(url, options)
      .then((data) => data.variants);
  }

  //#endregion Variant categories
  //#region Offer codes

  /* 
    Retrieve all of the existing offer codes for a product.
    Either amount_cents or percent_off will be returned depending if the offer code is a fixed amount off or a percentage off. 
    A universal offer code is one that applies to all products.
    https://app.gumroad.com/api#get-/products/:product_id/offer_codes
  */
  async getOfferCodes(productId, options = {}) {
    const url = `/products/${productId}/offer_codes`;

    return this.request(url, options)
      .then((data) => data.offer_codes);
  }

  /* 
    Retrieve the details of a specific offer code of a product.
    https://app.gumroad.com/api#get-/products/:product_id/offer_codes/:id
  */
  async getOfferCode(productId, offerCodeId, options = {}) {
    const url = `/products/${productId}/offer_codes/${offerCodeId}`;

    return this.request(url, options)
      .then((data) => data.offer_code);
  }

  /* 
    Create a new offer code for a product. Default offer code is in cents. A universal offer code is one that applies to all products.
    https://app.gumroad.com/api#post-/products/:product_id/offer_codes
  */
  async createOfferCode(productId, params, options = {}) {
    const url = `/products/${productId}/offer_codes`;

    return this.request(url, {
      method: "POST",
      params,
      ...options
    })
      .then((data) => data.offer_code);
  }

  /* 
    Edit an existing product's offer code.
    https://app.gumroad.com/api#put-/products/:product_id/offer_codes/:id
  */
  async updateOfferCode(productId, offerCodeId, params, options = {}) {
    const url = `/products/${productId}/offer_codes/${offerCodeId}`;

    return this.request(url, {
      method: "PUT",
      params,
      ...options
    })
      .then((data) => data.offer_code);
  }

  /* 
    Permanently delete a product's offer code.
    https://app.gumroad.com/api#delete-/products/:product_id/offer_codes/:id
  */
  async deleteOfferCode(productId, offerCodeId, options = {}) {
    const url = `/products/${productId}/offer_codes/${offerCodeId}`;

    return this.request(url, {
      method: "DELETE",
      ...options
    })
      .then((data) => ({ message: data.message }));
  }

  //#endregion Offer codes
  //#region Custom fields

  /* 
    Retrieve all of the existing custom fields for a product.
    https://app.gumroad.com/api#get-/products/:product_id/custom_fields
  */
  async getCustomFields(productId, options = {}) {
    const url = `/products/${productId}/custom_fields`;

    return this.request(url, options)
      .then((data) => data.custom_fields);
  }

  /* 
    Create a new custom field for a product.
    https://app.gumroad.com/api#post-/products/:product_id/custom_fields
  */
  async createCustomField(productId, params, options = {}) {
    const url = `/products/${productId}/custom_fields`;

    return this.request(url, {
      method: "POST",
      params,
      ...options
    })
      .then((data) => data.custom_field);
  }

  /* 
    Edit an existing product's custom field.
    https://app.gumroad.com/api#put-/products/:product_id/custom_fields/:name
  */
  async updateCustomField(productId, customFieldName, params, options = {}) {
    const url = `/products/${productId}/custom_fields/${encodeURIComponent(customFieldName)}`;

    return this.request(url, {
      method: "PUT",
      params,
      ...options
    })
      .then((data) => data.custom_field);
  }

  /* 
    Permanently delete a product's custom field.
    https://app.gumroad.com/api#delete-/products/:product_id/custom_fields/:name
  */
  async deleteCustomField(productId, customFieldName, options = {}) {
    const url = `/products/${productId}/custom_fields/${encodeURIComponent(customFieldName)}`;

    return this.request(url, {
      method: "DELETE",
      ...options
    })
      .then((data) => ({ message: data.message }));
  }

  //#endregion Custom fields
  //#region User

  /* 
    Retrieve the user's data.
    https://app.gumroad.com/api#get-/user
  */
  async getUser(options = {}) {
    const url = `/user`;

    return this.request(url, options)
      .then((data) => data.user);
  }

  //#endregion User
  //#region Resource subscriptions

  /* 
    Subscribe to a resource.
    https://app.gumroad.com/api#put-/resource_subscriptions
  */
  async subscribeToResource(resourceName, postUrl, options = {}) {
    const url = `/resource_subscriptions`;

    return this.request(url, {
      method: "PUT",
      params: {
        resource_name: resourceName,
        post_url: postUrl
      },
      ...options
    })
      .then((data) => data.resource_subscription);
  }

  /* 
    Show all active subscriptions of user for the input resource.
    https://app.gumroad.com/api#get-/resource_subscriptions
  */
  async getResourceSubscriptions(resourceName, options = {}) {
    const url = `/resource_subscriptions`;

    return this.request(url, {
      params: {
        resource_name: resourceName
      },
      ...options
    })
      .then((data) => data.resource_subscriptions);
  }

  /* 
    Unsubscribe from a resource.
    https://app.gumroad.com/api#delete-/resource_subscriptions/:resource_subscription_id
  */
  async unsubscribeFromResource(resourceSubscriptionId, options = {}) {
    const url = `/resource_subscriptions/${resourceSubscriptionId}`;

    return this.request(url, {
      method: "DELETE",
      ...options
    })
      .then((data) => ({ message: data.message }));
  }

  //#endregion Resource subscriptions
  //#region Sales

  /* 
    Retrieves all of the successful sales by the authenticated user.
    Available with the 'view_sales' scope.
    https://app.gumroad.com/api#get-/sales
  */
  async getSales(params, options = {}) {
    const url = `/sales`;

    return this.request(url, {
      params,
      ...options
    })
      .then((data) => ({ sales: data.sales, nextPageUrl: data.next_page_url, nextPageKey: data.next_page_url }));
  }

  /* 
    Paginated Testing Version 

    Retrieves all of the successful sales by the authenticated user.
    Available with the 'view_sales' scope.
    https://app.gumroad.com/api#get-/sales
  */
  async _getPaginatedSales(params, options = {}) {
    const url = `/sales`;

    return this.request(url, {
      params,
      ...options
    })
      .then((data) => ({
        sales: data.sales,
        getNextPage: data.next_page_key ? (async () => this._getPaginatedSales({ ...params, page_key: data.next_page_key }, options)) : undefined
      }));
  }

  /* 
    Retrieves the details of a sale by this user.
    Available with the 'view_sales' scope.
    https://app.gumroad.com/api#get-/sales/:id
  */
  async getSale(saleId, options = {}) {
    const url = `/sales/${saleId}`;

    return this.request(url, options)
      .then((data) => data.sale);
  }

  /* 
    Marks a sale as shipped. 
    Available with the 'mark_sales_as_shipped' scope.
    https://app.gumroad.com/api#put-/sales/:id/mark_as_shipped
  */
  async markSaleAsShipped(saleId, trackingUrl = undefined, options = {}) {
    const url = `/sales/${saleId}/mark_as_shipped`;

    return this.request(url, {
      method: "PUT",
      params: {
        tracking_url: trackingUrl
      },
      ...options
    })
      .then((data) => data.sale);
  }

  /* 
    Refunds a sale. 
    Available with the 'refund_sales' scope.
    https://app.gumroad.com/api#put-/sales/:id/refund
  */
  async refundSale(saleId, amountCents = undefined, options = {}) {
    const url = `/sales/${saleId}/refund`;

    return this.request(url, {
      method: "PUT",
      params: {
        amount_cents: amountCents
      },
      ...options
    })
      .then((data) => data.sale);
  }

  //#endregion Sales
  //#region Subscribers

  /* 
    Retrieves all of the active subscribers for one of the authenticated user's products.
    Available with the 'view_sales' scope.
    https://app.gumroad.com/api#get-/products/:product_id/subscribers
  */
  async getProductSubscribers(productId, emailFilter = undefined, options = {}) {
    const url = `/products/${productId}/subscribers`;

    return this.request(url, {
      params: {
        email: emailFilter
      },
      ...options
    })
      .then((data) => data.subscribers);
  }

  /* 
    Retrieves the details of a subscriber to this user's product.
    Available with the 'view_sales' scope.
    https://app.gumroad.com/api#get-/subscribers/:id
  */
  async getSubscriber(subscriberId, options = {}) {
    const url = `/subscribers/${subscriberId}`;

    return this.request(url, options)
      .then((data) => data.subscribers);
  }

  //#endregion Subscribers
  //#region Licenses

  /* 
    Verify a license.
    https://app.gumroad.com/api#post-/licenses/verify
  */
  async verifyLicense(productId, licenseKey, incrementUsesCount = true, options = {}) {
    const url = "/licenses/verify";

    return this.request(url, {
      method: "POST",
      params: {
        product_id: productId,
        license_key: licenseKey,
        increment_uses_count: incrementUsesCount !== false
      },
      ...options
    })
      .then((data) => ({ purchase: data.purchase, uses: data.uses }));
  }

  /* 
    Enable a license.
    https://app.gumroad.com/api#put-/licenses/enable
  */
  async enableLicense(productId, licenseKey, options = {}) {
    const url = "/licenses/enable";

    return this.request(url, {
      method: "PUT",
      params: {
        product_id: productId,
        license_key: licenseKey,
      },
      ...options
    })
      .then((data) => ({ purchase: data.purchase, uses: data.uses }));
  }

  /* 
    Disable a license.
    https://app.gumroad.com/api#put-/licenses/disable
  */
  async disableLicense(productId, licenseKey, options = {}) {
    const url = "/licenses/disable";

    return this.request(url, {
      method: "PUT",
      params: {
        product_id: productId,
        license_key: licenseKey,
      },
      ...options
    })
      .then((data) => ({ purchase: data.purchase, uses: data.uses }));
  }

  //#endregion Licenses
}

export default Noderoad;
