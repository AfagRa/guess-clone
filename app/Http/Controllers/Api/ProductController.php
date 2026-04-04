<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->except(['images_by_color']);
        $product = Product::create($data);
        $this->persistImagesByColor($product->id, $request->input('images_by_color'));

        return response()->json(['data' => $product], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->except(['images_by_color']));
        if ($request->exists('images_by_color')) {
            $this->persistImagesByColor($product->id, $request->input('images_by_color'));
        }

        return response()->json(['data' => $product->fresh()]);
    }

    protected function persistImagesByColor(int $productId, $raw): void
    {
        DB::table('product_images')->where('product_id', $productId)->delete();
        if ($raw === null || $raw === '') {
            return;
        }
        if (!is_array($raw) && !is_object($raw)) {
            return;
        }
        $pairs = is_array($raw) ? $raw : (array) $raw;
        foreach ($pairs as $color => $urls) {
            if (!is_string($color) || $color === '') {
                continue;
            }
            $list = is_array($urls) ? $urls : [$urls];
            $sort = 0;
            foreach ($list as $item) {
                $url = is_string($item) ? trim($item) : '';
                if ($url === '') {
                    continue;
                }
                $resolved = $this->resolveProductImageUrl($url);
                if ($resolved === null) {
                    continue;
                }
                DB::table('product_images')->insert([
                    'product_id' => $productId,
                    'color' => $color,
                    'image_url' => $resolved,
                    'sort_order' => $sort++,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    protected function resolveProductImageUrl(string $url): ?string
    {
        if (str_starts_with($url, 'data:image')) {
            if (!preg_match('/^data:image\/(\w+);base64,(.+)$/s', $url, $m)) {
                return null;
            }
            $ext = strtolower($m[1]);
            if ($ext === 'jpeg') {
                $ext = 'jpg';
            }
            $binary = base64_decode($m[2], true);
            if ($binary === false) {
                return null;
            }
            $name = Str::uuid()->toString() . '.' . $ext;
            $path = 'products/' . $name;
            Storage::disk('public')->put($path, $binary);

            return Storage::disk('public')->url($path);
        }
        if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
            return $url;
        }

        return null;
    }
}
