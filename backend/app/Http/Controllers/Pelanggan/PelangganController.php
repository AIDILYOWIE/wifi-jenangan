<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use App\Models\Tagihan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PelangganController extends Controller
{

    public function generateKodePelanggan()
    {
        $lastPelanggan = Pelanggan::orderBy('id', 'desc')->first();

        $nextId = $lastPelanggan ? $lastPelanggan->id + 1 : 1;
        $kodePelanggan = 'PL-' . str_pad($nextId, 4, '0', STR_PAD_LEFT);

        return response()->json([
            "new_kode_pelanggan" => $kodePelanggan
        ]);
    }


    private function prepareDataPelanggan($request)
    {
        $request->validate([
            'tanggal_pemasangan' => ['required', 'date'],
            'name' => ['required', 'min:3'],
            'kecamatan' => ['required'],
            'desa' => ['required'],
            'dusun' => ['required'],
            'id_paket' => ['required', 'exists:paket,id'],
        ]);

        return $request->only(['name', 'tanggal_pemasangan', 'dusun', 'desa', 'kecamatan', 'id_paket']);
    }

    private function prepareDataTagihan($request, $pelanggan)
    {
        $request->validate([
            'id_pelanggan' => ['exists:users,id']
        ]);

        $tanggal_pemasangan = Carbon::parse($pelanggan->tanggal_pemasangan);

        $tanggal_tagihan = $this->createTanggalTagihan($pelanggan);


        setlocale(LC_TIME, 'id_ID');
        $nama_bulan = $tanggal_tagihan->isoFormat('MMMM');

        $data_tagihan = [
            'id_pelanggan' => $pelanggan->id,
            'name' => 'tagihan ' . $nama_bulan,
            'tanggal' => $tanggal_tagihan,
            'total_tagihan' => $pelanggan->paket->harga,
            'status' => 'Belum Lunas'
        ];

        return $data_tagihan;
    }

    private function createTanggalTagihan($pelanggan)
    {
        $tanggal_pemasangan = Carbon::parse($pelanggan->tanggal_pemasangan);

        // Ambil tagihan terakhir yang statusnya lunas
        $last_tagihan_lunas = $pelanggan->tagihan()
            ->where('status', 'lunas')
            ->orderByDesc('tanggal')
            ->first();


        // jika tidak ada tagihan lunas, maka tagihan terbaru = tanggal pemasangan + 1 atau 2 bulan
        if (!$last_tagihan_lunas) {
            if ($tanggal_pemasangan->day <= 20) {
                $tanggal_tagihan = $tanggal_pemasangan->copy()->addMonth()->day(20);
            } else {
                $tanggal_tagihan = $tanggal_pemasangan->copy()->addMonths(2)->day(1);
            }
        }


        return $tanggal_tagihan;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $pelanggan = Pelanggan::with('tagihan')->orderByDesc('kode_pelanggan')->get();

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
        DB::beginTransaction();
        try {
            $new_pelanggan = Pelanggan::create($data_pelanggan);
            $data_tagihan = $this->prepareDataTagihan($request, $new_pelanggan);
            $new_tagihan = Tagihan::create($data_tagihan);

            DB::commit();

            return response()->json([
                'message' => 'Pelanggan berhasil ditambahkan.',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
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
        $pelanggan = Pelanggan::with(['paket', 'tagihan'])->find($id);

        $pelanggan->have_tagihan_lunas = $pelanggan->tagihan->contains('status', 'Lunas');

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

        DB::beginTransaction();

        try {
            $data_pelanggan = $this->prepareDataPelanggan($request);
            $pelanggan->update($data_pelanggan);

            $last_tagihan = $pelanggan->tagihan()
                ->where('status', 'Belum Lunas')
                ->orderByDesc('tanggal')
                ->first();

            $tanggal_tagihan = $this->createTanggalTagihan($pelanggan);

            $last_tagihan->update([
                'paket' => $data_pelanggan->id_paket,
                'tanggal' => $tanggal_tagihan,
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

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
