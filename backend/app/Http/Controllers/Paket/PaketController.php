<?php

namespace App\Http\Controllers\Paket;

use App\Http\Controllers\Controller;
use App\Models\Paket;
use Illuminate\Http\Request;

class PaketController extends Controller
{

    private function prepareDataPaket($request) {
        $request->validate([
            'name' => ['required'],
            'harga' => ['required']
        ]);

        return $request->only(['name', 'harga']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $paket = Paket::get();

            return response()->json([
                'message' => "Berhasil mendapatkan data paket!",
                'data' => $paket
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Gagal mendapatkan data  paket!",
                'errors' => $e->getMessage()
            ],500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data_paket = $this->prepareDataPaket($request);

        try {
            if(Paket::create($data_paket)) {
                return response()->json([
                    'message' => "Paket berhasil ditambahkan"
                ],201);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Gagal menambahkan paket",
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $paket = Paket::findOrFail($id);

            return response()->json([
                'message' => "Berhasil mendapatkan detail paket!",
                'data' => $paket
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Gagal mendapatkan detail paket!",
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data_paket = $this->prepareDataPaket($request);

        try {
            $paket = Paket::findOrFail($id);
            $paket->update($data_paket);

            return response()->json([
                'message' => "Paket berhasil diperbarui!"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Gagal memperbarui paket!",
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $paket = Paket::findOrFail($id);
            $paket->delete();

            return response()->json([
                'message' => "Paket berhasil dihapus!"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Gagal menghapus paket!",
                'errors' => $e->getMessage()
            ], 500);
        }
    }
}
