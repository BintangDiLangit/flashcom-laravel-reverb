<?php

namespace App\Http\Controllers;

use App\Data\ProductData;
use App\Events\RequestProductDeletion;
use App\Models\Product;
use App\Models\RequestDeleteProduct;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = ProductData::collect(
            Product::paginate()
        );

        return inertia('products/index', [
            'products' => $products
        ]);
    }

    public function requestForDelete(Request $request, Product $product)
    {
        $requester = $request->user();

        $requestDeleteProduct = $requester->requestDeleteProducts()->create([
            'product_id' => $product->id
        ]);

        $admin = User::whereHas('roles', fn($q) => $q->where('name', 'Super Admin'))->first();

        broadcast(new RequestProductDeletion(
            $requestDeleteProduct->load('product:id,name', 'user:id,name'),
            $admin
        ));

        flashMessage('success', 'Request Sent');
        return back();
    }
}
