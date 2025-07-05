<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use Illuminate\Http\Request;

class PelangganController extends Controller
{

    private function prepareDataPelanggan($request) {
        $request->validate([
            'name' => ['required', 'min:3'],
            'tanggal_pemasangan' => ['required', 'date'],
            'dusun' => ['required'],
            'desa' => ['required']
        ]);

        return $request->only(['name', 'tanggal_pemasangan', 'dusun', 'desa']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $pelanggan = Pelanggan::orderBy('kode_pelanggan', 'desc');
            return response()->json([
                'message' => 'List pelanggan berhasil diambil.',
                'data' => $pelanggan
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mendapatkan list pelanggan!',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $data_pelanggan = $this->prepareDataPelanggan($request);

        try {
            $new_pelanggan = Pelanggan::create($data_pelanggan);

            return response()->json([
                'message' => 'Pelanggan berhasil ditambahkan.',
                'data' => $new_pelanggan
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menambahkan pelanggan.',
                'error' => $e->getMessage()
            ], 500);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pelanggan = Pelanggan::find($id);

        return response()->json([
            'message' => 'Detail pelanggan berhasil diambil.',
            'data' => $pelanggan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pelanggan = Pelanggan::find($id);

        $data_pelanggan = $this->prepareDataPelanggan($request);
        $pelanggan->update($data_pelanggan);

        return response()->json([
            'message' => 'Data pelanggan berhasil diperbarui.',
            'data' => $pelanggan
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pelanggan = Pelanggan::find($id);
        $pelanggan->delete();

        return response()->json([
            'message' => 'Pelanggan berhasil dihapus.'
        ]);
    }
}
